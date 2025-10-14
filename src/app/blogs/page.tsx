import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "How Professional Laundry Services Save You Time and Effort",
    description:
      "Discover how using a professional laundry service can simplify your life. From pickup and delivery to eco-friendly washing methods, learn why outsourcing your laundry is worth it.",
    image:
      "/images/iron-and-stack-of-shirts-on-ironing-board-space-f-2025-03-25-22-33-47-utc.webp",
    slug: "blog-no-1",
  },
  {
    id: 2,
    title: "Top 5 Laundry Mistakes You Should Avoid at Home",
    description:
      "Many people unknowingly damage their clothes while washing them at home. This article explores common laundry mistakes and how professional care ensures longer fabric life.",
    image:
      "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.webp",
    slug: "blog-no-1",
  },
  {
    id: 3,
    title: "Why Eco-Friendly Laundry Services Are the Future",
    description:
      "Learn how modern laundry services are adopting eco-friendly detergents, water recycling, and energy-efficient machines to promote sustainability and protect your clothes.",
    image:
      "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.webp",
    slug: "blog-no-1",
  },
];

interface BlogCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  description,
  slug,
}) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden  hover:shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 text-left">
        <div className="flex justify-start mb-4"></div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex justify-end w-full">
          <Link href={`/blogs/${slug}`}>
            <button className="bg-green-600 justify-end text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

function page() {
  return (
    <>
      <div
        className="relative h-64 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/a-basket-of-laundry-and-public-laundromat-2024-11-27-17-08-56-utc.webp?height=400&width=1200&text=Laundry+Machines+Background')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-white mb-4">
            <Link href="/" className="hover:text-green-400">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/blogs" className="hover:text-green-400">
              Blog
            </Link>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white">Blogs</h1>
        </div>
      </div>
      <main className="mx-6 sm:mx-14 md:mx-20 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            slug={blog.slug}
          />
        ))}
      </main>
    </>
  );
}

export default page;
