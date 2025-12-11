import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServicePageClient from "./service-page-client";

// Static service data
import { servicesData, getServiceBySlug, Service } from "@/lib/services-data";
export type { Service } from "@/lib/services-data";

// -----------------------------------------------------
// ✅ Correct params signature for Next.js 15
// -----------------------------------------------------
type PageProps = {
  params: Promise<{ slug: string }>; // Next.js 15 requires Promise
};

// -----------------------------------------------------
// ✅ generateMetadata — server-side and static-friendly
// -----------------------------------------------------
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params; // MUST await in Next.js 15

  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: "Service Not Found | Freshora Laundry",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: service.metaTitle ?? service.title,
    description: service.metaDescription ?? service.description,
    keywords: service.keywords,
    alternates: { canonical: service.canonical },
    openGraph: {
      title: service.metaTitle ?? service.title,
      description: service.metaDescription,
      url: service.canonical,
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle ?? service.title,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

// -----------------------------------------------------
// ✅ Main Page — MINIMAL server logic, type-correct
// -----------------------------------------------------
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params; // REQUIRED by Next.js 15

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Pass static service object to client component
  return <ServicePageClient slug={slug} service={service} />;
}

// -----------------------------------------------------
// ✅ Static generation — no runtime fetches required
// -----------------------------------------------------
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}
