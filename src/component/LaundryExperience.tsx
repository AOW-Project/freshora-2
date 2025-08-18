"use client"

import { useEffect, useState } from "react"
import { FaTshirt, FaWater, FaUserCheck } from "react-icons/fa"
import { GiClothes } from "react-icons/gi"
import Image from "next/image"
import { Phone, Clock, CreditCard, Leaf, CheckCircle2 } from "lucide-react"
import img01 from "../../public/images/img01.jpg"

const statsData = [
  { icon: <FaTshirt className="text-green-600 text-lg sm:text-xl lg:text-3xl" />, value: 50000, suffix: "+", label: "Shirts Washed" },
  { icon: <FaWater className="text-green-600 text-lg sm:text-xl lg:text-3xl" />, value: 50, suffix: "", label: "Washing Machines" },
  { icon: <GiClothes className="text-green-600 text-lg sm:text-xl lg:text-3xl" />, value: 10000, suffix: "+", label: "Dry Cleaned Items" },
  { icon: <FaUserCheck className="text-green-600 text-lg sm:text-xl lg:text-3xl" />, value: 100, suffix: "%", label: "Happy Customers" },
]

export default function LaundryStats() {
  const [counts, setCounts] = useState(statsData.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) =>
          count < statsData[i].value
            ? Math.min(count + Math.ceil(statsData[i].value / 50), statsData[i].value)
            : count,
        ),
      )
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Main About Section */}
      <section className="relative bg-[#f3f6f4] py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            
            {/* Image Section */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
              <div className="relative aspect-square">
                <Image
                  src={img01}
                  alt="Laundry Experience"
                  fill
                  className="shadow-lg object-cover rounded-lg"
                  priority
                />
                {/* Floating Circle */}
                <div className="absolute bottom-[-20px] right-[-20px] sm:bottom-6 sm:right-[-40px] bg-green-500 text-white rounded-full w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center text-center shadow-2xl">
                  <span className="text-2xl sm:text-4xl font-extrabold">25</span>
                  <span className="text-[10px] sm:text-sm font-semibold leading-tight px-1">
                    years of experience
                  </span>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1 w-full text-center lg:text-left lg:pl-8">
              <p className="text-green-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                More than 25 Years of Experience
              </p>
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-6 leading-tight">
                We are Passionate About Laundry
              </h2>
              <p className="text-gray-600 mb-5 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
                We are professionals in the laundry and dry cleaning business, always up to date with
                the latest technologies, cleaning methods, and solutions for stains and delicate fabrics.
                We also follow the highest standards of integrity and environmental safety.
              </p>

              {/* Features List */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base">
                {[
                  "100% Customer Satisfaction",
                  "Free Collection & Delivery",
                  "Affordable Prices",
                  "Best Quality",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 justify-center lg:justify-start">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Contact CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                  <Phone className="text-green-700 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-gray-500 text-xs sm:text-sm">Call for Quality Services</p>
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-green-700">1 (800) 765-43-21</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-28">
            {[
              { icon: <Clock className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />, title: "Save Time & Money", desc: "We pick up and deliver for free—no more wasted trips to the laundromat." },
              { icon: <CreditCard className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />, title: "Pay Online in Seconds", desc: "Manage your billing and account online easily from any device." },
              { icon: <Leaf className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />, title: "Eco-Friendly", desc: "We use safe, clean, perc-free solvents so you and the Earth stay safe." },
            ].map((card, i) => (
              <div key={i} className="bg-white p-5 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="mb-3 sm:mb-4">{card.icon}</div>
                <h3 className="font-semibold text-green-600 mb-2 text-base sm:text-lg">{card.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-3 sm:p-4">
                <div className="bg-white rounded-full shadow-md p-3 sm:p-5 mb-3 sm:mb-5 border border-gray-100">
                  {stat.icon}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {counts[i]}{stat.suffix}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
