'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    image: "/images/a-basket-of-laundry-and-public-laundromat-2024-11-27-17-08-56-utc.webp",
    alt: "A woman smiling while holding a basket of fresh laundry",
    subtitle: "Free Pickup & Delivery",
    title: "Laundry Service in Dubai That Cares for Every Detail",
    description:
      "Advanced cleaning methods, gentle detergents, and expert hands, your clothes stay fresh, clean, and ready to wear longer.",
    buttonText: "Schedule a Pickup",
    buttonLink: "/services",
  },
  {
    image: "/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc (1).webp",
    alt: "A laundry professional handing clean clothes to a customer",
    subtitle: "25+ Years of Experience",
    title: " Premium Laundry Service in Dubai, Made Easy",
    description:
      "Enjoy free pickup and delivery anywhere in Dubai. While you focus on life, we handle your laundry with precision and care.",
    buttonText: "Book Free Pickup",
    buttonLink: "/services",
  },
  {
    image: "/images/cleaning-lady-using-a-canister-vacuum-cleaner-2024-10-20-21-05-25-utc.webp",
    alt: "A woman professionally steaming a blue shirt",
    subtitle: "Perfectly Pressed, Every Time",
    title: " Professional Laundry Service That You Can Rely On",
    description:
      " Quick turnaround and on-time delivery - because laundry should fit your lifestyle, not interrupt it",
    buttonText: "Try Our Express Service",
    buttonLink: "/prices",
  },
  {
    image: "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.webp",
    alt: "A happy customer receiving their clean clothes",
    subtitle: "Your Happiness, Guaranteed",
    title: "Dry Cleaning Services with a Personal Touch",
    description:
      " From abayas to designer suits, delicate garments are treated with expert care to preserve their beauty and texture.",
    buttonText: "Experience Premium Care",
    buttonLink: "/about",
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
      className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] bg-gray-800 overflow-hidden"
    >
      {/* Preloader */}
      {preloaderVisible && (
        <div className="absolute inset-0 flex justify-center items-center bg-white z-50 text-3xl md:text-4xl font-bold text-gray-800 animate-fade">
          <span className="text-green-600">Freshora</span>Laundry
        </div>
      )}

      {/* Slides */}
      <div className="absolute inset-0 w-full h-full z-0">
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className="object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="relative z-20 flex h-full items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white text-center lg:text-left">
          <p
            className="font-semibold text-base md:text-lg mb-3 text-white transition-all duration-700 ease-out opacity-100 translate-y-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {slide.subtitle}
          </p>
          <h2
            className="font-bold text-3xl md:text-5xl leading-tight mb-4 transition-all duration-700 ease-out text-green-500 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {slide.title}
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed mx-auto lg:mx-0 mb-6 max-w-xl transition-all duration-700 ease-out opacity-100 translate-y-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {slide.description}
          </p>
          <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
            <Link
              href={slide.buttonLink}
              className="relative inline-block bg-green-600 hover:bg-white text-white hover:text-green-600 font-semibold px-6 py-3 rounded group overflow-hidden border-2 border-transparent hover:border-green-600 transition-all duration-300"
            >
              <span className="relative z-10">{slide.buttonText}</span>
              <span className="absolute top-0 left-[-150%] h-full w-[200%] block transform -skew-x-45 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[150%] transition-all duration-700 ease-in-out z-0"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
