import React from 'react';
import ServiceCard from './ServiceCard';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const services = [
  { id: 1 , slug: "laundry-services", image:"/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.jpg", title: "Laundry Services", description: "Professional laundry for all clothes." },
  { id: 2, slug: "dry-cleaning-services", image: "/images/iron-and-stack-of-shirts-on-ironing-board-space-f-2025-03-25-22-33-47-utc.jpg", title: "Dry Cleaning Services", description: "Gentle care for delicate garments." },
  { id: 3, slug: "express-laundry-services", image:"/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.jpg", title: "Express Laundry Services", description: "Same-day laundry services." },
  { id: 4, slug: "shoe-bag-spa", image:"/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.jpg", title: "Shoe & Bag Spa", description: "Luxury cleaning for shoes and bags." },
  { id: 5, slug: "luxury-shoe-cleaning", image:"/images/soak-shoes-before-washing-cleaning-dirty-sneakers-2025-03-09-07-54-41-utc.jpg", title: "Luxury Shoe Cleaning", description: "Premium shoe care services." },
  { id: 6, slug: "commercial-laundry-service", image:"/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.jpg", title: "Commercial Laundry Service", description: "Laundry solutions for businesses." },
  { id: 7, slug: "curtain-cleaning-service", image:"/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.jpg", title: "Curtain Cleaning Service", description: "Expert curtain cleaning at your doorstep." },
  { id: 8, slug: "carpet-cleaning-service", image:"/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc.jpg", title: "Carpet Cleaning Service", description: "Deep cleaning for carpets and rugs." },
  { id: 9, slug: "soft-toy-cleaning-service", image:"/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.jpg", title: "Soft Toy Cleaning Service", description: "Safe and hygienic cleaning for toys." },
]

const ServicesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h4 className={`text-green-600 font-medium mb-2 text-center ${poppins.className}`}>
        [ Our Services ]
      </h4>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Dry Cleaning & Laundry,<br />Free Delivery
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
