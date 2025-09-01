import type { Metadata } from "next"
import FaqSection from "@/component/FaqComponent"

// ✅ Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "   Laundry Service FAQs in Dubai | Freshora",
    description:
    
    "  Find answers to common questions about Freshora’s laundry & dry cleaning in Dubai — services, prices, pickup & delivery, and more.",
   keywords: [
      "how Freshora laundry works",
      "same day laundry service Dubai FAQ",
      "laundry delivery timings Dubai"
    ] 
  }
}

// ✅ Page Component
export default function FaqPage() {
  return <FaqSection />
}