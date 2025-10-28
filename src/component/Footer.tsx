"use client";

import { useMemo } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { FaArrowUpLong } from "react-icons/fa6";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when user scrolls down 800px
    const toggleVisibility = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Compute year once to avoid unnecessary recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Your Orders Cart", href: "/cart" },
    { title: "Schedule Pick up", href: "/services" },
    { title: "Track Your Order", href: "/tracking" },
    { title: "Our Blog", href: "/blogs" },
    { title: "Prices", href: "/prices" },
    { title: "FAQs", href: "/FAQs" },
  ];

  const serviceMenu = [
    {
      title: "Laundry Services",
      href: "/services/laundry-services",
      icon: "Laundry.svg",
    },
    {
      title: "Dry Cleaning",
      href: "/services/dry-cleaning-services",
      icon: "Dry-clean.svg",
    },
    {
      title: "Express Laundry Services",
      href: "/services/express-laundry-services",
      icon: "Express.svg",
    },
    {
      title: "Shoe & Bag Spa",
      href: "/services/shoe-bag-spa",
      icon: "Shoe-spa.svg",
    },
    {
      title: "Luxury Shoe Cleaning",
      href: "/services/luxury-shoe-cleaning",
      icon: "Luxury-shoe.svg",
    },
    {
      title: "Commercial Laundry Service",
      href: "/services/commercial-laundry-service",
      icon: "Commercial.svg",
    },
    {
      title: "Carpet Cleaning Service",
      href: "/services/carpet-cleaning-services",
      icon: "Carpet.svg",
    },
    {
      title: "Curtain Cleaning Service",
      href: "/services/curtain-cleaning-service",
      icon: "Curtain.svg",
    },
    {
      title: "Soft Toy Cleaning Service",
      href: "/services/soft-toy-cleaning-service",
      icon: "Toy.svg",
    },
    {
      title: "Steam Pressing Service",
      href: "/services/steam-pressing-service",
      icon: "Steam.svg",
    },
  ];

  return (
    <footer className="bg-secondary-green text-white relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm"> */}
        <div className="flex flex-wrap justify-around gap-10 text-sm">
          {/* 1st Column - Company Info */}
          <div>
            <div className="p-4 bg-white rounded-lg flex justify-center">
              <Link href="/" className="flex items-center gap-2 ">
                <Image
                  src="/images/F.png"
                  alt="Freshora Laundry Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 sm:w-11 sm:h-11"
                  priority
                />
                <span className="font-bold whitespace-nowrap transition-all duration-300 text-base sm:text-lg lg:text-xl">
                  <span className="text-primary-green font-roboto-condensed">
                    Freshora{" "}
                  </span>
                  <span className="text-black font-roboto-condensed">
                    Laundry
                  </span>
                </span>
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-roboto font-bold my-6 text-white uppercase">
                Our Contacts
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <GrLocation className="text-white " size={20} />
                  <div>
                    <p>Shop no 4, Azizi Riviera 42, Meydan,</p>
                    <p>Al Merkadh, Dubai UAE</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <LuClock4 className="text-white" size={16} />
                  <div>
                    <p>Monday-Friday: 8 am to 8pm</p>
                    <p> Saturday-Sunday: 10am to 8pm</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MdMailOutline className="text-white" size={16} />
                  <a
                    href="mailto:freshorappc@gmail.com"
                    className="hover:underline break-all"
                  >
                    freshorappc@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <FaPhoneAlt className="text-white" />
                  <a href="tel:+971509259667" className=" hover:underline">
                    +971 50 925 9667
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <FaPhoneAlt className="text-white" />
                  <a href="tel:+971045799667" className=" hover:underline">
                    +971 (0) 4 579 9667
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 2nd Column - Services */}
          <div>
            <h3 className="text-xl font-roboto font-bold my-3 text-white uppercase">
              Our Services
            </h3>
            <ul className="space-y-2">
              {serviceMenu.map((menu, index) => (
                <li key={index} className="flex items-start">
                  <Link href={menu.href}>{menu.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3rd Column - Nav menu */}
          <div>
            <h3 className="text-xl font-roboto font-bold my-3 text-white uppercase">
              Menu
            </h3>
            <ul className="space-y-2">
              {navItems.map((menu, index) => (
                <li key={index} className="flex items-start">
                  <Link href={menu.href}>{menu.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4th Column - input box */}
          <div>
            <h3 className="text-xl font-roboto font-bold my-3 text-white uppercase">
              Subscribe
            </h3>
            <form className="space-y-3">
              <div className="w-full min-w-[390px] flex items-center justify-between p-0.5 rounded bg-amber-50 text-black text-sm sm:text-base  overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email id receive our special offers"
                  className="h-[100%] w-[85%] ml-2 focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="w-[15%] bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  GO
                </button>
              </div>
            </form>
            <h3 className="text-xl font-roboto font-bold my-3 text-white uppercase">
              Follow Up
            </h3>
            <div className="flex gap-3">
              {[
                {
                  Icon: FaFacebookF,
                  label: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61579978694620",
                },
                {
                  Icon: FaInstagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/freshoralaundry/",
                },
                {
                  Icon: FaWhatsapp,
                  label: "Whatsapp",
                  href: "https://wa.me/+971509259667",
                },
              ].map(({ Icon, label, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-white text-black p-2.5 rounded-full hover:bg-green-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-secondary-green text-white text-sm py-3 px-3 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left text-xs sm:text-sm">
            © {currentYear} Freshora Laundry. All Rights Reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-xs sm:text-sm">
            <a href="#" className="hover:underline hover:text-green-600">
              Terms and Conditions
            </a>
            <a href="#" className="hover:underline hover:text-green-600">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 bg-secondary-green border-2 border-primary-green p-3 rounded-full shadow-lg hover:bg-primary-green transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 z-[1000] ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Scroll to top"
        >
          <FaArrowUpLong size={20} />
        </button>
      )}
    </footer>
  );
}
