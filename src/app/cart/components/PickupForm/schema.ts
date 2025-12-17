import { z } from "zod";

export const pickupFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  address: z.string().min(15, "Address must be more detailed"),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  pickupDate: z.string(),
  pickupTime: z.string(),
  specialInstructions: z.string().optional().nullable(),
});

export type PickupFormValues = z.infer<typeof pickupFormSchema>;

export const defaultValues: PickupFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  pickupDate: new Date().toISOString().split("T")[0],
  pickupTime: "10:00 AM",
  specialInstructions: "",
};
