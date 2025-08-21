// src/app/track/[orderId]/page.tsx

import { notFound } from "next/navigation";
import OrderTrackingClient from "@/app/track/[orderId]/order-tracking-client";

// --- Type Definitions ---
// These types match the data structure from your backend's tracking endpoint.
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

// This function fetches the tracking data from your backend.
async function fetchTrackingData(orderId: string): Promise<TrackingData | null> {
  try {
    // In production, this URL should come from an environment variable
    const response = await fetch(`https://freshora-2-backend-seven.vercel.app/api/orders/track/${orderId}`, {
      cache: 'no-store', // Always get the latest data
    });
    if (!response.ok) return null;
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Failed to fetch tracking data:", error);
    return null;
  }
}

interface OrderTrackingPageProps {
  params: { orderId: string };
}

export default async function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const { orderId } = params;
  const trackingData = await fetchTrackingData(orderId);

  if (!trackingData) {
    notFound();
  }

  return <OrderTrackingClient trackingData={trackingData} />;
}
