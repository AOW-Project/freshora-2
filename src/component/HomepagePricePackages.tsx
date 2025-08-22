"use client"

import type React from "react"
import { useState } from "react"
// --- 1. Import useRouter to handle navigation ---
import { useRouter } from "next/navigation"
import { FaTshirt } from "react-icons/fa"
import { MdIron } from "react-icons/md"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
// The PickupForm is no longer needed directly in the card
// import PickupForm from "@/component/SchedulePickupModal"

// --- 2. Define your package data in a structured array ---
// This should be the same as the one on your prices page
const packagesData = [
  {
    id: 'standard_home', // Use a slightly different ID if needed, or keep it the same
    icon: FaTshirt,
    title: "Standard Package",
    description: "50 Clothes Per Month",
    features: [
      "4 T-Shirts", "1 Pairs of Jeans", "3 Button-Down Shirts", "1 Pair of Shorts",
      "7 Pairs of Underwear", "6 Pairs of Socks", "1 Towel", "1 Set of Sheets",
    ],
    originalPrice: 349.00,
    price: 349.00,
  },
  {
    id: 'premium_home',
    icon: MdIron,
    title: "Premium Package",
    description: "80 Clothes Per Month",
    features: [
      "6 T-Shirts", "3 Pairs of Jeans", "4 Button-Down Shirts", "2 Pair of Shorts",
      "9 Pairs of Underwear", "8 Pairs of Socks", "2 Towel", "2 Set of Sheets",
    ],
    originalPrice: 449.00,
    price: 449.00,
  }
];

// --- 3. Update the PackageCard component to accept props ---
interface PackageCardProps {
  packageInfo: typeof packagesData[0];
  onOrderNow: (packageId: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageInfo, onOrderNow }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, icon: Icon, title, features, price, originalPrice } = packageInfo;

  return (
    <Card
      className="group relative flex w-full max-w-sm flex-col cursor-pointer border-none bg-white transition-all duration-300 hover:shadow-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent
        className={`flex h-full flex-col p-6 transition-all duration-300 ${
          isExpanded ? "pt-4 pb-4" : "group-hover:pt-4 group-hover:pb-4"
        }`}
      >
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-green-100 p-4 text-green-600">
            <Icon size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm font-medium text-green-600">Clothes Per Month</p>
        </div>
        <ul className="mb-4 space-y-2 text-sm text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 pt-4 text-center">
          {originalPrice && <p className="mb-1 text-sm text-gray-500 line-through">{originalPrice.toFixed(2)}</p>}
          <p className="text-2xl font-bold text-gray-900">{price.toFixed(2)}</p>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrderNow(id);
            }}
            className="mt-4 w-full bg-green-600 py-3 font-semibold text-white transition-colors duration-300 hover:bg-green-700"
          >
            Order Now
          </button>
        </div>
      </CardContent>
    </Card>
  );
};


// --- 4. Update the main HomepagePricePackages component ---
const HomepagePricePackages = () => {
  const router = useRouter();

  const handleOrderNow = (packageId: string) => {
    const selectedPackage = packagesData.find(p => p.id === packageId);
    if (selectedPackage) {
      localStorage.setItem('cartPackage', JSON.stringify(selectedPackage));
      router.push('/cart');
    }
  };

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: '#f3f6f4' }}>
      <section className="relative z-10 py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h4 className="text-green-600 font-medium mb-2">[ What we offer ]</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Price Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our prices are simple and affordable which are easy on pocket in comparison with the high street prices.
            </p>
          </div>
          
          {/* --- 5. Render the cards dynamically --- */}
          <div className="flex justify-center gap-6 sm:gap-11 flex-wrap">
            {packagesData.map((pkg) => (
              <PackageCard 
                key={pkg.id}
                packageInfo={pkg}
                onOrderNow={handleOrderNow}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomepagePricePackages