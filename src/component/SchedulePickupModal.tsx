"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { X, Calendar, MapPin, User, Mail, Phone, MessageSquare } from "lucide-react"

interface SchedulePickupModalProps {
  open: boolean
  onClose: () => void
}

export default function SchedulePickupModal({ open, onClose }: SchedulePickupModalProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pickupDate: "",
    deliveryDate: "",
    comment: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [responseMessage, setResponseMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setResponseMessage("Your pickup has been scheduled successfully!")
        setTimeout(() => {
          router.push("/thankYou")
        }, 2000)
      } else {
        const result = await response.json()
        setStatus("error")
        setResponseMessage(result.message || "An error occurred. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setStatus("error")
      setResponseMessage("A network error occurred. Please check your connection.")
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-4 sm:p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Schedule Your Pickup</h2>
            <p className="text-emerald-100 text-sm sm:text-base">We&apos;ll collect your laundry at your convenience</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          {status === "loading" && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-emerald-500 mb-4"></div>
              <p className="text-gray-600 font-medium text-sm sm:text-base">Scheduling your pickup...</p>
            </div>
          )}

          {status === "success" || status === "error" ? (
            <div className="text-center py-6 sm:py-8">
              <div
                className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 ${
                  status === "success" ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                {status === "success" ? (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <p className={`text-base sm:text-lg font-semibold mb-2 ${status === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {responseMessage}
              </p>
              {status === "success" && <p className="text-gray-500 text-sm sm:text-base">Redirecting you...</p>}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  Personal Information
                </h3>

                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    name="address"
                    type="text"
                    placeholder="Pickup Address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Schedule Info */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  Schedule Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {["pickupDate", "deliveryDate"].map((field, idx) => (
                    <div className="relative" key={field}>
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        name={field}
                        type="date"
                        required
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                      <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
                        {idx === 0 ? "Pickup Date" : "Delivery Date"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  Additional Notes
                </h3>
                <textarea
                  name="comment"
                  placeholder="Any special instructions or comments..."
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-3 sm:pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Schedule Pickup
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
