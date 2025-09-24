import React from "react";
import {
  Clock,
  CheckCircle,
  Truck,
  WashingMachine,
  Fan,
  Loader2,
} from "lucide-react";

// Status configuration array
const statusConfig = [
  {
    status: "pending",
    icon: Clock,
    color: "bg-yellow-500",
    label: "Order Received",
    subtitle: (
      <>
        Our Freshora team will pick up your items within
        <strong> 1 hour</strong>
      </>
    ),
  },
  {
    status: "pickedUp",
    icon: CheckCircle,
    color: "bg-blue-500",
    label: "Pickup Completed",
    subtitle: "Your garments are in safe hands",
  },
  {
    status: "washing",
    icon: WashingMachine,
    color: "bg-purple-500",
    label: "Washing in Progress",
    subtitle: "Freshness is loading",
  },
  {
    status: "drying",
    icon: Fan,
    color: "bg-orange-500",
    label: "Drying in Progress",
    subtitle: "Almost done with the cleaning process",
  },
  {
    status: "outForDelivery",
    icon: Truck,
    color: "bg-indigo-500",
    label: "Out for Delivery",
    subtitle: "Our delivery partner is on the way to return your items",
  },
  {
    status: "delivered",
    icon: CheckCircle,
    color: "bg-green-500",
    label: "Delivered",
    subtitle: "Thank you for choosing Freshora",
  },
];

// Helper function to get current status index
const getCurrentStatusIndex = (currentStatus: string) => {
  const index = statusConfig.findIndex(
    (config) => config.status === currentStatus
  );
  return index !== -1 ? index : 0;
};

// Helper function to determine if a status is completed, current, or pending
const getStatusState = (statusIndex: number, currentStatusIndex: number) => {
  if (statusIndex < currentStatusIndex) return "completed";
  if (statusIndex === currentStatusIndex) return "current";
  return "pending";
};

const OrderTimeline = ({ currentStatus = "delivered" }) => {
  const currentStatusIndex = getCurrentStatusIndex(currentStatus);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Order Status</h3>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="relative">
          {statusConfig.map((status, index) => {
            const Icon = status.icon;
            const statusState = getStatusState(index, currentStatusIndex);
            const isLast = index === statusConfig.length - 1;

            return (
              <div key={status.status} className="relative">
                <div className="flex items-center gap-4 pb-8">
                  {/* Status Icon */}
                  <div className="relative z-10">
                    <div
                      className={`p-3 rounded-full transition-all duration-300 ${
                        statusState === "completed"
                          ? "bg-green-500 text-white"
                          : statusState === "current"
                          ? `${status.color} text-white shadow-lg scale-110`
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {statusState === "current" &&
                      status.status === "drying" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {/* Status Content */}
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        statusState === "current"
                          ? "text-gray-900"
                          : statusState === "completed"
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {status.label}
                    </p>
                    <p
                      className={`text-sm ${
                        statusState === "current"
                          ? "text-gray-600"
                          : statusState === "completed"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {status.subtitle}
                    </p>

                    {/* {statusState === "current" && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-green-600">
                            In Progress
                          </span>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 h-8 ${
                      statusState === "completed"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    style={{ transform: "translateX(-50%)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {Math.round(
                ((currentStatusIndex + 1) / statusConfig.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${
                  ((currentStatusIndex + 1) / statusConfig.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
