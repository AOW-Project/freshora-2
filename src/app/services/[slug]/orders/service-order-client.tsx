"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, ShoppingCart, X } from "lucide-react"
import { useCart } from "../../../context/cart-context"
import type { Service } from "../../../../lib/services-data"

interface ServiceOrderClientProps {
  slug: string
  service: Service
}

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

export default function ServiceOrderClient({ slug, service }: ServiceOrderClientProps) {
  const { addToCart, getTotalItems } = useCart()
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [tempOrder, setTempOrder] = useState<OrderItem[]>([])

  const serviceItems = useMemo(
    () => ({
      "laundry-services": {
        men: [
          { id: "m1", name: "T-Shirts", price: 3, description: "Cotton t-shirts, polo shirts" },
          { id: "m2", name: "Shirts (Formal)", price: 5, description: "Dress shirts, business shirts" },
          { id: "m3", name: "Pants/Trousers", price: 6, description: "Casual pants, formal trousers" },
          { id: "m4", name: "Jeans", price: 7, description: "Denim jeans, casual wear" },
          { id: "m5", name: "Suits", price: 15, description: "Two-piece suits, blazers" },
          { id: "m6", name: "Underwear", price: 2, description: "Undergarments, socks" },
        ],
        women: [
          { id: "w1", name: "T-Shirts/Tops", price: 3, description: "Casual tops, blouses" },
          { id: "w2", name: "Dresses", price: 8, description: "Casual and formal dresses" },
          { id: "w3", name: "Pants/Jeans", price: 6, description: "Trousers, jeans, leggings" },
          { id: "w4", name: "Skirts", price: 5, description: "Mini, midi, maxi skirts" },
          { id: "w5", name: "Blouses", price: 6, description: "Formal and casual blouses" },
          { id: "w6", name: "Underwear/Lingerie", price: 2, description: "Undergarments, bras" },
        ],
        children: [
          { id: "c1", name: "T-Shirts", price: 2, description: "Kids casual t-shirts" },
          { id: "c2", name: "Pants/Shorts", price: 3, description: "Kids pants and shorts" },
          { id: "c3", name: "Dresses", price: 4, description: "Girls dresses" },
          { id: "c4", name: "School Uniforms", price: 5, description: "School shirts, pants" },
          { id: "c5", name: "Pajamas", price: 3, description: "Sleepwear, nightwear" },
          { id: "c6", name: "Underwear", price: 1, description: "Kids undergarments" },
        ],
      },
      "dry-cleaning-services": {
        men: [
          { id: "m1", name: "Suits", price: 20, description: "Two-piece business suits" },
          { id: "m2", name: "Blazers", price: 15, description: "Sport coats, blazers" },
          { id: "m3", name: "Dress Shirts", price: 8, description: "Formal dress shirts" },
          { id: "m4", name: "Ties", price: 5, description: "Neckties, bow ties" },
          { id: "m5", name: "Coats/Jackets", price: 25, description: "Winter coats, leather jackets" },
        ],
        women: [
          { id: "w1", name: "Dresses", price: 18, description: "Formal and cocktail dresses" },
          { id: "w2", name: "Blouses", price: 10, description: "Silk and delicate blouses" },
          { id: "w3", name: "Skirts", price: 12, description: "Formal and business skirts" },
          { id: "w4", name: "Coats", price: 30, description: "Winter coats, fur coats" },
          { id: "w5", name: "Evening Gowns", price: 35, description: "Formal evening wear" },
        ],
        children: [
          { id: "c1", name: "Formal Wear", price: 12, description: "Kids formal suits, dresses" },
          { id: "c2", name: "Coats", price: 15, description: "Kids winter coats" },
          { id: "c3", name: "School Blazers", price: 10, description: "School uniform blazers" },
        ],
      },
    }),
    [],
  )

  const items = useMemo(() => {
    return serviceItems[slug as keyof typeof serviceItems] || { men: [], women: [], children: [] }
  }, [serviceItems, slug])

  const hasItems = useMemo(() => {
    return items.men.length > 0 || items.women.length > 0 || items.children.length > 0
  }, [items])

  const isSoftToyService = useMemo(() => slug === "soft-toy-cleaning-service", [slug])

  const orderTotal = useMemo(() => {
    return tempOrder.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [tempOrder])

  const breadcrumbNav = useMemo(
    () => (
      <nav className="flex items-center space-x-2 text-white mb-4">
        <Link href="/" className="hover:text-green-400">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href="/services" className="hover:text-green-400">
          Services
        </Link>
        <span className="px-2">/</span>
        <span className="text-green-400">Orders</span>
      </nav>
    ),
    [],
  )

  const noItemsContent = useMemo(
    () => (
      <div>
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Laundry+Machines+Background')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            {breadcrumbNav}
            <h1 className="text-4xl md:text-5xl font-bold text-white">Orders</h1>
          </div>
        </div>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <Link
              href={`/services/${slug}`}
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Service Details
            </Link>

            <Card className="text-center py-16">
              <CardContent>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Requires Custom Quote</h2>
                <p className="text-gray-600 mb-6">
                  This service requires a personalized assessment and custom pricing. Please contact us directly to
                  schedule this service and receive a detailed quote.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-green-600 hover:bg-green-700">Schedule a Pickup</Button>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    ),
    [slug, breadcrumbNav],
  )

  const updateQuantity = useCallback(
    (itemId: string, change: number) => {
      const newQuantity = Math.max(0, (quantities[itemId] || 0) + change)
      setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }))
    },
    [quantities],
  )

  const handleAddToOrder = useCallback(
    (item: ServiceItem, category: string) => {
      const quantity = quantities[item.id] || 0
      if (quantity === 0) return

      const orderItem: OrderItem = {
        ...item,
        quantity,
        category,
      }

      setTempOrder((prev) => {
        const existingIndex = prev.findIndex((orderItem) => orderItem.id === item.id)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + quantity }
          return updated
        }
        return [...prev, orderItem]
      })

      setQuantities((prev) => ({ ...prev, [item.id]: 0 }))
    },
    [quantities],
  )

  const removeFromOrder = useCallback((itemId: string) => {
    setTempOrder((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  const handleAddAllToCart = useCallback(() => {
    if (tempOrder.length === 0) {
      return
    }

    try {
      tempOrder.forEach((item) => {
        const cartItem = {
          id: `${slug}-${item.id}`,
          name: item.name,
          category: item.category,
          price: item.price,
          serviceType: service.title,
        }

        // Add item once with the correct quantity
        addToCart(cartItem, item.quantity)
      })

      // Clear the temporary order after successful addition
      setTempOrder([])

      console.log(`Successfully added ${tempOrder.length} different items to cart`)
    } catch (error) {
      console.error("Error adding items to cart:", error)
    }
  }, [tempOrder, slug, service.title, addToCart])

  const ItemCard = useMemo(() => {
    return ({ item, category }: { item: ServiceItem; category: string }) => {
      const quantity = quantities[item.id] || 0
      const totalAmount = item.price * quantity

      return (
        <Card className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center gap-4">
                <p className="text-green-600 font-bold text-lg">${item.price}</p>
                {quantity > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">×</span>
                    <span className="text-gray-600">{quantity}</span>
                    <span className="text-gray-400">=</span>
                    <p className="text-blue-600 font-bold text-lg">${totalAmount.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, -1)}
                disabled={quantity === 0}
                className="h-8 w-8 p-0"
              >
                -
              </Button>
              <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 p-0">
                +
              </Button>
            </div>

            <Button
              onClick={() => handleAddToOrder(item, category)}
              disabled={quantity === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add
            </Button>
          </div>
        </Card>
      )
    }
  }, [quantities, handleAddToOrder, updateQuantity])

  if (!hasItems) {
    return noItemsContent
  }

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1">
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Laundry+Machines+Background')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            {breadcrumbNav}
            <h1 className="text-4xl md:text-5xl font-bold text-white">Orders</h1>
          </div>
        </div>

        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Service Details
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{service.title} - Order Items</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < service.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {service.rating}.0 ({service.reviews} reviews)
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {service.duration}
                    </Badge>
                  </div>
                </div>

                {/* Cart Link */}
                {getTotalItems() > 0 && (
                  <Link href="/cart">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Cart ({getTotalItems()})
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Service Description */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-gray-600 leading-relaxed">{service.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Service Items by Category */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Select Items & Quantities</h2>

                {isSoftToyService ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {items.children.map((item) => (
                      <ItemCard key={item.id} item={item} category="Toys" />
                    ))}
                  </div>
                ) : (
                  <Tabs defaultValue="men" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="men">Men&lsquo;s Items</TabsTrigger>
                      <TabsTrigger value="women">Women&apos;s Items</TabsTrigger>
                      <TabsTrigger value="children">Children&apos;s Items</TabsTrigger>
                    </TabsList>

                    <TabsContent value="men" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.men.map((item) => (
                          <ItemCard key={item.id} item={item} category="Men" />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="women" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.women.map((item) => (
                          <ItemCard key={item.id} item={item} category="Women" />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="children" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.children.map((item) => (
                          <ItemCard key={item.id} item={item} category="Children" />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {tempOrder.length > 0 && (
        <div className="w-80 bg-white border-l border-gray-200 p-6 sticky top-0 h-screen overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="space-y-3 mb-6">
            {tempOrder.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.category}</p>
                  <p className="text-sm font-semibold text-green-600">
                    ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromOrder(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleAddAllToCart} className="w-full bg-green-600 hover:bg-green-700" size="lg">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        </div>
      )}
    </div>
  )
}
