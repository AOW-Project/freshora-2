// src/app/track/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  // This function is called when the user submits the form
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      // It navigates the user to the dynamic tracking page using the ID they entered.
      router.push(`/track/${orderId.trim()}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 sm:pt-24 p-4">
       <div className="w-full max-w-md">
            <nav className="flex items-center space-x-2 text-gray-500 mb-8 justify-center">
                <Link href="/" className="hover:text-green-600">
                Home
                </Link>
                <span className="px-2">/</span>
                <span className="text-green-600">Track Order</span>
            </nav>
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl text-center">Track Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-center text-gray-600 mb-6">
                    Enter your Order ID below to check the status of your delivery.
                </p>
                <form onSubmit={handleTrackOrder} className="space-y-4">
                    <div>
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                        id="orderId"
                        placeholder="Enter your order ID (e.g., cmei8hqa2...)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Track Order
                    </Button>
                </form>
                </CardContent>
            </Card>
       </div>
    </main>
  );
}
