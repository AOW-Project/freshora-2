import type { Metadata } from "next"
import PricingSection from "@/component/PriceComponent"

// ✅ Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Laundry & Dry Cleaning Prices in Dubai | Freshora Laundry",
    description:
      "Check Freshora’s transparent laundry and dry cleaning prices in Dubai. From everyday wear to carpets, curtains, shoes, and bags — get premium care at clear rates with no hidden charges.",
   
    keywords: [
      "laundry prices Dubai",
      "dry cleaning prices Dubai",
    "shirts laundry price Dubai",
    "trouser laundry price Dubai"
  ]}
}

// ✅ Page Component
export default function PricingSectionPage() {
  return <PricingSection />
}
