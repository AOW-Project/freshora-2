export interface ServiceItem {
  id: string | number;
  name: string;
  price: number;
  description?: string;
}

export interface Service {
  items?: ServiceItem[];
  id: number;
  slug: string;
  url?: string;
  title: string;
  description: string;
  fullDescription: string;
  // ✅ Added secondary title and description fields
  secondaryTitle: string;
  secondaryDescription: string;
  image: string;
  gallery: string[];
  features: string[];
  pricing: {
    basic: { price: string; description: string };
    premium: { price: string; description: string };
  };
  duration?: string;
  rating: number;
  reviews: number;
  process: string[];
  faq: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonical?: string;
}

const services: Service[] = [
  {
    id: 1,
    slug: "professional-laundry-services-in-dubai",
    title: "Laundry Services",
    description: "Professional laundry for all clothes.",
    fullDescription:
      "Professional Laundry Services in Dubai are designed for your lifestyle. Fresh clothes, more free time, zero stress – that’s our promise. From wash and fold service to laundry pickup and delivery, we make cleaning effortless. Enjoy doorstep laundry service with in Dubai with fabric-friendly care, expert stain removal, and spotless results.",
    // ✅ Added secondary title and description
    secondaryTitle: "Wash and Fold Laundry Service Delivered to Your Home",
    secondaryDescription:
      "Book reliable laundry pickup and delivery today and enjoy wrinkle-free, spotless results with our wash and fold service right at your doorstep.",
    image:
      "/images/women-sorting-clothes-in-the-laundry-2025-03-14-03-27-51-utc.jpg",
    gallery: [
      "/images/unidentified-woman-chooses-clothes-in-a-store-2025-01-16-11-48-15-utc.jpg",
      "/images/work-in-laundry-2025-03-17-04-27-23-utc.jpg",
    ],
    features: [
      "Free pickup and delivery within 24 hours",
      "Eco-friendly detergents and fabric softeners",
      "Same-day service available for urgent orders",
      "Professional stain removal treatment",
      "Clothes sorted by fabric type and color",
      "24/7 customer support and order tracking",
    ],
    pricing: {
      basic: {
        price: "Per Item",
        description: "Individual pricing for each clothing item",
      },
      premium: {
        price: "Per Item + Express",
        description: "Individual pricing with express service",
      },
    },
    duration: "24-48 hours",
    rating: 5,
    reviews: 127,
    process: [
      "Select items and quantities from our catalog",
      "Add items to cart and schedule pickup",
      "We collect your laundry from your doorstep",
      "Professional washing and drying process",
      "Quality check and neat folding",
      "Free delivery back to your location",
    ],
    faq: [
      {
        question: "How is pricing calculated?",
        answer:
          "Pricing is calculated per item based on the type of clothing. You can see individual prices for each item in our catalog.",
      },
      {
        question: "Can I mix different categories in one order?",
        answer:
          "Yes, you can add items from men's, women's, and children's categories in a single order.",
      },
    ],
    items: undefined,
    metaTitle: "Professional Laundry Services in Dubai | Freshora Laundry Care",
    metaDescription:
      "Get spotless clothes with Freshora’s professional laundry service in Dubai. Free pickup & delivery, eco-friendly cleaning, and expert care for your garments.",
    keywords: [
      "Professional Laundry Services in Dubai ",
      "wash and fold service",
      " laundry pickup and delivery",
      "doorstep laundry service with in Dubai",
    ],
    canonical:
      "https://freshoralaundry.com/services/professional-laundry-services-in-dubai",
  },
  {
    id: 2,
    slug: "dry-cleaning-services-in-dubai",
    title: "Dry Cleaning Services",
    description: "Gentle care for delicate garments.",
    fullDescription:
      "Stay sharp and save time with our premium Dry Cleaning services in Dubai. From stain removal to delicate fabrics, our professional dry cleaners deliver spotless results. Ideal for suits, dresses, coats, and luxury garments, our eco-friendly process ensures long-lasting freshness and premium garment care every time.",
    secondaryTitle:
      "Best Dry Cleaning Service in Dubai Delivered to Your Doorstep",
    secondaryDescription:
      "Enjoy convenience with dry cleaning pickup and delivery. Whether you need affordable dry cleaners in Dubai or luxury dry cleaning in Dubai, we guarantee wrinkle-free results and expert fabric care-right at your doorstep.",
    image:
      "/images/iron-and-stack-of-shirts-on-ironing-board-space-f-2025-03-25-22-33-47-utc.webp",
    gallery: [
      "/images/clothing-garment-rack-with-hanging-polos-2025-03-15-07-54-07-utc.jpeg",
      "/images/ironing-board-with-iron-and-linen-2024-10-17-04-27-08-utc.jpg",
    ],
    features: [
      "Professional stain removal for all fabric types",
      "Garment pressing and steaming included",
      "Fabric protection treatment available",
      "Minor repairs and alterations included",
      "Eco-friendly dry cleaning solvents",
      "Quality guarantee on all services",
    ],
    pricing: {
      basic: {
        price: "Per Item",
        description: "Individual pricing for each garment",
      },
      premium: {
        price: "Per Item + Premium Care",
        description:
          "Individual pricing with fabric protection and minor repairs",
      },
    },
    // duration: "2-3 days",
    rating: 5,
    reviews: 89,
    process: [
      "Select garments and quantities from our catalog",
      "Add items to cart and schedule pickup",
      "Professional inspection and stain identification",
      "Dry cleaning with appropriate solvents",
      "Professional pressing and finishing",
      "Quality check and delivery",
    ],
    faq: [
      {
        question: "What items require dry cleaning?",
        answer:
          'Suits, dresses, silk items, wool garments, and items with "Dry Clean Only" labels.',
      },
      {
        question: "How do you calculate the total cost?",
        answer:
          "Each garment type has individual pricing. Your total is calculated based on the items and quantities you select.",
      },
    ],
    items: undefined,
    metaTitle: "Premium Dry Cleaning Services in Dubai | Freshora Laundry",
    metaDescription:
      "Experience Premium Dry Cleaning Services in Dubai with Freshora - expert fabric care, eco-friendly cleaning, and flawless results delivered to your doorstep. ",
    keywords: [
      "Dry Cleaning Services in Dubai",
      "out professional dry cleaners",
      "premium garment care",
      "dry cleaning pickup and delivery",
      "affordable dry cleaners in Dubai",
      "luxury dry cleaning in Dubai",
    ],
    canonical:
      "https://freshoralaundry.com/services/dry-cleaning-services-in-dubai",
  },
  {
    id: 3,
    slug: "express-laundry-services-in-dubai",
    title: "Express Laundry Services",
    description: "Same-day laundry services.",
    fullDescription:
      "Get a fresh look in hours, not days, with Express Laundry Services in Dubai. Perfect for business travelers, busy professionals, and urgent laundry needs, our express laundry service ensures spotless results. From suit cleaning service to express laundry and dry cleaning, enjoy same-day turnaround with premium care.",
    secondaryTitle: "Best Express Laundry Services in Dubai at Your Doorstep",
    secondaryDescription:
      "Book hassle-free express laundry services in Dubai today. With fast pickup, express laundry and dry cleaning, and wrinkle-free results, we deliver fresh clothes the very same day.",
    image:
      "/images/close-up-of-businessman-holding-shirts-2024-09-28-03-21-06-utc.jpg",
    gallery: [
      "/images/shot-of-an-unrecognizable-woman-doing-her-laundry-2025-04-06-08-43-19-utc.jpg",
      "/images/close-up-view-of-stacked-clean-towels-and-plastic-2024-11-19-14-08-01-utc.jpg",
    ],
    features: [
      "Same-day service guarantee",
      "Priority processing for urgent orders",
      "Express pickup and delivery",
      "Professional quality maintained",
      "Available 7 days a week",
      "Real-time order tracking",
    ],
    pricing: {
      basic: {
        price: "Per Item + 50%",
        description: "Regular pricing plus express surcharge",
      },
      premium: {
        price: "Per Item + 75%",
        description: "Premium care with express service",
      },
    },
    // duration: "4-8 hours",
    rating: 5,
    reviews: 156,
    process: [
      "Call or book online for express service",
      "Immediate pickup scheduling",
      "Priority processing in our facility",
      "Quality check and packaging",
      "Express delivery within hours",
      "Customer satisfaction confirmation",
    ],
    faq: [
      {
        question: "What is the cutoff time for same-day service?",
        answer:
          "Orders placed before 10 AM can be delivered the same day by 6 PM.",
      },
      {
        question: "Is express service available on weekends?",
        answer:
          "Yes, we offer express service 7 days a week including weekends and holidays.",
      },
    ],
    items: undefined,
    metaTitle: "Express Laundry Services in Dubai | Freshora Laundry Experts",
    metaDescription:
      "Freshora provides professional express laundry services in Dubai with quick pickup, timely delivery, and expert garment care for a hassle-free experience.",
    keywords: [
      "Express Laundry Services in Dubai",
      "express laundry service",
      " express laundry and dry cleaning",
      "express laundry services in Dubai ",
    ],
    canonical:
      "https://freshoralaundry.com/services/express-laundry-services-in-dubai",
  },
  {
    id: 4,
    slug: "shoe-and-bag-spa-services-in-dubai",
    title: "Shoe and Bag Spa Services",
    description: "Luxury cleaning for shoes.",
    fullDescription:
      "Give your accessories new life with our premium shoe and bag spa services in Dubai. From leather shoe cleaning to delicate handbags, our experts restore, clean, and protect every material with care, offering specialized treatments like color restoration and conditioning for long-lasting beauty.",
    secondaryTitle: "Shoe  Delivered to Your Door",
    secondaryDescription:
      "Book our expert shoe cleaning service or sneaker cleaning service today. Enjoy premium care for shoes and handbags-all restored with precision and delivered fresh to your doorstep.",
    image:
      "/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.webp",
    gallery: [
      "/images/shoe-polisher-2024-10-23-08-39-38-utc.jpg",
      "/images/shoes-and-bags-displayed-at-store-2024-10-11-10-45-42-utc.jpg",
    ],
    features: [
      "Luxury leather conditioning",
      "Color restoration and touch-ups",
      "Suede and fabric cleaning",
      "Hardware polishing and repair",
      "Waterproofing treatment",
      "Storage and care advice",
    ],
    pricing: {
      basic: {
        price: "$25-50",
        description: "Standard cleaning and conditioning",
      },
      premium: {
        price: "$50-100",
        description: "Full restoration with color matching",
      },
    },
    // duration: "3-5 days",
    rating: 5,
    reviews: 73,
    process: [
      "Item assessment and consultation",
      "Detailed cleaning and conditioning",
      "Color restoration if needed",
      "Hardware cleaning and polishing",
      "Protective treatment application",
      "Quality inspection and delivery",
    ],
    faq: [
      {
        question: "Do you work on designer brands?",
        answer:
          "Yes, we specialize in luxury brands including Louis Vuitton, Gucci, Prada, and more.",
      },
      {
        question: "Can you restore faded colors?",
        answer:
          "Yes, we offer professional color restoration services for leather goods.",
      },
    ],
    items: undefined,
    metaTitle: "Shoe and Bag Spa Services in Dubai | Freshora Care",
    metaDescription:
      "Restore the beauty of your shoes and bags with Freshora’s premium shoe and bag spa services in Dubai. Expert cleaning, care, and long-lasting freshness.",
    keywords: [
      "Shoe and Bag Spa Services in dubai",
      "leather shoe cleaning",
      " shoe cleaning service",
      "sneaker cleaning service",
    ],
    canonical:
      "https://freshoralaundry.com/services/shoe-and-bag-spa-services-in-dubai",
  },
  {
    id: 5,
    slug: "luxury-shoe-cleaning-services-in-dubai",
    title: "Luxury Shoe Cleaning Services",
    description: "Premium shoe care services.",
    fullDescription:
      "Experience premium Luxury Shoe Cleaning Services in Dubai with our certified specialists. From professional shoe cleaning for Italian leather to sneaker cleaning service for designer pairs, we restore shine, protect materials, and extend your footwear’s lifespan with expert techniques and eco-friendly care.",
    secondaryTitle: "Luxury Shoe Care at Your Doorstep",
    secondaryDescription:
      "Book trusted shoe cleaning service Dubai today. From luxury dress shoes to sneakers, enjoy meticulous cleaning, restoration, and care-all delivered to your doorstep. ",
    image: "/images/erik-mclean-AnRxcupEQT0-unsplash.webp",
    gallery: [
      "/images/shoemaker-sharpens-the-shoe-sole-footwear-repair-2024-12-02-20-55-16-utc.jpg",
      "/images/pexels-ashis-sarker-706183433-18155790.jpg",
    ],
    features: [
      "Hand-crafted shoe care",
      "Premium leather conditioning",
      "Mirror shine polishing",
      "Sole cleaning and conditioning",
      "Cedar shoe tree service",
      "Luxury packaging and delivery",
    ],
    pricing: {
      basic: {
        price: "$30-60",
        description: "Premium cleaning and conditioning",
      },
      premium: {
        price: "$60-120",
        description: "Full restoration with mirror shine",
      },
    },
    // duration: "2-4 days",
    rating: 5,
    reviews: 92,
    process: [
      "Shoe assessment and photography",
      "Deep cleaning and conditioning",
      "Hand polishing and buffing",
      "Sole treatment and conditioning",
      "Quality inspection and packaging",
      "White-glove delivery service",
    ],
    faq: [
      {
        question: "What brands do you specialize in?",
        answer:
          "We work with all luxury brands including Louboutin, Jimmy Choo, Manolo Blahnik, and Italian makers.",
      },
      {
        question: "Do you provide shoe trees?",
        answer:
          "Yes, we include cedar shoe trees with our premium service to maintain shoe shape.",
      },
    ],
    items: undefined,
    metaTitle: "Best Luxury Shoe Cleaning Services in Dubai | Freshora Laundry",
    metaDescription:
      "  Freshora offers expert luxury shoe cleaning service  in Dubai. Gentle care, deep cleaning, and premium restoration to keep your footwear looking flawless.",
    keywords: [
      "Luxury Shoe Cleaning Services in dubai",
      "professional shoe cleaning",

      "sneaker cleaning service",
      "shoe cleaning service Dubai",
    ],
    canonical:
      "https://freshoralaundry.com/services/luxury-shoe-cleaning-services-in-dubai",
  },
  {
    id: 6,
    slug: "commercial-laundry-services-in-dubai",
    title: "Commercial Laundry Services",
    description: "Laundry solutions for businesses.",
    fullDescription:
      "When businesses demand spotless laundry, we deliver unmatched quality and care. Our commercial laundry services in Dubai provides reliable, high-volume solutions for hotels, restaurants, salons, and healthcare facilities. From laundry service for hotels to laundry service for restaurants, we ensure consistent hygiene, efficiency, and timely delivery every time.",
    secondaryTitle: "Commercial Laundry at Your Doorstep",
    secondaryDescription:
      "Trusted commercial laundry services with pickup and delivery-perfect for hotels, restaurants, and businesses needing professional, large-scale care at affordable rates. ",
    image:
      "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.webp",
    gallery: [
      "/images/woman-working-in-laundry-2025-04-03-06-15-04-utc.jpg",
      "/images/clothes-in-basket-2025-04-01-05-55-39-utc.jpg",
    ],
    features: [
      "High-volume processing capacity",
      "Scheduled pickup and delivery",
      "Industry-specific cleaning protocols",
      "Inventory management systems",
      "Emergency rush service available",
      "Compliance with health regulations",
    ],
    pricing: {
      basic: {
        price: "Volume Based",
        description: "Competitive rates for bulk orders",
      },
      premium: {
        price: "Custom Contract",
        description: "Tailored service agreements",
      },
    },
    // duration: "24-48 hours",
    rating: 5,
    reviews: 234,
    process: [
      "Business needs assessment",
      "Custom service plan development",
      "Scheduled pickup implementation",
      "Professional processing and quality control",
      "Inventory tracking and reporting",
      "Reliable delivery and account management",
    ],
    faq: [
      {
        question: "What industries do you serve?",
        answer:
          "We serve restaurants, hotels, healthcare, salons, gyms, and many other commercial sectors.",
      },
      {
        question: "Do you provide inventory management?",
        answer:
          "Yes, we offer complete inventory tracking and management services for commercial clients.",
      },
    ],
    items: undefined,
    metaTitle: "Commercial Laundry Services in Dubai | Freshora Business Care",
    metaDescription:
      "Freshora offers reliable commercial laundry services in Dubai for hotels, gyms, and businesses with expert care and timely delivery.",
    keywords: [
      "Commercial Laundry Services in dubai",
      "From laundry service for hotels",
      "laundry service for restaurants",
    ],
    canonical:
      "https://freshoralaundry.com/services/commercial-laundry-services-in-dubai",
  },
  {
    id: 7,
    slug: "curtain-cleaning-services-in-dubai",
    title: "Curtain Cleaning Services",
    description: "Expert curtain cleaning at your doorstep.",
    fullDescription:
      "Transform dusty drapes into fresh, vibrant curtains with expert cleaning service.Our curtain cleaning services in Dubai restores everything from delicate sheers to blackout drapes. With professional curtain cleaning, drapery cleaning service, and curtain dry cleaning, we remove dust, allergens, and stains while preserving fabric strength, color, and elegance for a healthier home.",
    secondaryTitle: "Curtain Cleaning at Your Doorstep",
    secondaryDescription:
      "Book trusted curtain washing service in Dubai-fresh, spotless curtains delivered back to your home",
    image:
      "/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.webp",
    gallery: [
      "/images/house-cleaning-woman-in-gloves-with-a-rag-cleanin-2024-12-08-01-28-27-utc.jpg",
      "/images/asian-cleaning-service-woman-worker-cleaning-in-li-2025-03-24-14-55-20-utc.jpg",
    ],
    features: [
      "Free takedown and rehang service",
      "Specialized fabric care",
      "Dust and allergen removal",
      "Stain treatment and removal",
      "Fabric protection treatment",
      "Minor repair services included",
    ],
    pricing: {
      basic: {
        price: "$15-30/panel",
        description: "Standard curtain cleaning",
      },
      premium: {
        price: "$30-50/panel",
        description: "Delicate fabric care with protection",
      },
    },
    // duration: "3-5 days",
    rating: 5,
    reviews: 67,
    process: [
      "In-home consultation and measurement",
      "Professional takedown service",
      "Specialized cleaning process",
      "Quality inspection and pressing",
      "Professional rehang service",
      "Customer walkthrough and satisfaction check",
    ],
    faq: [
      {
        question: "Do you take down and rehang curtains?",
        answer:
          "Yes, our service includes professional takedown and rehang at no additional cost.",
      },
      {
        question: "What types of curtains can you clean?",
        answer:
          "We clean all types including silk, velvet, linen, cotton, and synthetic fabrics.",
      },
    ],
    items: undefined,
    metaTitle:
      "Curtain Cleaning Services in Dubai | Freshora Professional Care",
    metaDescription:
      "Revive your curtains with Freshora’s curtain cleaning services in Dubai. Gentle fabric care, expert cleaning, and hassle-free pickup & delivery.",
    keywords: [
      "Curtain Cleaning Services in Dubai",
      "professional curtain cleaning",
      "drapery cleaning service",
      "curtain dry cleaning",
    ],
    canonical:
      "https://freshoralaundry.com/services/curtain-cleaning-services-in-dubai",
  },
  {
    id: 8,
    slug: "carpet-cleaning-services-in-dubai",
    title: "Carpet Cleaning Services",
    description: "Deep cleaning for carpets and rugs.",
    fullDescription:
      "Revive your carpets with expert cleaning for a healthier, fresher home. Our carpet cleaning services in Dubai use advanced steam technology and eco-friendly methods to eliminate dirt, stains, and allergens. From professional carpet cleaning Dubai to delicate wool rug cleaning service, our certified technicians restore beauty, freshness, and long-lasting comfort to every carpet and rug.  ",
    secondaryTitle: "Deep Clean for a Healthier Home",
    secondaryDescription:
      "Our advanced cleaning process removes embedded dirt, allergens, and tough stains, leaving your carpets looking and feeling fresh and new.",
    image:
      "/images/a-closeup-view-of-vacuuming-a-carpet-in-a-contempo-2024-12-13-14-23-46-utc.webp",
    gallery: [
      "/images/housekeeper-is-using-cordless-vacuum-cleaner-with-2024-10-12-16-32-25-utc.jpg",
      "/images/close-up-of-professional-cleaner-using-brush-while-2024-12-13-22-35-19-utc.jpg",
    ],
    features: [
      "Deep steam cleaning technology",
      "Eco-friendly cleaning solutions",
      "Pet odor and stain removal",
      "Allergen elimination",
      "Fast drying process",
      "Carpet protection treatment",
    ],
    pricing: {
      basic: {
        price: "$0.50-0.75/sq ft",
        description: "Standard carpet cleaning",
      },
      premium: {
        price: "$0.75-1.25/sq ft",
        description: "Deep cleaning with stain protection",
      },
    },
    // duration: "2-4 hours",
    rating: 5,
    reviews: 145,
    process: [
      "Free in-home estimate",
      "Pre-treatment of stains and high-traffic areas",
      "Deep steam cleaning process",
      "Spot treatment for stubborn stains",
      "Optional carpet protection application",
      "Final inspection and customer walkthrough",
    ],
    faq: [
      {
        question: "How long does it take for carpets to dry?",
        answer:
          "Typically 4-6 hours depending on humidity, air circulation, and carpet thickness.",
      },
      {
        question: "Do you clean area rugs?",
        answer:
          "Yes, we clean all types of area rugs including Persian, Oriental, and contemporary rugs.",
      },
    ],
    items: undefined,
    metaTitle:
      "Professional Carpet Cleaning Services in Dubai | Freshora touch  ",
    metaDescription:
      "Freshora offers expert carpet cleaning services in Dubai. Restore freshness, remove dirt, and enjoy spotless carpets with our trusted care.",
    keywords: [
      "Carpet Cleaning Services in dubai",
      "professional carpet cleaning Dubai",
      "delicate wool rug cleaning service",
    ],
    canonical:
      "https://freshoralaundry.com/services/carpet-cleaning-services-in-dubai",
  },
  {
    id: 9,
    slug: "soft-toy-cleaning-services-in-dubai",
    title: "Soft Toy Cleaning Services",
    description: "Safe and hygienic cleaning for toys.",
    fullDescription:
      "Keep childhood memories safe with expert cleaning for toys you treasure most.Our Soft Toy Cleaning Services in Dubai makes plush toys, teddies, and dolls safe, clean, and germ-free. Using non-toxic, child-safe methods, we provide teddy bear cleaning service, kids toy cleaning service, and soft toy sanitization service that preserve softness while removing dust mites, allergens, and stains",
    secondaryTitle: "Gentle & Hygienic Care for Cherished Friends",
    secondaryDescription:
      "Using non-toxic, child-safe methods, we remove dust mites, allergens, and stains while preserving the softness and shape of your child's favorite toys.",
    image:
      "/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.webp",
    gallery: [
      "/images/rabbit-toy-in-the-laundry-2025-01-07-04-47-31-utc.jpg",
      "/images/plush-toys-bunny-and-teddy-bear-are-dried-on-a-clo-2024-12-02-22-58-13-utc.jpg",
    ],
    features: [
      "Child-safe, non-toxic cleaning products",
      "Gentle cleaning process",
      "Dust mite and allergen removal",
      "Odor elimination",
      "Shape and texture preservation",
      "Hygienic packaging and delivery",
    ],
    pricing: {
      basic: { price: "$8-15/toy", description: "Standard soft toy cleaning" },
      premium: {
        price: "$15-25/toy",
        description: "Deep sanitization with allergen treatment",
      },
    },
    // duration: "2-3 days",
    rating: 5,
    reviews: 89,
    process: [
      "Toy inspection and assessment",
      "Gentle pre-treatment of stains",
      "Safe cleaning with child-friendly products",
      "Thorough rinsing and sanitization",
      "Careful drying and fluffing",
      "Hygienic packaging and delivery",
    ],
    faq: [
      {
        question: "Are your cleaning products safe for children?",
        answer:
          "Yes, we use only child-safe, non-toxic, hypoallergenic cleaning products.",
      },
      {
        question: "Can you clean electronic toys?",
        answer:
          "We can clean the fabric parts of electronic toys, but electronic components must be removed first.",
      },
    ],
    items: undefined,
    metaTitle: "Soft Toy Cleaning Services in Dubai | Freshora Gentle Care",
    metaDescription:
      "Keep your kids’ favorite toys fresh, safe, and spotless. Freshora offers expert soft toy cleaning services in Dubai with gentle, hygienic care.",

    keywords: [
      "Soft Toy Cleaning Services in dubai",
      "teddy bear cleaning service",
      "kids toy cleaning service",
      "plush toy cleaning",
      "soft toy sanitization service",
    ],
    canonical:
      "https://freshoralaundry.com/services/soft-toy-cleaning-services-in-dubai",
  },
  {
    id: 10,
    slug: "steam-pressing-services-in-dubai",
    title: "Steam Pressing Service",
    description: "Safe and hygienic cleaning for toys.",
    fullDescription:
      "Professional steam iron services tailored for clothes that look sharp and feel fresh. From everyday wear to delicate garments, our Steam Pressing Services in Dubai  give your outfits a polished, well-kept finish. Enjoy doorstep convenience in Dubai with expert care, and results you’ll appreciate  every time.",
    secondaryTitle: "Steam Pressing Service Delivered to Your Home",
    secondaryDescription:
      "Book reliable steam pressing with pickup and delivery today and enjoy clothes that are crisp, comfortable, and ready to wear. Our steam press iron restores fabric shape, protects texture, and keeps every detail like the day it was first purchased. \n\n We Proudly Serve",
    image: "/images/steam-pressing-banner.jpg",
    gallery: [
      "/images/steam-pressing-img-1.png",
      "/images/steam-pressing-img-2.jpg",
    ],
    features: [
      "Salons and Spas",
      "Restaurants and Caterers",
      "Religious Organizations",
      "Daycare Centers",
      "Assisted Living / Nursing Homes",
      "Hotels and Motels",
      "Nail Salons",
      "Athletic Facilities / Gyms",
    ],
    pricing: {
      basic: {
        price: "Per Item",
        description: "Individual pricing for each clothing item",
      },
      premium: {
        price: "Per Item + Express",
        description: "Individual pricing with express service",
      },
    },
    // duration: "24-48 hours",
    rating: 5,
    reviews: 127,
    process: [
      "Toy inspection and assessment",
      "Gentle pre-treatment of stains",
      "Safe cleaning with child-friendly products",
      "Thorough rinsing and sanitization",
      "Careful drying and fluffing",
      "Hygienic packaging and delivery",
    ],
    faq: [
      {
        question: "Is steam pressing safe for all types of fabrics?",
        answer:
          "Yes, our steam press is designed to protect delicate fabrics while restoring their natural shape and texture.",
      },
      {
        question: "Do you offer pickup and delivery for steam pressing?",
        answer:
          "Absolutely! We provide convenient pickup and delivery so your clothes are pressed, crisp, and ready to wear without hassle.",
      },
    ],
    items: undefined,
    metaTitle: "Best Steam Pressing Services in Dubai | Freshora Laundry ",
    metaDescription:
      " Freshora Laundry offers the Best Steam Pressing Services in Dubai, ensuring wrinkle-free clothes, gentle fabric care, and a crisp, professional finish every time.",

    keywords: [
      "Steam Pressing Services in dubai",
      "steam iron",
      "steam press",
      "steam press iron",
    ],
    canonical:
      "https://freshoralaundry.com/services/steam-pressing-services-in-dubai",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServices(): Service[] {
  return services;
}

export { services as servicesData };
