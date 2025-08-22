"use client"

import React, { useState } from "react"
import { FaTshirt, FaHandsWash, FaTools } from "react-icons/fa"
import { MdIron } from "react-icons/md"
import { Card } from "@/components/ui/card"
import SchedulePickupModal from "@/component/SchedulePickupModal" // ✅ import your modal form

interface ServicePriceCardProps {
  icon: React.ElementType
  title: string
  price: string
  description: string
  onOrderClick: () => void
}

const ServicePriceCard: React.FC<ServicePriceCardProps> = ({ icon: Icon, title, price, description, onOrderClick }) => {
  return (
    <Card className="relative flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-hidden group h-[200px] lg:h-[220px] transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <Icon size={40} className="text-green-600 mb-3 sm:mb-4" />
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 px-2">{description}</p>
        <p className="text-xl sm:text-2xl font-bold text-green-600">{price}</p>
      </div>

      {/* Order Button → opens modal */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
        <button
          onClick={onOrderClick}
          className="w-full py-2 sm:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base"
        >
          Order Now
        </button>
      </div>
    </Card>
  )
}

const HomepagePricingCards = () => {
  const [modalOpen, setModalOpen] = useState(false)

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

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ServicePriceCard
            icon={FaTshirt}
            title="Blanket Service"
            description="Washed and Pressed"
            price="$25.00"
            onOrderClick={() => setModalOpen(true)}
          />
          <ServicePriceCard
            icon={FaHandsWash}
            title="Curtains Service"
            description="Washed and Pressed"
            price="$22.00"
            onOrderClick={() => setModalOpen(true)}
          />
          <ServicePriceCard
            icon={MdIron}
            title="Ironing Service"
            description="Iron and Fold"
            price="$3.00"
            onOrderClick={() => setModalOpen(true)}
          />
          <ServicePriceCard
            icon={FaTools}
            title="Repairs & Alterations"
            description="Simple Sewing"
            price="$12.00"
            onOrderClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      {/* ✅ Modal connected here */}
      <SchedulePickupModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

export default HomepagePricingCards
