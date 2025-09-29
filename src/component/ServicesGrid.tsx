import React from "react";
import ServiceCard from "./ServiceCard";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const services = [
  {
    id: 1,
    slug: "laundry-services",
    image:
      "/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.webp",
    title: "Laundry Services",
    description: "The pile that haunted your weekend? Gone by evening.",
  },
  {
    id: 2,
    slug: "dry-cleaning-services",
    image:
      "/images/iron-and-stack-of-shirts-on-ironing-board-space-f-2025-03-25-22-33-47-utc.webp",
    title: "Dry Cleaning Services",
    description: "Care so gentle, even labels would approve.",
  },
  {
    id: 3,
    slug: "express-laundry-services",
    image:
      "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.webp",
    title: "Express Laundry Services",
    description: "Book at breakfast, wear it by dinner.",
  },
  {
    id: 4,
    slug: "shoe-bag-spa",
    image:
      "/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.webp",
    title: "Shoe Cleaning",
    description:
      "Fresh enough for first steps, because the shoes you love should outlast the dirt.",
  },
  {
    id: 5,
    slug: "luxury-shoe-cleaning",
    image: "/images/erik-mclean-AnRxcupEQT0-unsplash.webp",
    title: "Luxury Shoe Cleaning",
    description:
      "Conditioned, polished, protected — Because luxury deserves more than a wipe-down.",
  },
  {
    id: 6,
    slug: "commercial-laundry-service",
    image:
      "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.webp",
    title: "Commercial Laundry Service",
    description:
      "High volume, tight deadlines, zero excuses. Bulk care with boutique standards.",
  },
  {
    id: 7,
    slug: "curtain-cleaning-service",
    image:
      "/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.webp",
    title: "Curtain Cleaning Service",
    description: "Every breeze leaves something behind — we take it out.",
  },
  {
    id: 8,
    slug: "carpet-cleaning-services",
    image:
      "/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc (1).webp",
    title: "Carpet Cleaning Service",
    description: "Dust and stains pulled from where your vacuum can’t reach.",
  },
  {
    id: 9,
    slug: "soft-toy-cleaning-service",
    image:
      "/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.webp",
    title: "Soft Toy Cleaning Service",
    description: "Playmates deserve the same care as playtime.",
  },
  {
    id: 10,
    slug: "steam-pressing-service",
    image: "/images/steam-pressing-banner.jpg",
    title: "Steam Pressing Service",
    description:
      "Wrinkles erased, confidence intact. A standard of polish that matches the pace of the city.",
  },
];

const ServicesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h4
        className={`text-green-600 font-medium mb-2 text-center ${poppins.className}`}
      >
        [ Our Services ]
      </h4>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Dry Cleaning & Laundry,
        <br />
        Free Delivery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            slug={service.slug}
            image={service.image}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
