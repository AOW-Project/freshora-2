import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, phone, address, service, date, time, comment } =
      await req.json()

    // ✅ Create reusable transporter object (only once)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mondalrohan201@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD || "lczr wrpu dtld mmht", // should be in .env
      },
    })

    // ✅ Customer email HTML
    const generateOrderConfirmationEmail = (orderData: {
      customerEmail: string
      id: string
      customerName: string
      totalAmount?: string
      status?: string
      pickupDate?: string
      deliveryDate?: string
    }) => {
      return `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Freshora Laundry</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Order Confirmed!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your laundry order has been received</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">Hello ${orderData.customerName}!</h2>
                    <p style="color: #4b5563; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                      Thank you for choosing Freshora Laundry! Your order has been confirmed and assigned tracking ID: <strong style="color: #667eea;">#${orderData.id}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>`
    }

    // ✅ Send customer confirmation email
    const sendOrderConfirmationEmail = async (orderData: {
      customerEmail: string
      id: string
      customerName: string
    }) => {
      try {
        const mailOptions = {
          from: '"Freshora Laundry" <noreply@freshora.com>',
          to: orderData.customerEmail,
          subject: `Order Confirmation #${orderData.id} - Freshora Laundry`,
          html: generateOrderConfirmationEmail(orderData),
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("Order confirmation email sent:", nodemailer.getTestMessageUrl(info))
        return { success: true, messageId: info.messageId }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error sending order confirmation email:", error.message)
          return { success: false, error: error.message }
        }
        return { success: false, error: "Unknown error" }
      }
    }

    // ✅ Business email
    const businessEmailHTML = `
      <h2>New Pickup Request</h2>
      <p>New pickup request details:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>
    `

    // ✅ Send business notification email
    await transporter.sendMail({
      from: `"Freshora Laundry" <freshorappc@gmail.com>`,
      to: "freshorappc@gmail.com", // business inbox
      subject: `New Pickup Request from ${name}`,
      html: businessEmailHTML,
    })

    // Example: Send confirmation to customer as well
    await sendOrderConfirmationEmail({
      customerEmail: email,
      id: Math.floor(Math.random() * 1000000).toString(), // dummy order ID
      customerName: name,
    })

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully!",
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Email sending error:", error.message)
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      )
    } else {
      console.error("Unexpected error:", error)
      return NextResponse.json(
        { success: false, message: "An unexpected error occurred" },
        { status: 500 }
      )
    }
  }
}
