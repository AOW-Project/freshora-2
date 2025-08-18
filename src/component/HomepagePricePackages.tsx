"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { FaTshirt, FaHandsWash } from "react-icons/fa"
import { MdIron } from "react-icons/md"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import PickupForm from "@/component/SchedulePickupModal"

interface PackageCardProps {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  price: string
  isFeatured?: boolean
  originalPrice?: string
}

const PackageCard: React.FC<PackageCardProps> = ({ icon: Icon, title, description, features, price, isFeatured, originalPrice }) => {
  const [isHovered, setIsHovered] = useState(false)
     const [, setMobileOpen] = useState(false)
    
    const [showForm, setShowForm] = useState(false)
      const [isExpanded, setIsExpanded] = useState(false)
    

  return (
    <>
<Card
      className="group relative flex flex-col transition-all duration-300 hover:shadow-lg bg-white border-none cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent
        className={`flex flex-col h-full p-6 transition-all duration-300 ${
          isExpanded ? "pt-4 pb-4" : "group-hover:pt-4 group-hover:pb-4"
        }`}
      >
        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="p-4 rounded-full bg-green-100 text-green-600 mb-3">
            <Icon size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-green-600 font-medium text-sm">Clothes Per Month</p>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-4 text-gray-700 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="text-center border-t border-gray-100 pt-4">
          {originalPrice && <p className="text-gray-500 line-through text-sm mb-1">{originalPrice}</p>}
          <p className="text-2xl font-bold text-gray-900">{price}</p>
        </div>

        {/* Button that slides in */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
       <button
  onClick={(e) => {
    e.stopPropagation(); // prevents Card onClick from firing
    setShowForm(true);
    setMobileOpen(false);
  }}
  className="w-full mt-4 py-3 bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-300"
>
  Order Now
</button>

          <PickupForm open={showForm} onClose={() => setShowForm(false)} />
        </div>
      </CardContent>
    </Card>
    {showForm && <PickupForm open={showForm} onClose={() => setShowForm(false)} />}
</>
  )
}

const HomepagePricePackages = () => {
  return (
    // 1. Add a relative parent div with the background color and overflow-hidden
    <div className="relative overflow-hidden" style={{ backgroundColor: '#f3f6f4' }}>
      
      {/* 2. Add the decorative shape Image component */}
    { /* <Image
        // IMPORTANT: Replace 'price-shape.png' with your actual image file name
        src="/images/price-shape.png" 
        alt="Decorative background shape"
        fill
        style={{ objectFit: "contain", objectPosition: "bottom right" }}
        className="-z-0 opacity-40" // Use z-index to place it behind content
      /> */ }
      
      {/* 3. Make the section itself transparent and ensure it's in front of the shape */}
      <section className="relative z-10 py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-green-600 font-medium mb-2">[ What we offer ]</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Price Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our prices are simple and affordable which are easy on pocket in comparison with the high street prices.
            </p>
          </div>
          <div className="flex justify-center gap-6 sm:gap-11 flex-wrap">
  <PackageCard
    icon={FaTshirt}
    title="Standard Package"
    description="50 Clothes Per Month"
    features={[
      "4 T-Shirts",
      "1 Pairs of Jeans",
      "3 Button-Down Shirts",
      "1 Pair of Shorts",
      "7 Pairs of Underwear",
      "6 Pairs of Socks",
      "1 Towel",
      "1 Set of Sheets",
    ]}
    originalPrice="349.00"
    price="349.00"
  />
  <PackageCard
    icon={MdIron}
    title="Premium Package"
    description="80 Clothes Per Month"
    features={[
      "6 T-Shirts",
      "3 Pairs of Jeans",
      "4 Button-Down Shirts",
      "2 Pair of Shorts",
      "9 Pairs of Underwear",
      "8 Pairs of Socks",
      "2 Towel",
      "2 Set of Sheets",
    ]}
    originalPrice="449.00"
    price="449.00"
  />
</div>

        </div>
      </section>
    </div>
  )
}

export default HomepagePricePackages
