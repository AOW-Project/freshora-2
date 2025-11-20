"use client";

import { CartItem } from "./types";

interface PickupSummaryProps {
  cartItems: CartItem[];
  totalAmount: number;
}

export default function PickupSummary({ cartItems, totalAmount }: PickupSummaryProps) {
  if (!cartItems.length) return null;

  const formatMoney = (n: number) => `AED ${n.toFixed(2)}`;

  return (
    <div className="mb-3 p-2 rounded-lg">
      <h4 className="text-md font-medium text-gray-700 my-2">Order Summary</h4>

      <div className="space-y-1">
        {cartItems.slice(0, 3).map((item) => (
          <div key={item.id} className="flex justify-between text-xs text-gray-600">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{formatMoney(item.price * item.quantity)}</span>
          </div>
        ))}

        {cartItems.length > 3 && (
          <div className="text-xs text-gray-500">
            +{cartItems.length - 3} more items
          </div>
        )}

        <div className="border-t border-b py-2 mt-2 flex justify-between text-xl font-medium text-secondary-green">
          <span>Total</span>
          <span>{formatMoney(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
