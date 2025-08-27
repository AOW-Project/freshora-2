"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

const steps = [
  {
    label: "Schedule Pickup",
    img: "/images/homework1.png",
  },
  {
    label: "We Collect",
    img: "/images/homework2.png",
  },
  {
    label: "We Clean",
    img: "/images/homework3.png",
  },
  {
    label: "We Deliver",
    img: "/images/homework4.png",
  },
]

export default function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-green-600 font-semibold mb-2 text-sm sm:text-base">
              [ Get Your Clothes Collected & Delivered ]
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"> Why Choose Freshora for Laundry Service in Dubai
</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
             Laundry should work around your lifestyle, not the other way around. With Freshora, it’s simple: schedule a pickup, hand over your clothes, and receive them back fresh, spotless, and neatly packed.



            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              With trusted experience, Freshora is one of the best laundry services in Dubai. Our blend of modern cleaning methods and eco-safe solutions makes us a go-to choice for families, professionals, and businesses.
            </p>
          </div>

          {/* Right Side: Animated Steps */}
          <div className="flex flex-col items-center order-1 lg:order-2">
            {/* Image Display */}
            <div className="mb-6 sm:mb-8 h-[180px] w-[280px] sm:h-[220px] sm:w-[320px] flex items-center justify-center">
              <Image
                key={activeStep}
                src={steps[activeStep].img || "/placeholder.svg"}
                alt={steps[activeStep].label}
                width={320}
                height={220}
                className="rounded-lg object-cover animate-fade-in w-full h-full"
              />
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-between items-start w-full max-w-xs sm:max-w-md">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  {/* Step Circle and Label */}
                  <div className="flex flex-col items-center text-center w-16 sm:w-20">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-500 ${
                        idx <= activeStep
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm mt-2 text-gray-700 font-medium leading-tight">
                      {step.label}
                    </span>
                  </div>

                  {/* Dotted Line Connector */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-auto border-t-2 border-dotted mt-4 sm:mt-5 transition-colors duration-500 ${
                        idx < activeStep ? "border-green-500" : "border-gray-300"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
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
  )
}
