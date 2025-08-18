// SMS service using Twilio
import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_PHONE_NUMBER

// Initialize Twilio client only if credentials are available
const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export const sendOtpSms = async (mobile: string, otp: string): Promise<boolean> => {
  try {
    // If Twilio is not configured, fall back to console logging for development
    if (!client || !fromNumber) {
      console.log(`[SMS FALLBACK] OTP ${otp} for ${mobile}`)
      console.log("⚠️  Configure Twilio credentials to send real SMS messages")
      console.log("Required environment variables:")
      console.log("- TWILIO_ACCOUNT_SID")
      console.log("- TWILIO_AUTH_TOKEN")
      console.log("- TWILIO_PHONE_NUMBER")
      return true // Return true for development mode
    }

    // Send actual SMS via Twilio
    const message = await client.messages.create({
      body: `Your Freshora verification code is: ${otp}. This code expires in 5 minutes.`,
      from: fromNumber,
      to: mobile.startsWith("+") ? mobile : `+91${mobile}`, // Add country code if not present
    })

    console.log(`[SMS SUCCESS] Message sent with SID: ${message.sid}`)
    return true
  } catch (error) {
    console.error("[SMS ERROR] Failed to send SMS:", error)

    // In production, you might want to throw the error
    // In development, we'll log it and continue
    if (process.env.NODE_ENV === "production") {
      throw new Error("Failed to send SMS")
    }

    return false
  }
}

// Alternative: TextLocal (also good for India)
export const sendOtpSmsTextLocal = async (mobile: string, otp: string): Promise<boolean> => {
  try {
    const apiKey = process.env.TEXTLOCAL_API_KEY

    if (!apiKey) {
      console.log(`[SMS FALLBACK] OTP ${otp} for ${mobile}`)
      console.log("⚠️  Configure TextLocal API key to send real SMS")
      return true
    }

    const cleanMobile = mobile.replace(/^\+91/, "").replace(/\D/g, "")

    const params = new URLSearchParams({
      apikey: apiKey,
      numbers: cleanMobile,
      message: `Your Freshora verification code is: ${otp}. This code expires in 5 minutes.`,
      sender: "FRESHORA",
    })

    const response = await fetch("https://api.textlocal.in/send/", {
      method: "POST",
      body: params,
    })

    const result = await response.json()

    if (response.ok && result.status === "success") {
      console.log(`[SMS SUCCESS] OTP sent to ${mobile} via TextLocal`)
      return true
    } else {
      console.error("[TEXTLOCAL ERROR]:", result)
      return false
    }
  } catch (error) {
    console.error("[SMS ERROR] Failed to send SMS:", error)
    return false
  }
}
