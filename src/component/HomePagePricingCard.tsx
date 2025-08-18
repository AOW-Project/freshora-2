"use client"

import type React from "react"
import { useState } from "react"
import { FaTshirt, FaHandsWash, FaTools } from "react-icons/fa"
import { MdIron } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ServicePriceCardProps {
  icon: React.ElementType
  title: string
  price: string
  description: string
}

const ServicePriceCard: React.FC<ServicePriceCardProps> = ({ icon: Icon, title, price, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden group cursor-pointer h-[180px] sm:h-[200px] lg:h-[220px] transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)} // Added click for mobile interaction
    >
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ease-in-out p-4 ${
          isHovered ? "opacity-50 translate-y-[-30px] sm:translate-y-[-50px]" : "opacity-100 translate-y-0"
        }`}
      >
        <Icon size={32} className="text-green-600 mb-3 sm:mb-4 sm:text-[40px]" />
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 px-2">{description}</p>
        <p className="text-xl sm:text-2xl font-bold text-green-600">{price}</p>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white transition-all duration-300 ease-in-out ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-50"
        }`}
      >
        <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3">Order Now</Button>
      </div>
    </Card>
  )
}

const HomepagePricingCards = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h4 className="text-green-600 font-medium mb-2 text-sm sm:text-base">[ Affordable Prices ]</h4>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Dry Cleaning & Laundry Prices
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our prices are simple and affordable which are easy on pocket in comparison with the high street prices.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ServicePriceCard icon={FaTshirt} title="Blanket Service" description="Washed and Pressed" price="$25.00" />
          <ServicePriceCard
            icon={FaHandsWash}
            title="Curtains Service"
            description="Washed and Pressed"
            price="$22.00"
          />
          <ServicePriceCard icon={MdIron} title="Ironing Service" description="Iron and Fold" price="$3.00" />
          <ServicePriceCard icon={FaTools} title="Repairs & Alterations" description="Simple Sewing" price="$12.00" />
        </div>
      </div>
    </section>
  )
}

export default HomepagePricingCards
