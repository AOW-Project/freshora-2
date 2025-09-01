import type { Metadata } from "next"
import ContactComponent from "@/component/contactComponent"

// ✅ Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Freshora Laundry in Dubai | Pickup & Delivery Support",
    description:
      "Get in touch with FreshoraLaundry for dry cleaning and laundry service in Dubai. Enjoy free pickup, on-time delivery, and quick customer support.",
    keywords: [ "Contact Freshora Laundry", "Laundry support Dubai", "Dry cleaning help Dubai"],
    }
}

// ✅ Page Component
export default function ContactPage() {
  return <ContactComponent />
}