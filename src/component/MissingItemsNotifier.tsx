"use client"
import { useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useCart } from "@/app/context/cart-context"

interface MissingItemsNotifierProps {
  serviceSlug?: string
  selectedQuantities?: { [key: string]: number }
  serviceItems?: {
    men: Array<{ id: string; name: string; price: number; description: string }>
    women: Array<{ id: string; name: string; price: number; description: string }>
    children: Array<{ id: string; name: string; price: number; description: string }>
  }
}

export default function MissingItemsNotifier({
  serviceSlug,
  selectedQuantities = {},
  serviceItems,
}: MissingItemsNotifierProps) {
  // FIX: use cartItems instead of cart
  const { cartItems: cart } = useCart()

  useEffect(() => {
    if (!selectedQuantities || !serviceItems || !serviceSlug) return

    const selectedItems = Object.entries(selectedQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId]) => {
        const allItems = [
          ...serviceItems.men.map((item) => ({ ...item, category: "Men" })),
          ...serviceItems.women.map((item) => ({ ...item, category: "Women" })),
          ...serviceItems.children.map((item) => ({ ...item, category: "Children" })),
        ]
        return allItems.find((item) => item.id === itemId)
      })
      .filter(Boolean)

    if (selectedItems.length === 0) return

    const missingItems = selectedItems.filter((selectedItem) => {
      const cartItemId = `${serviceSlug}-${selectedItem!.id}`
      return !cart.some((cartItem) => cartItem.id === cartItemId)
    })

    if (missingItems.length > 0) {
      const itemNames = missingItems.map((item) => item!.name).join(", ")
      toast.warn(`📋 You selected "${itemNames}" but haven't added to cart yet!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        theme: "colored",
      })
    }
  }, [cart, selectedQuantities, serviceItems, serviceSlug])

  return null
}
