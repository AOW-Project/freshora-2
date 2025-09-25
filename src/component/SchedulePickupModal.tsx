"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, CheckCircle } from "lucide-react";

import { useCart } from "../app/context/cart-context";

/** ---------- reuse your helpers ---------- */
/** Clamp a date string (yyyy-mm-dd) to today or later */
const clampToToday = (value: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const incoming = new Date(value);
  incoming.setHours(0, 0, 0, 0);
  if (Number.isNaN(incoming.getTime())) return value;
  if (incoming < today) return today.toISOString().split("T")[0];
  return value;
};

const looksLikeEmail = (email: string): boolean => {
  // Basic email structure check
  if (!/^\S+@\S+\.\S+$/.test(email)) return false;

  const [local, domain] = email.split("@");

  // Only apply Gmail-specific checks if domain is gmail.com
  if (domain.toLowerCase() === "gmail.com") {
    // Rule: 6–30 chars
    if (local.length < 6 || local.length > 30) return false;

    // Rule: cannot be only numbers
    if (/^\d+$/.test(local)) return false;

    // Allowed: letters, numbers, periods
    if (!/^[a-zA-Z0-9.]+$/.test(local)) return false;
  }

  return true;
};

const formatMoney = (n: number) => `AED${n.toFixed(2)}`;

const buildOrderPayload = ({
  formData,
  cartItems,
  totalAmount,
}: {
  formData: any;
  cartItems: any[];
  totalAmount: number;
}) => {
  const formatDateForAPI = (dateStr: string) => {
    if (!dateStr) return new Date().toISOString();
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? new Date().toISOString()
      : date.toISOString();
  };

  const validatedCartItems = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 1,
    category: item.category || "General",
    serviceSlug: item.serviceSlug || formData.service,
  }));

  return {
    name: formData.name.trim(),
    customerInfo: {
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.trim() || "",
      address: formData.address.trim(),
      city: formData.city.trim(),
      zipCode: formData.zipCode.trim() || "",
    },
    pickupInfo: {
      date: formatDateForAPI(formData.pickupDate),
      time: formData.pickupTime,
      address: formData.address.trim(),
      instructions: formData.specialInstructions.trim() || "",
    },
    deliveryInfo: {
      date: formatDateForAPI(formData.deliveryDate),
      time: formData.deliveryTime,
      address: formData.address.trim(),
    },
    cartItems: validatedCartItems,
    totalAmount: Number(totalAmount) || 0,
    paymentMethod: "cash_on_delivery",
  };
};
/** ---------------------------------------- */

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  serviceSlug?: string;
};

export interface PickupFormProps {
  open: boolean;
  onClose: () => void;
}

/** ---------- Zod schema ---------- */
const todayStart = (() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
})();

const pickupFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z
      .string()
      .regex(/^\d{10,}$/, "Please enter a valid number with at least 10 digits")
      .optional(),
    address: z
      .string()
      .min(10, "Address is required")
      .refine((v) => v.trim().split(/\s+/).length >= 5, {
        message: "Please provide a detailed address with at least 5 words",
      }),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().optional(),
    pickupDate: z.string().refine(
      (val) => {
        const d = new Date(val);
        d.setHours(0, 0, 0, 0);
        return !isNaN(d.getTime()) && d.getTime() >= todayStart;
      },
      { message: "Pickup date cannot be in the past" }
    ),
    pickupTime: z.string().min(1, "Pickup time required"),
    deliveryDate: z.string().refine(
      (val) => {
        const d = new Date(val);
        return !isNaN(d.getTime());
      },
      { message: "Delivery date required" }
    ),
    deliveryTime: z.string().min(1, "Delivery time required"),
    service: z.enum([
      "laundry-services",
      "dry-cleaning-services",
      "express-laundry-services",
    ]),
    specialInstructions: z.string().optional().or(z.literal("")).nullable(),
  })
  .superRefine((data, ctx) => {
    // Ensure delivery >= pickup
    try {
      const p = new Date(data.pickupDate);
      p.setHours(0, 0, 0, 0);
      const d = new Date(data.deliveryDate);
      d.setHours(0, 0, 0, 0);
      if (
        !isNaN(p.getTime()) &&
        !isNaN(d.getTime()) &&
        d.getTime() < p.getTime()
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Delivery date cannot be earlier than pickup date",
          path: ["deliveryDate"],
        });
      }
    } catch {}
  });

