import { notFound } from "next/navigation"
import ServicePageClient from "./service-page-client"
import { servicesData, Service as LocalService } from "@/lib/services-data"

// --- FIX: Add 'export' to make these types available for import ---
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
// --- End of Type Definitions ---

async function fetchServiceFromAPI(slug: string): Promise<Service | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(
      `https://freshora-2-backend-seven.vercel.app/api/services/${slug}`,
      {
        cache: "no-store",
        signal: controller.signal,
      }
    )
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(
        `API fetch failed for slug "${slug}" with status: ${response.status}`
      )
      return null
    }
    const result = await response.json()
    return result.success ? result.data : null
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(
        `API request for slug "${slug}" timed out. Falling back to local data.`
      )
    } else {
      console.error(
        `An unexpected API fetch error occurred for slug "${slug}":`,
        error
      )
    }
    return null
  }
}

function getServiceFromLocal(slug: string): LocalService | undefined {
  return servicesData.find((service) => service.slug === slug)
}

// ✅ FIX: params must be awaited (Next.js 15 change)
type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params // ✅ now await params

  let service: Service | LocalService | undefined | null = null

  service = await fetchServiceFromAPI(slug)

  if (!service) {
    console.log(
      `API failed or returned no data. Falling back to local data for "${slug}".`
    )
    service = getServiceFromLocal(slug)
  } else {
    console.log(`Successfully fetched data from API for "${slug}".`)
  }

  if (!service) {
    notFound()
  }

  return <ServicePageClient slug={slug} service={service as Service} />
}
