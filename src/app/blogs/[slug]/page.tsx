import LaundryFAQs from "@/component/LaundryFAQs";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogs } from "../page";

const featuredBlogCard = [
  {
    id: 1,
    title: "How Express Laundry Benefits For Busy Schedules on Busy Days",
    description:
      "We’ve all had those mornings when the clock seems to move faster than you do. Between early work calls, endless errands, and trying to find that one clean shirt buried in the laundry pile, it can feel impossible to stay on top of chores. That’s exactly how express laundry benefits for busy schedules — by saving you precious time without compromising on freshness or quality.",
    slug: "express-laundry-benefits-for-busy-schedules",
  },
  {
    id: 2,
    title: "Eco-Friendly Laundry Tips for a Greener Clean",
    description:
      "Discover simple, eco-friendly laundry tips that actually work. Learn how to save water, energy, and your clothes while keeping your laundry routine sustainable.",
    slug: "eco-friendly-laundry-tips-for-a-greener-clean",
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
}) => (
  <div className="p-4 text-left border-2 border-green-600 rounded-2xl w-full">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4 truncate">{description}</p>
    <div className="flex justify-end w-full">
      <Link
        href={`/blogs/${slug}`}
        className="justify-end text-green-800 text-sm transition cursor-pointer"
      >
        Read more
      </Link>
    </div>
  </div>
);

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ✅ Corrected generateMetadata (async + await params)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogData = blogs.find((blog) => blog.slug === slug);

  if (!blogData) {
    return {
      title: "Blog Not Found | Freshora Laundry",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: blogData.meta.title,
    description: blogData.meta.description,
    keywords: ["When to use dry cleaning", "Washing clothes", "stain removal"],
    alternates: {
      canonical: blogData.meta.url,
    },
    openGraph: {
      title: blogData.meta.title,
      description: blogData.meta.description,
      url: blogData.meta.url,
    },
    twitter: {
      title: blogData.meta.title,
      description: blogData.meta.description,
    },
  };
}

// ✅ Corrected Page (async + await params)
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const blogData = blogs.find((blog) => blog.slug === slug);

  return (
    <div className="w-full px-6 sm:px-14 md:px-20 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-black mb-4">
        <Link href="/" className="hover:text-green-400">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href="/blogs" className="hover:text-green-400">
          Blogs
        </Link>
        <span className="px-2">/</span>
        <span className="text-gray-700">{slug}</span>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
        {/* Main blog */}
        <main className="col-span-4">
          <h1 className="text-xl sm:text-3xl font-semibold">
            {blogData?.title}
          </h1>
          <div className="relative w-full h-56 my-5">
            <Image
              src="/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.webp"
              alt={blogData?.title || "blog image"}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <p className="text-sm my-4">{blogData?.description}</p>

          {blogData?.content?.map((data) => (
            <div key={data.title}>
              <h2 className="text-base font-medium mb-2">{data.title}</h2>
              <p className="text-sm mb-4">{data.description}</p>
            </div>
          ))}

          <LaundryFAQs faqs={blogData?.faqs} />
        </main>

        {/* Featured blogs */}
        <aside className="col-span-2">
          <div className="flex flex-col gap-5 sticky top-20">
            <h2 className="text-2xl font-medium">Featured Blogs</h2>
            {featuredBlogCard.map((feature) => (
              <FeatureCard key={feature.id} {...feature} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
