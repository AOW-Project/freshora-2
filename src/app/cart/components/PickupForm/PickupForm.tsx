"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

import { useCart } from "@/app/context/cart-context";
import { pickupFormSchema, defaultValues, PickupFormValues } from "./schema";
import { PickupFormProps } from "./types";

import PickupSummary from "./PickupSummary";
import PickupDetailsFields from "./PickupDetailsFields";
import PickupScheduleFields from "./PickupScheduleFields";
import PickupNotesField from "./PickupNotesField";
import PickupSubmit from "./PickupSubmit";
import { buildOrderPayload } from "./orderPayloadBuilder";

export default function PickupForm({ open, onClose }: PickupFormProps) {
  // ---- ALL HOOKS MUST BE HERE (top-level) ----

  const { cartItems, clearCart, getTotalPrice } = useCart();
  const totalAmount = getTotalPrice();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PickupFormValues>({
    resolver: zodResolver(pickupFormSchema),
    mode: "onChange",
    defaultValues,
  });

  // Memo (still must be above conditional return)
  const disableSubmit = useMemo(
    () =>
      isSubmitting ||
      loading ||
      cartItems.length === 0 ||
      !isValid,
    [isSubmitting, loading, cartItems.length, isValid]
  );

  // ---- NOW WE CAN SAFELY RETURN CONDITIONAL UI ----
  if (!open) return null;

  // ---- HANDLERS BELOW (safe) ----
  const onSubmit = async (values: PickupFormValues) => {
    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = buildOrderPayload({
        formData: values,
        cartItems,
        totalAmount,
      });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error((await res.json()).message ?? "Server error");
      }

      const data = await res.json();

      if (data.success) {
        setMessage(`Order placed successfully! Order Number: ${data.data.orderNumber}`);

        setTimeout(() => {
          clearCart();
          onClose();
        }, 800);
      } else {
        setMessage(data.message ?? "Failed to place order");
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

  return (
    <div className="fixed inset-0 backdrop-blur-custom bg-black/30 flex items-center justify-center z-1000 p-4">
      <Card className="w-full max-w-sm rounded shadow-xl border-0 bg-white overflow-hidden gap-0">
        <CardHeader className="flex flex-row items-center justify-between p-3 pb-1 border-b">
          <CardTitle className="text-xl font-medium text-secondary-green">
            Schedule Pickup
          </CardTitle>
          <button onClick={onClose} className="text-red-600">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="p-3 pt-0">
          <PickupSummary cartItems={cartItems} totalAmount={totalAmount} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <PickupDetailsFields control={control} errors={errors} />
            <PickupScheduleFields control={control} />
            <PickupNotesField control={control} />
            <PickupSubmit
              loading={loading}
              disabled={disableSubmit}
              message={message}
              totalAmount={totalAmount}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
