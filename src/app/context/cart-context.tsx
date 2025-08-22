"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"

// --- Type Definitions ---
interface CartItem {
  id: string
  name: string
  category?: string // Made optional
  serviceType?: string // Made optional
  price: number
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "category" | "serviceType">) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalItems: () => number
  getTotalPrice: () => number
  isLoading: boolean
}
// --- End of Type Definitions ---

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadCartFromStorage = useCallback(() => {
    try {
      setIsLoading(true)
      const localCart = localStorage.getItem("cart")
      if (localCart) {
        const parsedCart = JSON.parse(localCart)
        setCartItems(parsedCart)
        console.log("Loaded cart from localStorage:", parsedCart)
      } else {
        setCartItems([])
      }
    } catch (error: unknown) {
      console.error("Failed to load from localStorage:", error)
      setCartItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveCartToStorage = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items))
      console.log("Saved cart to localStorage:", items)
    } catch (error: unknown) {
      console.error("Failed to save to localStorage:", error)
    }
  }, [])

  useEffect(() => {
    loadCartFromStorage()
  }, [loadCartFromStorage])

  const addToCart = async (item: Omit<CartItem, "category" | "serviceType">) => {
    try {
      console.log("Adding item to cart:", item)

      const newItem: CartItem = {
        ...item,
        category: "Unknown",
        serviceType: "Unknown",
      }

      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id)
        let updatedItems: CartItem[]

        if (existingIndex >= 0) {
          // Update existing item quantity
          updatedItems = [...prevItems]
          updatedItems[existingIndex].quantity += item.quantity
        } else {
          // Add new item
          updatedItems = [...prevItems, newItem]
        }

        saveCartToStorage(updatedItems)
        return updatedItems
      })

      console.log("Item added to cart successfully")
    } catch (error: unknown) {
      console.error("Error adding item to cart:", error)
      throw error
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== itemId)
        saveCartToStorage(updatedItems)
        return updatedItems
      })
      console.log("Item removed from cart successfully")
    } catch (error: unknown) {
      console.error("Error removing item from cart:", error)
      throw error
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId)
      return
    }

    try {
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        saveCartToStorage(updatedItems)
        return updatedItems
      })
      console.log("Item quantity updated successfully")
    } catch (error: unknown) {
      console.error("Error updating quantity:", error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      setCartItems([])
      localStorage.removeItem("cart")
      console.log("Cart cleared successfully")
    } catch (error: unknown) {
      console.error("Error clearing cart:", error)
      throw error
    }
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
