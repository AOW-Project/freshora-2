'use client';

import React from 'react';
// 1. Import the necessary Lucide icons
import { 
  UserCheck, 
  Tag, 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  BellRing 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// 2. Update the type to accept a component for the icon
type Advantage = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// 3. The data array now uses the imported icon components directly
const advantages: Advantage[] = [
  {
    icon: UserCheck,
    title: 'Personalized Care',
    description: 'Every fabric type treated with precision.',
  },
  {
    icon: Tag,
    title: 'Flexible Pricing',
    description: 'Options designed to suit your needs.',
  },
  {
    icon: Smartphone,
    title: 'Effortless Convenience',
    description: 'Your laundry, completed with a single request.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Products',
    description: 'Only the finest detergents and cleaning solutions.',
  },
  {
    icon: Truck,
    title: 'Express Service',
    description: 'Delivery in as little as eight hours.',
  },
  {
    icon: BellRing,
    title: 'Real-Time Updates',
    description: 'Complete transparency throughout the process.',
  },
];

const AdvantagesSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-green-600 font-semibold mb-2">[ Our Advantages ]</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {advantages.map((adv, index) => (
            <div key={index} className="flex items-start space-x-4 text-left">
              {/* 4. This code renders the Lucide icon, not an <Image> tag */}
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <adv.icon className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{adv.title}</h3>
                <p className="text-gray-600 text-sm">{adv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;