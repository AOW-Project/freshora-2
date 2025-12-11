import { notFound } from "next/navigation";
import ServiceOrderClient from "./service-order-client";
import Link from "next/link";

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
// async function fetchServiceBySlug(slug: string): Promise<Service | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${slug}`,
//       // `http://localhost:4000/api/services/${slug}`,
//       {
//         next: { revalidate: 3600 }, // Revalidate every hour
//       }
//     );

//     if (!res.ok) return null;

//     const result = await res.json();
//     return result.success ? result.data : null;
//   } catch (err) {
//     console.error("Fetch service failed:", err);
//     return null;
//   }
// }
// server-side helper

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 5000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${slug}`,
      { next: { revalidate: 3600 } },
      5000 // 5s timeout - adjust as needed
    );
    if (!res || !res.ok) return null;
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (err) {
    console.error("Fetch service failed (timeout or network):", err);
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

  return (
    <>
      {/* Header Banner */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
        style={{
          backgroundImage: `url('/images/redesign/about-banner.png')`,
        }}
      >
        {" "}
        {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium text-center flex flex-col justify-center items-center z-30">
          <p>
            Professional Laundry{" "}
            <span className="text-[#FFFF00]">
              Services Designed for Your Lifestyle
            </span>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-7xl mx-auto px-6 py-5 bg-white ">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
            <Link
              href="/"
              className="hover:text-green-400 text-sm sm:text-base transition-colors"
            >
              Home
            </Link>
            <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
            <Link
              href="/best-laundry-services-in-dubai"
              className="hover:text-green-400 text-sm sm:text-base transition-colors"
            >
              Services
            </Link>
            <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>

            <span className="text-green-400 capitalize">Order</span>
          </nav>
        </div>
      </div>
      <ServiceOrderClient slug={slug} service={service} />;
    </>
  );
}
