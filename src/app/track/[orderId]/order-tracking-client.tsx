"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Settings } from "lucide-react"
import { useState } from "react"

// --- Type Definitions ---
// These types must match the data being passed from the parent page.
interface TrackingStep {
  status: string
  label: string
  completed: boolean
  timestamp?: string
}

interface TrackingData {
  orderId: string
  currentStatus: string
  customerInfo: {
    name: string
    email: string
  }
  orderDetails: {
    totalAmount: number
    createdAt: string
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  trackingSteps: TrackingStep[]
}
// --- End of Type Definitions ---

const ORDER_STATUSES = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  READY_FOR_PICKUP: "Ready for Pickup",
  OUT_FOR_DELIVERY: "Out for Delivery",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const

export default function OrderTrackingClient({ trackingData }: { trackingData: TrackingData }) {
  // Helper function to format the date nicely.
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const [selectedStatus, setSelectedStatus] = useState(trackingData.currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showStatusUpdate, setShowStatusUpdate] = useState(false)

  const updateOrderStatus = async () => {
    if (selectedStatus === trackingData.currentStatus) return

    setIsUpdating(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://freshora-2-backend-seven.vercel.app"}/api/orders/${trackingData.orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: selectedStatus }),
        },
      )

      if (response.ok) {
        // Refresh the page to show updated status
        window.location.reload()
      } else {
        console.error("Failed to update status")
        alert("Failed to update order status")
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Error updating order status")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              Order Tracking
              <Button variant="outline" size="sm" onClick={() => setShowStatusUpdate(!showStatusUpdate)}>
                <Settings className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 space-y-2 sm:space-y-0">
              <div>
                <span className="font-semibold">Order ID:</span> #{trackingData.orderId}
              </div>
              <div>
                <span className="font-semibold">Order Date:</span> {formatDate(trackingData.orderDetails.createdAt)}
              </div>
              <div>
                <span className="font-semibold">Total Amount:</span> ${trackingData.orderDetails.totalAmount.toFixed(2)}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p>
                <span className="font-semibold">Customer:</span> {trackingData.customerInfo.name} (
                {trackingData.customerInfo.email})
              </p>
            </div>

            {showStatusUpdate && (
              <div className="mt-4 pt-4 border-t bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Update Order Status</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ORDER_STATUSES).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={updateOrderStatus}
                    disabled={isUpdating || selectedStatus === trackingData.currentStatus}
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Current Status:{" "}
                  <span className="font-semibold">
                    {ORDER_STATUSES[trackingData.currentStatus as keyof typeof ORDER_STATUSES]}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold">
                Current Status:{" "}
                <span className="text-blue-600">
                  {ORDER_STATUSES[trackingData.currentStatus as keyof typeof ORDER_STATUSES]}
                </span>
              </p>
            </div>

            <div className="relative pl-6">
              {/* The vertical line for the timeline */}
              <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {trackingData.trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                  <div className="relative z-10">
                    {step.completed ? (
                      <CheckCircle className="h-8 w-8 text-white bg-green-500 rounded-full p-1" />
                    ) : (
                      <Circle className="h-8 w-8 text-gray-400 bg-white rounded-full p-1 border-2" />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold ${step.completed ? "text-gray-800" : "text-gray-500"}`}>
                      {step.label}
                    </p>
                    {step.timestamp && step.completed && (
                      <p className="text-xs text-gray-500">{formatDate(step.timestamp)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
