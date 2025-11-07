//import AnimatedParticles from "@/component/AnimatedParticles";
import CouponCarousel from "@/component/CouponCarousel";
import FeaturesComponent from "@/component/FeaturesComponent";
// import Footer from "@/component/Footer";
import LaundryService from "@/component/LaundryService";
// import Navbar from "@/component/NavBar";
import ServiceBanner from "@/component/ServiceBanner";
import ServicesGrid from "@/component/ServicesGrid";
import type { Metadata } from "next";
import Link from "next/link";
// ✅ SEO metadata for Services listing page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Best Laundry Services in Dubai | Freshora Clean & Care Experts",
    description:
      "Looking for Best Laundry Services in Dubai? Freshora offers dry cleaning, wash & fold, carpet, curtain, shoe & bag cleaning with convenient pickup & delivery.",
    keywords: [
      "Laundry Services Dubai",
      "Dry Cleaning Dubai",
      "Carpet Cleaning Dubai",
      "Curtain Cleaning Dubai",
      "Shoe Cleaning Dubai",
      "Best Laundry Dubai",
    ],
    alternates: {
      canonical: "https://freshoralaundry.com/services",
    },
    openGraph: {
      title: "Laundry & Cleaning Services in Dubai",
      description:
        "Explore Freshora’s wide range of laundry and cleaning services in Dubai.",
      url: "https://freshoralaundry.com/services",
    },
    twitter: {
      card: "summary_large_image",
      title: "Laundry & Cleaning Services in Dubai",
      description:
        "Freshora offers complete laundry, dry cleaning, carpet, curtain, and shoe spa services in Dubai.",
    },
  };
}

export default function Services() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Footer /> */}
      {/* <AnimatedParticles zIndex={5} /> */}
      {/* Content Wrapper */}
      <ServiceBanner />
      {/* breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5 ">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link
            href="/"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Home
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <span className="text-green-400 text-sm sm:text-base">Services</span>
        </nav>
      </div>
      <ServicesGrid />
      {/* <LaundryService /> */}
      <FeaturesComponent />
      <CouponCarousel />
    </>
  );
}
