import { notFound } from "next/navigation";
import ServicePageClient from "./service-page-client";

// ✅ Import the MASTER Service type and data functions from your data file
import { servicesData, getServiceBySlug, Service } from "@/lib/services-data";

// ⛔️ All local interface definitions for Service and ServiceItem have been REMOVED from this file.

// Re-export the correct Service type for the client component to use
export type { Service } from "@/lib/services-data";

// --- Page Props ---
// ✅ In Next.js 15, params is a Promise that must be awaited
type PageProps = {
  params: Promise<{ slug: string }>;
};

// ✅ The function is NOW async and must await params
export default async function ServicePage({ params }: PageProps) {
  // ✅ Await the params Promise to get the slug
  const { slug } = await params;

  // Use the imported helper function to get the service data
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Pass the correctly typed service object to the client component
  return <ServicePageClient slug={slug} service={service} />;
}

// Generate static pages for each service at build time
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}