import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicePageClient from "./service-page-client";

// ✅ Import service data & helpers
import { servicesData, getServiceBySlug, Service } from "@/lib/services-data";

// Re-export type for client components
export type { Service } from "@/lib/services-data";

// --- Dynamic Metadata for SEO ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Freshora Laundry",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.description,
    keywords: service.keywords,
    alternates: {
      canonical: service.canonical,
    },
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription,
      url: service.canonical,
      images: [
        {
          url: service.image,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle || service.title,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

// --- Page Props ---
// ✅ In Next.js 15, params is a Promise that must be awaited
type PageProps = {
  params: Promise<{ slug: string }>;
};

// ✅ Main Page Component
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient slug={slug} service={service} />;
}

// --- Pre-generate all services at build time ---
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}
