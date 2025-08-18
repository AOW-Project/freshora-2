"use server"
import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../lib/db"
import { sendOtpSms } from "../../../lib/sms"

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

interface SendOtpRequestBody {
  mobile: string
}

export async function POST(req: NextRequest) {
  try {
    const body: SendOtpRequestBody = await req.json()
    const { mobile } = body

    if (!mobile) {
      return NextResponse.json({ message: "Mobile number is required" }, { status: 400 })
    }

    const mobileRegex = /^[6-9]\d{9}$/
    if (!mobileRegex.test(mobile.replace(/^\+91/, ""))) {
      return NextResponse.json({ message: "Please enter a valid 10-digit mobile number" }, { status: 400 })
    }

    const connection = await pool.getConnection()
    await connection.query("SHOW TABLES LIKE 'otp_codes'")
    
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    await connection.query(
      "INSERT INTO otp_codes (mobile, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp=?, expires_at=?",
      [mobile, otp, expiresAt, otp, expiresAt],
    )

    connection.release()

    const smsSent = await sendOtpSms(mobile, otp)

    if (!smsSent && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, message: "Failed to send SMS. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" })
  } catch (err) {
    console.error("[v0] Error in send-OTP:", err)
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP",
        error:
          process.env.NODE_ENV === "development"
            ? { message: errorMessage }
            : undefined,
      },
      { status: 500 },
    )
  }
}
