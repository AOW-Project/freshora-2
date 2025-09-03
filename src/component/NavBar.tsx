"use client"

import { useEffect, useState, useCallback, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import {
  FaBars,
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa"
import { useCart } from "../app/context/cart-context"

interface NavItem {
  title: string
  href: string
  subItems?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  {
    title: "Services",
    href: "/services",
    subItems: [
      { title: "Laundry", href: "/services/laundry-services" },
      { title: "Dry Cleaning", href: "/services/dry-cleaning-services" },
      { title: "Express Laundry Services", href: "/services/express-laundry-services" },
      { title: "Bag & Shoe Spa", href: "/services/shoe-bag-spa" },
      { title: "Luxury Shoe Cleaning Service", href: "/services/luxury-shoe-cleaning" },
      { title: "Commercial Laundry Service", href: "/services/commercial-laundry-service" },
      { title: "Carpet Cleaning Service", href: "/services/carpet-cleaning-service" },
      { title: "Curtain Cleaning Service", href: "/services/curtain-cleaning-service" },
      { title: "Soft Toy Cleaning Service", href: "/services/soft-toy-cleaning-service" },
    ],
  },
  { title: "Prices", href: "/prices" },
  { title: "FAQ", href: "/FAQs" },
  { title: "Contacts", href: "/contact" },
]

// ✅ Moved social links outside the component for better practice
const socialLinks = [
    { 
        Icon: FaFacebookF, 
        href: "https://www.facebook.com/profile.php?id=61579978694620", 
        label: "Facebook" 
    },
    { 
        Icon: FaInstagram, 
        href: "#", // Add your Instagram link here
        label: "Instagram" 
    },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCart()

  const handleDropdownEnter = useCallback((index: number) => setOpenDropdown(index), [])
  const handleDropdownLeave = useCallback(() => setOpenDropdown(null), [])

  // scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          className={`hidden xl:block bg-gray-100 text-sm text-gray-700 transition-all duration-300 ${
            scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-2 px-6">
            <span className="truncate">
              Address: Shop no 4, Azizi Riviera 42, Meydan, Al Merkadh, Dubai UAE
            </span>
            <div className="flex gap-4 flex-wrap">
              <span> Timing: Mon to Friday - 8 am to 8pm  Sat-Sun - 10am to 8pm </span>
              <span className="truncate">freshorappc@gmail.com</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="flex items-center gap-1">
                <FaPhoneAlt className="text-green-500" />
                <a href="tel:+971509259667" >
                  <span className="text-base">
                    +971 50 925 9667
                  </span>
                </a>
              </span>
              <div className="flex gap-2">
                {/* ✅ Corrected and placed the social links mapping here */}
                {socialLinks.map((social, i) => (
                    <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="hover:text-green-500 cursor-pointer"
                    >
                        <social.Icon />
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 lg:px-6 transition-all duration-300 ${
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
                scrolled ? "text-base sm:text-lg lg:text-xl" : "text-lg sm:text-xl lg:text-2xl"
              }`}
            >
              <span className="text-green-600">Freshora </span>
              <span className="text-black">Laundry</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-5 xl:space-x-8 items-center">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.subItems && handleDropdownEnter(index)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center hover:text-green-600 transition-colors py-2"
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
                    className={`absolute top-full left-0 bg-white shadow-lg rounded-lg mt-1 w-56 z-50 border border-gray-100 transition-all duration-200 ${
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
                        className="block px-4 py-3 text-sm hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            {/* Cart */}
            <Link href="/cart" className="relative hover:text-green-600 p-1 sm:p-2" aria-label="Cart">
              <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] sm:text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* CTA buttons */}
            <Link href="/services" className="hidden sm:block">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm lg:text-base">
                Schedule Pickup
              </button>
            </Link>

            <Link href="/tracking" className="hidden sm:block">
              <Button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base" size="sm">
                <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                Track
              </Button>
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
                                className="block py-1 text-sm text-gray-600 hover:text-green-600"
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
            <div className="mt-auto px-4 py-3 space-y-2">
                <Link href="/services">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded"
                    >
                        Schedule a Pickup
                    </button>
                </Link>

                <Link href="/tracking">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-3 rounded flex items-center justify-center gap-2"
                    >
                        <Package className="h-5 w-5" /> Track
                    </button>
                </Link>
            </div>
        </div>
    </aside>
    </>
  )
}

export default memo(Navbar)