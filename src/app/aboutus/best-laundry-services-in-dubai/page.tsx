import { Clock, CreditCard, Heart, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import GuaranteeSection from "@/component/GuaranteeSection";
import AdvantagesSection from "@/component/AdvantagesSection";
import HistorySection from "@/component/HistorySection";
import { RiCheckDoubleLine } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Best Laundry Service in Dubai | Freshora Laundry Experts",
    description:
      "Experience the best laundry services in Dubai with Freshora. Trusted care, high-quality cleaning, and hassle-free pickup & delivery for every garment.",
    keywords: [
      "Best Laundry Service in Dubai",
      " Affordable- laundry service",
      "Dry Cleaning Dubai",
      " Free Laundry Pickup and Delivery",
      "Best laundry company in Dubai",
    ],
    alternates: {
      canonical:
        "https://freshoralaundry.com/aboutus/best-laundry-services-in-dubai",
    },
    openGraph: {
      title: "About Freshora Laundry",
      description:
        "Trusted laundry and dry cleaning in Dubai. Learn about our story, process, and promise of quality.",
      url: "https://freshoralaundry.com/about",
    },
    twitter: {
      card: "summary",
      title: "About Freshora Laundry",
      description: "Dubai’s trusted laundry and dry cleaning service provider.",
    },
  };
}
export default function AboutSection() {
  return (
    <>
      {/* banner image  */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
        style={{
          backgroundImage: `url('/images/redesign/about-banner.png')`,
        }}
      >
        {" "}
        {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium text-center flex flex-col justify-center items-center z-30">
          <p>
            We are professionals in{" "}
            <span className="text-[#FFFF00]">laundry & dry cleaning,</span>
          </p>
          <p>
            Always staying up to date on the{" "}
            <span className="text-[#FFFF00]">
              latest technologies & cleaning methods.
            </span>
          </p>
        </div>
      </div>

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
          <span className="text-green-400 text-sm sm:text-base">About</span>
        </nav>
      </div>

      {/* why section */}
      <section className=" w-full max-w-7xl mx-auto py-4 px-6 bg-white">
        <div className="w-full mx-auto ">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Text Section */}
            <div className="flex-1 w-full text-center lg:text-left lg:pl-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6 leading-tight text-secondary-green">
                <span className="text-primary-green">Freshora </span>–
                Redefining the Art of Laundry
              </h1>
              <p className=" mb-5 sm:mb-8 leading-relaxed text-sm text-zinc-600  sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
                At Freshora, laundry is more than a necessity - it is a craft.
                With over two decades of expertise, we have perfected the
                balance of advanced technology and meticulous care. From
                delicate silks to everyday essentials, every garment is handled
                with precision and respect, making us the preferred choice for
                the Best Laundry Services in Dubai. <br />
                <br />
                Our promise is simple: to deliver uncompromising quality,
                eco-conscious practices, and seamless convenience. With free
                collection and delivery, we ensure that laundry no longer
                disrupts your lifestyle - it enhances it.
              </p>

              {/* Features List */}
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base grid grid-cols-1">
                {[
                  "100% Customer Satisfaction – Every item receives our highest attention to detail",
                  "Free Collection and Delivery – Effortless convenience, directly to your door",
                  "Affordable Luxury – Exceptional care without compromise",
                  "Unmatched Quality – Only premium products and processes for lasting results.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 justify-center lg:justify-start text-base sm:text-xl text-secondary-green font-medium"
                  >
                    <RiCheckDoubleLine
                      size={30}
                      className="text-primary-green"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Contact CTA */}
              <div className="w-full bg-[#E4FFED] py-2.5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center border border-primary-green">
                <div className="text-center flex flex-col md:flex-row items-center justify-center gap-2 ">
                  <p className="text-secondary-green text-sm sm:text-base">
                    Call for Quality Services
                  </p>
                  <p className="text-base sm:text-lg lg:text-3xl font-bold text-primary-green">
                    <a
                      href="tel:+971509259667"
                      className="hover:text-green-600 transition-colors"
                    >
                      +971 50 925 9667
                    </a>
                  </p>
                </div>
              </div>
            </div>
            {/* Image Section */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
              <div className="relative">
                <Image
                  src="/images/redesign/about-why-img.jpg"
                  alt="Laundry Experience"
                  width={500}
                  height={800}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Efforless care section */}
          <div className="mt-30">
            <h2 className="text-3xl md:text-4xl text-primary-green font-medium  my-10 text-center ">
              Effortless Care,{" "}
              <span className="text-secondary-green"> Elevated Service</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16">
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
                      <span className="group-hover:text-green-600 transition-colors">
                        Save Time and Money
                      </span>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      No unnecessary trips; <br /> we come to you!
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
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">
                      <span className="group-hover:text-green-600 transition-colors">
                        Pure Care for Every Fabric
                      </span>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Professional, fabric-safe cleaning that protects colors,
                      texture, and quality.
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
                      <span className="group-hover:text-green-600 transition-colors">
                        Eco-Responsible Cleaning
                      </span>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Perc-free solutions that respect your wardrobe and the
                      planet.
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamically loaded components */}
      {/*<LaundryStats /> */}
      <GuaranteeSection />
      <AdvantagesSection />
      <HistorySection />
      {/* <TeamSection /> */}
    </>
  );
}
