import { notFound } from "next/navigation";
import Link from "next/link";
import ServiceOrderClient from "./service-order-client";

// --- Types ---
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
  items: Record<string, ServiceItem[]>;
}

// --- Timeout Helper ---
async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 5000
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// --- Runtime Fetch (Only Run on Page Load) ---
async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${slug}`,
      { cache: "no-store" }, // no stale data, ensures freshness
      5000
    );

    if (!res.ok) return null;
    const json = await res.json();

    return json.success ? json.data : null;
  } catch (error) {
    console.error("Service fetch failed:", error);
    return null;
  }
}

// --- Page Props ---
type PageProps = {
  params: Promise<{ slug: string }>;
};

// --- No generateStaticParams because we fetch data dynamically ---
export const dynamic = "force-dynamic"; // ensure SSR + fresh data

// --- Page Component ---
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const service = await fetchServiceBySlug(slug);

  if (!service) notFound();

  return (
    <>
      {/* Header Banner */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center justify-center px-6"
        style={{ backgroundImage: "url('/images/redesign/about-banner.png')" }}
      >
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium text-center z-30">
          <p>
            Professional Laundry{" "}
            <span className="text-[#FFFF00]">
              Services Designed for Your Lifestyle
            </span>
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <nav className="flex items-center space-x-2 text-black">
          <Link href="/" className="hover:text-green-400">
            Home
          </Link>
          <span>/</span>

          <Link
            href="/best-laundry-services-in-dubai"
            className="hover:text-green-400"
          >
            Services
          </Link>
          <span>/</span>

          <span className="text-green-400 capitalize">Order</span>
        </nav>
      </div>

      <ServiceOrderClient slug={slug} service={service} />
    </>
  );
}
