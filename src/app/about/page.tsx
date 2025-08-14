"use client";

import { CheckCircle2, Clock, CreditCard, Leaf, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
// import img01 from '../../../public/images/img01.jpg';


// Dynamically import components with SSR disabled
const LaundryStats = dynamic(() => import("@/component/LaundryStatus"), { ssr: false });
const GuaranteeSection = dynamic(() => import("@/component/GuaranteeSection"), { ssr: false });
const AdvantagesSection = dynamic(() => import("@/component/AdvantagesSection"), { ssr: false });
const HistorySection = dynamic(() => import("@/component/HistorySection"), { ssr: false });
const TeamSection = dynamic(() => import("@/component/TeamSection"), { ssr: false });

export default function AboutSection() {
  return (
    <>
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png?height=400&width=1200&text=Laundry+Machines+Background')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-white mb-3 sm:mb-4">
            <Link href="/" className="hover:text-green-400 text-sm sm:text-base transition-colors">
              Home
            </Link>
            <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
            <span className="text-green-400 text-sm sm:text-base">About</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">About</h1>
        </div>
      </div>

      <div className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative">
           <Image
             src="/images/box02-img04.jpg" // Make sure to save your image in public/images/guarantee.png
             alt="Smiling woman with laundry"
             width={500}
             height={800}
             className=""
           />
               <Image
  src="/images/arrow-img-right.png" // make sure this exists in public/images
  alt="Arrow"
  width={100}  // specify intrinsic width
  height={100} // specify intrinsic height
  className="absolute -top-3 -right-6 sm:-top-5 sm:-right-10 w-16 sm:w-20 lg:w-24 h-auto opacity-80 hidden sm:block"
/>
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-2xl text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-500">25</div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-tight">
                    years of <br /> experience
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div>
                <div className="text-green-600 font-semibold text-base sm:text-lg mb-2">
                  More than 25 Years of Experience
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  We are Passionate About Laundry
                </h2>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                We are professionals in the laundry and dry cleaning business, which means we always stay up to date on
                the latest technologies, cleaning methods, and solutions for dealing with stains or delicate fabrics.
                Plus, we maintain the highest standards of business integrity by following local and national
                regulations and environmental safety rules. We are passionate about the way you think about laundry!
              </p>

              <div className="grid grid-cols-1 gap-6 pt-2">
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">100% Customer Satisfaction</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Free Collection & Delivery</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Affordable Prices</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Best Quality</span>
                  </li>
                </ul>

                <div className="flex items-center justify-start mt-4">
                  <a
                    href="tel:+971509259667"
                    className="flex items-center space-x-3 sm:space-x-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 hover:bg-white transition-colors w-full max-w-sm shadow-md border border-gray-100"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">
                        Call for Quality Services
                      </div>
                      <div className="text-green-600 font-bold text-base sm:text-lg">+971 50 925 9667</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16 sm:mt-20 lg:mt-24">
            <a
              href="/contact"
              className="group bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300 flex-shrink-0">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">
                    <span className="group-hover:text-green-600 transition-colors">Save Time & Money</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    No more wasted time driving to the laundromats, we pickup and deliver for free!
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/contact"
              className="group bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300 flex-shrink-0">
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">
                    <span className="group-hover:text-green-600 transition-colors">Pay Online in Seconds</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Manage your ProLaundry account and billing online from your smartphone or computer.
                  </p>
                </div>
              </div>
            </a>

            <a
              href="#"
              className="group bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300 flex-shrink-0">
                  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">
                    <span className="group-hover:text-green-600 transition-colors">Eco-Friendly</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    We use safe and clean perc-free solvents, so you, and the Earth, can look good.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Dynamically loaded components */}
      <LaundryStats />
      <GuaranteeSection />
      <AdvantagesSection />
      <HistorySection />
      <TeamSection />
    </>
  );
}