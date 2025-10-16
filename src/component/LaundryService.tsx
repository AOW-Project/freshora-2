import { Check } from "lucide-react";
import Image from "next/image";
import { RiCheckDoubleLine } from "react-icons/ri";

const features = [
  "Everyday Laundry and Wash-Fold",
  "Dry Cleaning for Delicates",
  "Ironing and Finishing",
  "Express Laundry Service",
  "Curtain and Carpet Cleaning",
  "Shoe  Care",
  "Soft Toy Cleaning",
  "Luxury Fabric Care",
];

export default function LaundryService() {
  return (
    <section className="relative bg-white px-6 py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Image Section */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:w-5/12">
            <div className="relative aspect-square">
              <Image
                src="/images/redesign/laundry-service-img.jpg"
                alt="Personel Laundry service"
                fill
                className=" object-cover"
                priority
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex-1 w-full text-center lg:text-left lg:pl-2 mt-4">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-medium mb-3 leading-tight text-secondary-green">
              <span className="text-primary-green">Personal </span>
              Laundry Service
            </h1>
            <h2 className="text-zinc-600 text-xl font-medium mb-3 sm:mb-6 ">
              Laundry service for your business!
            </h2>
            <p className=" mb-5 sm:mb-8 leading-relaxed text-sm text-zinc-600  sm:text-base lg:text-lg w-full mx-auto lg:mx-0">
              Your Everyday Laundry, Done Professionally Life in Dubai is busy,
              but laundry should not take away your time. Freshora provides
              expert care for daily clothing, formal wear, and delicate fabrics,
              ensuring they are always clean and ready to wear. Our eco-friendly
              detergents and professional laundry methods keep clothes fresher
              for longer. Families and professionals across the city trust us
              for reliability and quality.
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2">
              {features.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 justify-center sm:justify-start text-base sm:text-xl text-secondary-green font-medium"
                >
                  <RiCheckDoubleLine size={30} className="text-primary-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
