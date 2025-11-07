"use client";

import Image from "next/image";
import React from "react";

const HistorySection: React.FC = () => {
  return (
    <section className="bg-white my-20 mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 px-6">
        {/* Image Section */}
        <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
          <div className="relative">
            <Image
              src="/images/redesign/about-why-tradition.jpg"
              alt="Laundry Tradition"
              width={500}
              height={500}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex-1 w-full text-center lg:text-left lg:pl-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:mb-6 leading-tight text-secondary-green">
            <span className="text-primary-green">A Tradition</span> of Care
          </h2>
          <p className=" mb-5 sm:mb-8 leading-relaxed text-sm text-zinc-600  sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
            Freshora was founded on a vision to redefine everyday laundry with
            exceptional service and craftsmanship. We recognized that modern
            lifestyles demand more than ordinary solutions. Our approach
            combines expertise with innovation, ensuring flawless results with
            every order. <br />
            <br />
            From laundry and dry cleaning to luxury shoe care, upholstery, and
            curtain cleaning, Freshora has grown into a symbol of reliability
            and refinement. We reject compromise no delays, no shortcuts, only
            consistent excellence
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
