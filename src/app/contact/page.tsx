"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className="relative h-32 sm:h-40 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/a-basket-of-laundry-and-public-laundromat-2024-11-27-17-08-56-utc.JPG?height=400&width=1200&text=Laundry+Machines+Background')`,
           }}
        
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-white mb-2 text-sm">
            <Link href="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
            <span className="px-1 sm:px-2">/</span>
            <span className="hover:text-green-400">Contact</span>
          </nav>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Contact</h1>
        </div>
      </div>

      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-green-600 text-sm font-semibold mb-2 tracking-wide">[ Get in Touch With Us ]</h2>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 text-gray-800">Contact Information</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-gray-800">Post Address</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                6494 Signal Hill Road Manassas,
                <br />
                VA, 20110
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-gray-800">Contact Phone</h3>
              <p className="text-gray-600 text-sm">1 (800) 765-43-21</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-gray-800">E-mail Address</h3>
              <p className="text-gray-600 text-sm">info@yourlaundrysite.com</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-gray-800">Opening Hours</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mon-Fri 08:00 AM - 05:00 PM
                <br />
                Sat-Sun 10:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Get in Touch.</h3>
          <h4 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">We&apos;re to Help.</h4>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            We look forward to helping you create and maintain a clean, healthy environment that&apos;s enjoyable as it
            is functional.
          </p>

          {submitStatus.type && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                submitStatus.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                required
                className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message"
              rows={4}
              required
              className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical transition-all"
            ></textarea>
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 flex-shrink-0 w-4 h-4" />
              <label className="text-xs text-gray-600 leading-relaxed">I accept the privacy and terms.</label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg transition-colors font-semibold text-sm shadow-lg hover:shadow-xl ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="h-80 sm:h-96 lg:h-full min-h-[400px] order-1 lg:order-2">
          <iframe
            title="Business Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.009160312709!2d-77.455!3d38.752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65cf1dff9f1b1%3A0x5d812!2s6494%20Signal%20Hill%20Rd%2C%20Manassas%2C%20VA%2020110!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  )
}
