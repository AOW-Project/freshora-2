"use client"

import React, { useState, useMemo, useCallback } from "react"
import { useCart } from "@/app/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, X } from "lucide-react"
import Link from "next/link"
import { toast } from "react-toastify"

// --- Types ---
interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
  unit?: string
}

interface OrderItem extends ServiceItem {
  quantity: number
  category: string
}

interface Service {
  id: string
  slug: string
  title: string
  description: string
  fullDescription: string
  image?: string
  rating: number
  reviews: number
  duration: string
  items: Record<string, ServiceItem[]>
}

interface ServiceOrderClientProps {
  slug: string
  service: Service
}

interface ItemCardProps {
  item: ServiceItem
  category: string
  quantity: number
  onUpdateQuantity: (itemId: string, change: number) => void
  onAddToOrder: (item: ServiceItem, category: string) => void
}

// --- Utils ---
const formatCategory = (key: string) =>
  key.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

// --- Item Card ---
const ItemCard = React.memo(({ item, category, quantity, onUpdateQuantity, onAddToOrder }: ItemCardProps) => {
  const totalAmount = item.price * quantity

  return (
    <Card className="p-4 flex flex-col">
      <div className="flex-grow">
        <h4 className="font-semibold text-lg">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-4 mb-4">
          <p className="text-green-600 font-bold text-lg">
            {item.price.toFixed(2)} {item.unit && <span className="text-sm font-normal">{item.unit}</span>}
          </p>
          {quantity > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">×</span>
              <span className="text-gray-600">{quantity}</span>
              <span className="text-gray-400">=</span>
              <p className="text-blue-600 font-bold text-lg">{totalAmount.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, -1)}
              disabled={quantity === 0}
              className="h-8 w-8 p-0"
            >
              -
            </Button>
            <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="h-8 w-8 p-0"
            >
              +
            </Button>
          </div>

          <Button
            onClick={() => onAddToOrder(item, category)}
            disabled={quantity === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
})
ItemCard.displayName = "ItemCard"

// --- Main Component ---
export default function ServiceOrderClient({ slug, service }: ServiceOrderClientProps) {
  const { addToCart, getTotalItems } = useCart()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [tempOrder, setTempOrder] = useState<OrderItem[]>([])
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const categories = useMemo(() => Object.keys(service.items || {}), [service.items])
  const firstCategory = categories[0]

  const hasItems = categories.some((cat) => (service.items?.[cat] || []).length > 0)

  const orderTotal = useMemo(
    () => tempOrder.reduce((total, item) => total + item.price * item.quantity, 0),
    [tempOrder]
  )

  const allItems = useMemo(
    () => Object.entries(service.items).flatMap(([category, items]) => items.map((i) => ({ ...i, category }))),
    [service.items]
  )

  const updateQuantity = useCallback((itemId: string, change: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, (prev[itemId] || 0) + change)
      return { ...prev, [itemId]: newQuantity }
    })
  }, [])

  const removeFromOrder = useCallback((itemId: string) => {
    setTempOrder((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  const handleAddToOrder = useCallback(
    (item: ServiceItem, category: string) => {
      const quantity = quantities[item.id] || 0
      if (quantity === 0) return

      setTempOrder((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === item.id)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex].quantity += quantity
          return updated
        }
        return [...prev, { ...item, quantity, category }]
      })
      setQuantities((prev) => ({ ...prev, [item.id]: 0 }))
    },
    [quantities]
  )

  const handleAddAllToCart = useCallback(async () => {
    if (tempOrder.length === 0) return

    // ensure no missed items
    const missedItems = allItems.filter((item) => {
      const qty = quantities[item.id] || 0
      const alreadyInTemp = tempOrder.some((orderItem) => orderItem.id === item.id)
      return qty > 0 && !alreadyInTemp
    })

    if (missedItems.length > 0) {
      toast.error("⚠️ Some selected items have not been added. Please add them first.", { theme: "colored" })
      return
    }

    setIsAddingToCart(true)
    try {
      await Promise.all(
        tempOrder.map((item) =>
          addToCart({
            id: `${service.id}-${item.id}`,
            title: item.name,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })
        )
      )
      setTempOrder([])
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add items to cart.")
    } finally {
      setIsAddingToCart(false)
    }
  }, [tempOrder, allItems, addToCart, quantities, service.id])

  if (!hasItems) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold">No Items Available</h2>
        <p className="text-gray-600 mt-2">There are currently no items listed for this service.</p>
        <Link href="/services">
          <Button className="mt-6 bg-green-600 hover:bg-green-700">Back to Services</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex">
      <div className="flex-1">
        {/* Header */}
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="flex items-center space-x-2 text-white mb-4">
              <Link href="/" className="hover:text-green-400">Home</Link>
              <span className="px-2">/</span>
              <Link href="/services" className="hover:text-green-400">Services</Link>
              <span className="px-2">/</span>
              <span className="text-green-400">Order</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Select Your Items</h1>
          </div>
        </div>

        {/* Service Info */}
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{service.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(service.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {service.rating.toFixed(1)} ({service.reviews} reviews)
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {service.duration}
                  </Badge>
                </div>
              </div>

              {getTotalItems() > 0 && (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const missedItems = allItems.filter((item) => {
                      const qty = quantities[item.id] || 0
                      const alreadyInTemp = tempOrder.some((orderItem) => orderItem.id === item.id)
                      return qty > 0 && !alreadyInTemp
                    })
                    if (missedItems.length > 0) {
                      toast.error("⚠️ Add all selected items before going to cart.", { theme: "colored" })
                    } else {
                      window.location.href = "/cart"
                    }
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart ({getTotalItems()})
                </Button>
              )}
            </div>
          </div>

          {/* Items Tabs */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue={firstCategory} className="w-full">
                  <TabsList className="flex flex-wrap gap-2 overflow-x-auto">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {formatCategory(category)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {categories.map((category) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {(service.items?.[category] || []).map((item) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            category={formatCategory(category)}
                            quantity={quantities[item.id] || 0}
                            onUpdateQuantity={updateQuantity}
                            onAddToOrder={handleAddToOrder}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      {tempOrder.length > 0 && (
        <aside className="w-80 bg-white border-l border-gray-200 p-6 sticky top-0 h-screen overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            {tempOrder.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.category}</p>
                  <p className="text-sm font-semibold text-green-600">
                    ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFromOrder(item.id)} className="text-red-500 hover:text-red-700">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">{orderTotal.toFixed(2)}</span>
          </div>

          <Button onClick={handleAddAllToCart} disabled={isAddingToCart} className="w-full bg-green-600 hover:bg-green-700" size="lg">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart ? "Adding..." : "Add All to Cart"}
          </Button>
        </aside>
      )}
    </div>
  )
}