export interface Service {
  id: number
  slug: string
  title: string
  description: string
  fullDescription: string
  image: string
  gallery: string[]
  features: string[]
  pricing: {
    basic: { price: string; description: string }
    premium: { price: string; description: string }
  }
  duration: string
  rating: number
  reviews: number
  process: string[]
  faq: { question: string; answer: string }[]
}

const services: Service[] = [
  {
    id: 1,
    slug: "laundry-services",
    title: "Laundry Services",
    description: "Professional laundry for all clothes.",
    fullDescription:
      "Laundry's Wash and Fold, also called Fluff and Fold, or simply Drop Off Laundry, is the perfect solution to your laundry needs as a busy parent, professional, senior citizen or student. Use drop off laundry and free more of your time and energy to work, play, or just relax. Let wash, dry, and fold your clothes for you!",
    image: "/placeholder.svg?height=400&width=600&text=Laundry+Services",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Washing+Machine",
      "/placeholder.svg?height=300&width=400&text=Folded+Clothes",
      "/placeholder.svg?height=300&width=400&text=Delivery+Van",
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
      basic: { price: "Per Item", description: "Individual pricing for each clothing item" },
      premium: { price: "Per Item + Express", description: "Individual pricing with express service" },
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
        answer: "Yes, you can add items from men's, women's, and children's categories in a single order.",
      },
    ],
  },
  {
    id: 2,
    slug: "dry-cleaning-services",
    title: "Dry Cleaning Services",
    description: "Gentle care for delicate garments.",
    fullDescription:
      "Professional dry cleaning service using advanced solvents and techniques to remove tough stains and preserve fabric quality. Perfect for suits, dresses, and delicate garments that require special care. Our experienced team handles luxury fabrics with the utmost care using eco-friendly dry cleaning methods.",
    image: "/placeholder.svg?height=400&width=600&text=Dry+Cleaning",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Dry+Clean+Machine",
      "/placeholder.svg?height=300&width=400&text=Pressed+Suits",
      "/placeholder.svg?height=300&width=400&text=Stain+Removal",
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
      basic: { price: "Per Item", description: "Individual pricing for each garment" },
      premium: {
        price: "Per Item + Premium Care",
        description: "Individual pricing with fabric protection and minor repairs",
      },
    },
    duration: "2-3 days",
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
        answer: 'Suits, dresses, silk items, wool garments, and items with "Dry Clean Only" labels.',
      },
      {
        question: "How do you calculate the total cost?",
        answer:
          "Each garment type has individual pricing. Your total is calculated based on the items and quantities you select.",
      },
    ],
  },
  {
    id: 3,
    slug: "express-laundry-services",
    title: "Express Laundry Services",
    description: "Same-day laundry services.",
    fullDescription:
      "Our express laundry service provides same-day turnaround for your urgent laundry needs. Perfect for business travelers, busy professionals, or anyone who needs their clothes cleaned quickly. We prioritize express orders to ensure you get your garments back within hours, not days.",
    image: "/placeholder.svg?height=400&width=600&text=Express+Laundry",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Fast+Service",
      "/placeholder.svg?height=300&width=400&text=Quick+Turnaround",
      "/placeholder.svg?height=300&width=400&text=Express+Delivery",
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
      basic: { price: "Per Item + 50%", description: "Regular pricing plus express surcharge" },
      premium: { price: "Per Item + 75%", description: "Premium care with express service" },
    },
    duration: "4-8 hours",
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
        answer: "Orders placed before 10 AM can be delivered the same day by 6 PM.",
      },
      {
        question: "Is express service available on weekends?",
        answer: "Yes, we offer express service 7 days a week including weekends and holidays.",
      },
    ],
  },
  {
    id: 4,
    slug: "shoe-bag-spa",
    title: "Shoe & Bag Spa",
    description: "Luxury cleaning for shoes and bags.",
    fullDescription:
      "Our premium shoe and bag spa service provides comprehensive care for your luxury footwear and handbags. Using specialized techniques and premium products, we restore, clean, and protect your valuable accessories. From leather conditioning to color restoration, we handle all types of materials with expert care.",
    image: "/images/light-blue-sneakers-and-backpack-2025-01-09-09-02-14-utc.jpg?height=400&width=600&text=Shoe+Bag+Spa",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Luxury+Shoes",
      "/placeholder.svg?height=300&width=400&text=Designer+Bags",
      "/placeholder.svg?height=300&width=400&text=Restoration+Process",
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
      basic: { price: "$25-50", description: "Standard cleaning and conditioning" },
      premium: { price: "$50-100", description: "Full restoration with color matching" },
    },
    duration: "3-5 days",
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
        answer: "Yes, we specialize in luxury brands including Louis Vuitton, Gucci, Prada, and more.",
      },
      {
        question: "Can you restore faded colors?",
        answer: "Yes, we offer professional color restoration services for leather goods.",
      },
    ],
  },
  {
    id: 5,
    slug: "luxury-shoe-cleaning",
    title: "Luxury Shoe Cleaning",
    description: "Premium shoe care services.",
    fullDescription:
      "Dedicated luxury shoe cleaning service for high-end footwear. Our certified shoe care specialists use premium products and techniques to maintain and restore your expensive shoes. From Italian leather dress shoes to designer sneakers, we provide meticulous care that preserves value and extends lifespan.",
    image: "/placeholder.svg?height=400&width=600&text=Luxury+Shoe+Care",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Premium+Shoes",
      "/placeholder.svg?height=300&width=400&text=Hand+Polishing",
      "/placeholder.svg?height=300&width=400&text=Luxury+Care",
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
      basic: { price: "$30-60", description: "Premium cleaning and conditioning" },
      premium: { price: "$60-120", description: "Full restoration with mirror shine" },
    },
    duration: "2-4 days",
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
        answer: "We work with all luxury brands including Louboutin, Jimmy Choo, Manolo Blahnik, and Italian makers.",
      },
      {
        question: "Do you provide shoe trees?",
        answer: "Yes, we include cedar shoe trees with our premium service to maintain shoe shape.",
      },
    ],
  },
  {
    id: 6,
    slug: "commercial-laundry-service",
    title: "Commercial Laundry Service",
    description: "Laundry solutions for businesses.",
    fullDescription:
      "Comprehensive commercial laundry solutions for businesses of all sizes. From restaurants and hotels to healthcare facilities and salons, we provide reliable, high-volume laundry services. Our commercial-grade equipment and processes ensure consistent quality while meeting strict hygiene and timing requirements.",
    image: "/placeholder.svg?height=400&width=600&text=Commercial+Laundry",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Industrial+Machines",
      "/placeholder.svg?height=300&width=400&text=Bulk+Processing",
      "/placeholder.svg?height=300&width=400&text=Commercial+Delivery",
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
      basic: { price: "Volume Based", description: "Competitive rates for bulk orders" },
      premium: { price: "Custom Contract", description: "Tailored service agreements" },
    },
    duration: "24-48 hours",
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
        answer: "We serve restaurants, hotels, healthcare, salons, gyms, and many other commercial sectors.",
      },
      {
        question: "Do you provide inventory management?",
        answer: "Yes, we offer complete inventory tracking and management services for commercial clients.",
      },
    ],
  },
  {
    id: 7,
    slug: "curtain-cleaning-service",
    title: "Curtain Cleaning Service",
    description: "Expert curtain cleaning at your doorstep.",
    fullDescription:
      "Professional curtain cleaning service that brings new life to your window treatments. We handle all types of curtains and drapes, from delicate sheers to heavy blackout curtains. Our specialized cleaning process removes dust, allergens, and stains while preserving fabric integrity and color.",
    image: "/images/white-transparent-curtain-closes-the-window-indoo-2025-01-15-12-40-54-utc.jpg?height=400&width=600&text=Curtain+Cleaning",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Curtain+Takedown",
      "/placeholder.svg?height=300&width=400&text=Professional+Cleaning",
      "/placeholder.svg?height=300&width=400&text=Curtain+Installation",
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
      basic: { price: "$15-30/panel", description: "Standard curtain cleaning" },
      premium: { price: "$30-50/panel", description: "Delicate fabric care with protection" },
    },
    duration: "3-5 days",
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
        answer: "Yes, our service includes professional takedown and rehang at no additional cost.",
      },
      {
        question: "What types of curtains can you clean?",
        answer: "We clean all types including silk, velvet, linen, cotton, and synthetic fabrics.",
      },
    ],
  },
  {
    id: 8,
    slug: "carpet-cleaning-service",
    title: "Carpet Cleaning Service",
    description: "Deep cleaning for carpets and rugs.",
    fullDescription:
      "Professional carpet and rug cleaning service using advanced steam cleaning technology and eco-friendly solutions. We remove deep-seated dirt, stains, and allergens to restore your carpets to their original beauty and freshness. Our certified technicians handle all types of carpets and area rugs.",
    image: "/images/panoramic-shot-of-happy-maid-looking-at-dirty-bedd-2024-11-19-10-14-40-utc.jpg?height=400&width=600&text=Carpet+Cleaning",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Steam+Cleaning",
      "/placeholder.svg?height=300&width=400&text=Stain+Removal",
      "/placeholder.svg?height=300&width=400&text=Carpet+Restoration",
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
      basic: { price: "$0.50-0.75/sq ft", description: "Standard carpet cleaning" },
      premium: { price: "$0.75-1.25/sq ft", description: "Deep cleaning with stain protection" },
    },
    duration: "2-4 hours",
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
        answer: "Typically 4-6 hours depending on humidity, air circulation, and carpet thickness.",
      },
      {
        question: "Do you clean area rugs?",
        answer: "Yes, we clean all types of area rugs including Persian, Oriental, and contemporary rugs.",
      },
    ],
  },
  {
    id: 9,
    slug: "soft-toy-cleaning-service",
    title: "Soft Toy Cleaning Service",
    description: "Safe and hygienic cleaning for toys.",
    fullDescription:
      "Specialized soft toy cleaning service that ensures your children's beloved toys are clean, safe, and hygienic. We use child-safe, non-toxic cleaning products and gentle processes that preserve the toy's appearance while eliminating germs, dust mites, and allergens. Perfect for stuffed animals, plush toys, and fabric dolls.",
    image: "/images/stuffed-rabbit-in-washing-machine-2025-01-07-09-52-38-utc.jpg?height=400&width=600&text=Soft+Toy+Cleaning",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Stuffed+Animals",
      "/placeholder.svg?height=300&width=400&text=Gentle+Cleaning",
      "/placeholder.svg?height=300&width=400&text=Safe+Products",
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
      premium: { price: "$15-25/toy", description: "Deep sanitization with allergen treatment" },
    },
    duration: "2-3 days",
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
        answer: "Yes, we use only child-safe, non-toxic, hypoallergenic cleaning products.",
      },
      {
        question: "Can you clean electronic toys?",
        answer: "We can clean the fabric parts of electronic toys, but electronic components must be removed first.",
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}

export { services as servicesData }