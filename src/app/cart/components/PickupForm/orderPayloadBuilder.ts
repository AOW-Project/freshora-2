"use client";

import { CartItem } from "./types";
import { PickupFormValues } from "./schema";

interface PayloadArgs {
  formData: PickupFormValues;
  cartItems: CartItem[];
  totalAmount: number;
}

export const buildOrderPayload = ({
  formData,
  cartItems,
  totalAmount,
}: PayloadArgs) => {
  const formatDate = (d: string) => new Date(d).toISOString();

  return {
    name: formData.name.trim(),

    customerInfo: {
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone?.trim() ?? "",
      address: formData.address.trim(),
      city: formData.city?.trim() ?? "",
      zipCode: formData.zipCode?.trim() ?? "",
    },

    pickupInfo: {
      date: formatDate(formData.pickupDate),
      time: formData.pickupTime,
      address: formData.address.trim(),
      instructions: formData.specialInstructions?.trim() ?? "",
    },

    // deliveryInfo is optional in backend schema
    deliveryInfo: undefined,

    cartItems: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      serviceSlug: item.serviceSlug ?? "laundry-services",

      // serviceType: item.serviceType  <-- removed
    })),

    totalAmount,
    paymentMethod: "cash_on_delivery",
  };
};
