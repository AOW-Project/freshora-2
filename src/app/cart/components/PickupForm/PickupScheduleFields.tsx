"use client";

import { Control } from "react-hook-form";
import { PickupFormValues } from "./schema";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface PickupScheduleFieldsProps {
  control: Control<PickupFormValues>;
}

export default function PickupScheduleFields({ control }: PickupScheduleFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Pickup Date */}
      <Controller
        name="pickupDate"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="h-8 text-sm rounded"
          />
        )}
      />

      {/* Pickup Time */}
      <Controller
        name="pickupTime"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="h-8 text-sm rounded">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map(
                (time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
