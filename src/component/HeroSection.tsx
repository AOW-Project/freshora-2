"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/redesign/hero-img-1.svg",
    alt: "laundry service",
    title: "Freshness That Lasts",
    subtitle: "Laundry Service in Dubai That Cares for Every Detail",
    description:
      "Advanced cleaning methods, gentle detergents, and expert hands, your clothes stay fresh, clean, and ready to wear longer.",
    cta: "Shedule a Pickup",
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
    image: "/images/redesign/hero-img-3.svg",
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
      5000
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
      className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] bg-primary-green overflow-hidden "
    >
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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out grid grid-cols-1 md:grid-cols-2 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`relative h-[80%] w-[80%] hidden md:flex mx-auto my-8 ${
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
              className={`relative z-20 flex flex-col justify-center h-full items-center sm:items-start w-full px-6 md:px-16 ${
                index % 2 === 0 ? "order-2" : "order-1"
              }`}
            >
              <h2 className="text-yellow-400 text-4xl  text-center sm:text-left font-light font-roboto-condensed">
                {s.title}
              </h2>
              <h2 className="justify-start text-white text-center sm:text-left text-3xl font-medium my-6 sm:my-3">
                {s.subtitle}
              </h2>
              <p className="w-full max-w-[605px] mb-10 sm:mb-6  text-center sm:text-left text-yellow-400 text-lg font-normal leading-none sm:leading-relaxed">
                {s.description}
              </p>
              <div className="flex items-center justify-center ">
                <Link href="/services" className="">
                  <button className="bg-secondary-green  text-white  flex flex-nowrap items-center justify-center gap-2 font-roboto-condensed font-semibold  rounded-[4px] px-8 py-2 text-xl cursor-pointer hover:bg-white hover:text-primary-green transition-all ease-in-out duration-500">
                    {s.cta}
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
