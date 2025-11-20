"use client";

import { Control } from "react-hook-form";
import { PickupFormValues } from "./schema";

import { Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface PickupNotesFieldProps {
  control: Control<PickupFormValues>;
}

export default function PickupNotesField({ control }: PickupNotesFieldProps) {
  return (
<Controller
  name="specialInstructions"
  control={control}
  render={({ field }) => (
    <Textarea
      {...field}
      value={field.value ?? ""}         // ← Convert null/undefined → ""
      placeholder="Add your instructions here..."
      className="min-h-[50px] resize-none text-sm rounded"
    />
  )}
/>

  );
}
