"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TbIroningSteamFilled } from "react-icons/tb";
import {
  FaTshirt,
  FaHandsWash,
  FaBroom,
  FaShoePrints,
  FaBusinessTime,
  FaChild,
} from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { FaRug, FaWindowMaximize } from "react-icons/fa6";
import { useState, useEffect } from "react";
import CurvedCarousel from "./CurvedCarousel";

const services = [
  {
    title: "Laundry",
    description:
      "Thorough washing using eco-friendly detergents to keep your clothes fresh and soft.",
    image:
      "/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.webp",
    icon: <FaBroom />,
  },
  {
    title: "Dry Cleaning",
    description:
      "Gentle dry cleaning for delicate fabrics, ensuring they maintain their quality and shape.",
    image:
      "/images/iron-and-stack-of-shirts-on-ironing-board-space-f-2025-03-25-22-33-47-utc.webp",
    icon: <FaTshirt />,
  },
  {
    title: "Express Laundry Service",
    description: "Quick turnaround laundry service with the same premium care.",
    image:
      "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.webp",
    icon: <FaHandsWash />,
  },
  {
    title: " Shoe Cleaning",
    description: "Professional cleaning and restoration for  shoes.",
    image:
      "/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.webp",
    icon: <MdIron />,
  },
  {
    title: "Luxury Shoe Cleaning Service",
    description:
      "Specialized treatment to clean and restore luxury shoes for batter footware.",
    image: "/images/erik-mclean-AnRxcupEQT0-unsplash.webp",
    icon: <FaShoePrints />,
  },
  {
    title: "Commercial Laundry Service",
    description:
      "Large-scale laundry solutions for hotels, restaurants, and offices.",
    image:
      "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.webp",
    icon: <FaBusinessTime />,
  },
  {
    title: "Carpet Cleaning Service",
    description:
      "Deep cleaning for carpets, removing dirt, dust, and allergens.",
    image:
      "/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc.webp",
    icon: <FaRug />,
  },
  {
    title: "Curtain Cleaning Service",
    description:
      "Gentle cleaning for curtains to remove dust and stains while preserving fabric quality.",
    image:
      "/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.webp",
    icon: <FaWindowMaximize />,
  },
  {
    title: "Soft Toy Cleaning Service",
    description:
      "Sanitizing and cleaning soft toys to make them safe and fresh for children.",
    image:
      "/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.webp",
    icon: <FaChild />,
  },
  {
    title: "Steam Pressing Service",
    description:
      "Steam pressing clothes to make them crisp, smooth, and ready to wear with confidence.",
    image: "/images/steam-pressing-banner.jpg",
    icon: <TbIroningSteamFilled />,
  },
];

export default function ServicesSlider() {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000); // shake duration
    }, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto ">
        {/* Heading */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl  font-medium text-primary-green">
            Dry Cleaning & Laundry,{" "}
            <span className="text-secondary-green"> Free Delivery</span>
          </h1>
          <h2 className="text-xl font-medium text-[#606060] text-center my-3">
            Our Services
          </h2>
        </div>
        {/* Slider */}
        <CurvedCarousel />
      </div>
    </section>
  );
}
