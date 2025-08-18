"use client"

import { useMemo } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image" // FIX: Import the next/image component
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, Mail, Phone, CheckCircle } from "lucide-react"
import type { Service } from "../../../lib/services-data"

// FIX: Removed unused 'ServiceItem' interface

export default function ServicePageClient({
  slug,
  service,
}: {
  slug: string
  service: Service
}) {
  const serviceCategories = useMemo(
    () => [
      { name: "Laundry Services", slug: "laundry-services", active: true },
      { name: "Dry Cleaning Services", slug: "dry-cleaning-services", active: false },
      { name: "Express Laundry Services", slug: "express-laundry-services", active: true },
      { name: "Shoe & Bag Spa", slug: "shoe-bag-spa", active: false },
      { name: "Luxury Shoe Cleaning", slug: "luxury-shoe-cleaning", active: false },
      { name: "Commercial Laundry Service", slug: "commercial-laundry-service", active: false },
      { name: "Curtain Cleaning Service", slug: "curtain-cleaning-service", active: false },
      { name: "Carpet Cleaning Service", slug: "carpet-cleaning-service", active: false },
      { name: "Soft Toy Cleaning Service", slug: "soft-toy-cleaning-service", active: false },
    ],
    [],
  )

  const serviceFeatures = useMemo(
    () => [
      "Salons & Spas",
      "Restaurants and Caterers",
      "Religious Organizations",
      "Daycare centers",
      "Assisted Living / Nursing Homes",
      "Hotels & Motels",
      "Nail Salons",
      "Athletic Facilities / Gyms",
    ],
    [],
  )

  const breadcrumbNav = useMemo(
    () => (
      <nav className="flex items-center space-x-1 sm:space-x-2 text-white mb-3 sm:mb-4 text-sm">
        <Link href="/" className="hover:text-green-400 transition-colors">
          Home
        </Link>
        <span className="px-1 sm:px-2">/</span>
        <Link href="/services" className="hover:text-green-400 transition-colors">
          Services
        </Link>
        <span className="px-1 sm:px-2">/</span>
        <span className="text-green-400">Single Service</span>
      </nav>
    ),
    [],
  )

  const contactInfo = useMemo(
    () => (
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-600">8494 Signal Hill Road</p>
            <p className="text-gray-600">Manassas, VA, 20110</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-600">Mon-Fri 08:00 AM - 05:00 PM</p>
            <p className="text-gray-600">Sat-Sun 10:00 AM - 4:00 PM</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-gray-600 break-all">info@prolaundrysite.com</p>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-gray-600">1 (800) 765-43-21</p>
        </div>
      </div>
    ),
    [],
  )

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {breadcrumbNav}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Single Service</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                  {serviceCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/services/${category.slug}`}
                      className={`block px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 last:border-b-0 transition-colors text-sm sm:text-base ${
                        category.slug === slug ? "bg-green-600 text-white" : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Service Image */}
              <div className="xl:col-span-2 relative w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg shadow-lg overflow-hidden">
                {/* FIX: Replaced <image> with next/image <Image> component */}
                <Image src="/images/layout01-img01.jpg" alt="Laundry Service" fill className="object-cover" />
              </div>

              {/* Contact Info */}
              <div className="xl:col-span-1">
                <Card className="h-fit">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Our Contacts</h3>
                    {contactInfo}
                    <div className="space-y-3">
                      {/* <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base">
                        Schedule a Pickup
                      </Button> */}
                      <Link href={`/services/${slug}/orders`}>
                        <Button
                          variant="outline"
                          className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent text-sm sm:text-base"
                        >
                          Get the Service
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Service Description */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              <div className="xl:col-span-2">
                <div className="mb-6 sm:mb-8">
                  <div className="border-l-4 border-green-600 pl-4 mb-6">
                    <h4 className="text-green-600 font-medium mb-2 text-sm sm:text-base">What we offer</h4>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{service.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{service.description}</p>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                    Wash and Fold Laundry Service Delivered to Your Home
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                    Get the very best in wash and fold or fluff and fold laundry service from the dry cleaning and
                    laundry experts. We offer one-day or same-day laundry service with a 100% satisfaction guarantee to
                    customers in our service areas, combining the excellence of our premium dry cleaning with the
                    ultimate convenience in laundry service and delivery. Enjoy free home pickup and delivery for your
                    wash and fold laundry items. Our Laundry Clients Include:
                  </p>

                  {/* Service Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {serviceFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Images */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                    <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden">
                      <Image src="/images/img09.jpg" alt="Ironing Service" fill className="object-cover" />
                    </div>
                    <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden">
                      <Image src="/images/img11.jpg" alt="Hanging Clothes" fill className="object-cover" />
                    </div>
                  </div>

                  {/* How It Works Section */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">How Wash and Fold Works</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                      What is Wash and Fold? Sometimes referred to as laundry service or fluff and fold, full-service
                      wash and fold is our approach laundry service. When your garments don&apos;t need our dry cleaning
                      services, wash and fold is your best solution to clean clothes. Your clothes will last longer and
                      stay brighter.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      Simply use one of our many convenient drop-off or pickup services, tell us any specific
                      instructions for your garments, and we&apos;ll take care of the rest. You can pick it up from
                      there! We use state-of-the-art equipment and the best detergents and fabric softeners to ensure
                      your clothes are cleaned properly and thoroughly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="xl:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Ask Your Question</h3>
                    <form className="space-y-4">
                      <Input placeholder="Your name" className="text-sm sm:text-base" />
                      <Input type="email" placeholder="E-mail" className="text-sm sm:text-base" />
                      <Input placeholder="Phone" className="text-sm sm:text-base" />
                      <Textarea placeholder="Your question" className="min-h-[100px] text-sm sm:text-base" />
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base">
                        Ask Question
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}