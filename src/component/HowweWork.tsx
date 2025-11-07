"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const steps = [
  {
    label: "Schedule Pickup",
    img: "/images/redesign/hww-schedule.svg",
  },
  {
    label: "We Collect",
    img: "/images/redesign/hww-deliver.svg",
  },
  {
    label: "We Clean",
    img: "/images/redesign/hww-wash.svg",
  },
  {
    label: "We Deliver",
    img: "/images/redesign/hww-deliver.svg",
  },
];

export default function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:gap-12 items-center">
          {/* Title */}

          <div className="w-full">
            <h2 className="text-3xl font-medium text-center">
              <span className="text-primary-green">Why Choose Freshora </span>
              for Laundry Service in Dubai
            </h2>
            <h2 className="text-xl font-medium text-[#606060] text-center my-3">
              Get Your Clothes Collected & Delivered
            </h2>
          </div>
          {/* Animated Steps */}
          <div className="w-full max-w-2xl flex flex-col">
            {/* Stepper Navigation */}
            <div className="flex justify-between items-center w-full px-6">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  {/* Step Circle and Label */}
                  <div className="flex flex-col items-center text-center  relative">
                    <div
                      className={`w-8 h-8 sm:w-14 sm:h-14 rounded-full border-3 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-500   ${
                        idx <= activeStep
                          ? " border-primary-green text-white bg-white"
                          : " border-gray-300 text-gray-400 bg-gray-100"
                      }`}
                    >
                      <div className="w-full flex items-center justify-center relative h-full">
                        <Image
                          src={step.img}
                          alt="Laundry Experience"
                          height={30}
                          width={30}
                          className={`h-3 sm:h-5 w-auto object-fit`}
                          priority
                        />
                      </div>
                    </div>
                    <span
                      className={`absolute -bottom-6 text-xs sm:text-sm mt-2 text-nowrap  font-medium leading-tight ${
                        idx <= activeStep
                          ? " text-primary-green"
                          : "text-secondary-green"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Line Connector */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-auto  h-2 border-b-2 border-t-2 transition-colors duration-500 ${
                        idx < activeStep
                          ? "bg-primary-green border-primary-green "
                          : "bg-none border-gray-400 "
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="text-center w-full sm:px-10 md:px-16 lg:px-22">
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
              Laundry should work around your lifestyle, not the other way
              around. With Freshora, it’s simple: schedule a pickup, hand over
              your clothes, and receive them back fresh, spotless, and neatly
              packed.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              With trusted experience, Freshora is one of the best laundry
              services in Dubai. Our blend of modern cleaning methods and
              eco-safe solutions makes us a go-to choice for families,
              professionals, and businesses.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}