type PickupFormValues = z.infer<typeof pickupFormSchema>;

/** ---------- Component ---------- */
export default function PickupForm({ open, onClose }: PickupFormProps) {
  const router = useRouter();
  const { clearCart } = useCart();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [emailVerificationState, setEmailVerificationState] = useState<
    "unverified" | "pending" | "verified"
  >("unverified");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  // react-hook-form
  const {
    control,
    handleSubmit,
    setError,
    reset,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PickupFormValues>({
    resolver: zodResolver(pickupFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      pickupDate: new Date().toISOString().split("T")[0],
      pickupTime: "10:00 AM",
      deliveryDate: new Date().toISOString().split("T")[0],
      deliveryTime: "2:00 PM",
      service: "laundry-services",
      specialInstructions: "",
    },
  });

  const watchedService = watch("service");
  const watchedEmail = watch("email");

  // Load cart from localStorage when modal opens (same logic you had)
  useEffect(() => {
    if (!open) return;

    try {
      const savedCart =
        typeof window !== "undefined" ? localStorage.getItem("cart") : null;
      if (savedCart) {
        const items: CartItem[] = JSON.parse(savedCart);
        const itemsWithServiceSlug = items.map((item) => ({
          ...item,
          serviceSlug: item.serviceSlug || watchedService,
        }));
        setCartItems(itemsWithServiceSlug);
        const total = itemsWithServiceSlug.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(total);
      } else {
        setCartItems([]);
        setTotalAmount(0);
      }
    } catch (err) {
      console.error("[PickupForm] Failed to load cart from localStorage:", err);
      setCartItems([]);
      setTotalAmount(0);
    }
  }, [open, watchedService]);

  // Keep serviceSlug in cart items in sync when user changes service select
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;
    setCartItems((prev) =>
      prev.map((it) => ({ ...it, serviceSlug: watchedService }))
    );
  }, [watchedService]);

  // Reset verification when email changes
  useEffect(() => {
    // reset OTP state when email edited
    setEmailVerificationState("unverified");
    setOtp("");
    setOtpMessage("");
  }, [watchedEmail]);

  // Send OTP (validates email first using react-hook-form trigger)
  const handleSendOTP = async () => {
    // validate email field first
    const valid = await trigger("email");
    if (!valid) {
      setOtpMessage("Please fix your email before requesting OTP.");
      return;
    }
    const emailValue = watchedEmail;
    if (!emailValue || !looksLikeEmail(emailValue)) {
      setOtpMessage("Enter a valid email before requesting OTP.");
      return;
    }

    setOtpLoading(true);
    setOtpMessage("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.success) {
        setEmailVerificationState("pending");
        setOtpMessage(
          "OTP sent !! If not recieved check your email address and try again"
        );
      } else {
        setOtpMessage(
          "Failed to send OTP: " + (data.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("[OTP Send Error]:", error);
      setOtpMessage("Something went wrong while sending OTP");
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
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: watchedEmail, otp }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.success) {
        setEmailVerificationState("verified");
        setOtpMessage("Email verified successfully!");
      } else {
        setOtpMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("[OTP Verify Error]:", error);
      setOtpMessage("Something went wrong while verifying OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // Submit handler from react-hook-form
  const onSubmit = async (values: PickupFormValues) => {
    // additional checks: email verification & cart not empty
    if (emailVerificationState !== "verified") {
      setError("email", {
        type: "manual",
        message: "Please verify your email before submitting",
      });
      return;
    }

    if (cartItems.length === 0) {
      setMessage(
        "Your cart is empty. Please add items before placing an order."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const orderPayload = buildOrderPayload({
        formData: values,
        cartItems,
        totalAmount,
      });

      // you had a 30s AbortController; keep that
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(
        "https://freshora-backend-u9xy.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(orderPayload),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await res.text();
        throw new Error(
          "Server returned invalid response format: " + textResponse
        );
      }

      const data = await res.json();

      if (data.success) {
        setMessage(
          `Order placed successfully! Order Number: ${data.data.orderNumber}`
        );

        // small delay so user sees message
        setTimeout(() => {
          clearCart();
          try {
            localStorage.removeItem("cart");
          } catch {}
          router.push("/thankYou");
        }, 800);
      } else {
        const errorMessage =
          data.message ||
          (data.errors && Array.isArray(data.errors)
            ? data.errors.join(", ")
            : "") ||
          "Unknown error occurred";
        setMessage("Failed to place order: " + errorMessage);
      }
    } catch (error: unknown) {
      console.error("[DEBUG] Order submission error:", error);
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setMessage(
            "Request timed out. Please check your connection and try again."
          );
        } else if (error.message.includes("Failed to fetch")) {
          setMessage(
            "Cannot connect to server. Please check your internet connection and try again."
          );
        } else if (error.message.includes("CORS")) {
          setMessage("Server configuration error. Please contact support.");
        } else {
          setMessage("Error: " + error.message);
        }
      } else {
        setMessage("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // derived disabled state
  const isSubmitDisabled = useMemo(
    () =>
      isSubmitting ||
      loading ||
      emailVerificationState !== "verified" ||
      cartItems.length === 0 ||
      !isValid,
    [isSubmitting, loading, emailVerificationState, cartItems.length, isValid]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-custom bg-black/30 flex items-center justify-center z-[99999] p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-sm rounded-lg shadow-xl border-0 bg-white overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">
            Schedule Pickup
          </CardTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>

        <CardContent className="p-3 pt-0">
          {cartItems.length > 0 && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-1">
                Order Summary
              </h4>
              <div className="space-y-1">
                {cartItems.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatMoney(item.price * item.quantity)}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{cartItems.length - 3} more items
                  </div>
                )}
                <div className="border-t pt-1 mt-1 flex justify-between text-sm font-medium text-gray-800">
                  <span>Total</span>
                  <span>{formatMoney(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Your Name *"
                  className="h-8 text-sm"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}

            {/* Email + Verify */}
            <div className="space-y-1">
              <div className="flex gap-1">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email *"
                      className={`h-8 text-sm flex-1 ${
                        emailVerificationState === "verified"
                          ? "border-green-500"
                          : ""
                      }`}
                      autoComplete="email"
                    />
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSendOTP}
                  disabled={
                    otpLoading ||
                    !watchedEmail ||
                    emailVerificationState === "verified"
                  }
                  className="h-8 px-2 text-xs bg-transparent"
                >
                  {emailVerificationState === "verified" ? (
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}

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
                <p
                  className={`text-xs ${
                    otpMessage.includes("successfully") ||
                    otpMessage.includes("sent")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {otpMessage}
                </p>
              )}
            </div>

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  placeholder="Phone"
                  className="h-8 text-sm"
                  value={watch("phone") ?? ""}
                  autoComplete="tel"
                />
              )}
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone.message}</p>
            )}

            {/* Address */}
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Full Address * (at least 5 words)"
                  className="h-8 text-sm"
                  autoComplete="street-address"
                />
              )}
            />
            {errors.address && (
              <p className="text-xs text-red-600">{errors.address.message}</p>
            )}

            {/* City + Zip */}
            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="City *"
                    className="h-8 text-sm"
                    autoComplete="address-level2"
                  />
                )}
              />
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Zip Code"
                    className="h-8 text-sm"
                    autoComplete="postal-code"
                  />
                )}
              />
            </div>
            {errors.city && (
              <p className="text-xs text-red-600">{errors.city.message}</p>
            )}

            {/* Pickup + Delivery */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Pickup</p>
                <Controller
                  name="pickupDate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      className="h-8 text-sm"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  )}
                />
                {errors.pickupDate && (
                  <p className="text-xs text-red-600">
                    {errors.pickupDate.message}
                  </p>
                )}

                <Controller
                  name="pickupTime"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
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
                  )}
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500">Delivery</p>
                <Controller
                  name="deliveryDate"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="date" className="h-8 text-sm" />
                  )}
                />
                {errors.deliveryDate && (
                  <p className="text-xs text-red-600">
                    {errors.deliveryDate.message}
                  </p>
                )}

                <Controller
                  name="deliveryTime"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
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
                  )}
                />
              </div>
            </div>

            {/* Special Instructions */}
            <Controller
              name="specialInstructions"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Special instructions"
                  className="min-h-[50px] resize-none text-sm"
                  value={watch("specialInstructions") ?? ""}
                />
              )}
            />

            <Button
              type="submit"
              className="w-full h-9 bg-green-600 hover:bg-green-700 text-white font-medium text-sm"
              disabled={isSubmitDisabled}
            >
              {loading
                ? "Processing..."
                : `Place Order (${formatMoney(totalAmount)})`}
            </Button>

            {message && (
              <p
                className={`text-center text-xs ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
