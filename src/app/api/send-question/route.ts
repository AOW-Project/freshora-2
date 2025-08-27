import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, question } = await req.json()

    // Normalize field
    const userQuestion = question || message

    if (!name || !email || !phone || !userQuestion) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      )
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "freshorappc@gmail.com",
        pass: process.env.EMAIL_PASS || "ykbl euac vysy dpta", // 🔑 App Password
      },
    })

    // Mail content
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER || "freshorappc@gmail.com",
      subject: "New Question from Website",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Question: ${userQuestion}
      `,
    })

    return NextResponse.json({ success: true, message: "Question sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
