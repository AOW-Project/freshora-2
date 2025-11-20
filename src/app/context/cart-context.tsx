"use client";
// import { CartItem } from "@/app/dashboard/order/order-cart/components/PickupForm/types";


import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;

  category: string;        // REQUIRED
  serviceType: string;     // REQUIRED
  serviceSlug?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Partial<CartItem>) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  replaceCart: (items: CartItem[]) => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ---- Save to storage + notify ----
  const saveCartToStorage = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, []);

  // ---- Sync cart from storage on mount + when event fires ----
  useEffect(() => {
    const syncCart = () => {
      const stored = localStorage.getItem("cart");
      setCartItems(stored ? JSON.parse(stored) : []);
      setIsLoading(false);
    };

    // load on mount
    syncCart();

    window.addEventListener("cart-updated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  // ---- Add item ----
  const addToCart = useCallback(
    async (item: Partial<CartItem>) => {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === item.id);

        let updated: CartItem[];

   const newItem: CartItem = {
  id: item.id!,
  name: item.name!,
  price: item.price!,
  quantity: item.quantity!,
  category: item.category ?? "General",
  serviceType: item.serviceType ?? "Service",
  serviceSlug: item.serviceSlug,
};

       if (existingIndex >= 0) {
  updated = [...prev];
  updated[existingIndex] = newItem; // overwrite instead of add
} else {
          updated = [...prev, newItem];
        }

        saveCartToStorage(updated);
        return updated;
      });
    },
    [saveCartToStorage]
  );

  // ---- Remove item ----
  const removeFromCart = useCallback(
    async (itemId: string) => {
      setCartItems((prev) => {
        const updated = prev.filter((i) => i.id !== itemId);
        saveCartToStorage(updated);
        return updated;
      });
    },
    [saveCartToStorage]
  );

  // ---- Update quantity ----
  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      setCartItems((prev) => {
        const updated = prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );

        saveCartToStorage(updated);
        return updated;
      });
    },
    [removeFromCart, saveCartToStorage]
  );

  // ---- Clear cart ----
  const clearCart = useCallback(async () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  // ---- Replace whole cart ----
  const replaceCart = useCallback(
    async (newItems: CartItem[]) => {
      setCartItems(newItems);
      saveCartToStorage(newItems);
    },
    [saveCartToStorage]
  );

  // ---- Total items ----
  const getTotalItems = useCallback(
    () => cartItems.reduce((t, item) => t + item.quantity, 0),
    [cartItems]
  );

  // ---- Total price ----
  const getTotalPrice = useCallback(
    () => cartItems.reduce((t, item) => t + item.price * item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      replaceCart,
      getTotalItems,
      getTotalPrice,
      isLoading,
    }),
    [
      cartItems,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      replaceCart,
      getTotalItems,
      getTotalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
