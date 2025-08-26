"use client"
import { useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useCart } from "@/app/context/cart-context"

interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
}

interface MissingItemsNotifierProps {
  serviceSlug?: string
  selectedQuantities?: { [key: string]: number }
  serviceItems?: Record<string, ServiceItem[]> // 🔥 dynamic categories
}

export default function MissingItemsNotifier({
  serviceSlug,
  selectedQuantities = {},
  serviceItems,
}: MissingItemsNotifierProps) {
  const { cartItems: cart } = useCart()

  // 🔥 helper function
  const checkMissingItems = () => {
    if (!selectedQuantities || !serviceItems || !serviceSlug) return

    // flatten all categories into one array
    const allItems = Object.entries(serviceItems).flatMap(([category, items]) =>
      items.map((item) => ({ ...item, category }))
    )

    // items user increased quantity for
    const selectedItems = Object.entries(selectedQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId]) => allItems.find((item) => item.id === itemId))
      .filter(Boolean)

    if (selectedItems.length === 0) return

    // check which are missing from cart
    const missingItems = selectedItems.filter(
      (selectedItem) => !cart.some((cartItem) => cartItem.id === selectedItem!.id)
    )

    if (missingItems.length > 0) {
      const itemNames = missingItems.map((item) => item!.name).join(", ")
      toast.warn(`📋 You selected "${itemNames}" but haven't added to cart yet!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
      })
    }
  }

  // still run on cart/quantity changes
  useEffect(() => {
    checkMissingItems()
  }, [cart, selectedQuantities, serviceItems, serviceSlug])

  return null
}
