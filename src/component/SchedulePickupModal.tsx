"use client"

/**
 * Schedule Pickup Modal (PickupForm)
 * - Uses your OTP verify flow
 * - Reads cart from localStorage (kept same to minimize changes)
 * - On success: clears cart via useCart().clearCart() + keeps your thankYou redirect
 * - Strong comments so future you can tweak fast
 */

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, CheckCircle } from "lucide-react"

// ✅ Import your cart context (same path you used elsewhere)
import { useCart } from "../app/context/cart-context"

// —————————————————————————————————————————————————————————————————————
// Types
// —————————————————————————————————————————————————————————————————————

interface PickupFormProps {
  open: boolean
  onClose: () => void
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  serviceSlug?: string
}

type EmailVerificationState = "unverified" | "pending" | "verified"

interface FormDataShape {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  pickupDate: string
  pickupTime: string
  deliveryDate: string
  deliveryTime: string
  service: "laundry-services" | "dry-cleaning-services" | "express-laundry-services"
  specialInstructions: string
}

// —————————————————————————————————————————————————————————————————————
// Helpers
// —————————————————————————————————————————————————————————————————————

/** Clamp a date string (yyyy-mm-dd) to today or later */
const clampToToday = (value: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const incoming = new Date(value)
  incoming.setHours(0, 0, 0, 0)
  if (Number.isNaN(incoming.getTime())) return value
  if (incoming < today) return today.toISOString().split("T")[0]
  return value
}

/** Very light email check; your OTP API is the real validation */
const looksLikeEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

/** Build order payload with minimal mutation to your current structure */
const buildOrderPayload = ({
  formData,
  cartItems,
  totalAmount,
}: {
  formData: FormDataShape
  cartItems: CartItem[]
  totalAmount: number
}) => {
  const validatedCartItems = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    category: item.category,
    serviceSlug: item.serviceSlug || formData.service,
  }))

  return {
    name: formData.name,
    customerInfo: {
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
    },
    pickupInfo: {
      date: formData.pickupDate,
      time: formData.pickupTime,
      address: formData.address,
      instructions: formData.specialInstructions,
    },
    deliveryInfo: {
      date: formData.deliveryDate,
      time: formData.deliveryTime,
      address: formData.address,
    },
    cartItems: validatedCartItems,
    totalAmount: totalAmount,
    paymentMethod: "cash_on_delivery",
  }
}

/** Tiny formatter to keep money output consistent */
const formatMoney = (n: number) => `$${n.toFixed(2)}`

// —————————————————————————————————————————————————————————————————————
// Component
// —————————————————————————————————————————————————————————————————————

