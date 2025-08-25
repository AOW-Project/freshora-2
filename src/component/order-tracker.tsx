"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

interface OrderStatus {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  createdAt: string
  pickupDate: string
  deliveryDate: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
  }
  items: Array<{
    itemName: string
    category: string
    quantity: number
    price: number
  }>
}

const statusConfig = {
  pending: { icon: Clock, color: "bg-yellow-500", label: "Order Received" },
  confirmed: { icon: CheckCircle, color: "bg-blue-500", label: "Confirmed" },
  "picked-up": { icon: Package, color: "bg-orange-500", label: "Picked Up" },
  "in-process": { icon: Loader2, color: "bg-purple-500", label: "In Process" },
  "ready-for-delivery": { icon: Truck, color: "bg-indigo-500", label: "Ready for Delivery" },
  delivered: { icon: CheckCircle, color: "bg-green-500", label: "Delivered" },
}

export default function OrderTracker() {
  const [orderNumber, setOrderNumber] = useState("")
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const trackOrder = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter an order number")
      return
    }

    setLoading(true)
    setError("")

    console.log("[v0] Tracking order:", orderNumber)

    try {
      const apiUrl = `https://freshora-backend.onrender.com/api/tracking/${orderNumber}`
      console.log("[v0] Making request to:", apiUrl)

      const response = await fetch(apiUrl)
      console.log("[v0] Response status:", response.status)

      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (data.success) {
        setOrderStatus(data.data)
        console.log("[v0] Order found:", data.data)
      } else {
        setError(data.message || "Order not found")
        setOrderStatus(null)
        console.log("[v0] Order not found:", data.message)
      }
    } catch (err) {
      console.error("[v0] Fetch error:", err)
      setError("Failed to track order. Please try again.")
      setOrderStatus(null)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCurrentStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Track Your Order
          </CardTitle>
          <CardDescription>Enter your order number to track the status of your laundry service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter order number (e.g., ORD-123456)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && trackOrder()}
            />
            <Button onClick={trackOrder} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track"}
            </Button>
          </div>

          {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
        </CardContent>
      </Card>

      {orderStatus && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order #{orderStatus.orderNumber}</CardTitle>
                <CardDescription>Placed on {formatDate(orderStatus.createdAt)}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {orderStatus.totalAmount}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Order Status</h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {(() => {
                  const config = getCurrentStatusConfig(orderStatus.status)
                  const Icon = config.icon
                  return (
                    <>
                      <div className={`p-2 rounded-full ${config.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{config.label}</p>
                        <p className="text-sm text-gray-600">Current status of your order</p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            {/* Customer & Address Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pickup Details
                </h4>
                <div className="text-sm space-y-1 bg-blue-50 p-3 rounded-lg">
                  <p>
                    <strong>Date:</strong>{" "}
                    {orderStatus.pickupDate ? formatDate(orderStatus.pickupDate) : "Not scheduled"}
                  </p>
                  <p>
                    <strong>Address:</strong> {orderStatus.customer?.address || "Not provided"}
                  </p>
                  <p>
                    <strong>City:</strong> {orderStatus.customer?.city || "Not provided"}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {orderStatus.customer?.zipCode || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery Details
                </h4>
                <div className="text-sm space-y-1 bg-green-50 p-3 rounded-lg">
                  <p>
                    <strong>Date:</strong>{" "}
                    {orderStatus.deliveryDate ? formatDate(orderStatus.deliveryDate) : "Not scheduled"}
                  </p>
                  <p>
                    <strong>Address:</strong> {orderStatus.customer?.address || "Not provided"}
                  </p>
                  <p>
                    <strong>City:</strong> {orderStatus.customer?.city || "Not provided"}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {orderStatus.customer?.zipCode || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <h4 className="font-medium">Order Items</h4>
              <div className="space-y-2">
                {orderStatus.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.itemName}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                )) || <p className="text-gray-500">No items found</p>}
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <h4 className="font-medium">Customer Information</h4>
              <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
                <p>
                  <strong>Name:</strong> {orderStatus.customer?.name || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong> {orderStatus.customer?.email || "Not provided"}
                </p>
                <p>
                  <strong>Phone:</strong> {orderStatus.customer?.phone || "Not provided"}
                </p>
                <p>
                  <strong>Address:</strong> {orderStatus.customer?.address || "Not provided"}
                </p>
                <p>
                  <strong>City:</strong> {orderStatus.customer?.city || "Not provided"}
                </p>
                <p>
                  <strong>Zip Code:</strong> {orderStatus.customer?.zipCode || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
