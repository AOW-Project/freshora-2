import type { Metadata } from "next"
import FaqSection from "@/component/FaqComponent"

// ✅ Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "  Laundry & Dry Cleaning Prices in Dubai | Freshora",
    description:
    
    "  Check Freshora’s transparent laundry and dry cleaning prices in Dubai. From everyday wear to carpets, curtains, shoes, and bags — get premium care at clear rates with no hidden charges.",
   keywords: [
      "Laundry prices Dubai",
      "Dry cleaning rates Dubai",] 
  }
}

// ✅ Page Component
export default function FaqPage() {
  return <FaqSection />
}