import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from "@/app/lib/email"

// ---------------- GET /api/orders ----------------
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const customerEmail = searchParams.get("customerEmail")
    const limit = searchParams.get("limit")

    const whereClause = {}
    if (status) whereClause.status = status.toUpperCase()
    if (customerEmail) whereClause.customerEmail = customerEmail

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            service: true,
            serviceItem: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    })

    const transformedOrders = orders.map((order) => ({
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
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }))

    return NextResponse.json({ success: true, data: transformedOrders, total: transformedOrders.length })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

// ---------------- POST /api/orders ----------------
export async function POST(req) {
  try {
    const body = await req.json()
    const { items, customerInfo, pickupDate, deliveryDate, specialInstructions } = body

    if (!items || !items.length) {
      return NextResponse.json({ success: false, error: "Items are required" }, { status: 400 })
    }
    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
      return NextResponse.json({ success: false, error: "Customer info is incomplete" }, { status: 400 })
    }

    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0)

    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          customerAddress: customerInfo.address,
          totalAmount,
          status: "PENDING",
          pickupDate: pickupDate ? new Date(pickupDate) : null,
          deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
          specialInstructions: specialInstructions || null,
        },
      })

      for (const item of items) {
        const serviceItem = await tx.serviceItem.findUnique({
          where: { id: item.id },
          include: { service: true },
        })

        if (serviceItem) {
          await tx.orderItem.create({
            data: {
              orderId: order.id,
              serviceId: serviceItem.serviceId,
              serviceItemId: serviceItem.id,
              quantity: item.quantity,
              price: item.price,
              totalPrice: item.price * item.quantity,
            },
          })
        }
      }

      return order
    })

    // send confirmation email
    const emailResult = await sendOrderConfirmationEmail({
      id: newOrder.id,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      totalAmount: newOrder.totalAmount,
      status: newOrder.status,
      pickupDate: newOrder.pickupDate?.toISOString().split("T")[0],
      deliveryDate: newOrder.deliveryDate?.toISOString().split("T")[0],
    })

    return NextResponse.json({
      success: true,
      data: {
        id: newOrder.id,
        totalAmount: newOrder.totalAmount,
        status: newOrder.status.toLowerCase(),
        customerInfo,
        pickupDate: newOrder.pickupDate?.toISOString(),
        deliveryDate: newOrder.deliveryDate?.toISOString(),
        createdAt: newOrder.createdAt.toISOString(),
        updatedAt: newOrder.updatedAt.toISOString(),
      },
      message: "Order created successfully",
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
