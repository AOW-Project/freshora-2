"use client";

import { Control, FieldErrors } from "react-hook-form";
import { PickupFormValues } from "./schema";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface PickupDetailsFieldsProps {
  control: Control<PickupFormValues>;
  errors: FieldErrors<PickupFormValues>;
}

export default function PickupDetailsFields({ control, errors }: PickupDetailsFieldsProps) {
  return (
    <>
      {/* Name */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Your Name *" className="h-8 text-sm rounded" />
        )}
      />
      {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input {...field} type="email" placeholder="Email *" className="h-8 text-sm rounded" />
        )}
      />
      {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}

      {/* Phone */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Phone" className="h-8 text-sm rounded" />
        )}
      />
      {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}

      {/* Address */}
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Full Address * (at least 5 words)" className="h-8 text-sm rounded" />
        )}
      />
      {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}

      {/* City + Zip */}
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="City *" className="h-8 text-sm rounded" />
          )}
        />

        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Zip Code" className="h-8 text-sm rounded" />
          )}
        />
      </div>
      {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
    </>
  );
}
