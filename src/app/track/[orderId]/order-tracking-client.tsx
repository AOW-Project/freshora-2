// src/app/track/[orderId]/order-tracking-client.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

// --- Type Definitions ---
// These types must match the data being passed from the parent page.
interface TrackingStep {
  status: string;
  label: string;
  completed: boolean;
  timestamp?: string;
}

interface TrackingData {
  orderId: string;
  currentStatus: string;
  customerInfo: {
    name: string;
    email: string;
  };
  orderDetails: {
    totalAmount: number;
    createdAt: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  trackingSteps: TrackingStep[];
}
// --- End of Type Definitions ---

export default function OrderTrackingClient({ trackingData }: { trackingData: TrackingData }) {
  
  // Helper function to format the date nicely.
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Order Tracking</CardTitle>
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
                 <p><span className="font-semibold">Customer:</span> {trackingData.customerInfo.name} ({trackingData.customerInfo.email})</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <p className={`font-semibold ${step.completed ? 'text-gray-800' : 'text-gray-500'}`}>
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
  );
}
