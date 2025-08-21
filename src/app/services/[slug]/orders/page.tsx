import { notFound } from "next/navigation";
import ServiceOrderClient from "./service-order-client";

// --- Type Definitions ---
// These types define the shape of the data being passed to the components.
interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  unit: string;
  image?: string;
}

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  rating: number;
  reviews: number;
  duration: string;
  items: {
    [category: string]: ServiceItem[];
  };
  gallery?: string[];
  features?: string[];
  pricing?: {
    [key: string]: any;
  };
  process?: {
    step: number;
    title: string;
    description: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}
// --- End of Type Definitions ---

// This async function fetches the specific service data from your backend API.
async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(`http://localhost:3001/api/services/${slug}`, {
      cache: 'no-store', // Ensures you always get the latest data
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
}

// FIX: The type for params is now a plain object, not a Promise.
interface ServiceOrderPageProps {
  params: {
    slug: string;
  };
}

export default async function ServiceOrderPage({ params }: ServiceOrderPageProps) {
  // FIX: 'await' has been removed. You can access the slug directly.
  const { slug } = params;
  
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Pass the live data to the client component for rendering.
  return (
    <>
      <ServiceOrderClient slug={slug} service={service} />
    </>
  );
}