export default function PickupForm({ open, onClose }: PickupFormProps) {
  const router = useRouter()

  // ✅ Access your CartContext so we can clear it after success
  const { clearCart } = useCart()

  const [formData, setFormData] = useState<FormDataShape>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    pickupDate: "",
    pickupTime: "10:00 AM",
    deliveryDate: "",
    deliveryTime: "2:00 PM",
    service: "laundry-services",
    specialInstructions: "",
  })

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalAmount, setTotalAmount] = useState(0)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [emailVerificationState, setEmailVerificationState] = useState<EmailVerificationState>("unverified")
  const [otp, setOtp] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpMessage, setOtpMessage] = useState("")

  // —————————————————————————————————————————————————————————————————————
  // Effects: load cart from localStorage when modal opens or service changes
  // —————————————————————————————————————————————————————————————————————

  useEffect(() => {
    if (!open) return

    try {
      const savedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null
      if (savedCart) {
        const items: CartItem[] = JSON.parse(savedCart)
        const itemsWithServiceSlug = items.map((item) => ({
          ...item,
          serviceSlug: item.serviceSlug || formData.service,
        }))
        setCartItems(itemsWithServiceSlug)
        const total = itemsWithServiceSlug.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setTotalAmount(total)
      } else {
        setCartItems([])
        setTotalAmount(0)
      }
    } catch (err) {
      console.error("[PickupForm] Failed to load cart from localStorage:", err)
      setCartItems([])
      setTotalAmount(0)
    }
  }, [open, formData.service])

  // —————————————————————————————————————————————————————————————————————
  // Handlers
  // —————————————————————————————————————————————————————————————————————

  const handleInputChange = useCallback((field: keyof FormDataShape, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value }

      // Clamp pickup/delivery dates to today (basic guard so user can’t select yesterday)
      if (field === "pickupDate") next.pickupDate = clampToToday(value)
      if (field === "deliveryDate") next.deliveryDate = value // let delivery be anything; your server can validate

      return next
    })

    // Reset email verification if email changes
    if (field === "email") {
      setEmailVerificationState("unverified")
      setOtp("")
      setOtpMessage("")
    }

    // Keep serviceSlug synced on items if service changes
    if (field === "service") {
      setCartItems((prev) => prev.map((item) => ({ ...item, serviceSlug: value })))
    }
  }, [])

  const handleSendOTP = useCallback(async () => {
    if (!formData.email) {
      setOtpMessage("Please enter your email address first")
      return
    }
    if (!looksLikeEmail(formData.email)) {
      setOtpMessage("Please enter a valid email address")
      return
    }

    setOtpLoading(true)
    setOtpMessage("")

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await res.json()
      if (data.success) {
        setEmailVerificationState("pending")
        setOtpMessage("✅ OTP sent! Check the terminal/console for the code")
      } else {
        setOtpMessage("❌ Failed to send OTP: " + (data.message || "Unknown error"))
      }
    } catch {
      setOtpMessage("❌ Something went wrong while sending OTP")
    } finally {
      setOtpLoading(false)
    }
  }, [formData.email])

  const handleVerifyOTP = useCallback(async () => {
    if (!otp) {
      setOtpMessage("Please enter the OTP")
      return
    }
    setOtpLoading(true)
    setOtpMessage("")

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      })
      const data = await res.json()
      if (data.success) {
        setEmailVerificationState("verified")
        setOtpMessage("✅ Email verified successfully!")
      } else {
        setOtpMessage("❌ Invalid OTP. Please try again.")
      }
    } catch {
      setOtpMessage("❌ Something went wrong while verifying OTP")
    } finally {
      setOtpLoading(false)
    }
  }, [formData.email, otp])

  const isSubmitDisabled = useMemo(() => {
    if (loading) return true
    if (emailVerificationState !== "verified") return true
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.zipCode) return true
    if (!formData.pickupDate || !formData.deliveryDate) return true
    if (cartItems.length === 0) return true
    return false
  }, [loading, emailVerificationState, formData, cartItems.length])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (emailVerificationState !== "verified") {
        setMessage("❌ Please verify your email address before submitting")
        return
      }

      if (cartItems.length === 0) {
        setMessage("❌ Your cart is empty. Please add items before placing an order.")
        return
      }

      setLoading(true)
      setMessage("")

      try {
        const orderPayload = buildOrderPayload({ formData, cartItems, totalAmount })

        console.log("[v0] Sending order payload:", orderPayload)

        const res = await fetch("https://freshora-backend.onrender.com/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        })

        const data = await res.json()
        console.log("[v0] Order response:", data)

        if (data.success) {
          // ✅ Clear via CartContext (removes React state + localStorage)
          await clearCart()

          // (Optional) extra safety: ensure local copy cleared too
          try {
            localStorage.removeItem("cart")
          } catch {}

          setMessage(`✅ Order placed successfully! Order Number: ${data.data.orderNumber}`)

          // Optional: close the modal immediately
          // onClose?.()

          // Redirect to thank you page after 2 seconds
          setTimeout(() => {
            router.push("/thankYou")
          }, 2000)
        } else {
          setMessage("❌ Failed to place order: " + (data.message || data.errors?.join(", ") || "Unknown error"))
        }
      } catch (error) {
        console.error("[v0] Order submission error:", error)
        setMessage("❌ Something went wrong while placing the order.")
      } finally {
        setLoading(false)
      }
    },
    [emailVerificationState, cartItems, formData, totalAmount, clearCart, router]
  )

  // —————————————————————————————————————————————————————————————————————
  // Early return if modal is closed
  // —————————————————————————————————————————————————————————————————————

  if (!open) return null

  // —————————————————————————————————————————————————————————————————————
  // JSX
  // —————————————————————————————————————————————————————————————————————

  return (
    <div className="fixed inset-0 backdrop-blur-custom bg-black/30 flex items-center justify-center z-[99999] p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-sm rounded-lg shadow-xl border-0 bg-white overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">Schedule Pickup</CardTitle>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </CardHeader>

        <CardContent className="p-3 pt-0">
          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Order Summary</h4>
              <div className="space-y-1">
                {cartItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between text-xs text-gray-600">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatMoney(item.price * item.quantity)}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <div className="text-xs text-gray-500">+{cartItems.length - 3} more items</div>
                )}
                <div className="border-t pt-1 mt-1 flex justify-between text-sm font-medium text-gray-800">
                  <span>Total</span>
                  <span>{formatMoney(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Name */}
            <Input
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="h-8 text-sm"
              autoComplete="name"
            />

            {/* Email + Verify */}
            <div className="space-y-1">
              <div className="flex gap-1">
                <Input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className={`h-8 text-sm flex-1 ${emailVerificationState === "verified" ? "border-green-500" : ""}`}
                  autoComplete="email"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSendOTP}
                  disabled={otpLoading || !formData.email || emailVerificationState === "verified"}
                  className="h-8 px-2 text-xs bg-transparent"
                >
                  {emailVerificationState === "verified" ? (
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>

              {/* OTP */}
              {emailVerificationState === "pending" && (
                <div className="flex gap-1">
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="flex-1 h-8 text-center text-sm"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleVerifyOTP}
                    disabled={otpLoading || !otp}
                    className="h-8 px-2 text-xs"
                  >
                    OK
                  </Button>
                </div>
              )}

              {otpMessage && (
                <p className={`text-xs ${otpMessage.includes("✅") ? "text-green-600" : "text-red-600"}`}>{otpMessage}</p>
              )}
            </div>

            {/* Phone + Service */}
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-8 text-sm"
                autoComplete="tel"
              />
              <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value as FormDataShape["service"])}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laundry-services">Laundry</SelectItem>
                  <SelectItem value="dry-cleaning-services">Dry Clean</SelectItem>
                  <SelectItem value="express-laundry-services">Express</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <Input
              placeholder="Address *"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              className="h-8 text-sm"
              autoComplete="street-address"
            />

            {/* City + Zip */}
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="City *"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
                className="h-8 text-sm"
                autoComplete="address-level2"
              />
              <Input
                placeholder="Zip Code *"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
                className="h-8 text-sm"
                autoComplete="postal-code"
              />
            </div>

            {/* Pickup + Delivery */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="h-8 text-sm"
                />
                <Select value={formData.pickupTime} onValueChange={(value) => handleInputChange("pickupTime", value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                  required
                  className="h-8 text-sm"
                />
                <Select value={formData.deliveryTime} onValueChange={(value) => handleInputChange("deliveryTime", value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Instructions */}
            <Textarea
              placeholder="Special instructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
              className="min-h-[50px] resize-none text-sm"
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-9 bg-green-600 hover:bg-green-700 text-white font-medium text-sm"
              disabled={isSubmitDisabled}
            >
              {loading ? "Processing..." : `Place Order (${formatMoney(totalAmount)})`}
            </Button>

            {message && (
              <p className={`text-center text-xs ${message.includes("❌") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
