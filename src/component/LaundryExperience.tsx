"use client";

import Image from "next/image";
// ✅ Updated imports for new icons
import {
  Phone,
  Clock,
  CreditCard,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Users,
  Smile,
} from "lucide-react";
import { RiCheckDoubleLine } from "react-icons/ri";

// ✅ Updated statsData: values removed, icons changed to match labels
const statsData = [
  {
    icon: (
      <ShieldCheck className="text-green-600 text-lg sm:text-xl lg:text-3xl" />
    ),
    label: "Fast & Secure",
  },
  {
    icon: <Truck className="text-green-600 text-lg sm:text-xl lg:text-3xl" />,
    label: "Pickup & Delivery",
  },
  {
    icon: <Users className="text-green-600 text-lg sm:text-xl lg:text-3xl" />,
    label: "Experienced Team",
  },
  {
    icon: <Smile className="text-green-600 text-lg sm:text-xl lg:text-3xl" />,
    label: " 100% Happy Customers",
  },
];

export default function LaundryStats() {
  return (
    <>
      {/* Main About Section */}
      <section className="relative bg-white px-6 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Image Section */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
              <div className="relative aspect-square">
                <Image
                  src="/images/redesign/laundry-exp-img.svg"
                  alt="Laundry Experience"
                  fill
                  className=" object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1 w-full text-center lg:text-left lg:pl-2">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6 leading-tight text-secondary-green">
                <span className="text-primary-green">
                  The Best Laundry Service in Dubai,
                </span>{" "}
                Perfected Over Time
              </h1>
              <p className=" mb-5 sm:mb-8 leading-relaxed text-sm text-zinc-600  sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
                At Freshora, laundry is more than a service - it is a craft. Our
                team is committed to your peace of mind and emboldened by years
                of stain removal expertise to ensure the promise is delivered
                promptly and without hassle. Every garment is treated with great
                care, following strict standards to protect your clothes, your
                skin, and our planet.
              </p>

              {/* Features List */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base grid grid-cols-2">
                {[
                  "100% Customer Satisfaction",
                  "Free Collection & Delivery",
                  "Transparent, Affordable Pricing",
                  "Best Quality",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl text-secondary-green font-medium"
                  >
                    <RiCheckDoubleLine
                      size={30}
                      className="text-primary-green"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Contact CTA */}
              <div className="w-full bg-[#E4FFED] py-2.5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center border border-primary-green">
                <div className="text-center flex flex-col md:flex-row items-center justify-center gap-2 ">
                  <p className="text-secondary-green text-sm sm:text-base">
                    Call for Quality Services
                  </p>
                  <p className="text-base sm:text-lg lg:text-3xl font-bold text-primary-green">
                    <a
                      href="tel:+971509259667"
                      className="hover:text-green-600 transition-colors"
                    >
                      +971 50 925 9667
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-28">
            {[
              {
                icon: "/images/redesign/laundry-exp-save-time.svg",
                title: "Save Time & Money",
                desc: "Skip the traffic and waiting. We collect, clean, and return your clothes with no extra cost.",
              },
              {
                icon: "/images/redesign/laundry-exp-pay.svg",
                title: "Pay in Seconds",
                desc: "Book and pay online from any device - fast, secure, and effortless",
              },
              {
                icon: "/images/redesign/laundry-exp-eco.svg",
                title: "Eco-Friendly Care",
                desc: "We use gentle, non-toxic solutions that care for fabrics, skin, and the environment.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#F3F6F4] p-5 sm:p-6 lg:p-8 rounded shadow-md hover:shadow-lg transition relative flex flex-col items-center justify-center"
              >
                <h3 className="font-semibold text-secondary-green mb-4 mt-6 text-base sm:text-lg">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {card.desc}
                </p>
                {/* floater */}
                <div className="absolute -top-[25%] left-[50%] -translate-x-1/2 w-24 h-24 rounded-full border border-primary-green bg-white hidden sm:flex items-center justify-center">
                  <Image
                    src={card.icon}
                    alt="Laundry Experience"
                    height={50}
                    width={50}
                    className="w-12 h-auto object-fit"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="bg-white py-8 sm:py-10 lg:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="w-full">
            <h1 className="text-3xl font-medium text-center">
              <span className="text-primary-green">Why Choose Freshora</span>
              for Laundry Service in Dubai
            </h1>
            <h2 className="text-xl font-medium text-[#606060] text-center my-3">
              Get Your Clothes Collected & Delivered
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-3 sm:p-4">
                <div className="bg-white rounded-full shadow-md p-3 sm:p-5 mb-3 sm:mb-5 border border-gray-100">
                  {stat.icon}
                </div>
                <p className="font-bold text-gray-800 text-base sm:text-lg text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
