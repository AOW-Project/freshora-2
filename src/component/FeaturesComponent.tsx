import { FaLeaf, FaShoePrints, FaTshirt, FaTruck } from "react-icons/fa";
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add as needed
  display: 'swap',
});

const features = [
  {
    icon: <FaLeaf size={24} className="text-green-500" />,
    title: "Eco-Friendly Dry Cleaning",
    description:
      "Our commitment to eco-friendly practices extends beyond our use of 100% toxin-free cleaning techniques. Our company is also incredibly proud to be a carbon-neutral business.",
  },
  {
    icon: <FaTshirt size={24} className="text-green-500" />,
    title: "Wash & Fold",
    description:
      "We are excited to offer quality shoe repair & bag services alongside our second to none dry cleaning and wash & fold service. Our staff use the highest quality products.",
  },
  {
    icon: <FaShoePrints size={24} className="text-green-500" />,
    title: "Bag & Shoe Repairs & Shines",
    description:
      "We offer one-day laundry service to customers in our service areas, combining the excellence of dry cleaning with the ultimate convenience in laundry service and laundry delivery.",
  },
  {
    icon: <FaTruck size={24} className="text-green-500" />,
    title: "Package Delivery",
    description:
      "Laundry services are considerably the most convenient services that people look for. Laundry is one of the most difficult chores that we have to deal with on a regular basis.",
  },
];

export default function FeaturesComponent() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
    <p className={`text-green-600 font-medium mb-2 text-center ${poppins.className}`}>[ Why you’ll love us ]</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
