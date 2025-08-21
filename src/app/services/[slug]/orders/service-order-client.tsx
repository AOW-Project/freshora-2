"use client";

import { useCart } from "@/app/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Star, X } from "lucide-react";
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

const ItemCard = ({ item, category, quantities, onAddToOrder, onUpdateQuantity }: ItemCardProps) => {
  const quantity = quantities[item.id] || 0;
  const totalAmount = item.price * quantity;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          <div className="flex items-center gap-4">
            <p className="text-green-600 font-bold text-lg">
              ${item.price.toFixed(2)}
              {item.unit && <span className="text-sm font-normal"> {item.unit}</span>}
            </p>
            {quantity > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">×</span>
                <span className="text-gray-600">{quantity}</span>
                <span className="text-gray-400">=</span>
                <p className="text-blue-600 font-bold text-lg">${totalAmount.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.id, -1)}
            disabled={quantity === 0}
            className="h-8 w-8 p-0"
          >
            -
          </Button>
          <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, 1)} className="h-8 w-8 p-0">
            +
          </Button>
        </div>

        <Button
          onClick={() => onAddToOrder(item, category)}
          disabled={quantity === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add
        </Button>
      </div>
    </Card>
  );
};

ItemCard.displayName = "ItemCard";

// FIX: The component now correctly uses its own props type: ServiceOrderClientProps
export default function ServiceOrderClient({ slug, service }: ServiceOrderClientProps) {
  const { addToCart, getTotalItems } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [tempOrder, setTempOrder] = useState<OrderItem[]>([]);

  const items = useMemo(() => {
    const serviceData = service.items || {};
    return {
        men: serviceData.men || [],
        women: serviceData.women || [],
        children: serviceData.children || [],
    };
  }, [service.items]);
  
  const hasItems = useMemo(() => {
    return items.men.length > 0 || items.women.length > 0 || items.children.length > 0;
  }, [items]);

  const isSoftToyService = useMemo(() => slug === "soft-toy-cleaning-service", [slug]);

  const orderTotal = useMemo(() => {
    return tempOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [tempOrder]);

  const breadcrumbNav = useMemo(
    () => (
      <nav className="flex items-center space-x-2 text-white mb-4">
        <Link href="/" className="hover:text-green-400">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href="/services" className="hover:text-green-400">
          Services
        </Link>
        <span className="px-2">/</span>
        <span className="text-green-400">Orders</span>
      </nav>
    ),
    [],
  );

  const updateQuantity = useCallback(
    (itemId: string, change: number) => {
      const newQuantity = Math.max(0, (quantities[itemId] || 0) + change);
      setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    },
    [quantities],
  );

  const removeFromOrder = useCallback((itemId: string) => {
    setTempOrder((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleAddAllToCart = useCallback(() => {
    if (tempOrder.length === 0) {
      return;
    }

    try {
      tempOrder.forEach((item) => {
        const cartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        };

        addToCart(cartItem);
      });

      toast.success(`${tempOrder.length} item(s) added to cart!`);
      setTempOrder([]);

    } catch (error) {
      console.error("Error adding items to cart:", error);
      toast.error("Failed to add items to cart.");
    }
  }, [tempOrder, addToCart]);

  const handleAddToOrder = useCallback(
    (item: ServiceItem, category: string) => {
      const quantity = quantities[item.id] || 0;
      if (quantity === 0) return;

      const orderItem: OrderItem = {
        ...item,
        quantity,
        category,
      };

      setTempOrder((prev) => {
        const existingIndex = prev.findIndex((orderItem) => orderItem.id === item.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          return updated;
        }
        return [...prev, orderItem];
      });

      setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
    },
    [quantities],
  );

  if (!hasItems) {
    return <div>No items available for this service.</div>;
  }

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1">
        <div
          className="relative h-64 bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/modern-office-laundry.png')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            {breadcrumbNav}
            <h1 className="text-4xl md:text-5xl font-bold text-white">Orders</h1>
          </div>
        </div>

        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <Link
                href={`/services/${slug}`}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Service Details
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{service.title} - Order Items</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < service.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {service.rating.toFixed(1)} ({service.reviews} reviews)
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {service.duration}
                    </Badge>
                  </div>
                </div>

                {/* Cart Link */}
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

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Service Description */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-gray-600 leading-relaxed">{service.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Service Items by Category */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Select Items & Quantities</h2>

                {isSoftToyService ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {items.children.map((item: ServiceItem) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        category="Toys"
                        quantities={quantities}
                        onAddToOrder={handleAddToOrder}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}
                  </div>
                ) : (
                  <Tabs defaultValue="men" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="men">Men&lsquo;s Items</TabsTrigger>
                      <TabsTrigger value="women">Women&apos;s Items</TabsTrigger>
                      <TabsTrigger value="children">House&apos;s Items</TabsTrigger>
                    </TabsList>

                    <TabsContent value="men" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.men.map((item) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            category="Men"
                            quantities={quantities}
                            onAddToOrder={handleAddToOrder}
                            onUpdateQuantity={updateQuantity}
                          />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="women" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.women.map((item) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            category="Women"
                            quantities={quantities}
                            onAddToOrder={handleAddToOrder}
                            onUpdateQuantity={updateQuantity}
                          />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="children" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.children.map((item) => (
                          <ItemCard
                            key={item.id}
                            item={item}
                            category="Children"
                            quantities={quantities}
                            onAddToOrder={handleAddToOrder}
                            onUpdateQuantity={updateQuantity}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {tempOrder.length > 0 && (
        <div className="w-80 bg-white border-l border-gray-200 p-6 sticky top-0 h-screen overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="space-y-3 mb-6">
            {tempOrder.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.category}</p>
                  <p className="text-sm font-semibold text-green-600">
                    ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
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
              <span className="text-green-600">${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleAddAllToCart} className="w-full bg-green-600 hover:bg-green-700" size="lg">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        </div>
      )}
    </div>
  );
}
