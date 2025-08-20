import { type NextRequest, NextResponse } from "next/server"
import { storeOTP } from "@/lib/otp-storage"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    storeOTP(email, otp)

    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "mondalrohan201@gmail.com",
          pass: process.env.EMAIL_PASS || "lczr wrpu dtld mmht",
        },
      })

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "Email Verification - OTP Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Email Verification</h2>
            <p style="color: #666; font-size: 16px;">Hello,</p>
            <p style="color: #666; font-size: 16px;">Your OTP code for email verification is:</p>
            <div style="background-color: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 4px;">${otp}</h1>
            </div>
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      }

      // Send email
      await transporter.sendMail(mailOptions)

      console.log(`📧 OTP sent to ${email}: ${otp}`)

      return NextResponse.json({
        success: true,
        message: "OTP sent to your email address successfully",
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Fallback to console log if email fails
      console.log(`📧 OTP for ${email}: ${otp} (Email failed, check terminal)`)

      return NextResponse.json({
        success: true,
        message: "OTP generated (check terminal - email service not configured)",
        // Remove this in production - only for testing
        otp: process.env.NODE_ENV === "development" ? otp : undefined,
      })
    }
  } catch (error) {
    console.error("Error sending OTP:", error)
    return NextResponse.json({ success: false, message: "Failed to send OTP" })
  }
}
