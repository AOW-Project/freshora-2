"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { useCart } from "../context/cart-context"
import PickupForm from "@/component/SchedulePickupModal"
// import Navbar from "../../component/NavBar"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [showForm, setShowForm] = useState(false)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const applyPromoCode = () => {
    // Add promo code logic here
    console.log("Applying promo code:", promoCode)
  }

  if (cart.length === 0) {
    return (
      <div>
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Laundry+Machines+Background')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-white mb-4">
              <Link href="/" className="hover:text-green-400">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="hover:text-green-400">Cart</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white">Cart</h1>
          </div>
        </div>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/services" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

            <Card className="text-center py-16">
              <CardContent>
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven&apos;t added any items to your cart yet.</p>

                <Link href="/services">
                  <Button className="bg-green-600 hover:bg-green-700">Browse Services</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">{getTotalItems()} items in your cart</p>
            </div>

            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {item.category} • {item.serviceType}
                            </p>
                            <p className="text-green-600 font-bold text-lg">${item.price} each</p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Promo Code</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode.trim()}>
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Pickup & Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 text-amber-100"
                    >
                      Schedule a Pickup
                    </button>
                    <PickupForm open={showForm} onClose={() => setShowForm(false)} />
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Quote First
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Free pickup and delivery • 24-48 hour turnaround</p>
                  </div>
                </CardContent>
              </Card>

              {/* Service Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Why Choose Us?</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Free pickup and delivery</li>
                    <li>• Eco-friendly cleaning products</li>
                    <li>• Professional stain removal</li>
                    <li>• 100% satisfaction guarantee</li>
                    <li>• Real-time order tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
