"use client"
import Link from "next/link"
import Image from "next/image" 
import { useState, useEffect } from "react"
import {
  FaPhoneAlt,
  FaShoppingCart,
  FaChevronDown,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import PickupForm from "./SchedulePickupModal"
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
      { title: "Carpet Cleaning Service", href: "/services/curtain-cleaning-service" },
      { title: "Curtain Cleaning Service", href: "/services/carpet-cleaning-service" },
      { title: "Soft Toy Cleaning Service", href: "/services/soft-toy-cleaning-service" },
    ],
  },
  { title: "Prices", href: "/prices" },
  { title: "FAQ", href: "/FAQs" },
  { title: "Contacts", href: "/contact" },
]

const Navbar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top Info Bar */}
        <div className="bg-gray-100 text-xs sm:text-sm text-gray-700 py-2 px-4 flex flex-wrap justify-between items-center gap-2">
          <div>Address : Shop no 4, Azizi riviera 42 , Meydan , Al Merkadh , Dubai UAE </div>
          <div className="hidden md:flex gap-4">
            <span>Mon-Fri 08:00 AM - 05:00 PM</span>
            <span>freshorappc@gmail.com</span>
          </div>
          <div className="flex gap-3 items-center text-sm">
            <span className="flex items-center gap-1">
              <FaPhoneAlt className="text-green-500" />+971 50 925 9667
            </span>
            <FaTwitter className="cursor-pointer" />
            <FaFacebookF className="cursor-pointer" />
            <FaLinkedinIn className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
          </div>
        </div>

        {/* Main Nav */}
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/F.png" // The path to your logo in the `public` folder
              alt="Freshora Laundry Logo"
              width={50} // Reduced width for a smaller logo
              height={50} // Reduced height for a smaller logo
              className="transition-all duration-300"
              priority // Prioritize loading the logo
            />
            <div
              className={`font-bold transition-all duration-300 ${scrolled ? "text-lg sm:text-xl" : "text-lg sm:text-xl lg:text-2xl"}`}
            >
              <span className="text-green-600">Freshora </span>
              <span className="text-black">Laundry</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 font-medium text-gray-700 relative">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <Link href={item.href} className="flex items-center hover:text-green-600 transition">
                  {item.title}
                  {item.subItems && <FaChevronDown className="ml-1 text-xs" />}
                </Link>
                {item.subItems && openIndex === index && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 w-56 z-50 group-hover:block">
                    {item.subItems.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className="block px-4 py-2 text-sm hover:bg-green-100 hover:text-green-700 transition"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative hover:text-green-600 transition">
              <FaShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setShowForm(true)}
              className="hidden sm:block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            >
              Schedule a Pickup
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100">
                <Link href={item.href} className="block px-4 py-3 font-medium text-gray-700">
                  {item.title}
                </Link>
                {item.subItems && (
                  <div className="pl-6 pb-2">
                    {item.subItems.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-600 hover:text-green-600"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setShowForm(true);
                setMobileOpen(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3"
            >
              Schedule a Pickup
            </button>
          </div>
        )}
      </header>

      {/* Pickup Form Modal */}
      <PickupForm open={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}

export default Navbar