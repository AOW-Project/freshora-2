import { notFound } from "next/navigation"
import ServiceOrderClient from "./service-order-client"

// --- Type Definitions ---
interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
  unit?: string
  image?: string
}

interface Service {
  id: string
  slug: string
  title: string
  description: string
  fullDescription: string
  image?: string
  rating: number
  reviews: number
  duration: string
  items: {
    [category: string]: ServiceItem[]
  }
}

// Fetch service from backend
async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(`https://freshora-backend.onrender.com/api/services/${slug}`, { cache: "no-store" })

    if (!res.ok) return null

    const result = await res.json()
    return result.success ? result.data : null
  } catch (err) {
    console.error("Fetch service failed:", err)
    return null
  }
}

// --- Next.js Page Props ---
type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const service = await fetchServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return <ServiceOrderClient slug={slug} service={service} />
}
