"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"

interface CartItem {
  id: string
  name: string
  category?: string
  serviceType?: string
  price: number
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "category" | "serviceType">) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  replaceCart: (items: CartItem[]) => Promise<void> // <-- NEW FUNCTION
  getTotalItems: () => number
  getTotalPrice: () => number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const saveCartToStorage = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
    } catch (error: unknown) {
      console.error("Failed to save to localStorage:", error)
    }
  }, [])

  useEffect(() => {
    try {
      setIsLoading(true)
      const localCart = localStorage.getItem("cart")
      if (localCart) {
        setCartItems(JSON.parse(localCart))
      }
    } catch (error: unknown) {
      console.error("Failed to load from localStorage:", error)
      setCartItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addToCart = useCallback(async (item: Omit<CartItem, "category" | "serviceType">) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id)
      let updatedItems: CartItem[]

      const newItem: CartItem = { ...item, category: "Item", serviceType: "Service" }

      if (existingIndex >= 0) {
        updatedItems = [...prevItems]
        updatedItems[existingIndex].quantity += item.quantity
      } else {
        updatedItems = [...prevItems, newItem]
      }
      saveCartToStorage(updatedItems)
      return updatedItems
    })
  }, [saveCartToStorage])

  const removeFromCart = useCallback(async (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId)
      saveCartToStorage(updatedItems)
      return updatedItems
    })
  }, [saveCartToStorage])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId)
      return
    }
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      saveCartToStorage(updatedItems)
      return updatedItems
    })
  }, [removeFromCart, saveCartToStorage])

  const clearCart = useCallback(async () => {
    setCartItems([])
    localStorage.removeItem("cart")
  }, [])

  // --- 1. NEW: A function to replace the entire cart at once ---
  const replaceCart = useCallback(async (newItems: CartItem[]) => {
      setCartItems(newItems);
      saveCartToStorage(newItems);
  }, [saveCartToStorage]);


  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    replaceCart, // <-- ADD THE NEW FUNCTION TO THE CONTEXT
    getTotalItems,
    getTotalPrice,
    isLoading,
  }), [cartItems, isLoading, addToCart, removeFromCart, updateQuantity, clearCart, replaceCart, getTotalItems, getTotalPrice])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}