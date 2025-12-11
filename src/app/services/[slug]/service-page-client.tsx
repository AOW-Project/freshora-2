"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import LoadingOverlay from "@/component/LoadingOverlay";
import CouponCarousel from "@/component/CouponCarousel";

import type { Service } from "./page";

// --------------------------------------------------
// Static values → Moved OUTSIDE component
// --------------------------------------------------
const SERVICE_CATEGORIES = [
  { name: "Laundry Services", slug: "professional-laundry-services-in-dubai" },
  { name: "Dry Cleaning Services", slug: "dry-cleaning-services-in-dubai" },
  { name: "Steam Pressing Services", slug: "steam-pressing-services-in-dubai" },
  { name: "Shoe Cleaning", slug: "shoe-and-bag-spa-services-in-dubai" },
  {
    name: "Luxury Shoe Cleaning",
    slug: "luxury-shoe-cleaning-services-in-dubai",
  },
  {
    name: "Commercial Laundry Service",
    slug: "commercial-laundry-services-in-dubai",
  },
  {
    name: "Carpet Cleaning Service",
    slug: "carpet-cleaning-services-in-dubai",
  },
  {
    name: "Soft Toy Cleaning Service",
    slug: "soft-toy-cleaning-services-in-dubai",
  },
];

const CONTACT_ONLY = [
  "commercial-laundry-services-in-dubai",
  "shoe-and-bag-spa-services-in-dubai",
  "luxury-shoe-cleaning-services-in-dubai",
];

// --------------------------------------------------

export default function ServicePageClient({
  slug,
  service,
}: {
  slug: string;
  service: Service;
}) {
  const [isNavigating, setIsNavigating] = useState(false);

  const requiresContact = CONTACT_ONLY.includes(slug);

  const handleNavigate = useCallback(() => {
    setIsNavigating(true);
  }, []);

  return (
    <>
      {/* <LoadingOverlay show={isNavigating} /> */}

      <div className="min-h-screen bg-white">
        {/* Header Banner */}
        <div
          className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
          style={{
            backgroundImage: `url('/images/redesign/about-banner.png')`,
          }}
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
        <div className="max-w-7xl mx-auto px-6 py-5 bg-white">
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

            <span className="text-green-400 capitalize">{service.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 border shadow rounded-lg overflow-hidden">
                {SERVICE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/services/${cat.slug}`}
                    className={`block px-6 py-4 border transition ${
                      cat.slug === slug
                        ? "bg-gray-50 text-primary-green"
                        : "hover:bg-primary-green hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-6 order-1 lg:order-2">
              {/* Service Header */}
              <div className="sticky top-20 bg-white p-5 border rounded-lg shadow-sm z-40">
                <h1 className="text-3xl md:text-4xl text-primary-green text-center font-medium">
                  {service.title}
                </h1>

                <p className="mt-3 text-gray-600 text-center">What we offer</p>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="mt-4">
                  {requiresContact ? (
                    <Link
                      href={`https://wa.me/+971509259667?text=${encodeURIComponent(
                        `Hi, I would like to know the prices for ${service.title}`
                      )}`}
                      className="flex justify-center items-center gap-3 bg-secondary-green hover:bg-primary-green text-white py-2 rounded-md"
                    >
                      Contact for Prices <FaWhatsapp size={22} />
                    </Link>
                  ) : (
                    <Link
                      prefetch
                      href={`/services/${slug}/orders`}
                      className="rounded-md w-full py-2 bg-secondary-green text-white 
             hover:bg-primary-green transition-colors duration-300 font-semibold 
             flex items-center justify-center cursor-pointer"
                    >
                      Get the Service
                    </Link>
                  )}
                </div>
              </div>

              {/* Main Image */}
              <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 mt-6 rounded-lg shadow overflow-hidden">
                <Image
                  src={service.image || "/images/layout01-img01.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Secondary Section */}
              <h3 className="text-2xl text-secondary-green mt-6 font-medium">
                {service.secondaryTitle}
              </h3>

              <p className="whitespace-pre-line text-gray-600 mt-3 leading-relaxed">
                {service.secondaryDescription}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <RiCheckDoubleLine
                      size={20}
                      className="text-primary-green"
                    />
                    <span className="text-secondary-green">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {service.gallery.slice(0, 2).map((src, idx) => (
                  <div
                    key={idx}
                    className="relative h-48 rounded-lg overflow-hidden"
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <CouponCarousel />
            </main>

            {/* Sidebar Right */}
            <aside className="lg:col-span-3 order-3 space-y-6">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-4">Our Contacts</h3>

                  {/* Contact Info */}
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex gap-3">
                      <MapPin className="h-4 w-4 text-green-600 mt-1" />
                      <p>Shop no 4, Azizi Riviera 42, Meydan, Dubai UAE</p>
                    </div>

                    <div className="flex gap-3">
                      <Clock className="h-4 w-4 text-green-600 mt-1" />
                      <p>
                        Mon–Fri: 8am–8pm
                        <br />
                        Sat–Sun: 10am–8pm
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="h-4 w-4 text-green-600" />
                      <p>freshorappc@gmail.com</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-3">
                        <Phone className="h-4 w-4 text-green-600" />
                        <a href="tel:+971509259667">+971 50 925 9667</a>
                      </div>

                      <div className="flex gap-3">
                        <Phone className="h-4 w-4 text-green-600" />
                        <a href="tel:+971045799667">+971 4 579 9667</a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="sticky top-24 bg-secondary-green text-center text-white py-6 rounded">
                <h2 className="text-xl font-medium text-yellow-300">Special</h2>
                <h2 className="text-xl font-medium text-yellow-300">
                  Welcome Offer
                </h2>
                <p>Click Here</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
