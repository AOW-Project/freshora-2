import { Check } from "lucide-react"
import Image from "next/image"

const featuresLeft = ["Everyday Laundry and Wash-Fold", "Dry Cleaning for Delicates", "Ironing and Finishing", "Express Laundry Service"]

const featuresRight = [
  "Curtain and Carpet Cleaning",
  "Shoe and Bag Care",
  "Soft Toy Cleaning",
  "Luxury Fabric Care",
]

export default function LaundryService() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center bg-white px-4 md:px-20 py-10">
      {/* Left Image */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <Image
          src="/images/box02-img04.jpg"
          alt="Laundry"
          width={700}
          height={500}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-green-600 font-medium mb-2 text-sm sm:text-base">[ Laundry service for your business! ]</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
         Personal Laundry <br className="hidden sm:block" /> Service
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
          Your Everyday Laundry, Done Professionally
Life in Dubai is busy, but laundry should not take away your time. Freshora provides expert care for daily clothing, formal wear, and delicate fabrics, ensuring they are always clean and ready to wear.

Our eco-friendly detergents and professional laundry methods keep clothes fresher for longer. Families and professionals across the city trust us for reliability and quality.

        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 mb-6 sm:mb-8">
          <ul className="space-y-2 sm:space-y-3">
            {featuresLeft.map((item, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 sm:space-y-3">
            {featuresRight.map((item, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
