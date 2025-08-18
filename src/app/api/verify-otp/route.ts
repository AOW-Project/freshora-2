"use server"
import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import pool from "../../../lib/db"
import { RowDataPacket } from "mysql2/promise"

interface VerifyOtpRequestBody {
  mobile: string
  otp: string
}

interface OtpRow extends RowDataPacket {
  id: number
  mobile: string
  otp: string
  expires_at: Date
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyOtpRequestBody = await req.json()
    const { mobile, otp } = body

    if (!mobile || !otp) {
      return NextResponse.json({ message: "Mobile and OTP are required" }, { status: 400 })
    }

    const [rows] = await pool.query<OtpRow[]>(
      "SELECT * FROM otp_codes WHERE mobile = ? AND otp = ? AND expires_at > NOW()",
      [mobile, otp],
    )

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP" }, { status: 400 })
    }

    // Delete used OTP
    await pool.query("DELETE FROM otp_codes WHERE mobile = ?", [mobile])

    // Generate JWT token
    const token = jwt.sign(
      { mobile, userId: mobile },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      token,
    })
  } catch (err) {
    console.error("[v0] OTP verification error:", err)
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify OTP",
        error: process.env.NODE_ENV === "development" ? { message: errorMessage } : undefined,
      },
      { status: 500 },
    )
  }
}
