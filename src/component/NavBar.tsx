"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import {
  FaBars,
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiTruckLine } from "react-icons/ri";
import { PiLineSegments } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { LuClock4 } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { useCart } from "../app/context/cart-context";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  subItems?: { title: string; href: string; icon: string }[];
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/aboutus/best-laundry-services-in-dubai" },
  {
    title: "Services",
    href: "/best-laundry-services-in-dubai",
    subItems: [
      {
        title: "Laundry Services",
        href: "/services/professional-laundry-services-in-dubai/orders",
        icon: "Laundry.svg",
      },
      {
        title: "Dry Cleaning",
        href: "/services/dry-cleaning-services-in-dubai/orders",
        icon: "Dry-clean.svg",
      },
      // {
      //   title: "Express Laundry Services",
      //   href: "/services/express-laundry-services-in-dubai",
      //   icon: "Express.svg",
      // },
      {
        title: "Steam Pressing Service",
        href: "/services/steam-pressing-services-in-dubai/orders",
        icon: "Steam.svg",
      },
      {
        title: "Shoe & Bag Spa",
        href: "/services/shoe-and-bag-spa-services-in-dubai",
        icon: "Shoe-spa.svg",
      },
      // {
      //   title: "Luxury Shoe Cleaning",
      //   href: "/services/luxury-shoe-cleaning-services-in-dubai",
      //   icon: "Luxury-shoe.svg",
      // },
      {
        title: "Curtain Cleaning Service",
        href: "/services/dry-cleaning-services-in-dubai/orders",
        icon: "Curtain.svg",
      },
      {
        title: "Carpet Cleaning Service",
        href: "/services/carpet-cleaning-services-in-dubai/orders",
        icon: "Carpet.svg",
      },
      {
        title: "Commercial Laundry Service",
        href: "/services/commercial-laundry-services-in-dubai",
        icon: "Commercial.svg",
      },

      // {
      //   title: "Soft Toy Cleaning Service",
      //   href: "/services/soft-toy-cleaning-services-in-dubai",
      //   icon: "Toy.svg",
      // },
    ],
  },
  { title: "Prices", href: "/prices" },
  { title: "FAQ", href: "/FAQs" },
  { title: "Contacts", href: "/contact" },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const pathname = usePathname();

  const handleDropdownEnter = useCallback(
    (index: number) => setOpenDropdown(index),
    []
  );
  const handleDropdownLeave = useCallback(() => setOpenDropdown(null), []);

  // scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`w-full bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* Top Info Bar */}
        <div
          className={`hidden xl:block text-sm text-gray-700 transition-all duration-300 ${
            scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
          }`}
        >
          <div className="w-full mx-auto flex flex-nowrap justify-between items-center py-2 px-12">
            <div className="flex flex-row justify-center flex-nowrap items-center gap-1">
              <GrLocation className="text-primary-green" size={16} />
              <span className="truncate flex flex-nowrap">
                Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE
              </span>
            </div>

            <div className="flex flex-row justify-center flex-nowrap items-center gap-1">
              <LuClock4 className="text-primary-green" size={16} />
              <span className="truncate flex flex-nowrap">
                Mon to Friday - 8am to 11pm Sat-Sun - 10am to 11pm{" "}
              </span>
            </div>
            <div className="flex flex-row justify-center flex-nowrap items-center gap-1">
              <MdMailOutline className="text-primary-green" size={16} />
              <span className="truncate flex flex-nowrap">
                freshorappc@gmail.com
              </span>
            </div>

            <div className="flex flex-row justify-center flex-nowrap items-center gap-1">
              <FaPhoneAlt className="text-primary-green" />
              <span className="flex items-center gap-1">
                <a href="tel:+971509259667">
                  <span className="text-base">+971 50 925 9667</span>
                </a>
              </span>
            </div>
            {/* <div className="flex flex-row justify-center flex-nowrap items-center gap-1">
              <FaPhoneAlt className="text-primary-green" />
              <span className="flex items-center gap-1">
                <a href="tel:+971045799667">
                  <span className="text-base">+971 (0) 4 579 9667</span>
                </a>
              </span>
            </div> */}
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 lg:px-6 transition-all duration-300  ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/F.png"
              alt="Freshora Laundry Logo"
              width={36}
              height={36}
              className="w-9 h-9 sm:w-11 sm:h-11"
              priority
            />
            <span
              className={`font-bold whitespace-nowrap transition-all duration-300 ${
                scrolled
                  ? "text-base sm:text-lg lg:text-xl"
                  : "text-lg sm:text-xl lg:text-2xl"
              }`}
            >
              <span className="text-secondary-green font-roboto-condensed">
                Freshora{" "}
              </span>
              <span className="text-primary-green font-roboto-condensed">
                Laundry
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex gap-5 items-center 
          lg:gap-8"
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <div
                  key={index}
                  className={`relative px-3 items-center  justify-center border-b-1 border-gray-400 hover:border-black transition-all ease-in-out duration-500  ${
                    isActive
                      ? " bg-secondary-green text-white rounded"
                      : "bg-transparent text-primary-green"
                  }  `}
                  onMouseEnter={() =>
                    item.subItems && handleDropdownEnter(index)
                  }
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center font-roboto-condensed  font-medium transition-all ease-in-out py-2 `}
                  >
                    {item.title}
                    {item.subItems && (
                      <FaChevronDown
                        className={`ml-1 text-xs transition-transform duration-200 ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {item.subItems && (
                    <div
                      className={`absolute top-full right-[50%] translate-x-[50%] shadow-lg rounded-lg mt-1 w-[560px] z-50 border border-gray-100 transition-all duration-200 grid grid-cols-2 p-4 bg-[#F3F6F4] font-medium gap-2 ${
                        openDropdown === index
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                      role="menu"
                    >
                      {item.subItems.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className="group px-4 py-2 font-medium text-sm bg-white hover:bg-primary-green text-primary-green hover:text-white transition-colors duration-300 rounded flex items-center gap-2"
                        >
                          <Image
                            src={`/images/redesign/${sub.icon}`}
                            alt="Freshora Laundry Logo"
                            width={16}
                            height={16}
                            className="w-9 h-9 sm:w-8 sm:h-8 transition-all duration-300 group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-[120deg] group-hover:saturate-[10]"
                            priority
                          />
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative border border-black rounded-[4px] text-primary-green cta-button p-1 hover:text-white sm:p-2"
              aria-label="Cart"
            >
              <RiShoppingCartLine className="w-5 h-5 sm:w-6 sm:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] sm:text-xs w-4 h-4 flex items-center justify-center rounded-full z-[1000]">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* CTA buttons */}
            <Link
              href="/services/professional-laundry-services-in-dubai/orders"
              className="hidden sm:block"
            >
              <button className="bg-white  text-primary-green  flex flex-nowrap items-center justify-center gap-2 font-roboto-condensed font-medium border border-black rounded-[4px] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base cta-button">
                <RiTruckLine size={25} />
                Schedule Pickup
              </button>
            </Link>

            <Link href="/tracking" className="hidden sm:block">
              <button className="bg-white  text-primary-green  flex items-center justify-center gap-2 font-roboto-condensed font-medium border border-black rounded-[4px] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base cta-button">
                <PiLineSegments size={25} />
                Track
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1 sm:p-2"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <FaTimes size={22} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto">
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100">
                <Link
                  href={item.href}
                  className="block px-4 py-3 font-medium text-gray-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </Link>
                {item.subItems && (
                  <div className="pl-6 pb-2">
                    {item.subItems.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-600 hover:primary-green"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom CTA buttons */}
          <div className="mt-auto px-4 py-3 space-y-3">
            <Link href="/services/professional-laundry-services-in-dubai/orders">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-white  text-primary-green  flex flex-nowrap items-center justify-center gap-2 font-roboto-condensed font-medium border border-black rounded-[4px] px-4 py-3 mb-3 active:text-white active:bg-secondary-green"
              >
                <RiTruckLine size={25} />
                Schedule a Pickup
              </button>
            </Link>

            <Link href="/tracking">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-white  text-primary-green  flex items-center justify-center gap-2 font-roboto-condensed font-medium border border-black rounded-[4px] px-4 py-3 active:text-white active:bg-secondary-green"
              >
                <PiLineSegments size={25} />
                Track
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default memo(Navbar);
