"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuaranteeSection: React.FC = () => {
  return (
    <section className="bg-white my-30">
      <div className="my-10">
        <h2 className="text-3xl md:text-4xl text-primary-green font-medium  text-center ">
          Excellence
          <span className="text-secondary-green"> Without Exception</span>
        </h2>
        <h3 className="text-xl font-medium text-gray-600 text-center">
          Our Guarantee
        </h3>
      </div>
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/redesign/about-banner.png')`,
        }}
      >
        <div className="text-white text-sm sm:text-base md:text-xl flex flex-col max-w-5xl text-center space-y-5 justify-center items-center z-30">
          <p>
            Freshora has been the trusted name in garment care. We are committed
            to returning every piece in immaculate condition. In the rare
            instance of loss or damage, we provide reimbursement up to the full
            value of the item, with a 1,000 maximum per order.
          </p>
          <Link href="/best-laundry-services-in-dubai" className="">
            <button className="bg-primary-green text-white  flex flex-nowrap items-center justify-center gap-2 font-roboto-condensed font-semibold  rounded-[4px] px-8 py-2 text-xl cursor-pointer hover:bg-white hover:text-primary-green transition-all ease-in-out duration-500">
              Get Service Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
