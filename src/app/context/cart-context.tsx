"use client";

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react";

// The base URL for your backend API. In a real application, this should be in a .env.local file.
const API_URL = "http://localhost:3001/api";

// --- Type Definitions ---
interface CartItem {
  id: string; // This should be the ServiceItem ID
  name: string;
  category: string;
  serviceType: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[]; // Renamed for clarity to match backend response
  addToCart: (item: Omit<CartItem, 'category' | 'serviceType'>) => Promise<void>;
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

  // Function to fetch the entire cart from the backend.
  // We use useCallback to prevent this function from being recreated on every render.
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/cart`);
      const result = await response.json();
      if (result.success && result.data) {
        setCartItems(result.data.items || []);
      } else {
        console.error("Failed to fetch cart:", result.error);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to fetch the cart when the component first loads.
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // --- Modified Cart Functions with API Calls ---

  const addToCart = async (item: Omit<CartItem, 'category' | 'serviceType'>) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      const result = await response.json();
      if (result.success) {
        // After successfully adding, we re-fetch the cart to ensure our state is in sync with the server.
        await fetchCart();
      } else {
        console.error("Failed to add item to cart:", result.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        await fetchCart(); // Re-sync state
      } else {
        console.error("Failed to remove item from cart:", result.error);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item instead.
      await removeFromCart(itemId);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      const result = await response.json();
      if (result.success) {
        await fetchCart(); // Re-sync state
      } else {
        console.error("Failed to update quantity:", result.error);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setCartItems([]); // Clear local state immediately
      } else {
        console.error("Failed to clear cart:", result.error);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // These functions can remain as they are, as they just calculate based on the current local state.
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
