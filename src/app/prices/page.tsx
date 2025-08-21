"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Poppins } from "next/font/google"
import { FaTshirt, FaHandsWash, FaBed } from "react-icons/fa"
import { MdIron } from "react-icons/md"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ShoppingCart,  Zap, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import PickupForm from "@/component/SchedulePickupModal"
import AnimatedParticles from "@/component/AnimatedParticles"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

const ServiceBanner: React.FC = () => {
  return (
    <div
      className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/a-basket-of-laundry-and-public-laundromat-2024-11-27-17-08-56-utc.JPG?height=400&width=1200&text=Laundry+Machines+Background')`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-white mb-3 sm:mb-4">
          <Link href="/" className="hover:text-green-400 text-sm sm:text-base transition-colors">
            Home
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <Link href="/pricing" className="hover:text-green-400 text-sm sm:text-base transition-colors">
            Prices
          </Link>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Prices</h1>
      </div>
    </div>
  )
}

interface ServicePriceCardProps {
  icon: React.ElementType
  title: string
  price: string
  description: string
}

const ServicePriceCard: React.FC<ServicePriceCardProps> = ({ icon: Icon, title, price, description }) => {
 
  // function setShowForm(arg0: boolean) {
  //   throw new Error("Function not implemented.")
  // }

  return (
    <Card className="group relative flex flex-col items-center justify-between p-4 sm:p-6 text-center h-64 sm:h-72 md:h-80 transition-all duration-500 hover:scale-105 bg-white overflow-hidden shadow-none border-none">
      <div className="flex flex-col items-center justify-center flex-1 space-y-3 sm:space-y-4 transition-all duration-500 group-hover:space-y-2">
        <div className="bg-green-100 p-3 sm:p-4 rounded-full transition-all duration-500 group-hover:-translate-y-16 sm:group-hover:-translate-y-20 group-hover:opacity-0">
          <Icon size={32} className="text-green-600 sm:w-10 sm:h-10" />
        </div>
        <div className="space-y-2 transition-all duration-500 group-hover:-translate-y-6 sm:group-hover:-translate-y-8">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight px-2">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 px-2">{description}</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{price}</p>
        </div>
      </div>
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-4">
        <button       className="px-4 sm:px-6 py-2 bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md">
          Order Now
        </button>
        
      </div>
    </Card>
  )
}

const ServiceCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(1)
  const { width } = useWindowSize()

  const services = [
    { icon: FaTshirt, title: "Shirts Service", description: "Washed and Pressed", price: "$2.00" },
    { icon: FaHandsWash, title: "Day Dress Service", description: "Dry Clean", price: "$10.50" },
    { icon: MdIron, title: "Dry Cleaning", description: "Wash, Dry and Fold", price: "$2.00" },
    { icon: FaBed, title: "Bedding", description: "Bed Set (Wash and Press)", price: "$10.50" },
  ]

  useEffect(() => {
    if (width === 0) return // Avoid setting during SSR
    if (width >= 1280) setCardsToShow(4)
    else if (width >= 1024) setCardsToShow(3)
    else if (width >= 768) setCardsToShow(2)
    else setCardsToShow(1)
  }, [width])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const maxSlide = Math.max(0, services.length - cardsToShow)

  return (
    <div className="relative px-4 sm:px-8 md:px-12">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentSlide * 100) / cardsToShow}%)`,
            width: `${(services.length * 100) / cardsToShow}%`,
          }}
        >
          {services.map((service, index) => (
            <div key={index} className="px-2 sm:px-4" style={{ width: `${100 / services.length}%` }}>
              <ServicePriceCard {...service} />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-green-50 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide >= maxSlide}
          className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-green-50 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
        </button>
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface PackageCardProps {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  price: string
  originalPrice?: string
  isFeatured?: boolean
}

const PackageCard: React.FC<PackageCardProps> = ({ icon: Icon, title, features, price, originalPrice }) => {
  const [isExpanded, setIsExpanded] = useState(false)
   const [, setMobileOpen] = useState(false)
  
  const [showForm, setShowForm] = useState(false)

  return (
    <>
    <AnimatedParticles zIndex={5} />
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

const forGentleman = [
  { item: "Shirts/T-Shirts", washPress: "6.00", dryCleaning: "8.00", steamPressing: "3.00" },
  { item: "Trouser", washPress: "6.00", dryCleaning: "8.00", steamPressing: "3.00" },
  { item: "Kandura", washPress: "10.00", dryCleaning: "12.00", steamPressing: "6.00" },
  { item: "Ghatra", washPress: "8.00", dryCleaning: "10.00", steamPressing: "5.00" },
  { item: "Lungi", washPress: "6.00", dryCleaning: "8.00", steamPressing: "4.00" },
  { item: "Shorts", washPress: "6.00", dryCleaning: "8.00", steamPressing: "3.00" },
  { item: "Cap/Tie", washPress: "5.00", dryCleaning: "7.00", steamPressing: "3.00" },
  { item: "Jacket/Coat", washPress: "15.00", dryCleaning: "20.00", steamPressing: "8.00" },
  { item: "Waist Coat", washPress: "10.00", dryCleaning: "14.00", steamPressing: "5.00" },
  { item: "Suit (2pcs)", washPress: "-", dryCleaning: "25.00", steamPressing: "12.00" },
  { item: "Suit (3pcs)", washPress: "-", dryCleaning: "35.00", steamPressing: "15.00" },
  { item: "Salwar Kameez", washPress: "12.00", dryCleaning: "16.00", steamPressing: "8.00" },
  { item: "Inner Wear", washPress: "3.00", dryCleaning: "5.00", steamPressing: "2.00" },
  { item: "Socks/Handkerchief", washPress: "3.00", dryCleaning: "4.00", steamPressing: "2.00" },
  { item: "Sweater", washPress: "10.00", dryCleaning: "14.00", steamPressing: "5.00" },
];


const forLadies = [
  { item: "T-Shirts/Shirts", washPress: "6.00", dryCleaning: "8.00", steamPressing: "3.00" },
  { item: "Trouser", washPress: "6.00", dryCleaning: "8.00", steamPressing: "3.00" },
  { item: "Abaya", washPress: "10.00", dryCleaning: "14.00", steamPressing: "7.00" },
  { item: "Scarf/Dupatta", washPress: "6.00", dryCleaning: "8.00", steamPressing: "4.00" },
  { item: "Skirt/Shorts", washPress: "6.00", dryCleaning: "8.00", steamPressing: "3.00" },
  { item: "Full Dress", washPress: "10.00", dryCleaning: "15.00", steamPressing: "6.00" },
  { item: "Salwar Kameez", washPress: "12.00", dryCleaning: "16.00", steamPressing: "8.00" },
  { item: "Saree", washPress: "15.00", dryCleaning: "20.00", steamPressing: "10.00" },
  { item: "Blouse", washPress: "8.00", dryCleaning: "10.00", steamPressing: "4.00" },
  { item: "Coat/Jacket", washPress: "15.00", dryCleaning: "20.00", steamPressing: "8.00" },
  { item: "Suit (2pcs)", washPress: "-", dryCleaning: "25.00", steamPressing: "12.00" },
  { item: "Suit (3pcs)", washPress: "-", dryCleaning: "35.00", steamPressing: "15.00" },
  { item: "Sweater", washPress: "10.00", dryCleaning: "14.00", steamPressing: "5.00" },
  { item: "Inner Wear", washPress: "3.00", dryCleaning: "5.00", steamPressing: "2.00" },
];


const householdItems = [
  { item: "Police Dress/Safari Dress", washPress: "14.00", dryCleaning: "18.00", steamPressing: "8.00" },
  { item: "Duvet Cover (Single/Double)", washPress: "10.00/12.00", dryCleaning: "12.00/14.00", steamPressing: "6.00/8.00" },
  { item: "Blanket (Single/Double)", washPress: "22.00/30.00", dryCleaning: "30.00/35.00", steamPressing: "-" },
  { item: "Bed Spread (Single/Double)", washPress: "20.00/25.00", dryCleaning: "25.00/30.00", steamPressing: "-" },
  { item: "Bed Sheet (Single/Double)", washPress: "10.00/12.00", dryCleaning: "12.00/14.00", steamPressing: "6.00/8.00" },
  { item: "Pillow Case", washPress: "3.00", dryCleaning: "4.00", steamPressing: "2.00" },
  { item: "Cushion Cover", washPress: "4.00", dryCleaning: "5.00", steamPressing: "3.00" },
  { item: "Pillow/Cushion", washPress: "15.00", dryCleaning: "20.00", steamPressing: "-" },
  { item: "Bath Rope", washPress: "10.00", dryCleaning: "12.00", steamPressing: "-" },
  { item: "Bath Towel (M/L)", washPress: "4.00/6.00", dryCleaning: "5.00/7.00", steamPressing: "-" },
  { item: "Hand/Face Towel", washPress: "3.00", dryCleaning: "4.00", steamPressing: "-" },
  { item: "Bath Mat (M/L)", washPress: "3.00/10.00", dryCleaning: "5.00/15.00", steamPressing: "-" },
  { item: "Table Cloth/Table Napkins", washPress: "8.00/3.00", dryCleaning: "10.00/4.00", steamPressing: "5.00/2.00" },
  { item: "Shoe", washPress: "40.00/50.00", dryCleaning: "45.00/55.00", steamPressing: "-" },
  { item: "Wedding Dress Normal", washPress: "50.00/80.00", dryCleaning: "80.00/100.00", steamPressing: "30.00/45.00" },
  { item: "Curtains (Per Sq meter)", washPress: "10.00/20.00", dryCleaning: "15.00/25.00", steamPressing: "10.00/20.00" },
  { item: "Normal Carpet (Per Sq meter)", washPress: "20.00", dryCleaning: "20.00", steamPressing: "-" },
  { item: "Hand woven Carpet (Per Sq meter)", washPress: "25.00", dryCleaning: "35.00", steamPressing: "-" },
];

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("popular")

  return (
    <>
      <ServiceBanner />
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h4
              className={`text-green-600 font-medium mb-2 sm:mb-3 lg:mb-4 text-xs sm:text-sm lg:text-base ${poppins.className}`}
            >
              [ Affordable Prices ]
            </h4>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 px-2">
              Our Dry Cleaning & Laundry Prices
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
              Our prices are simple and affordable which are easy on pocket in comparison with the high street prices
            </p>
          </div>

          <div className="mb-12 sm:mb-16 lg:mb-20">
            <ServiceCarousel />
          </div>

          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 px-2">
              Full Price Table
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
              Laundry service pricing is volume based. Dry cleaning is priced by item type.
              <br className="hidden sm:block" />
              Give us a call to review pricing and services today!
            </p>
          </div>

          <Card className="mb-12 sm:mb-16 lg:mb-20 shadow-lg border-none min-h-[600px]">
           <CardContent className="p-3 sm:p-6 lg:p-8">
  <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="w-full">
    <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
      <TabsList className="flex flex-col sm:grid sm:grid-cols-3 bg-gray-50 gap-2 sm:gap-0 p-2 w-full max-w-4xl">
        {[
          { value: "popular", label: "Most Popular Items" },
          { value: "full", label: "Full Apparel List" },
          { value: "other", label: "Household Items" },
        ].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`
              w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 text-sm sm:text-sm lg:text-base font-semibold
              min-h-[48px] sm:min-h-[50px] lg:min-h-[60px]
              bg-white text-black
              transition-all duration-200 border border-transparent
              hover:bg-green-50 hover:text-green-700
              touch-manipulation cursor-pointer
              rounded-none
              data-[state=active]:bg-green-700 data-[state=active]:text-white data-[state=active]:border-green-700
            `}
          >
            <span className="text-center leading-tight">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>

    {/* Most Popular */}
    <TabsContent value="popular" className="mt-4 sm:mt-6">
      <div className="space-y-0">
        {[
          { item: "Shirts/T-Shirts", price: "6.00" },
          { item: "Trouser", price: "6.00" },
          { item: "Blouse", price: "8.00" },
          { item: "Coat/Jacket", price: "15.00" },
          { item: "Suit (2pcs)", price: "25.00" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 py-4 sm:py-4 hover:bg-gray-50 transition-colors touch-manipulation"
          >
            <span className="text-gray-700 text-base sm:text-base pr-4 flex-1 leading-relaxed">
              {item.item}
            </span>
            <span className="font-bold text-green-600 text-lg sm:text-lg whitespace-nowrap">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </TabsContent>

    {/* Full Apparel List */}
    <TabsContent value="full" className="mt-4 sm:mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-12">
        <div className="space-y-0">
          {forGentleman.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-4 sm:py-4 hover:bg-gray-50 transition-colors touch-manipulation"
            >
              <span className="text-gray-700 text-base sm:text-base pr-4 flex-1 leading-relaxed">
                {item.item}
              </span>
              <span className="font-bold text-green-600 text-lg sm:text-lg whitespace-nowrap">
                {item.washPress}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-0 mt-6 lg:mt-0">
          {forLadies.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-4 sm:py-4 hover:bg-gray-50 transition-colors touch-manipulation"
            >
              <span className="text-gray-700 text-base sm:text-base pr-4 flex-1 leading-relaxed">
                {item.item}
              </span>
              <span className="font-bold text-green-600 text-lg sm:text-lg whitespace-nowrap">
                {item.washPress}
              </span>
            </div>
          ))}
        </div>
      </div>
    </TabsContent>

    {/* Household Items */}
    <TabsContent value="other" className="mt-4 sm:mt-6">
      <div className="space-y-0">
        {householdItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 py-4 sm:py-4 hover:bg-gray-50 transition-colors touch-manipulation"
          >
            <span className="text-gray-700 text-base sm:text-base pr-4 flex-1 leading-relaxed">
              {item.item}
            </span>
            <span className="font-bold text-green-600 text-lg sm:text-lg whitespace-nowrap">
              {item.washPress}
            </span>
          </div>
        ))}
      </div>
    </TabsContent>
  </Tabs>
</CardContent>

          </Card>

          <div className="text-center mb-12 sm:mb-16">
            <h4 className={`text-green-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base ${poppins.className}`}>
              [ What we offer ]
            </h4>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 px-4">
              Price Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
              Our prices are simple and affordable which are easy on pocket
              <br className="hidden sm:block" />
              in comparison with the high street prices
            </p>
          </div>

         <div className="flex justify-center gap-6 sm:gap-11 flex-wrap">

            <PackageCard
              icon={ShoppingCart}
              title="Standard Package"
              description="80 Clothes Per Month"
              features={[
                "4 T-Shirts",
                "1 Pair of Jeans",
                "3 Button/Down Shirts",
                "1 Pair of Shorts",
                "7 Pairs of Underwear",
                "6 Pairs of Socks",
                "1 Towel",
                "1 Set of Sheets",
              ]}
              originalPrice="349.00"
              price="349.00"
            />
            {/* <PackageCard
              icon={ClipboardList}
              title="Enterprise Package"
              description="80 Clothes Per Month"
              features={[
                "4 T-Shirts",
                "2 Pairs of Jeans",
                "4 Button/Down Shirts",
                "2 Pair of Shorts",
                "8 Pairs of Underwear",
                "6 Pairs of Socks",
                "2 Towel",
                "2 Set of Sheets",
              ]}
              originalPrice="$399.00"
              price="$399.00"
            /> */}
            <PackageCard
              icon={Zap}
              title="Premium Package"
              description="80 Clothes Per Month"
              features={[
                "6 T-Shirts",
                "3 Pairs of Jeans",
                "6 Button/Down Shirts",
                "3 Pair of Shorts",
                "9 Pairs of Underwear",
                "8 Pairs of Socks",
                "2 Towel",
                "3 Set of Sheets",
              ]}
              originalPrice="449.00"
              price="449.00"
              isFeatured={true}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingSection