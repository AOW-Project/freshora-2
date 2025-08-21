// src/app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/orders/:id
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

    const transformedOrder = {
      id: order.id,
      items: order.items.map((item) => ({
        id: item.serviceItem.id,
        name: item.serviceItem.name,
        category: item.serviceItem.category,
        serviceType: item.service.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: order.totalAmount,
      status: order.status.toLowerCase(),
      customerInfo: {
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone || "",
        address: order.customerAddress || "",
      },
      pickupDate: order.pickupDate?.toISOString(),
      deliveryDate: order.deliveryDate?.toISOString(),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };

    return NextResponse.json({ success: true, data: transformedOrder });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// ✅ PUT /api/orders/:id
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, pickupDate, deliveryDate } = body;

    const updateData = {};
    if (status) updateData.status = status.toUpperCase();
    if (pickupDate) updateData.pickupDate = new Date(pickupDate);
    if (deliveryDate) updateData.deliveryDate = new Date(deliveryDate);

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updatedOrder.id,
        status: updatedOrder.status.toLowerCase(),
        pickupDate: updatedOrder.pickupDate?.toISOString(),
        deliveryDate: updatedOrder.deliveryDate?.toISOString(),
        updatedAt: updatedOrder.updatedAt.toISOString(),
      },
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
