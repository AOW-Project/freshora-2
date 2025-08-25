import OrderTracker from "../../component/order-tracker"

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order number to track your laundry service</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <OrderTracker />
        </div>
      </div>
    </div>
  )
}
