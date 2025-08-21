'use client';

import Link from 'next/link';
import React from 'react';

const BannerSection = () => {
  return (
                      <div
           className="relative h-64 bg-cover bg-center flex items-center"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/a-basket-of-laundry-and-public-laundromat-2024-11-27-17-08-56-utc.JPG?height=400&width=1200&text=Laundry+Machines+Background')`,
           }}
         >
    <div className="max-w-7xl mx-auto px-4 w-full">
     {/* Breadcrumb */}
     <nav className="flex items-center space-x-2 text-white mb-4">
       <Link href="/" className="hover:text-green-400">
         Home
       </Link>
       <span className="px-2">/</span>
       <Link href="/services" className="hover:text-green-400">
         Services
       </Link>
     </nav>
   
     <h1 className="text-4xl md:text-5xl font-bold text-white">Services</h1>
   </div>
   
         </div>
  );
};

export default BannerSection;
