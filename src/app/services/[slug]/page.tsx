import { notFound } from "next/navigation"
import ServicePageClient from "./service-page-client"

// --- Type Definitions ---
// These types define the shape of the data being fetched from your backend.
interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
  unit: string
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
  gallery?: string[]
  features?: string[]
  pricing?: Record<string, number>
  process?: {
    step: number
    title: string
    description: string
  }[]
  faq?: {
    question: string
    answer: string
  }[]
}

// --- End of Type Definitions ---

// This function calls your backend API to get the data for a specific service.
async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(`https://freshora-2-backend-seven.vercel.app/api/services/${slug}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const result = await response.json()

    if (result.success) {
      return result.data
    } else {
      return null
    }
  } catch (error) {
    console.error("Failed to fetch service:", error)
    return null
  }
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params

  // Here we call the function to fetch the data from the backend.
  const service = await fetchServiceBySlug(slug)

  // If no service is found, show the 404 page.
  if (!service) {
    notFound()
  }

  // If data is found, render the client component and pass the data to it.
  return <ServicePageClient slug={slug} service={service} />
}
