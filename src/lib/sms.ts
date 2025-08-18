// SMS service using MSG91 (better for Indian phone numbers)
export const sendOtpSms = async (mobile: string, otp: string): Promise<boolean> => {
  try {
    const authKey = process.env.MSG91_AUTH_KEY
    const templateId = process.env.MSG91_TEMPLATE_ID

    // If MSG91 is not configured, fall back to console logging for development
    if (!authKey) {
      console.log(`[SMS FALLBACK] OTP ${otp} for ${mobile}`)
      console.log("⚠️  Configure MSG91 credentials to send real SMS messages")
      console.log("Required environment variables:")
      console.log("- MSG91_AUTH_KEY (get from https://msg91.com)")
      console.log("MSG91 is much easier for Indian phone numbers!")
      return true // Return true for development mode
    }

    // Clean mobile number (remove +91 if present, MSG91 handles it)
    const cleanMobile = mobile.replace(/^\+91/, "").replace(/\D/g, "")

    console.log(`[v0] MSG91 Request - Mobile: ${cleanMobile}, OTP: ${otp}`)
    console.log(`[v0] MSG91 Auth Key: ${authKey?.substring(0, 10)}...`)

    const params = new URLSearchParams({
      authkey: authKey,
      mobile: `91${cleanMobile}`,
      otp: otp,
      sender: "FRESHORA", // Add sender ID for better delivery
      DLT_TE_ID: templateId || "", // Template ID if available
    })

    const apiUrl = `https://control.msg91.com/api/v5/otp?${params.toString()}`
    console.log(`[v0] MSG91 API URL: ${apiUrl}`)

    // Send OTP via MSG91
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    console.log(`[v0] MSG91 Response Status: ${response.status}`)
    console.log(`[v0] MSG91 Response Body:`, result)

    if (response.ok && (result.type === "success" || result.message === "OTP sent successfully")) {
      console.log(`[SMS SUCCESS] OTP sent to ${mobile} via MSG91`)
      console.log(`[v0] MSG91 Request ID: ${result.request_id}`)

      if (result.request_id) {
        console.log("✅ MSG91 accepted the request. If SMS not received, check:")
        console.log("1. MSG91 account verification status")
        console.log("2. Account balance/credits")
        console.log("3. Sender ID approval status")
        console.log("4. Mobile number not in DND registry")
      }

      return true
    } else {
      console.error("[MSG91 ERROR] Failed to send OTP:", result)
      if (result.message?.includes("Invalid")) {
        console.error("[MSG91 ERROR] Check your auth key or mobile number format")
      }
      if (result.message?.includes("balance") || result.message?.includes("credit")) {
        console.error("[MSG91 ERROR] Insufficient balance in your MSG91 account")
      }

      console.log("[v0] Trying TextLocal as fallback...")
      return await sendOtpSmsTextLocal(mobile, otp)
    }
  } catch (error) {
    console.error("[SMS ERROR] Failed to send SMS:", error)

    console.log("[v0] Trying TextLocal as fallback...")
    return await sendOtpSmsTextLocal(mobile, otp)
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
