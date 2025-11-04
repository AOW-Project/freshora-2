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
import { FaArrowDownLong } from "react-icons/fa6";
import Image from "next/image";

// Small Cards

interface SmallPackageCardProps {
  title: string;
  price: number;
  description: string;
}

function SmallPackageCard({
  title,
  price,
  description,
}: SmallPackageCardProps) {
  const router = useRouter();

  const handleOrderClick = () => {
    router.push("/services");
  };

  return (
    <div className="w-full h-full min-h-[280px] border border-[#CCCCCC]  overflow-hidden">
      {/* Top section */}
      <div className="bg-[#F3F6F4] h-1/2 flex flex-col justify-evenly items-center text-secondary-green p-2 sm:p-4">
        <h2 className=" text-base sm:text-2xl md:text-3xl font-bold text-secondary-green py-2 ">
          {title}
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-normal flex items-center gap-2">
          {price.toFixed(2)} <span className="text-xl font-medium">AED</span>
        </h3>
      </div>

      {/* Bottom section */}
      <div className="bg-white h-1/2 p-4 flex items-center text-secondary-green">
        <div className="w-full flex flex-col items-center justify-center">
          <h3 className="text-zinc-600 py-2 text-sm sm:text-xl font-medium text-center">
            {description}
          </h3>
          <button
            onClick={handleOrderClick}
            className="mt-4 px-7 sm:px-20 py-3  text-sm sm:text-base rounded bg-secondary-green font-semibold text-white transition-colors duration-300 hover:bg-white cursor-pointer cta-button"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}

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
  const { id, icon: Icon, title, features, price, originalPrice } = packageInfo;

  return (
    <Card className="group relative flex w-full flex-col cursor-pointer rounded-none border border-[#CCCCCC] p-0 m-0 bg-white transition-all duration-300">
      <CardContent
        className={`flex h-full flex-col p-0 m-0 transition-all duration-300`}
      >
        {/* header */}
        <div className="relative px-10 pt-6 py-12 flex flex-col items-center text-center text-white bg-primary-green">
          <h3 className="text-3xl font-bold  text-white">{title}</h3>
          <div className=" py-2 flex items-center gap-3 text-center">
            {originalPrice && (
              <p className="text-3xl font-medium text-white line-through">
                {originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-3xl font-normal text-white">
              {price.toFixed(2)} AED
            </p>
          </div>
          <div className=" border border-primary-green absolute -bottom-[10%] left-[50%] -translate-x-[50%] rounded-full bg-white p-2 text-green-600">
            <FaArrowDownLong size={20} />
          </div>
        </div>
        <div className="w-full py-6 px-4 bg-[#F3F6F4]">
          <h2 className="text-xl text-center font-medium text-primary-green my-3">
            The Cost of Clean Clothes Benefits
          </h2>
          <div className="w-full flex justify-center">
            <div className="max-w-fit">
              <ul className="mb-4 space-y-2 text-sm text-gray-700">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start text-lg font-medium gap-2"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOrderNow(id);
              }}
              className="mt-4 px-20 py-3 rounded bg-secondary-green font-semibold text-white transition-colors duration-300 hover:bg-white cursor-pointer cta-button"
            >
              Order Now
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// get serviceId and itemsid for the packages

async function getFirstServiceItem(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/packages/${slug}`
    );
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

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
  const { replaceCart } = useCart(); // Use cart context

  const [serviceItem, setServiceItem] = useState<{
    id: string;
    serviceId: string;
  } | null>(null);

  // useEffect(() => {
  //   async function fetchItem() {
  //     const item = await getFirstServiceItem("standard-package-service");
  //     setServiceItem(item);
  //   }
  //   fetchItem();
  // }, []);

  console.log(serviceItem?.id, serviceItem?.serviceId);

  const handleOrderNow = async (packageId: string) => {
    const selectedPackage = packagesData.find((p) => p.id === packageId);
    if (selectedPackage) {
      const packageItems = selectedPackage.features.map((feature, index) => ({
        // added dynamic data and hardcoded fallback data
        id: `${serviceItem?.serviceId || "cmfwe5ysv0000t5h0eb35k10o"}-${
          serviceItem?.id || "standard"
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
    <section className="flex flex-col justify-center  p-6 md:px-12 lg:px-24 items-center gap-6 mb-0 md:mb-8 lg:mb-16">
      <div className="w-full">
        <h1 className="text-3xl font-medium text-center">
          <span className="text-primary-green">Our Most Popular </span>
          Package Prices
        </h1>
        <h2 className="text-xl font-medium text-[#606060] text-center my-3">
          Affordable Prices
        </h2>
        <p className="text-center text-zinc-600 text-base font-normal">
          Our prices are simple and affordable which are easy on pocket in
          comparison with the high street prices.
        </p>
      </div>
      {/* offer cards */}
      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
        {/* 1st col offer */}
        <div className="grid grid-cols-1 gap-6">
          {/* small cards  */}
          <SmallPackageCard
            title="Designer Shoes"
            price={120.0}
            description="Premium cleaning for high-end formal shoes"
          />
          <SmallPackageCard
            title="Blanket Service"
            price={35.0}
            description="Dry cleaning"
          />
        </div>
        {/* {packagesData.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageInfo={pkg}
                onOrderNow={handleOrderNow}
              />
            ))} */}
        {/* 2nd col offer */}
        <div className="w-full hidden md:flex flex-grow">
          <div className="relative w-full h-full ">
            <Image
              alt="offer-img"
              src="/images/redesign/offer-img.jpg"
              fill
              className="object-contain rounded"
            />
          </div>
        </div>

        {/* 3rd col offer */}
        <div className="grid grid-cols-1 md:hidden lg:grid lg:grid-cols-1 gap-6">
          <SmallPackageCard
            title="Curtains Service"
            price={12.0}
            description="Washed and Pressed (Per Sq meter) "
          />
          <SmallPackageCard
            title="Wedding Dress"
            price={80.0}
            description="Washed and Pressed"
          />
        </div>
      </div>

      {/* Offer picture for mobile */}
      <div className="w-full flex sm:hidden flex-grow">
        <div className="relative w-full h-[600px] ">
          <Image
            alt="offer-img"
            src="/images/redesign/offer-img.jpg"
            fill
            className="object-contain rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default PickupPackages;
