"use client";

interface PickupSubmitProps {
  loading: boolean;
  disabled: boolean;
  message: string;
  totalAmount: number;
}

import { Button } from "@/components/ui/button";

export default function PickupSubmit({
  loading,
  disabled,
  message,
  totalAmount,
}: PickupSubmitProps) {
  return (
    <div className="space-y-2">
      <Button
        type="submit"
        disabled={disabled}
        className="w-full h-9 bg-secondary-green text-white font-medium text-sm rounded"
      >
        {loading ? "Processing..." : `Place Order (AED ${totalAmount.toFixed(2)})`}
      </Button>

      {message && (
        <p
          className={`text-center text-xs ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
