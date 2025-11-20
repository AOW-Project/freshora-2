"use client";

/**
 * A single item stored in the shopping cart.
 * Matches the shape used inside CartContext and PickupForm.
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;

  category: string;        // REQUIRED
  serviceType: string;     // REQUIRED
  serviceSlug?: string;
}

export interface PickupFormProps {
  open: boolean;
  onClose: () => void;
}