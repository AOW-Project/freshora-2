"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"   // ✅ import router

interface PickupFormProps {
  open: boolean
  onClose: () => void
}

export default function PickupForm({ open, onClose }: PickupFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    pickupDate: "",
    deliveryDate: "",
    service: "",
    specialInstructions: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()   // ✅ init router

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
          service: formData.service,
          date: formData.pickupDate,
          time: formData.deliveryDate,
          comment: formData.specialInstructions,
        }),
      })

      const data = await res.json()
      if (data.success) {
        // ✅ redirect to thank you page
        router.push("/thankYou")
      } else {
        setMessage("❌ Failed to schedule pickup: " + data.message)
      }
    } catch (err) {
      setMessage("❌ Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-lg sm:max-w-xl md:max-w-2xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg sm:text-2xl font-bold">Schedule a Pickup</CardTitle>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <Input
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Your e-mail address *"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
              <Input
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            {/* Address */}
            <Input
              placeholder="Street Address *"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              <Input
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>

            {/* Service */}
            <Select onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laundry">Laundry Service</SelectItem>
                <SelectItem value="drycleaning">Dry Cleaning</SelectItem>
                <SelectItem value="ironing">Ironing</SelectItem>
              </SelectContent>
            </Select>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
              <Input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
              />
            </div>

            {/* Comment */}
            <Textarea
              placeholder="Special Instructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
              className="min-h-[80px]"
            />

            {/* Submit */}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Submitting..." : "Order Now"}
            </Button>

            {message && <p className="text-center mt-2 text-sm">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}