// src/app/api/orders/track/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/orders/track/:id
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            service: true,
            serviceItem: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // tracking progress steps
    const trackingSteps = [
      {
        status: "pending",
        label: "Order Placed",
        completed: true,
        timestamp: order.createdAt,
      },
      {
        status: "confirmed",
        label: "Order Confirmed",
        completed: ["CONFIRMED", "PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED"].includes(order.status),
      },
      {
        status: "processing",
        label: "In Processing",
        completed: ["PROCESSING", "READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED"].includes(order.status),
      },
      {
        status: "ready_for_pickup",
        label: "Ready for Pickup",
        completed: ["READY_FOR_PICKUP", "OUT_FOR_DELIVERY", "COMPLETED"].includes(order.status),
      },
      {
        status: "out_for_delivery",
        label: "Out for Delivery",
        completed: ["OUT_FOR_DELIVERY", "COMPLETED"].includes(order.status),
      },
      {
        status: "completed",
        label: "Completed",
        completed: order.status === "COMPLETED",
      },
    ];

    const trackingData = {
      orderId: order.id,
      currentStatus: order.status.toLowerCase(),
      customerInfo: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        address: order.customerAddress,
      },
      orderDetails: {
        totalAmount: order.totalAmount,
        pickupDate: order.pickupDate?.toISOString(),
        deliveryDate: order.deliveryDate?.toISOString(),
        specialInstructions: order.specialInstructions,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
      },
      items: order.items.map((item) => ({
        name: item.serviceItem.name,
        category: item.serviceItem.category,
        serviceType: item.service.title,
        quantity: item.quantity,
        price: item.price,
      })),
      trackingSteps,
    };

    return NextResponse.json({ success: true, data: trackingData });
  } catch (error) {
    console.error("Error tracking order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track order" },
      { status: 500 }
    );
  }
}
