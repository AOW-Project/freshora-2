"use client";
import type React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { FaTshirt, FaHandsWash, FaBed } from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomepagePricePackages from "@/component/HomepagePricePackages";
import {
  CheckCircle,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/cart-context"; // Import cart provider

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const ServiceBanner: React.FC = () => {
  return (
    <div
      className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
      style={{
        backgroundImage: `url('/images/redesign/about-banner.png')`,
      }}
    >
      {" "}
      {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
      <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center items-center z-30">
        <p>Our prices are simple & affordable which are easy</p>
        <p className="text-[#FFFF00]">
          on pocket in comparison with the high street prices.
        </p>
      </div>
    </div>
  );
};

interface ServicePriceCardProps {
  icon: React.ElementType;
  title: string;
  price: string;
  description: string;
}

const ServicePriceCard: React.FC<ServicePriceCardProps> = ({
  icon: Icon,
  title,
  price,
  description,
}) => {
  return (
    <Card className="group relative flex flex-col items-center justify-between p-4 sm:p-6 text-center h-64 sm:h-72 md:h-80 transition-all duration-500 hover:scale-105 bg-white overflow-hidden shadow-none border-none">
      <div className="flex flex-col items-center justify-center flex-1 space-y-3 sm:space-y-4 transition-all duration-500 group-hover:space-y-2">
        <div className="bg-green-100 p-3 sm:p-4 rounded-full transition-all duration-500 group-hover:-translate-y-16 sm:group-hover:-translate-y-20 group-hover:opacity-0">
          <Icon size={32} className="text-green-600 sm:w-10 sm:h-10" />
        </div>
        <div className="space-y-2 transition-all duration-500 group-hover:-translate-y-6 sm:group-hover:-translate-y-8">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight px-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 px-2">{description}</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {price}
          </p>
        </div>
      </div>
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-4">
        <Link href="/services">
          <button className="px-4 sm:px-6 py-2 bg-green-600 text-white text-xs sm:text-sm font-semibold hover:bg-primary-green transition-colors duration-300 shadow-md">
            Order Now
          </button>
        </Link>
      </div>
    </Card>
  );
};

interface PricingTableProps {
  title: string;
  table: {
    item: string;
    price: string | number;
    washPress?: string | number;
    dryCleaning?: string | number;
    steamPressing?: string | number;
  }[];
}

const PricingTable: React.FC<PricingTableProps> = ({ title, table }) => {
  return (
    <table className="w-full border border-primary-green rounded-2xl overflow-hidden shadow-sm">
      <thead>
        <tr className="bg-primary-green text-white text-center">
          <th colSpan={2} className="py-3 text-lg font-semibold tracking-wide">
            {title}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {table.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 sm:py-4 px-6 text-gray-700 text-sm sm:text-base">
              {item.item}
            </td>
            <td className="py-3 sm:py-4 px-6 font-semibold text-primary-green text-base sm:text-lg text-right">
              {item.price}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Data for Pricing Tables
const forGentleman = [
  {
    item: "Shirts/T-Shirts",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Trouser",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Kandura",
    washPress: "10.00",
    dryCleaning: "12.00",
    steamPressing: "6.00",
  },
  {
    item: "Ghatra",
    washPress: "8.00",
    dryCleaning: "10.00",
    steamPressing: "6.00",
  },
  {
    item: "Lungi",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Shorts",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Cap/Tie",
    washPress: "5.00",
    dryCleaning: "8.00",
    steamPressing: "3.00",
  },
  {
    item: "Jacket/Coat",
    washPress: "15.00",
    dryCleaning: "20.00",
    steamPressing: "8.00",
  },
  {
    item: "Leather Jacket",
    washPress: "25.00",
    dryCleaning: "35.00",
    steamPressing: "-",
  },
  {
    item: "Waist Coat",
    washPress: "10.00",
    dryCleaning: "15.00",
    steamPressing: "6.00",
  },
  {
    item: "Suit (2pcs)",
    washPress: "-",
    dryCleaning: "25.00",
    steamPressing: "12.00",
  },
  {
    item: "Suit (3pcs)",
    washPress: "-",
    dryCleaning: "35.00",
    steamPressing: "15.00",
  },
  {
    item: "Inner Wear",
    washPress: "4.00",
    dryCleaning: "5.00",
    steamPressing: "2.00",
  },
  {
    item: "Pair of Socks",
    washPress: "4.00",
    dryCleaning: "5.00",
    steamPressing: "2.00",
  },
  {
    item: "Sweater/Pull over",
    washPress: "10.00",
    dryCleaning: "14.00",
    steamPressing: "6.00",
  },
  {
    item: "Handkerchief",
    washPress: "2.00",
    dryCleaning: "-",
    steamPressing: "1.00",
  },
];

const forLadies = [
  {
    item: "T-Shirts/Shirts",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Trouser/Pants",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Abaya/Burqah",
    washPress: "10.00",
    dryCleaning: "14.00",
    steamPressing: "8.00",
  },
  {
    item: "Scarf/Dupatta",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Skirt/Shorts",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Full Dress",
    washPress: "12.00",
    dryCleaning: "15.00",
    steamPressing: "6.00",
  },
  {
    item: "Salwar Kameez",
    washPress: "12.00",
    dryCleaning: "15.00",
    steamPressing: "8.00",
  },
  {
    item: "Blouse",
    washPress: "8.00",
    dryCleaning: "10.00",
    steamPressing: "4.00",
  },
  {
    item: "Saree",
    washPress: "12.00",
    dryCleaning: "16.00",
    steamPressing: "6.00",
  },
  {
    item: "Coat/Jacket",
    washPress: "15.00",
    dryCleaning: "20.00",
    steamPressing: "8.00",
  },
  {
    item: "Suit (2pcs)",
    washPress: "-",
    dryCleaning: "25.00",
    steamPressing: "12.00",
  },
  {
    item: "Suit (3pcs)",
    washPress: "-",
    dryCleaning: "35.00",
    steamPressing: "15.00",
  },
  {
    item: "Sweater/Pull over",
    washPress: "10.00",
    dryCleaning: "14.00",
    steamPressing: "6.00",
  },
  {
    item: "Inner Wear",
    washPress: "4.00",
    dryCleaning: "5.00",
    steamPressing: "2.00",
  },
  {
    item: "Handkerchief",
    washPress: "2.00",
    dryCleaning: "-",
    steamPressing: "1.00",
  },
];

const householdItems = [
  {
    item: "Police Dress/Safari Dress",
    washPress: "14.00",
    dryCleaning: "18.00",
    steamPressing: "8.00",
  },
  {
    item: "Bed Sheet (Single/Double)",
    washPress: "10.00 / 12.00",
    dryCleaning: "12.00 / 14.00",
    steamPressing: "6.00 / 8.00",
  },
  {
    item: "Duvet Cover (Single/Double)",
    washPress: "10.00 / 12.00",
    dryCleaning: "12.00 / 14.00",
    steamPressing: "6.00 / 8.00",
  },
  {
    item: "Blanket (Single/Double)",
    washPress: "22.00 / 30.00",
    dryCleaning: "30.00 / 35.00",
    steamPressing: "-",
  },
  {
    item: "Duvet (S/M/L)",
    washPress: "20.00 / 25.00 / 30.00",
    dryCleaning: "25.00 / 30.00 / 35.00",
    steamPressing: "-",
  },
  {
    item: "Pillow Case",
    washPress: "3.00",
    dryCleaning: "4.00",
    steamPressing: "2.00",
  },
  {
    item: "Cushion Cover/Pillow Cover",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Pillow/Cushion",
    washPress: "15.00",
    dryCleaning: "20.00",
    steamPressing: "-",
  },
  {
    item: "Bath Robe",
    washPress: "15.00",
    dryCleaning: "-",
    steamPressing: "-",
  },
  {
    item: "Bath Towel (M/L)",
    washPress: "4.00 / 6.00",
    dryCleaning: "5.00 / 7.00",
    steamPressing: "-",
  },
  {
    item: "Blanket (Single/Double",
    washPress: "25.00 / 35.00",
    dryCleaning: "-",
    steamPressing: "-",
  },
  {
    item: "Wedding Dress",
    washPress: "50.00 - 80.00",
    dryCleaning: "80.00 - 100.00",
    steamPressing: "30.00 - 45.00",
  },
  {
    item: "Curtains (Per Sq meter)",
    washPress: "12.00",
    dryCleaning: "18.00",
    steamPressing: "10.00",
  },
  {
    item: "Normal Carpet (Per Sq meter)",
    washPress: "25.00",
    dryCleaning: "-",
    steamPressing: "-",
  },
  {
    item: "Premium Carpet (Per Sq meter)",
    washPress: "30.00",
    dryCleaning: "-",
    steamPressing: "-",
  },
];
const shoesItems = [
  { item: "Formal Shoes", price: "100.00" },
  { item: "Sandals / Flip Flops", price: "60.00" },
  { item: "Leather/ Mix material Sandal & Flip Flops", price: "80.00" },
  { item: "Kids Shoe Care", price: "50.00" },
  { item: "Sneakers / Sports Shoes", price: "80.00" },
];

const luxuryShoes = [
  { item: "Designer and Luxury Formal Shoes", price: "120.00" },
  { item: "Designer and Luxury Sports Sneakers", price: "150.00" },
  { item: "Designer and Luxury Sandals / Flip Flops", price: "100.00" },
];

const mostPopularItems = [
  {
    item: "Shirts/T-Shirts",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Trouser",
    washPress: "6.00",
    dryCleaning: "8.00",
    steamPressing: "4.00",
  },
  {
    item: "Jacket/Coat",
    washPress: "15.00",
    dryCleaning: "20.00",
    steamPressing: "8.00",
  },
  {
    item: "Blouse",
    washPress: "8.00",
    dryCleaning: "10.00",
    steamPressing: "4.00",
  },
  {
    item: "Suit (2pcs)",
    washPress: "-",
    dryCleaning: "25.00",
    steamPressing: "12.00",
  },
];

const packagesData = [
  {
    id: "standard",
    icon: ShoppingCart,
    title: "Standard Package",
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
    price: 149.0,
  },
  // {
  //   id: "premium",
  //   icon: Zap,
  //   title: "Premium Package",
  //   features: ["6 T-Shirts",
  //     "3 Pairs of Jeans",
  //     "4 Button-Down Shirts",
  //     "2 Pair of Shorts",
  //     "9 Pairs of Underwear",
  //     "8 Pairs of Socks",
  //     "2 Towel",
  //     "2 Set of Sheets"],
  //   price: 449.0,
  //   isFeatured: true,
  // },
];

interface PackageCardProps {
  packageInfo: (typeof packagesData)[0];
  onOrderNow: (packageId: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageInfo,
  onOrderNow,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, icon: Icon, title, features, price } = packageInfo;

  return (
    <Card
      className="group relative flex w-full max-w-sm flex-col cursor-pointer border-none bg-white transition-all duration-300 hover:shadow-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="flex h-full flex-col px-6">
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-green-100 p-4 text-green-600">
            <Icon size={28} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        <ul className="mb-4 space-y-2 text-sm text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-gray-100 pt-4 text-center">
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
            className="mt-4 w-full bg-green-600 py-3 font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
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
      `${process.env.BACKEND_URL}/api/packages/${slug}`
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

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("popular"); // Changed back to popular as default
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
        //added dynamic data and hardcoded fallback data
        id: `${serviceItem?.serviceId || "cmfwe5ysv0000t5h0eb35k10o"}-${
          serviceItem?.id || "standard"
        }`,
        name: feature,
        category: "Package Item",
        serviceType: selectedPackage.title,
        price: selectedPackage.price / selectedPackage.features.length,
        quantity: 1,
        serviceSlug: "package-service",
      }));

      await replaceCart(packageItems);
      router.push("/cart");
    }
  };

  return (
    <>
      <ServiceBanner />
      {/* breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-6 py-5 ">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link
            href="/"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Home
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <span className="text-green-400 text-sm sm:text-base">Prices</span>
        </nav>
      </div>
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="my-10">
            <h1 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
              Accessible Luxury,
              <span className="text-secondary-green">
                {" "}
                Transparent & Affordable Prices
              </span>
            </h1>
            <h3 className="text-xl my-3 font-medium text-gray-600 text-center">
              Our Full Price Table
            </h3>
          </div>
          <Card className="mb-12 sm:mb-16 lg:mb-20 shadow-lg border-none min-h-[400px]">
            <CardContent className="p-3 sm:p-6 lg:p-8">
              <Tabs
                value={activeTab}
                onValueChange={(val) => setActiveTab(val)}
                className="w-full"
              >
                {/* Mobile-optimized tabs */}
                <div className="mb-6 sm:mb-8">
                  <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full gap-1 sm:gap-2 p-1 bg-gray-100 rounded-lg h-auto">
                    <TabsTrigger
                      value="popular"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-white text-black transition-all duration-200 border border-transparent hover:bg-green-50 hover:text-primary-green data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green rounded-md whitespace-nowrap"
                    >
                      Most Popular
                    </TabsTrigger>
                    <TabsTrigger
                      value="apparel"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-white text-black transition-all duration-200 border border-transparent hover:bg-green-50 hover:text-primary-green data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green rounded-md"
                    >
                      Apparel
                    </TabsTrigger>
                    <TabsTrigger
                      value="household"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-white text-black transition-all duration-200 border border-transparent hover:bg-green-50 hover:text-primary-green data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green rounded-md"
                    >
                      Household
                    </TabsTrigger>
                    <TabsTrigger
                      value="shoes"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-white text-black transition-all duration-200 border border-transparent hover:bg-green-50 hover:text-primary-green data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green rounded-md"
                    >
                      Shoes
                    </TabsTrigger>
                    <TabsTrigger
                      value="luxury_shoes"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-white text-black transition-all duration-200 border border-transparent hover:bg-green-50 hover:text-primary-green data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green rounded-md whitespace-nowrap col-span-2 sm:col-span-1"
                    >
                      Luxury Shoes
                    </TabsTrigger>
                    <TabsTrigger
                      value="delegate_clothes"
                      className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold bg-white text-black transition-all duration-200 border border-transparent hover:bg-green-50 hover:text-primary-green data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:border-primary-green rounded-md whitespace-nowrap col-span-2 sm:col-span-1"
                    >
                      Top Delegate Clothes
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Most Popular Tab */}
                <TabsContent value="popular" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className=" text-gray-600 text-center">
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold"></th>
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                            Wash & Press
                          </th>
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                            Dry Cleaning
                          </th>
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                            Steam Pressing
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {mostPopularItems.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                              {item.item}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.washPress}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.dryCleaning}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.steamPressing}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                {/* Apparel Tab */}
                <TabsContent value="apparel" className="mt-6">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className=" text-gray-600 text-center">
                              <th className="py-3 px-4 text-primary-green text-base sm:text-lg font-semibold">
                                For Gentlemen
                              </th>
                              <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                                Wash & Press
                              </th>
                              <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                                Dry Cleaning
                              </th>
                              <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                                Steam Pressing
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {forGentleman.map((item, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                                  {item.item}
                                </td>
                                <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                                  {item.washPress}
                                </td>
                                <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                                  {item.dryCleaning}
                                </td>
                                <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                                  {item.steamPressing}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className=" text-gray-600 text-center">
                              <th className="py-3 px-4 text-primary-green text-base sm:text-lg font-semibold">
                                For Ladies
                              </th>
                              <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                                Wash & Press
                              </th>
                              <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                                Dry Cleaning
                              </th>
                              <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                                Steam Pressing
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {forLadies.map((item, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                                  {item.item}
                                </td>
                                <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                                  {item.washPress}
                                </td>
                                <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                                  {item.dryCleaning}
                                </td>
                                <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                                  {item.steamPressing}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Household Tab */}
                <TabsContent value="household" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className=" text-gray-600 text-center">
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold"></th>
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                            Wash & Press
                          </th>
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                            Dry Cleaning
                          </th>
                          <th className="py-3 px-4 text-sm sm:text-base font-semibold">
                            Steam Pressing
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {householdItems.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                              {item.item}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.washPress}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.dryCleaning}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.steamPressing}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                {/* Shoes Tab */}
                <TabsContent value="shoes" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <tbody>
                        {shoesItems.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                              {item.item}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                {/* Luxury Shoes Tab */}
                <TabsContent value="luxury_shoes" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <tbody>
                        {luxuryShoes.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                              {item.item}
                            </td>
                            <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                {/* Top Delegate Clothes Tab */}
                <TabsContent value="delegate_clothes" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-gray-700 text-sm sm:text-base">
                            Items will be added
                          </td>
                          <td className="py-3 px-4 font-medium text-primary-green text-sm sm:text-base text-center">
                            -
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center mt-6 sm:mt-8">
                <Link
                  href="/services"
                  className="px-6 sm:px-8 py-3 bg-secondary-green cta-button text-white font-semibold rounded  transition-colors duration-300 shadow-md text-sm sm:text-base"
                >
                  View Services
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Packages Section */}

          {/* <section className="flex flex-col justify-center items-center gap-12 h-screen py-4">
            <div className="flex w-full flex-col sm:flex-row gap-4 ">

              <div className="p-6 ">
                <div className=" flex flex-col text-left ">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 px-4 w-fit text-nowrap">
                    Subscription Packages
                  </h2>
                  <p className="text-gray-600 max-w-2xl leading-relaxed text-sm sm:text-base px-4 sm:mb-4 lg:mb-6">
                    For clients who prefer consistent care, our packages offer
                    exclusive value and effortless convenience
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12 ">
                  {packagesData.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      packageInfo={pkg}
                      onOrderNow={handleOrderNow}
                    />
                  ))}
                </div>
              </div>

          
              <div className="w-full p-6 sm:pl-16 flex items-stretch justify-items-stretch">
                <div className="rounded-xl overflow-hidden w-full ">
                  <iframe
                    title="Business Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.009160312709!2d-77.455!3d38.752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65cf1dff9f1b1%3A0x5d812!2s6494%20Signal%20Hill%20Rd%2C%20Manassas%2C%20VA%2020110!5e0!3m2!1sen!2sus!4v1234567890"
                    className="w-full h-full min-h-[400px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section> */}
        </div>
        <HomepagePricePackages />
      </section>
    </>
  );
};

export default PricingSection;
