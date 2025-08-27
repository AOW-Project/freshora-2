import { notFound } from "next/navigation"
import ServicePageClient from "./service-page-client"
// ✅ We will now ONLY use this local data file
import { servicesData, Service as LocalService } from "@/lib/services-data"

// --- Type Definitions (kept for the client component) ---
export interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
  unit: string
  image?: string
}

export interface Service {
  id: string | number
  slug: string
  title: string
  description: string
  fullDescription: string
  image?: string
  rating: number
  reviews: number
  duration: string
  items?: {
    [category: string]: ServiceItem[]
  }
  gallery?: string[]
  features?: string[]
  pricing?: { [key: string]: { price: string; description: string } }
  process?: string[] | { step: number; title: string; description: string }[]
  faq?: { question: string; answer: string }[]
}

// ✅ This function now gets the service directly from your local file
function getServiceFromLocal(slug: string): LocalService | undefined {
  return servicesData.find((service) => service.slug === slug)
}

// --- Page Props ---
type PageProps = {
  params: Promise<{ slug:string }>
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params

  // ✅ Simplified Logic: We directly get the service from the local file.
  // The API call has been removed.
  const service = getServiceFromLocal(slug)

  if (!service) {
    notFound()
  }

  return <ServicePageClient slug={slug} service={service as Service} />
}

// Optional: For better performance, generate static pages for each service
export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }));
}