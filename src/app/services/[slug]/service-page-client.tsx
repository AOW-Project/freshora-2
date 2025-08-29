"use client"

import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, Mail, Phone, CheckCircle } from "lucide-react"
import type { Service } from "./page"

type FormState = {
  name: string
  email: string
  phone: string
  question: string
}

export default function ServicePageClient({
  slug,
  service,
}: {
  slug: string
  service: Service
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    question: "",
  })
  const [loading, setLoading] = useState(false)
  const [thankYou, setThankYou] = useState(false)

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setForm((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      try {
        const res = await fetch("/api/send-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          setForm({ name: "", email: "", phone: "", question: "" })
          setThankYou(true)
          setTimeout(() => setThankYou(false), 2000)
        }
      } catch (err) {
        console.error("Error sending question", err)
      } finally {
        setLoading(false)
      }
    },
    [form]
  )

  const serviceCategories = useMemo(
    () => [
      { name: "Laundry Services", slug: "laundry-services" },
      { name: "Dry Cleaning Services", slug: "dry-cleaning-services" },
      { name: "Express Laundry Services", slug: "express-laundry-services" },
      { name: "Shoe & Bag Spa", slug: "shoe-bag-spa" },
      { name: "Luxury Shoe Cleaning", slug: "luxury-shoe-cleaning" },
      { name: "Commercial Laundry Service", slug: "commercial-laundry-service" },
      { name: "Curtain Cleaning Service", slug: "curtain-cleaning-service" },
      { name: "Carpet Cleaning Service", slug: "carpet-cleaning-service" },
      { name: "Soft Toy Cleaning Service", slug: "soft-toy-cleaning-service" },
    ],
    []
  )

  // ⛔️ REMOVED the hardcoded serviceFeatures array. We will use service.features from props.

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
        <span className="text-green-400 capitalize">
          {/* ✅ Use the dynamic service title for accuracy */}
          {service.title}
        </span>
      </nav>
    ),
    [service.title]
  )

  const contactInfo = useMemo(
    () => (
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-600">Shop no 4, Azizi riviera 42</p>
            <p className="text-gray-600">Meydan , Al Merkadh , Dubai UAE</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-600">Mon-Fri  8am - 8pm</p>
            <p className="text-gray-600">Sat-Sun 10am - 8pm</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-green-600 flex-shrink-0" />
          <p className="text-sm text-gray-600 break-all">
            freshorappc@gmail.com
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
          <a href="tel:+971509259667" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            +971 50 925 9667
          </a>
        </div>
      </div>
    ),
    []
  )

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/modern-office-laundry.png')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {breadcrumbNav}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white capitalize">
            {/* ✅ Use the dynamic service title */}
            {service.title}
          </h1>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Categories */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                  {serviceCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/services/${category.slug}`}
                      className={`block px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 last:border-b-0 transition-colors text-sm sm:text-base ${
                        category.slug === slug
                          ? "bg-green-600 text-white"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Service Image */}
              <div className="xl:col-span-2 relative w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={service.image || "/images/layout01-img01.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Contact Info */}
              <div className="xl:col-span-1">
                <Card className="h-fit">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Our Contacts
                    </h3>
                    {contactInfo}
                    <div className="space-y-3">
                      <Link href={`/services/${slug}/orders`}>
                        <Button
                          variant="outline"
                          // ✅ Updated button style for better visibility
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                        >
                          Get the Service
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Service Details + Ask Form */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Service Content */}
              <div className="xl:col-span-2">
                <div className="mb-6 sm:mb-8">
                  <div className="border-l-4 border-green-600 pl-4 mb-6">
                    <h4 className="text-green-600 font-medium mb-2 text-sm sm:text-base">
                      What we offer
                    </h4>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {service.fullDescription}
                    </p>
                  </div>

                  {/* Features */}
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                    {/* ✅ Use dynamic secondary title */}
                    {service.secondaryTitle}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                    {/* ✅ Use dynamic secondary description */}
                    {service.secondaryDescription}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {/* ✅ Map over dynamic features from the 'service' prop */}
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Extra Images */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                    {/* ✅ Create a dynamic gallery from the 'service' prop */}
                    {service.gallery.slice(0, 2).map((imgSrc, index) => (
                       <div key={index} className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden">
                         <Image
                           src={imgSrc}
                           height={300}
                           width={400}
                           alt={`${service.title} gallery image ${index + 1}`}
                           
                           className="object-cover"
                         />
                       </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ask Question Form */}
              <aside className="xl:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-4 sm:p-6">
                    {thankYou ? (
                      <div className="flex items-center justify-center h-40 text-green-600 font-semibold text-lg">
                        ✅ Thank you for your question!
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                          Ask Your Question
                        </h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                          <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                          />
                          <Input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                            required
                          />
                          <Input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                          />
                          <Textarea
                            name="question"
                            value={form.question}
                            onChange={handleChange}
                            placeholder="Your question"
                            className="min-h-[100px]"
                            required
                          />
                          <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={loading}
                          >
                            {loading ? "Sending..." : "Ask Question"}
                          </Button>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}