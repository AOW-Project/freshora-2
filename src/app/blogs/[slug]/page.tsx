import LaundryFAQs from "@/component/LaundryFAQs";
import Image from "next/image";
import Link from "next/link";

const featuredBlogCard = [
  {
    id: 1,
    title: "How Professional Laundry Services Save You Time and Effort",
    description:
      "Discover how using a professional laundry service can simplify your life. From pickup and delivery to eco-friendly washing methods, learn why outsourcing your laundry is worth it.",
    slug: "blog-no-1",
  },
  {
    id: 2,
    title: "Top 5 Laundry Mistakes You Should Avoid at Home",
    description:
      "Many people unknowingly damage their clothes while washing them at home. This article explores common laundry mistakes and how professional care ensures longer fabric life.",
    slug: "blog-no-1",
  },
];

interface FeatureCardProps {
  id: number;
  title: string;
  description: string;
  slug: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  slug,
}) => {
  return (
    <div className="p-4 text-left border-2 border-green-600 rounded-2xl w-full">
      <div className="flex justify-start mb-4"></div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 truncate">{description}</p>
      <div className="flex justify-end w-full">
        <Link
          href={`/blogs/${slug}`}
          className="justify-end text-green-800 text-sm  transition cursor-pointer"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <>
      <div className="w-full px-6 sm:px-14 md:px-20 py-10">
        <nav className="flex items-center space-x-2 text-black mb-4">
          <Link href="/" className="hover:text-green-400">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/blogs" className="hover:text-green-400">
            Blog
          </Link>
          <span className="px-2">/</span>
          <Link href={`/blogs/${slug}`} className="hover:text-green-400">
            {`${slug}`}
          </Link>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
          {/* main blog */}
          <main className="col-span-4">
            <h1 className="text-xl sm:text-3xl font-semibold">
              How Professional Laundry Services Save You Time and Effort
            </h1>
            <div className="relative w-full h-56 my-5">
              <Image
                src="/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.webp"
                alt="blog-image"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <p className="text-sm my-4">
              Laundry is one of those chores that never seems to end. Between
              busy work schedules, family commitments, and social life, finding
              time to wash, dry, and fold clothes can feel impossible.
              Professional laundry services eliminate this hassle by offering
              convenient pickup and delivery options, ensuring your clothes are
              cleaned and pressed without you having to lift a finger. This not
              only saves valuable time but also allows you to focus on the
              things that truly matter — whether it’s spending time with loved
              ones or getting some well-deserved rest.
            </p>
            <p className="text-sm my-4">
              Beyond the convenience, professional laundry providers use
              advanced cleaning techniques and industry-grade equipment that
              achieve better results than most home washers. They understand the
              right water temperature, detergent type, and treatment for each
              fabric, reducing wear and tear on your clothes. From delicate
              silks to heavy linens, everything receives personalized care,
              ensuring longer-lasting garments and brighter colors wash after
              wash.
            </p>
            <p className="text-sm my-4">
              Another major advantage is sustainability. Many modern laundry
              services use eco-friendly detergents and water-efficient machines,
              helping to reduce your carbon footprint. Some even recycle water
              and use biodegradable cleaning products that are safe for both
              your clothes and the environment. By choosing a professional
              service that values sustainability, you not only enjoy cleaner
              clothes but also contribute to a cleaner planet.
            </p>
            {/* FAQ */}

            <LaundryFAQs />
          </main>
          {/* featured blog */}
          <aside className="col-span-2">
            <div className="flex flex-col gap-5 sticky top-20">
              <h2 className="text-2xl font-medium">Featured Blogs</h2>
              {featuredBlogCard.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  id={feature.id}
                  title={feature.title}
                  description={feature.description}
                  slug={feature.slug}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default page;
