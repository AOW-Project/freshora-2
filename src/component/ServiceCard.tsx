import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
interface ServiceCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
  slug,
}) => {
  return (
    <Link href={`/services/${slug}`}>
      <div className="bg-white shadow-md rounded-md border border-primary-green overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg flex flex-col sm:flex-row">
        {/* Fixed-size image container */}
        <div className="relative flex-shrink-0 w-full h-36 sm:w-56 sm:h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="p-4 text-left flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {description}
            </p>
          </div>
          <button className="bg-secondary-green text-white text-sm px-6 py-2 rounded hover:bg-green-700 transition self-start">
            Get the Service
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
