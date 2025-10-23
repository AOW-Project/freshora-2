"use client";

import { useCart } from "@/app/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Star, X } from "lucide-react";
import Link from "next/link";
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
              variant="outline"
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
              variant="outline"
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

  const breadcrumbNav = useMemo(
    () => (
      <div className="w-full max-w-7xl mx-auto px-6 py-5 bg-white ">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-black">
          <Link
            href="/"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Home
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>
          <Link
            href="/services"
            className="hover:text-green-400 text-sm sm:text-base transition-colors"
          >
            Services
          </Link>
          <span className="px-1 sm:px-2 text-sm sm:text-base">/</span>

          <span className="text-green-400 capitalize">Order</span>
        </nav>
      </div>
    ),
    []
  );

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
          price: item.price,
          quantity: item.quantity,
        };
        await addToCart(cartItem);
      }
      toast.success(`All items added to cart successfully!`);
      setTempOrder([]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error adding items to cart:", errorMessage);
      toast.error(`Failed to add items to cart: ${errorMessage}`);
    } finally {
      setIsAddingToCart(false);
    }
  }, [tempOrder, addToCart, service.id]);

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
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total:</span>
          <span className="text-green-600">{orderTotal.toFixed(2)} AED</span>
        </div>
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
      {/* Header Banner */}
      <div
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center bg-fixed flex items-center justify-center px-6"
        style={{
          backgroundImage: `url('/images/redesign/about-banner.png')`,
        }}
      >
        {" "}
        {/* <div className="absolute w-full h-full text-center bg-[#09ff0065] z-20"></div> */}
        <div className="text-white text-base sm:text-2xl md:text-3xl font-medium flex flex-col justify-center items-center z-30">
          <p>
            Professional Laundry{" "}
            <span className="text-[#FFFF00]">
              Services Designed for Your Lifestyle
            </span>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {breadcrumbNav}
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
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {service.duration}
                  </Badge>
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
                        className={`py-3 rounded-t-xl rounded-b-none border-0 transition-all duration-300 data-[state=active]:bg-primary-green data-[state=active]:text-white data-[state=active]:font-semibold data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-600 hover:bg-primary-green/80 hover:text-white
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
