"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package } from "lucide-react"

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setIsLoading(true)
    // Navigate to the dynamic tracking page
    router.push(`/track/${orderId.trim()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Package className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID below to track the status of your laundry order</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <Input
                  id="orderId"
                  type="text"
                  placeholder="Enter your order ID (e.g., ORD123456)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading || !orderId.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Tracking...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Track Order
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to find your Order ID:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Check your email confirmation</li>
                <li>• Look at your receipt</li>
                <li>• Contact our support team</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact us at{" "}
            <a href="mailto:freshorappc@gmail.com" className="text-green-600 hover:underline">
              freshorappc@gmail.com
            </a>{" "}
            or call{" "}
            <a href="tel:+971509259667" className="text-green-600 hover:underline">
              +971 50 925 9667
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
