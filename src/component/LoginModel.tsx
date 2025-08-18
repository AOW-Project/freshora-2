"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [step, setStep] = useState<"mobile" | "otp">("mobile")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = async () => {
    if (!mobile.trim()) {
      setError("Please enter a valid mobile number")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      })

      const data = await res.json()

      if (data.success) {
        setStep("otp")
      } else {
        setError(data.message || "Failed to send OTP")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem("token", data.token)
        onClose()
        // Reset form
        setStep("mobile")
        setMobile("")
        setOtp("")
      } else {
        setError(data.message || "Invalid OTP")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 mx-4">
        <CardHeader className="relative">
          <CardTitle className="text-center">{step === "mobile" ? "Login with Mobile" : "Enter OTP"}</CardTitle>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

          {step === "mobile" && (
            <>
              <Input
                type="tel"
                placeholder="Enter Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={loading}
              />
              <Button onClick={handleSendOtp} disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="text-sm text-gray-600 text-center">OTP sent to {mobile}</div>
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                maxLength={6}
              />
              <Button onClick={handleVerifyOtp} disabled={loading} className="w-full">
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button variant="outline" onClick={() => setStep("mobile")} disabled={loading} className="w-full">
                Change Mobile Number
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginModal
