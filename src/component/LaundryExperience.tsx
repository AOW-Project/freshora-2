"use client"

import { useEffect, useState } from "react"
import { FaTshirt, FaWater, FaUserCheck } from "react-icons/fa"
import { GiClothes } from "react-icons/gi"
import Image from "next/image"
import { Phone, Clock, CreditCard, Leaf, CheckCircle2 } from "lucide-react"
import img01 from '../../public/images/img01.jpg';

const statsData = [
  {
    icon: <FaTshirt className="text-green-600 text-xl sm:text-2xl lg:text-3xl" />,
    value: 50000,
    suffix: "+",
    label: "Shirts Washed",
  },
  {
    icon: <FaWater className="text-green-600 text-xl sm:text-2xl lg:text-3xl" />,
    value: 50,
    suffix: "",
    label: "Washing Machines",
  },
  {
    icon: <GiClothes className="text-green-600 text-xl sm:text-2xl lg:text-3xl" />,
    value: 10000,
    suffix: "+",
    label: "Dry Cleaned Items",
  },
  {
    icon: <FaUserCheck className="text-green-600 text-xl sm:text-2xl lg:text-3xl" />,
    value: 100,
    suffix: "%",
    label: "Happy Customers",
  },
]

export default function LaundryStats() {
  const [counts, setCounts] = useState(statsData.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) =>
          count < statsData[i].value ? Math.min(count + Math.ceil(statsData[i].value / 50), statsData[i].value) : count,
        ),
      )
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="relative bg-[#f3f6f4] py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            <div className="relative flex-shrink-0 w-full lg:w-1/2 max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
              <Image
  src={img01}
  alt="Laundry Experience"
  fill
  className="shadow-lg object-cover"
/>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 bg-green-600 text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex flex-col items-center justify-center text-center shadow-lg">
                  <span className="text-lg sm:text-2xl lg:text-3xl font-extrabold">25</span>
                  <span className="text-xs sm:text-sm text-center leading-tight px-1">years of experience</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-green-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                More than 25 Years of Experience
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                We are Passionate About Laundry
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
                We are professionals in the laundry and dry cleaning business, which means we always stay up to date on
                the latest technologies, cleaning methods, and solutions for dealing with stains or delicate fabrics.
                Plus, we maintain the highest standards of business integrity by following local and national
                regulations and environmental safety rules.
              </p>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base">
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span>100% Customer Satisfaction</span>
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span>Free Collection & Delivery</span>
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span>Affordable Prices</span>
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span>Best Quality</span>
                </li>
              </ul>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                  <Phone className="text-green-700 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-gray-500 text-xs sm:text-sm">Call for Quality Services</p>
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-green-700">1 (800) 765-43-21</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center sm:text-left">
              <Clock className="text-green-600 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 mx-auto sm:mx-0" />
              <h3 className="font-semibold text-green-600 mb-2 sm:mb-3 text-base sm:text-lg">Save Time & Money</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                No more wasted time driving to the laundromats, we pickup and deliver for free!
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center sm:text-left">
              <CreditCard className="text-green-600 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 mx-auto sm:mx-0" />
              <h3 className="font-semibold text-green-600 mb-2 sm:mb-3 text-base sm:text-lg">Pay Online in Seconds</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Manage your Press account and billing online from your smartphone or computer.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <Leaf className="text-green-600 mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 mx-auto sm:mx-0" />
              <h3 className="font-semibold text-green-600 mb-2 sm:mb-3 text-base sm:text-lg">Eco-Friendly</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We use safe and clean perc-free solvents so you and the Earth can look good.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12 lg:py-16 xl:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 text-center">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-3 sm:p-4 lg:p-6">
                <div className="bg-white rounded-full shadow-lg p-3 sm:p-4 lg:p-5 mb-3 sm:mb-4 lg:mb-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                  {counts[i]}
                  {stat.suffix}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm lg:text-base leading-tight px-1 sm:px-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
