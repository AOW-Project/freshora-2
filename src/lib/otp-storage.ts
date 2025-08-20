declare global {
  var otpStorage: Map<string, { otp: string; expires: number }> | undefined
}

// Use global storage to persist between serverless requests
const getOTPStorage = () => {
  if (!global.otpStorage) {
    global.otpStorage = new Map<string, { otp: string; expires: number }>()
  }
  return global.otpStorage
}

export function storeOTP(email: string, otp: string) {
  const storage = getOTPStorage()
  storage.set(email, {
    otp,
    expires: Date.now() + 10 * 60 * 1000, // 10 minutes
  })
  console.log(`[v0] Stored OTP for ${email}: ${otp}`)
  console.log(`[v0] Storage size: ${storage.size}`)
}

export function verifyOTP(email: string, inputOtp: string): { success: boolean; message: string } {
  console.log(`[v0] Verifying OTP for ${email}, input: ${inputOtp}`)

  const storage = getOTPStorage()
  console.log(`[v0] Storage size: ${storage.size}`)

  const storedData = storage.get(email)
  console.log(`[v0] Stored data:`, storedData)

  if (!storedData) {
    return { success: false, message: "OTP not found or expired" }
  }

  if (Date.now() > storedData.expires) {
    storage.delete(email)
    return { success: false, message: "OTP has expired" }
  }

  if (storedData.otp !== inputOtp) {
    console.log(`[v0] OTP mismatch: stored=${storedData.otp}, input=${inputOtp}`)
    return { success: false, message: "Invalid OTP" }
  }

  // OTP is valid, remove it from storage
  storage.delete(email)
  console.log(`[v0] OTP verified successfully for ${email}`)
  return { success: true, message: "Email verified successfully" }
}
