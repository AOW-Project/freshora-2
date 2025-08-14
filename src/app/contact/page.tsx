"use client";

import Link from "next/link";
// import NotFound from "@/component/NotFound";
import React from "react";
import AnimatedParticles from "@/component/AnimatedParticles";

export default function ContactPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  React.use(params);

  return (
    // <NotFound/>
    <> 
    <AnimatedParticles zIndex={5} />
    <main className="min-h-screen bg-gray-50">
                         <div
        className="relative h-64 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Laundry+Machines+Background')`,
        }}
      >
 <div className="max-w-7xl mx-auto px-4 w-full">
  {/* Breadcrumb */}
  <nav className="flex items-center space-x-2 text-white mb-4">
    <Link href="/" className="hover:text-green-400">
      Home
    </Link>
    <span className="px-2">/</span>
    <span  className="hover:text-green-400">
      Contact
    </span>
  </nav>

  <h1 className="text-4xl md:text-5xl font-bold text-white">Contact</h1>
</div>

      </div>
      {/* Top Contact Info */}
      <section className="text-center py-10">
        <h2 className="text-green-600 text-sm font-semibold mb-2">
          Get in Touch With Us
        </h2>
        <h1 className="text-3xl font-bold mb-6">Contact Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div>
            <p className="font-semibold">Post Address</p>
            <p className="text-gray-500">
              8494 Signal Hill Road, Manassas, VA 20110
            </p>
          </div>
          <div>
            <p className="font-semibold">Contact Phone</p>
            <p className="text-gray-500">+1 (803) 746-0231</p>
          </div>
          <div>
            <p className="font-semibold">E-mail Address</p>
            <p className="text-gray-500">info@yourlaundry.com</p>
          </div>
          <div>
            <p className="font-semibold">Opening Hours</p>
            <p className="text-gray-500">Mon–Fri 09:00 AM – 5:30 PM</p>
          </div>
        </div>
      </section>

      {/* Map & Form */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Google Map Left */}
        <div className="h-[500px] lg:col-span-1">
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.009160312709!2d-77.455!3d38.752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65cf1dff9f1b1%3A0x5d812!2s8494%20Signal%20Hill%20Rd%2C%20Manassas%2C%20VA%2021010!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        {/* Form */}
        <div className="bg-white p-8 shadow-lg lg:col-span-1 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Get in Touch.</h3>
          <p className="text-gray-500 mb-6">
            We look forward to helping you create and maintain a clean, healthy
            environment thats as enjoyable as it is functional.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 rounded-md w-full p-3"
            />
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="E-mail"
                className="border border-gray-300 rounded-md w-1/2 p-3"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="border border-gray-300 rounded-md w-1/2 p-3"
              />
            </div>
            <textarea
              placeholder="Your message"
              rows={4}
              className="border border-gray-300 rounded-md w-full p-3"
            ></textarea>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-500">
                I accept the privacy and terms.
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map Right */}
        <div className="h-[500px] lg:col-span-1">
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.009160312709!2d-77.455!3d38.752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65cf1dff9f1b1%3A0x5d812!2s8494%20Signal%20Hill%20Rd%2C%20Manassas%2C%20VA%2021010!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main></>
   
  );
}
