"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/app/context/cart-context"; // ✅ Import cart context
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { FaTshirt } from "react-icons/fa";
import { MdIron } from "react-icons/md";
import MapSection from "./map-section";

// --- Packages Data ---
const packagesData = [
  {
    id: "standard_home",
    icon: FaTshirt,
    title: "Standard Package",
    description: "",
    features: [
      "4 T-Shirts",
      "2 Pairs of Jeans",
      "3 Button-Down Shirts",
      "2 Pair of Shorts",
      "14 Pairs of Underwear",
      "6 Pairs of Socks",
      "1 Towel",
      "1 Set of Bedsheets single",
    ],
    originalPrice: 349.0,
    price: 149.0,
  },
  // {
  //   id: "premium_home",
  //   icon: MdIron,
  //   title: "Premium Package",
  //   description: "",
  //   features: [
  //     "6 T-Shirts",
  //     "3 Pairs of Jeans",
  //     "4 Button-Down Shirts",
  //     "2 Pair of Shorts",
  //     "9 Pairs of Underwear",
  //     "8 Pairs of Socks",
  //     "2 Towel",
  //     "2 Set of Sheets",
  //   ],
  //   originalPrice: 449.0,
  //   price: 449.0,
  // },
];

// --- Package Card ---
interface PackageCardProps {
  packageInfo: (typeof packagesData)[0];
  onOrderNow: (packageId: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageInfo,
  onOrderNow,
}) => {
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
          {/* <p className="text-sm font-medium text-green-600">Clothes Per Month</p> */}
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
          {originalPrice && (
            <p className="mb-1 text-sm text-gray-500 line-through">
              {originalPrice.toFixed(2)}
            </p>
          )}
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

// get serviceId and itemsid for the packages

async function getFirstServiceItem(slug: string) {
  try {
    const response = await fetch(
      `https://freshora-backend-u9xy.onrender.com/api/packages/${slug}`
    );
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null; // return null on bad response
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching service item:", error);
    return null; // return null on network error
  }
}

// --- Main Pickup Packages Component ---
const PickupPackages: React.FC = () => {
  const router = useRouter();
  const { replaceCart } = useCart(); // ✅ Use cart context

  const [serviceItem, setServiceItem] = useState<{
    id: string;
    serviceId: string;
  } | null>(null);

  useEffect(() => {
    async function fetchItem() {
      const item = await getFirstServiceItem("standard-package-service");
      setServiceItem(item);
    }
    fetchItem();
  }, []);

  console.log(serviceItem?.id, serviceItem?.serviceId);

  const handleOrderNow = async (packageId: string) => {
    const selectedPackage = packagesData.find((p) => p.id === packageId);
    if (selectedPackage) {
      const packageItems = selectedPackage.features.map((feature, index) => ({
        // hardcoding the id for fallback
        id: `${serviceItem?.serviceId || "cmfuocbsd0000t5vs79sqikpa"}-${
          serviceItem?.id || "cmfuocbtx0002t5vsmzpfdlqx"
        }`,
        // id: `cmfuocbsd0000t5vs79sqikpa-cmfuocbtx0002t5vsmzpfdlqx`,
        name: feature,
        category: "Package Item",
        serviceType: selectedPackage.title,
        price: selectedPackage.price / selectedPackage.features.length, // Distribute price
        quantity: 1,
        serviceSlug: "package-service",
      }));

      await replaceCart(packageItems); // Replace cart with new package
      router.push("/cart"); // Or `/pickup-form` if that's the next step
    }
  };

  return (
    <section className="flex flex-col sm:flex-row justify-center  p-6 md:px-12 lg:px-24 items-stretch gap-6 mb-0 md:mb-8 lg:mb-16">
      <div className=" w-full flex-grow md:pr-16">
        <div className="flex justify-end gap-6 sm:gap-11">
          {packagesData.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageInfo={pkg}
              onOrderNow={handleOrderNow}
            />
          ))}
        </div>
      </div>
      {/* map */}
      <div className="flex items-stretch w-full rounded-lg overflow-hidden">
        <iframe
          className="h-[100%] w-full"
          title="Freshora Laundry Location"
          src="https://www.google.com/maps?q=Shop%20No%204%2C%20Azizi%20Riviera%2042%2C%20Meydan%2C%20Al%20Merkadh%2C%20Dubai%20UAE&output=embed"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Map showing Freshora Laundry at Shop no 4, Azizi Riviera 42, Meydan, Dubai"
        />
      </div>
    </section>
  );
};

export default PickupPackages;
