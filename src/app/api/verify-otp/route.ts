import { type NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: "Email and OTP are required" })
    }

    const result = verifyOTP(email, otp)

    return NextResponse.json({
      success: result.success,
      message: result.message,
    })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ success: false, message: "Failed to verify OTP" })
  }
}
