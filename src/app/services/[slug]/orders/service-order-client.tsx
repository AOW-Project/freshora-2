"use client";

import { useCart } from "@/app/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

// --- Type Definitions ---
interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  unit?: string;
  image?: string;
  sortOrder?: number; // ✅ added sortOrder
}

interface OrderItem extends ServiceItem {
  quantity: number;
  category: string;
}

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  rating: number;
  reviews: number;
  duration: string;
  items: {
    [category: string]: ServiceItem[];
  };
}

interface ServiceOrderClientProps {
  slug: string;
  service: Service;
}

interface ItemCardProps {
  item: ServiceItem;
  category: string;
  quantities: { [key: string]: number };
  onAddToOrder: (item: ServiceItem, category: string) => void;
  onUpdateQuantity: (itemId: string, change: number) => void;
}
// --- End of Type Definitions ---

const ItemCard = ({
  item,
  category,
  quantities,
  onAddToOrder,
  onUpdateQuantity,
}: ItemCardProps) => {
  const quantity = quantities[item.id] || 0;
  const totalAmount = item.price * quantity;

  return (
    <Card className="p-4 flex flex-col border border-primary-green rounded ">
      <div className="flex-grow flex flex-col items-center">
        <h4 className="font-semibold text-lg">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-center item-center gap-4 mb-4">
          <p className="text-green-600 font-bold text-lg">
            {item.price.toFixed(2)} AED
            {item.unit && (
              <span className="text-sm font-normal"> {item.unit}</span>
            )}
          </p>
          {quantity > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">×</span>
              <span className="text-gray-600">{quantity}</span>
              <span className="text-gray-400">=</span>
              <p className="text-blue-600 font-bold text-lg">
                {totalAmount.toFixed(2)} AED
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => onUpdateQuantity(item.id, -1)}
              disabled={quantity === 0}
              className="h-8 w-8 p-0 rounded bg-primary-green text-white"
            >
              -
            </Button>
            <span className="font-medium border rounded border-primary-green p-1 min-w-[2rem] text-center">
              {quantity}
            </span>
            <Button
              size="sm"
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="h-8 w-8 p-0 rounded bg-primary-green text-white"
            >
              +
            </Button>
          </div>
          <Button
            onClick={() => onAddToOrder(item, category)}
            disabled={quantity === 0}
            className="bg-secondary-green w-full rounded hover:bg-primary-green flex-shrink-0"
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

ItemCard.displayName = "ItemCard";

export default function ServiceOrderClient({
  slug,
  service,
}: ServiceOrderClientProps) {
  const { addToCart, getTotalItems } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [tempOrder, setTempOrder] = useState<OrderItem[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const pathname = usePathname();

  // service details
  const serviceCategories = useMemo(
    () => [
      {
        name: "Laundry Services",
        slug: "professional-laundry-services-in-dubai",
        icon: "Laundry.svg",
      },
      {
        name: "Dry Cleaning Services",
        slug: "dry-cleaning-services-in-dubai",
        icon: "Dry-clean.svg",
      },
      {
        name: "Steam Pressing Service",
        slug: "steam-pressing-services-in-dubai",
        icon: "Steam.svg",
      },
      // {
      //   name: "Express Laundry Services",
      //   slug: "express-laundry-services-in-dubai",
      //   icon: "Express.svg",
      // },
      // {
      //   name: "Shoe Cleaning",
      //   slug: "shoe-and-bag-spa-services-in-dubai",
      //   icon: "Shoe-spa.svg",
      // },
      // {
      //   name: "Luxury Shoe Cleaning",
      //   slug: "luxury-shoe-cleaning-services-in-dubai",
      //   icon: "Luxury-shoe.svg",
      // },
      // {
      //   name: "Commercial Laundry Service",
      //   slug: "commercial-laundry-services-in-dubai",
      //   icon: "Commercial.svg",
      // },
      {
        name: "Curtain Cleaning Service",
        slug: "curtain-cleaning-services-in-dubai",
        icon: "Curtain.svg",
      },
      {
        name: "Carpet Cleaning Service",
        slug: "carpet-cleaning-services-in-dubai",
        icon: "Carpet.svg",
      },
      // {
      //   name: "Soft Toy Cleaning Service",
      //   slug: "soft-toy-cleaning-services-in-dubai",
      //   icon: "Toy.svg",
      // },
    ],
    []
  );

  const categories = useMemo(() => {
    return service.items ? Object.keys(service.items) : [];
  }, [service.items]);

  const hasItems = useMemo(() => {
    return (
      categories.length > 0 &&
      categories.some((cat) => service.items[cat].length > 0)
    );
  }, [categories, service.items]);

  const orderTotal = useMemo(() => {
    return tempOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [tempOrder]);

  // ⚡ Apply +50% charge if express selected
  const finalTotal = useMemo(() => {
    return isChecked ? orderTotal * 1.5 : orderTotal;
  }, [orderTotal, isChecked]);

  const updateQuantity = useCallback(
    (itemId: string, change: number) => {
      const newQuantity = Math.max(0, (quantities[itemId] || 0) + change);
      setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    },
    [quantities]
  );

  const removeFromOrder = useCallback((itemId: string) => {
    setTempOrder((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleAddAllToCart = useCallback(async () => {
    if (tempOrder.length === 0) return;
    setIsAddingToCart(true);
    try {
      for (const item of tempOrder) {
        const cartItem = {
          id: `${service.id}-${item.id}`,
          name: item.name,
          // Apply +50% if express selected
          price: isChecked ? item.price * 1.5 : item.price,
          quantity: item.quantity,
          serviceSlug: isChecked ? "Express Laundry" : service!.title, // ✅ e.g. "Laundry Services (Wash & Press)"
          category: item.category, // ✅ e.g. "men" | "women" | "household"
        };

        await addToCart(cartItem);
      }

      toast.success(
        `All items added to cart successfully${
          isChecked ? " with express service!" : "!"
        }`
      );

      setTempOrder([]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error adding items to cart:", errorMessage);
      toast.error(`Failed to add items to cart: ${errorMessage}`);
    } finally {
      setIsAddingToCart(false);
    }
  }, [tempOrder, addToCart, service.id, service.title, isChecked]);

  const handleAddToOrder = useCallback(
    (item: ServiceItem, category: string) => {
      const quantity = quantities[item.id] || 0;
      if (quantity === 0) return;
      const orderItem: OrderItem = { ...item, quantity, category };
      setTempOrder((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === item.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          return updated;
        }
        return [...prev, orderItem];
      });
      setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
    },
    [quantities]
  );

  const OrderSummary = () => (
    <div className="w-full bg-white border shadow border-gray-200 rounded p-6">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
        {tempOrder.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <p className="text-xs text-gray-600">{item.category}</p>
              <p className="text-sm font-semibold text-green-600">
                {item.price.toFixed(2)} x {item.quantity} ={" "}
                {(item.price * item.quantity).toFixed(2)} AED
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromOrder(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      {pathname ===
        "/services/professional-laundry-services-in-dubai/orders" && (
        <div className="border-t pt-5 mb-6">
          <div className="flex items-start gap-3">
            {/* Custom checkbox container */}
            <div
              onClick={() => setIsChecked((prev) => !prev)}
              className={`relative w-5 h-5 flex items-center justify-center rounded border-2 cursor-pointer transition-all duration-200 ${
                isChecked
                  ? "bg-primary-green border-primary-green"
                  : "border-gray-300 bg-white hover:border-primary-green/70"
              }`}
            >
              {/* Check icon */}
              {isChecked && (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            {/* Text content */}
            <div className="flex-1">
              <label
                htmlFor="express-laundry"
                className="font-medium text-black cursor-pointer"
                onClick={() => setIsChecked((prev) => !prev)}
              >
                Express Laundry
              </label>
              <p className="text-gray-500 text-sm mt-1 leading-snug">
                Get your clothes washed and pressed within 6 hours using our
                express laundry service,
                <span className="font-semibold text-green-600"> +50%</span> on
                total order.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Total Section */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span
            className={`${
              isChecked ? "text-primary-green" : "text-green-600"
            } transition-all duration-300`}
          >
            {finalTotal.toFixed(2)} AED
          </span>
        </div>

        {isChecked && (
          <p className="text-sm text-green-600 mt-1">
            Express service charge applied
          </p>
        )}
      </div>
      <Button
        onClick={handleAddAllToCart}
        disabled={isAddingToCart}
        className="w-full bg-primary-green rounded cta-button"
        size="lg"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {isAddingToCart ? "Adding..." : "Add All to Cart"}
      </Button>
    </div>
  );

  if (!hasItems) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold">No Items Available</h2>
        <p className="text-gray-600 mt-2">
          There are currently no items listed for this service.
        </p>
        <Link href="/services">
          <Button className="mt-6 bg-green-600 hover:bg-green-700">
            Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex max-w-fit mx-auto px-10 py-5 gap-3 overflow-x-scroll lg:overflow-hidden">
          {serviceCategories.map((category) => {
            const isActive = pathname == `/services/${category.slug}/orders`;
            return (
              <Link
                key={category.slug}
                href={`/services/${category.slug}/orders`}
                className={`relative w-[110px] p-3 transition-colors duration-300 flex flex-col items-center group justify-start gap-3  border border-primary-green text-center text-gray-500 font-medium rounded  text-base hover:bg-primary-green bg-gray-50  hover:text-white  ${
                  isActive ? "bg-primary-green text-white" : ""
                }`}
              >
                <Image
                  src={`/images/redesign/${category.icon}`}
                  alt="Freshora Laundry Logo"
                  width={16}
                  height={16}
                  className={`w-9 h-9 sm:w-8 sm:h-8 transition-all duration-300 group-hover:invert group-hover:brightness-0 group-hover:sepia group-hover:hue-rotate-[120deg] group-hover:saturate-[10]  ${
                    isActive
                      ? "invert brightness-0 sepia hue-rotate-[120deg] saturate-[10]"
                      : ""
                  }`}
                  priority
                />
                {category.name}

                {/* Triangle Pointer */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-[-8px] 
                w-0 h-0 
                border-l-[10px] border-l-transparent 
                border-r-[10px] border-r-transparent 
                border-t-[10px] border-t-primary-green 
                ${isActive ? "block" : "hidden"}`}
                ></div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="min-h-screen bg-white">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary-green mb-2">
                  {service.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < service.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {service.rating.toFixed(1)} ({service.reviews} reviews)
                    </span>
                  </div>
                  {/* <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {service.duration}
                  </Badge> */}
                </div>
              </div>
              {getTotalItems() > 0 && (
                <Link href="/cart">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Cart ({getTotalItems()})
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* --- RESPONSIVE LAYOUT FIX --- */}
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-0 relative rounded-none">
              <CardContent className="p-4">
                <Tabs
                  defaultValue={categories[0]}
                  className="w-full border-0 shadow-0"
                >
                  <TabsList
                    className="grid gap-4 absolute right-0 -top-12 w-full bg-white"
                    style={{
                      gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {categories.map((category) => (
                      <TabsTrigger
                        className={`py-3 rounded-t-xl rounded-b-none border-0 transition-all duration-300 data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:font-semibold data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 hover:bg-primary-green/80 hover:text-white cursor-pointer
        `}
                        key={category}
                        value={category}
                      >
                        {category
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {categories.map((category) => (
                    <TabsContent
                      key={category}
                      value={category}
                      className="mt-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {service.items[category]
                          .slice()
                          .sort(
                            (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
                          ) // ✅ enforce order
                          .map((item) => (
                            <ItemCard
                              key={item.id}
                              item={item}
                              category={category}
                              quantities={quantities}
                              onAddToOrder={handleAddToOrder}
                              onUpdateQuantity={updateQuantity}
                            />
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Stacked Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            {tempOrder.length > 0 && <OrderSummary />}
          </div>
        </div>
      </div>
    </div>
  );
}
