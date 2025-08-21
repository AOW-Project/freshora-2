'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ThankYouPage() {
  // This hook allows us to read the parameters from the URL (e.g., ?orderId=...)
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center p-6 sm:p-8">
        <CardContent>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mb-8">
            Your order has been placed successfully. We've sent a confirmation email to you.
          </p>

          {/* This block will only display if an orderId is found in the URL */}
          {orderId && (
            <div className="bg-gray-100 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-600">Your Order ID is:</p>
              <p className="text-lg font-mono font-semibold text-gray-800">#{orderId}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* This button will only display if an orderId is found */}
            {orderId && (
              <Link href={`/track/${orderId}`}>
                <Button className="w-full bg-green-600 hover:bg-green-700">Track Your Order</Button>
              </Link>
            )}
            <Link href="/services">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
