// src/app/track/[orderId]/page.tsx
import { notFound } from "next/navigation"
import OrderTrackingClient from "./order-tracking-client"

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

// Force dynamic rendering because we call external API with no-store
export const dynamic = "force-dynamic"

// Fetch function
async function fetchTrackingData(orderId: string): Promise<TrackingData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://freshora-2-backend-seven.vercel.app"}/api/orders/${orderId}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;
    const result = await response.json();

    if (!result.success || !result.data) return null;
    const order = result.data;

    const trackingSteps = generateTrackingSteps(order.status, order.createdAt, order.pickupDate, order.deliveryDate);

    return {
      orderId: order.orderId,
      currentStatus: order.status,
      customerInfo: {
        name: order.customerName,
        email: order.customerEmail,
      },
      orderDetails: {
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
      },
      items: order.items.map((item: any) => ({
        name: item.serviceItem?.name || item.service?.name || "Service Item",
        quantity: item.quantity,
        price: item.price,
      })),
      trackingSteps,
    };
  } catch (error) {
    console.error("Failed to fetch tracking data:", error);
    return null;
  }
}

function generateTrackingSteps(
  currentStatus: string,
  createdAt: string,
  pickupDate?: string,
  deliveryDate?: string,
): TrackingStep[] {
  const statusOrder = ["PENDING", "CONFIRMED", "PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED"]
  const statusLabels = {
    PENDING: "Order Placed",
    CONFIRMED: "Order Confirmed",
    PROCESSING: "Processing",
    READY_FOR_PICKUP: "Ready for Pickup",
    OUT_FOR_DELIVERY: "Out for Delivery",
    COMPLETED: "Completed",
  }

  const currentIndex = statusOrder.indexOf(currentStatus)

  return statusOrder.map((status, index) => ({
    status,
    label: statusLabels[status as keyof typeof statusLabels],
    completed: index <= currentIndex,
    timestamp: index === 0 ? createdAt : index <= currentIndex ? createdAt : undefined,
  }))
}

export default async function OrderTrackingPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  if (!orderId) notFound();

  const trackingData = await fetchTrackingData(orderId);
  if (!trackingData) notFound();

  return <OrderTrackingClient trackingData={trackingData} />;
}

