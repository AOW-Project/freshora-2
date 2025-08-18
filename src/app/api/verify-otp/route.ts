import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import pool from "../../../lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { mobile, otp } = body

    if (!mobile || !otp) {
      return NextResponse.json({ message: "Mobile and OTP are required" }, { status: 400 })
    }

    const [rows] = (await pool.query("SELECT * FROM otp_codes WHERE mobile = ? AND otp = ? AND expires_at > NOW()", [
      mobile,
      otp,
    ])) as any[]

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP" }, { status: 400 })
    }

    await pool.query("DELETE FROM otp_codes WHERE mobile = ?", [mobile])

    const token = jwt.sign(
      { mobile, userId: mobile }, // You can add more user data here
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      token,
    })
  } catch (err) {
    console.error("OTP verification error:", err)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify OTP",
      },
      { status: 500 },
    )
  }
}
