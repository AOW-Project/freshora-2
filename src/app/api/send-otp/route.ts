import { type NextRequest, NextResponse } from "next/server"
import pool from "../../../lib/db"
import { sendOtpSms } from "../../../lib/sms"

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { mobile } = body

    if (!mobile) {
      return NextResponse.json({ message: "Mobile number is required" }, { status: 400 })
    }

    const mobileRegex = /^[6-9]\d{9}$/ // Indian mobile number format
    if (!mobileRegex.test(mobile.replace(/^\+91/, ""))) {
      return NextResponse.json({ message: "Please enter a valid 10-digit mobile number" }, { status: 400 })
    }

    console.log("[v0] Testing database connection...")
    console.log("[v0] DB Config:", {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || "3306",
      user: process.env.DB_USER || "root",
      database: process.env.DB_NAME,
      hasPassword: !!process.env.DB_PASS,
    })

    const connection = await pool.getConnection()
    console.log("[v0] Database connection acquired successfully")

    await connection.query("SHOW TABLES LIKE 'otp_codes'")
    console.log("[v0] otp_codes table exists")

    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    await connection.query(
      "INSERT INTO otp_codes (mobile, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp=?, expires_at=?",
      [mobile, otp, expiresAt, otp, expiresAt],
    )

    connection.release()
    console.log("[v0] OTP stored in database successfully")

    const smsSent = await sendOtpSms(mobile, otp)

    if (!smsSent && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send SMS. Please try again.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" })
  } catch (err) {
    console.error("[v0] Database connection error:", err)
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    const errorCode = (err as any)?.code || "UNKNOWN"

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP. Please check database connection.",
        error:
          process.env.NODE_ENV === "development"
            ? {
                message: errorMessage,
                code: errorCode,
                details: "Make sure MySQL server is running and environment variables are set correctly",
              }
            : undefined,
      },
      { status: 500 },
    )
  }
}
