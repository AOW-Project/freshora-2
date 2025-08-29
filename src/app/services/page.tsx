//import AnimatedParticles from "@/component/AnimatedParticles";
import CouponCarousel from "@/component/CouponCarousel";
import FeaturesComponent from "@/component/FeaturesComponent";
// import Footer from "@/component/Footer";
import LaundryService from "@/component/LaundryService";
// import Navbar from "@/component/NavBar";
import ServiceBanner from "@/component/ServiceBanner";
import ServicesGrid from "@/component/ServicesGrid";
import type { Metadata } from "next";
// ✅ SEO metadata for Services listing page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Laundry Service Dubai | Freshora’s Expert Care for Every Fabric",
    description:
      " Looking for Laundry Service in Dubai? Freshora offers dry cleaning, wash & fold, carpet, curtain, shoe & bag cleaning with convenient pickup & delivery. ",
    keywords: [
      "Laundry Services Dubai",
      "Dry Cleaning Dubai",
      "Carpet Cleaning Dubai",
      "Curtain Cleaning Dubai",
      "Shoe Cleaning Dubai",
      "Best Laundry Dubai"
    ],
    alternates: {
      canonical: "https://freshoralaundry.com/services",
    },
    openGraph: {
      title: "Laundry & Cleaning Services in Dubai",
      description: "Explore Freshora’s wide range of laundry and cleaning services in Dubai.",
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
     {/* <AnimatedParticles zIndex={5} /> */ }
      {/* Content Wrapper */}
      <ServiceBanner />
      <ServicesGrid />
      <LaundryService />
      <FeaturesComponent />
      <CouponCarousel />
    </>
  );
}
