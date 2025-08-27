'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const GuaranteeSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-8">
        
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <p className="text-green-600 font-semibold mb-2">[ Our Guarantee ]</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Best Guarantee <br className="hidden md:block" /> in the Business
          </h2>
          <p className="text-gray-600 mb-6">
            The most trusted brand in clothing care since 2011. We will do everything we can to return your clothes to you in great shape.
            In the rare instance that an item goes missing or is damaged during the cleaning process, we’ll reimburse you up to the full
            value of the item with a $1,000 maximum per order.
          </p>
          <Link href='/services'>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300">
            Get Service Now
          </button>
          </Link>

        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/box02-img04.jpg" // Make sure to save your image in public/images/guarantee.png
            alt="Smiling woman with laundry"
            width={500}
            height={400}
            className="rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
