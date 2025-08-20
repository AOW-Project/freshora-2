"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../context/cart-context"
import PickupForm from "@/component/SchedulePickupModal"
import { useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Shopping+Cart')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="flex items-center space-x-2 text-white mb-4">
              <Link href="/" className="hover:text-green-400">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="text-green-400">Cart</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Shopping Cart</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="text-center py-16">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some items to your cart to get started with your laundry order.</p>
              <Link href="/services/laundry-services">
                <Button className="bg-green-600 hover:bg-green-700">Browse Services</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <div
        className="relative h-64 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Shopping+Cart')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <nav className="flex items-center space-x-2 text-white mb-4">
            <Link href="/" className="hover:text-green-400">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-green-400">Cart</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cart Items ({cart.length})</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.category} • {item.serviceType}
                        </p>
                        <p className="text-lg font-bold text-green-600">{item.price}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">{(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                          <Button
                    onClick={() => setCheckoutOpen(true)} // 👈 open form
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
             
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
       
    </div>
    <PickupForm open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}