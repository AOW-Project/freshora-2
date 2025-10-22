"use client";

import React from "react";
// 1. Import the necessary Lucide icons
import {
  UserCheck,
  Tag,
  Smartphone,
  ShieldCheck,
  Truck,
  BellRing,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

// 2. Update the type to accept a component for the icon
type Advantage = {
  icon: string;
  title: string;
  description: string;
};

// 3. The data array now uses the imported icon components directly
const advantages: Advantage[] = [
  {
    icon: "/images/redesign/about-why-personalized.svg",
    title: "Personalized Care",
    description: "Every fabric type treated with precision.",
  },
  {
    icon: "/images/redesign/about-why-flexp.svg",
    title: "Flexible Pricing",
    description: "Options designed to suit your needs.",
  },
  {
    icon: "/images/redesign/about-why-effortless.svg",
    title: "Effortless Convenience",
    description: "Your laundry, completed with a single request.",
  },
  {
    icon: "/images/redesign/about-why-premium.svg",
    title: "Premium Products",
    description: "Only the finest detergents and cleaning solutions.",
  },
  {
    icon: "/images/redesign/about-why-express.svg",
    title: "Express Service",
    description: "Delivery in as little as eight hours.",
  },
  {
    icon: "/images/redesign/about-why-realtime.svg",
    title: "Real-Time Updates",
    description: "Complete transparency throughout the process.",
  },
];

const AdvantagesSection: React.FC = () => {
  return (
    <section className="bg-white mt-30 mb-0 px-4">
      <div className="my-10">
        <h2 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
          Why
          <span className="text-secondary-green"> Choose Us</span>
        </h2>
        <h3 className="text-xl font-medium text-gray-600 text-center">
          Our Advantages
        </h3>
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="bg-[#F3F6F4] p-4 rounded shadow-md hover:shadow-lg transition relative flex items-center justify-start gap-4 border border-primary-green"
            >
              {/* Fixed circle container */}
              <div className="flex-shrink-0 w-24 h-24 p-4 rounded-full border border-primary-green bg-primary-green hidden sm:flex items-center justify-center overflow-hidden">
                <Image
                  src={adv.icon}
                  alt="Laundry Experience"
                  width={48}
                  height={48}
                  className="object-contain invert brightness-0 sepia hue-rotate-[120deg] saturate-[10]"
                  priority
                />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-primary-green text-base sm:text-lg">
                  {adv.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base my-3">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-28"></div>
    </section>
  );
};

export default AdvantagesSection;
