"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/redesign/hero-img-1.1.svg",
    alt: "laundry service",
    title: "Freshness That Lasts",
    subtitle: "Laundry Service in Dubai That Cares for Every Detail",
    description:
      "Advanced cleaning methods, gentle detergents, and expert hands, your clothes stay fresh, clean, and ready to wear longer.",
    cta: "Schedule a Pickup",
  },
  {
    image: "/images/redesign/hero-img-2.svg",
    alt: "laundry service",
    title: "Convenience at Your Fingertips",
    subtitle: "Premium Laundry Service in Dubai, Made Easy",
    description:
      "Enjoy free pickup and delivery anywhere in Dubai. While you focus on life, we handle your laundry with precision and care",
    cta: "Book Free Pickup",
  },
  {
    image: "/images/redesign/hero-img-3.1.svg",
    alt: "laundry service",
    title: "Fast. Clean. Reliable.",
    subtitle: "Professional Laundry Service That You Can Rely On",
    description:
      "Quick turnaround and on-time delivery - because laundry should fit your lifestyle, not interrupt it",
    cta: "Try Our Express Service",
  },
  {
    image: "/images/redesign/hero-img-4.svg",
    alt: "laundry service",
    title: "Gentle Care, Premium Results",
    subtitle: "Dry Cleaning Services with a Personal Touch",
    description:
      "From abayas to designer suits, delicate garments are treated with expert care to preserve their beauty and texture.",
    cta: "Experience Premium Care",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  // Preloader hides after 400ms
  useEffect(() => {
    const preloaderTimer = setTimeout(() => setPreloaderVisible(false), 400);
    const slideInterval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      12000
    );

    return () => {
      clearTimeout(preloaderTimer);
      clearInterval(slideInterval);
    };
  }, []);

  const slide = slides[currentSlide];

  return (
    <section
      id="hero-section"
      className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] bg-secondary-green overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#00a63e]/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-[#30e87a]/30 rounded-full blur-[100px] pointer-events-none"></div>
      {/* Preloader */}
      {preloaderVisible && (
        <div className="absolute inset-0 flex justify-center items-center bg-white z-50 text-3xl md:text-4xl font-bold text-gray-800 animate-fade">
          <span className="text-green-600">Freshora</span>Laundry
        </div>
      )}

      {/* Slides */}
      <div className="absolute inset-0 w-full h-full z-0 ">
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out grid grid-cols-1 lg:grid-cols-2 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`relative h-[80%] w-[80%] hidden lg:flex mx-auto my-8 ${
                index % 2 === 0 ? "order-1" : "order-2"
              }`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-contain object-left"
              />
            </div>

            {/* Text Overlay */}
            <div
              className={`relative z-20 flex flex-col h-full  sm:items-start items-center w-full px-4  md:px-20 pt-20 ${
                index % 2 === 0 ? "order-2" : "order-1"
              }`}
            >
              <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-white/10 border border-white/10 px-4 py-1.5 backdrop-blur-sm my-5 ">
                <span className="flex h-2 w-2 rounded-full bg-[#30e87a] animate-pulse"></span>
                <span className="text-xs font-semibold uppercase tracking-wide text-white">
                  {s.subtitle}
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-center lg:text-left self-center lg:self-start text-white leading-[1.1] mb-3">
                {s.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto text-center lg:text-left lg:mx-0 font-light self-center lg:self-start leading-relaxed mb-12">
                {s.description}
              </p>
              <div className="flex items-center justify-center self-center lg:self-start gap-3 ">
                <Link href="/best-laundry-services-in-dubai" className="">
                  <button className="flex items-center justify-center gap-2 bg-[#30e87a] text-secondary-green font-bold text-sm sm:text-base md:text-lg h-14 px-8 rounded-lg  shadow-[0_0_20px_rgba(48,232,122,0.3)] hover:shadow-[0_0_30px_rgba(48,232,122,0.5)] transform hover:-translate-y-1 hover:bg-white/90 transition-all ease-in-out duration-500">
                    {s.cta}
                  </button>
                </Link>
                <Link href="/prices" className="">
                  <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/20 border border-white/10 text-white font-bold text-sm sm:text-base md:text-lg h-14 px-8 rounded-lg transition-all backdrop-blur-sm transform hover:-translate-y-1">
                    view pricing
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
