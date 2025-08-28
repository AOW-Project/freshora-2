'use client';

import Image from 'next/image';
import React from 'react';

const HistorySection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 md:px-8">
        
        {/* Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src="/images/box02-img03.jpg" // Save your image in public/images/history.png
            alt="Ironing clothes"
            width={600}
            height={400}
            className="rounded-md w-full h-auto object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 md:pl-12">
         {/* <p className="text-green-600 font-semibold mb-2">[ Our History ]</p>*/ }
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            A Tradition of Care 
          </h2>
          <p className="text-gray-600 mb-4">
           Freshora was founded on a vision to redefine everyday laundry with exceptional service and craftsmanship. We recognized that modern lifestyles demand more than ordinary solutions. Our approach combines expertise with innovation, ensuring flawless results with every order.
          </p>
          <p className="text-gray-600">
            From laundry and dry cleaning to luxury shoe care, upholstery, and curtain cleaning, Freshora has grown into a symbol of reliability and refinement. We reject compromise  no delays, no shortcuts, only consistent excellence
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
