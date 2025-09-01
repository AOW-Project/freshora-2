import type { Metadata } from "next"
import PricingSection from "@/component/PriceComponent"

// ✅ Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Laundry & Dry Cleaning Prices in Dubai | Freshora Laundry",
    description:
      "Explore Freshora’s transparent laundry & dry cleaning prices in Dubai — from clothes to carpets, shoes & bags, with no hidden charges.",
   
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
