"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, CheckCircle } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PickupFormProps {
  open: boolean
  onClose: () => void
}

export default function PickupForm({ open, onClose }: PickupFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", city: "", zipCode: "", pickupDate: "", deliveryDate: "", service: "", specialInstructions: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailVerificationState, setEmailVerificationState] = useState<"unverified" | "pending" | "verified">("unverified");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "email") {
      setEmailVerificationState("unverified");
      setOtp("");
      setOtpMessage("");
    }
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      setOtpMessage("Please enter your email address first");
      return;
    }
    setOtpLoading(true);
    setOtpMessage("");
    try {
      const res = await fetch("/api/send-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email }) });
      const data = await res.json();
      if (data.success) {
        setEmailVerificationState("pending");
        setOtpMessage("✅ OTP sent! Check the terminal/console for the code");
      } else {
        setOtpMessage("❌ Failed to send OTP: " + data.message);
      }
    } catch {
      setOtpMessage("❌ Something went wrong while sending OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setOtpMessage("Please enter the OTP");
      return;
    }
    setOtpLoading(true);
    setOtpMessage("");
    try {
      const res = await fetch("/api/verify-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email, otp }) });
      const data = await res.json();
      if (data.success) {
        setEmailVerificationState("verified");
        setOtpMessage("✅ Email verified successfully!");
      } else {
        setOtpMessage("❌ Invalid OTP. Please try again.");
      }
    } catch {
      setOtpMessage("❌ Something went wrong while verifying OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailVerificationState !== "verified") {
      setMessage("❌ Please verify your email address before submitting");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/send-mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, address: `${formData.address}, ${formData.city}, ${formData.zipCode}`, service: formData.service, date: formData.pickupDate, time: formData.deliveryDate, comment: formData.specialInstructions }) });
      const data = await res.json();
      if (data.success) {
        router.push("/thankYou");
      } else {
        setMessage("❌ Failed to schedule pickup: " + data.message);
      }
    } catch {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-custom bg-black/30 flex items-center justify-center z-[99999] p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-md rounded-lg shadow-xl border-0 bg-white overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-3"><CardTitle className="text-lg font-semibold text-gray-800">Schedule a Pickup</CardTitle><button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="h-4 w-4" /></button></CardHeader>
        <CardContent className="p-4 pt-0">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input placeholder="Your Name *" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required className="h-9" />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input type="email" placeholder="Your email address *" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className={`h-9 flex-1 ${emailVerificationState === "verified" ? "border-green-500" : ""}`} />
                  <Button type="button" variant="outline" size="sm" onClick={handleSendOTP} disabled={otpLoading || !formData.email || emailVerificationState === "verified"} className="h-9 px-3 text-xs bg-transparent">{emailVerificationState === "verified" ? (<CheckCircle className="h-3 w-3 text-green-600" />) : ("Verify")}</Button>
                </div>
                {emailVerificationState === "pending" && (
                  <div className="flex gap-2">
                    <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="flex-1 h-9 text-center" />
                    <Button type="button" size="sm" onClick={handleVerifyOTP} disabled={otpLoading || !otp} className="h-9 px-3 text-xs">Confirm</Button>
                  </div>
                )}
                {otpMessage && (<p className={`text-xs ${otpMessage.includes("✅") ? "text-green-600" : "text-red-600"}`}>{otpMessage}</p>)}
              </div>
              <Input type="tel" placeholder="Your phone number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="h-9" />
            </div>
            <Input placeholder="Address *" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} required className="h-9" />
            <Select onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Service" /></SelectTrigger>
              <SelectContent><SelectItem value="laundry">Laundry Service</SelectItem><SelectItem value="drycleaning">Dry Cleaning</SelectItem><SelectItem value="ironing">Ironing Service</SelectItem></SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" placeholder="Pick-up Date" value={formData.pickupDate} onChange={(e) => handleInputChange("pickupDate", e.target.value)} min={new Date().toISOString().split("T")[0]} className="h-9" />
              <Input type="date" placeholder="Delivery Date" value={formData.deliveryDate} onChange={(e) => handleInputChange("deliveryDate", e.target.value)} className="h-9" />
            </div>
            <Textarea placeholder="Your comment" value={formData.specialInstructions} onChange={(e) => handleInputChange("specialInstructions", e.target.value)} className="min-h-[60px] resize-none" />
            <Button type="submit" className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium" disabled={loading || emailVerificationState !== "verified"}>{loading ? "Processing..." : "Order Now"}</Button>
            {message && (<p className={`text-center text-xs ${message.includes("❌") ? "text-red-600" : "text-green-600"}`}>{message}</p>)}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}