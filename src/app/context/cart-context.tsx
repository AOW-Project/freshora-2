"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";

// FIX: Updated to use your actual backend URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://freshora-2-backend-seven.vercel.app";

// --- Type Definitions ---
interface CartItem {
  id: string;
  name: string;
  category?: string; // Made optional
  serviceType?: string; // Made optional
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    item: Omit<CartItem, "category" | "serviceType">
  ) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}
// --- End of Type Definitions ---

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function for API calls with better error handling
  const apiCall = async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      console.log(`Making API call to: ${url}`);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      console.log(`API Response Status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error: ${response.status} - ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      return result;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.error("Request timed out");
          throw new Error(
            "Request timed out - please check your internet connection"
          );
        }
        console.error("API call failed:", error.message);
        throw error;
      } else {
        console.error("API call failed with unknown error:", error);
        throw new Error("Unknown error occurred during API call");
      }
    }
  };

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await apiCall(`${API_URL}/api/cart`);

      if (result.success && result.data) {
        setCartItems(result.data.items || []);
      } else {
        console.warn("No cart data or unsuccessful response:", result);
        setCartItems([]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching cart:", error.message);
      } else {
        console.error("Unknown error fetching cart:", error);
      }

      // Fallback to localStorage
      try {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          setCartItems(parsedCart);
          console.log("Loaded cart from localStorage as fallback");
        } else {
          setCartItems([]);
        }
      } catch (localError: any) {
        console.error("Failed to load from localStorage:", localError);
        setCartItems([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (item: Omit<CartItem, "category" | "serviceType">) => {
    try {
      console.log("Adding item to cart:", item);

      const result = await apiCall(`${API_URL}/api/cart`, {
        method: "POST",
        body: JSON.stringify({ item }),
      });

      if (result.success) {
        console.log("Item added successfully, refreshing cart...");
        await fetchCart();
      } else {
        throw new Error(result.error || "Failed to add item to cart");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding item to cart:", error.message);
      } else {
        console.error("Unknown error adding item to cart:", error);
      }

      // Fallback to localStorage
      try {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingIndex = localCart.findIndex(
          (cartItem: CartItem) => cartItem.id === item.id
        );

        if (existingIndex >= 0) {
          localCart[existingIndex].quantity += item.quantity;
        } else {
          localCart.push({
            ...item,
            category: "Unknown",
            serviceType: "Unknown",
          });
        }

        localStorage.setItem("cart", JSON.stringify(localCart));
        setCartItems(localCart);

        console.log("Item saved to localStorage as fallback");
      } catch (localError: any) {
        console.error("Failed to save to localStorage:", localError);
        throw error;
      }

      throw error;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const result = await apiCall(`${API_URL}/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (result.success) {
        await fetchCart();
      } else {
        throw new Error(result.error || "Failed to remove item from cart");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error removing item from cart:", error.message);
      } else {
        console.error("Unknown error removing item from cart:", error);
      }

      // Fallback to localStorage
      try {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = localCart.filter(
          (item: CartItem) => item.id !== itemId
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } catch (localError: any) {
        console.error("Failed to remove from localStorage:", localError);
      }

      throw error;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const result = await apiCall(`${API_URL}/api/cart/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      });

      if (result.success) {
        await fetchCart();
      } else {
        throw new Error(result.error || "Failed to update quantity");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating quantity:", error.message);
      } else {
        console.error("Unknown error updating quantity:", error);
      }

      // Fallback to localStorage
      try {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = localCart.map((item: CartItem) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } catch (localError: any) {
        console.error("Failed to update in localStorage:", localError);
      }

      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const result = await apiCall(`${API_URL}/api/cart`, {
        method: "DELETE",
      });

      if (result.success) {
        setCartItems([]);
        localStorage.removeItem("cart");
      } else {
        throw new Error(result.error || "Failed to clear cart");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error clearing cart:", error.message);
      } else {
        console.error("Unknown error clearing cart:", error);
      }

      // Fallback to localStorage
      localStorage.removeItem("cart");
      setCartItems([]);

      throw error;
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
