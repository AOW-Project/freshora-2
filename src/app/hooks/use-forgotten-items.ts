"use client"

import { useEffect, useRef, useState } from "react"

interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
}

interface OrderItem extends ServiceItem {
  quantity: number
  category: string
}

interface UseForgottenItemsProps {
  quantities: { [key: string]: number }
  tempOrder: OrderItem[]
  items: {
    men: ServiceItem[]
    women: ServiceItem[]
    children: ServiceItem[]
  }
  onShowNotification: (forgottenItems: Array<{ item: ServiceItem; quantity: number; category: string }>) => void
}

export function useForgottenItems({ quantities, tempOrder, items, onShowNotification }: UseForgottenItemsProps) {
  const [notificationShown, setNotificationShown] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastQuantitiesRef = useRef<{ [key: string]: number }>({})

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    // Check if quantities have changed
    const quantitiesChanged = JSON.stringify(quantities) !== JSON.stringify(lastQuantitiesRef.current)
    lastQuantitiesRef.current = { ...quantities }

    // Find items with quantities > 0 that aren't in temp order
    const forgottenItems: Array<{ item: ServiceItem; quantity: number; category: string }> = []

    // Check all categories
    const allItems = [
      ...items.men.map((item) => ({ ...item, category: "Men" })),
      ...items.women.map((item) => ({ ...item, category: "Women" })),
      ...items.children.map((item) => ({ ...item, category: "Children" })),
    ]

    allItems.forEach(({ category, ...item }) => {
      const quantity = quantities[item.id] || 0
      const inTempOrder = tempOrder.some((orderItem) => orderItem.id === item.id)

      if (quantity > 0 && !inTempOrder) {
        forgottenItems.push({ item, quantity, category })
      }
    })

    // If there are forgotten items and quantities changed, set a timer
    if (forgottenItems.length > 0 && quantitiesChanged && !notificationShown) {
      timeoutRef.current = setTimeout(() => {
        onShowNotification(forgottenItems)
        setNotificationShown(true)
      }, 8000) // Show notification after 8 seconds of inactivity
    }

    // Reset notification flag if no forgotten items
    if (forgottenItems.length === 0) {
      setNotificationShown(false)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [quantities, tempOrder, items, onShowNotification, notificationShown])

  const resetNotification = () => {
    setNotificationShown(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  return { resetNotification }
}
