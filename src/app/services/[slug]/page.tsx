import { notFound } from "next/navigation"
import ServicePageClient from "./service-page-client"
import { servicesData } from "@/lib/services-data" // Use the named export

// --- UPDATED: A more flexible Service type definition ---
interface ServiceItem {
  id: string
  name: string
  price: number
  description: string
  unit: string
  image?: string
}

// This interface now correctly matches the structure of BOTH the API and local data
interface Service {
  id: string | number
  slug: string
  title: string
  description: string
  fullDescription: string
  image?: string
  rating: number
  reviews: number
  duration: string
  // The 'items' property is now optional to match the local data's structure
  items?: {
    [category: string]: ServiceItem[]
  }
  gallery?: string[]
  features?: string[]
  pricing?: Record<string, any>
  process?: any[]
  faq?: any[]
}
// --- End of Type Definitions ---

// API fetch function remains the same
async function fetchServiceFromAPI(slug: string): Promise<Service | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`https://freshora-2-backend-seven.vercel.app/api/services/${slug}`, {
      cache: "no-store",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`API fetch failed for slug "${slug}" with status: ${response.status}`);
      return null;
    }
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error(`API fetch error for slug "${slug}":`, error);
    return null;
  }
}

// Local data fetch function
function getServiceFromLocal(slug: string): Service | undefined {
    return servicesData.find((service) => service.slug === slug);
}


type PageProps = {
  params: { slug: string }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = params
  let service: Service | undefined | null = null;

  // Try API first
  service = await fetchServiceFromAPI(slug);

  // Fallback to local data if API fails
  if (!service) {
    console.log(`API failed or returned no data. Falling back to local data for "${slug}".`);
    service = getServiceFromLocal(slug);
  } else {
    console.log(`Successfully fetched data from API for "${slug}".`);
  }

  // If still no service, then 404
  if (!service) {
    notFound();
  }

  return <ServicePageClient slug={slug} service={service} />
}