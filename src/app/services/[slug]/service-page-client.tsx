"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Mail, Phone, CheckCircle } from "lucide-react";
import type { Service } from "./page";
import LoadingOverlay from "@/component/LoadingOverlay";
import { RiCheckDoubleLine } from "react-icons/ri";
import CouponCarousel from "@/component/CouponCarousel";
import { usePathname } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  question: string;
};

export default function ServicePageClient({
  slug,
  service,
}: {
  slug: string;
  service: Service;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const pathname = usePathname();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch("/api/send-question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setForm({ name: "", email: "", phone: "", question: "" });
          setThankYou(true);
          setTimeout(() => setThankYou(false), 2000);
        }
      } catch (err) {
        console.error("Error sending question", err);
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  const serviceCategories = useMemo(
    () => [
      { name: "Laundry Services", slug: "laundry-services" },
      { name: "Dry Cleaning Services", slug: "dry-cleaning-services" },
      // { name: "Express Laundry Services", slug: "express-laundry-services" },
      { name: "Shoe Cleaning", slug: "shoe-bag-spa" },
      { name: "Luxury Shoe Cleaning", slug: "luxury-shoe-cleaning" },
      {
        name: "Commercial Laundry Service",
        slug: "commercial-laundry-service",
      },
      // { name: "Curtain Cleaning Service", slug: "laundry-services" },
      { name: "Carpet Cleaning Service", slug: "carpet-cleaning-services" },
      { name: "Soft Toy Cleaning Service", slug: "soft-toy-cleaning-service" },
      { name: "Steam Pressing Service", slug: "steam-pressing-service" },
    ],
    []
  );

  const breadcrumbNav = useMemo(
    () => (
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
            href="/services"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Services
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>

          <span className="text-green-400 capitalize">{service.title}</span>
        </nav>
      </div>
    ),
    [service.title]
  );

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
            <p className="text-gray-600">Mon-Fri 8am - 8pm</p>
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
          <a
            href="tel:+971509259667"
            className="text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            +971 50 925 9667
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
          <a
            href="tel:+971045799667"
            className="text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            +971 (0) 4 579 9667
          </a>
        </div>
      </div>
    ),
    []
  );

  if (!service) {
    notFound();
  }

  return (
    <>
      <LoadingOverlay show={isNavigating} />
      <div className="min-h-screen bg-white">
        {/* Header Banner */}
        <div
          className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
          style={{
            backgroundImage: `url('/images/redesign/about-banner.png')`,
          }}
        >
          {" "}
          {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
          <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center text-center items-center z-30">
            <p>
              Professional Laundry{" "}
              <span className="text-[#FFFF00]">
                Services Designed for Your Lifestyle
              </span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {breadcrumbNav}
        </div>
        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Sidebar Categories */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24  overflow-hidden ">
                <div className="lg:max-h-[calc(100vh-8rem)] border shadow-md shadow-gray-200  rounded-lg overflow-hidden">
                  {serviceCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/services/${category.slug}`}
                      className={`block px-4 sm:px-6 py-3  sm:py-4 transition-colors text-sm  border sm:text-base ${
                        category.slug === slug
                          ? "bg-gray-50 text-primary-green "
                          : "hover:bg-primary-green bg-white text-gray-800 hover:text-white"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-6 order-1 lg:order-2">
              {/* Service Details*/}
              <div className="sticky top-24 border shadow shadow-gray-200 z-50 bg-white pt-5 p-4 rounded-lg">
                <div className="mb-6 ">
                  <h2 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
                    {service.title}
                  </h2>
                  <h3 className="text-xl my-3 font-medium text-gray-600 text-center">
                    What we offer
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {service.fullDescription}
                  </p>
                </div>
                {/* get the services button */}
                <div className="my-4 h-11 bg-gray-50">
                  {pathname === "/services/commercial-laundry-service" ? (
                    <Link href="/contact">
                      <Button
                        onClick={() => setIsNavigating(true)}
                        className="w-full h-full bg-secondary-green text-white hover:bg-primary-green hover:text-white transition-colors duration-300 ease-in-out font-semibold cursor-pointer"
                      >
                        Contact for Prices
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/services/${slug}/orders`}>
                      <Button
                        onClick={() => setIsNavigating(true)}
                        className="w-full h-full bg-secondary-green text-white hover:bg-primary-green hover:text-white transition-colors duration-300 ease-in-out font-semibold cursor-pointer"
                      >
                        Get the Service
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Service Image */}
              <div className="">
                <div className=" relative w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={service.image || "/images/layout01-img01.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Features */}
              <h3 className="text-lg sm:text-2xl font-medium my-4 text-secondary-green">
                {service.secondaryTitle}
              </h3>
              <p
                style={{ whiteSpace: "pre-line" }}
                className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base"
              >
                {service.secondaryDescription}
              </p>
              <div className="grid grid-cols-1  gap-3 sm:gap-4 mb-6 sm:mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <RiCheckDoubleLine
                      size={20}
                      className="text-primary-green flex-shrink-0"
                    />
                    <span className="text-xl font-medium sm:text-base text-secondary-green">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Extra Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                {service.gallery.slice(0, 2).map((imgSrc, index) => (
                  <div
                    key={index}
                    className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden"
                  >
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

              {/* Coupon */}

              <CouponCarousel />
            </main>

            <aside className="lg:col-span-3 order-3">
              {/* Contact Info */}
              <Card className="h-fit mb-6">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Our Contacts
                  </h3>
                  {contactInfo}
                </CardContent>
              </Card>
              {/* Special Offer */}

              <div className="sticky top-24 w-full h-44 flex flex-col justify-center items-center bg-secondary-green rounded">
                <h2 className="text-xl font-medium text-[#FFFF00]">Special</h2>
                <h2 className="text-xl font-medium text-[#FFFF00]">
                  Welcome Offer
                </h2>
                <p className="text-base text-white">Click Here</p>
              </div>
              {/* Ask Question Form */}
              {/* <Card className="">
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
              </Card> */}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
