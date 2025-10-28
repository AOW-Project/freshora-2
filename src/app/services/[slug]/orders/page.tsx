import { notFound } from "next/navigation";
import ServiceOrderClient from "./service-order-client";

// --- Type Definitions ---
interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  unit?: string;
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
}

// Fetch all services to generate static paths
async function fetchAllServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`
    );
    const result = await res.json();
    console.log("fetched services succesfully");
    return result.success ? (result.data as Service[]) : [];
  } catch (err) {
    console.error("Failed to fetch all services for static generation:", err);
    return [];
  }
}

export async function generateStaticParams() {
  const services = await fetchAllServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Fetch service from backend
async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${slug}`,
      // `http://localhost:4000/api/services/${slug}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) return null;

    const result = await res.json();
    return result.success ? result.data : null;
  } catch (err) {
    console.error("Fetch service failed:", err);
    return null;
  }
}

// --- Next.js Page Props ---
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  // testing
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceOrderClient slug={slug} service={service} />;
}
