import React from "react";
import { Clock, CheckCircle, Truck, Package, Loader2 } from "lucide-react";
import Image from "next/image";

// Status configuration array
const statusConfig = [
  {
    status: "PENDING",
    icon: Clock,
    img: "/images/redesign/timeline-order-recieved.svg",
    color: "bg-green-400",
    label: "Order Received",
    subtitle: (
      <>
        Our Freshora team will pick up your items within
        <strong> 1 hour</strong>
      </>
    ),
  },
  {
    status: "PICKED_UP",
    icon: Package,
    img: "/images/redesign/timeline-pickup-completed.svg",
    color: "bg-green-400",
    label: "Pickup Completed",
    subtitle: "Your items are in safe hands",
  },
  {
    status: "IN_PROGRESS",
    icon: Loader2,
    img: "/images/redesign/timeline-processing.svg",
    color: "bg-green-400",
    label: "Processing in Progress",
    subtitle: "Your items are being carefully serviced",
  },
  {
    status: "OUT_FOR_DELIVERY",
    icon: Truck,
    img: "/images/redesign/timeline-out-for-delivery.svg",
    color: "bg-green-400",
    label: "Out for Delivery",
    subtitle: "Our delivery partner is on the way to return your items",
  },
  {
    status: "DELIVERED",
    icon: CheckCircle,
    img: "/images/redesign/timeline-delivered.svg",
    color: "bg-green-400",
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

const OrderTimeline = ({ currentStatus = "PENDING" }) => {
  const currentStatusIndex = getCurrentStatusIndex(currentStatus);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Order Status</h3>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="relative flex justify-between">
          {statusConfig.map((status, index) => {
            const Icon = status.icon;
            const statusState = getStatusState(index, currentStatusIndex);
            const isLast = index === statusConfig.length - 1;

            return (
              <div key={status.status} className="relative  ">
                <div className="flex flex-col w-28  items-center gap-4 pb-8">
                  {/* status image  */}
                  <div className="flex relative h-14 p-2 items-center ">
                    <Image
                      alt={status.label}
                      src={status.img}
                      height={20}
                      width={20}
                      className={`h-16 w-auto ${
                        statusState === "completed"
                          ? "opacity-100"
                          : statusState === "current"
                          ? " opacity-100"
                          : " opacity-30"
                      }`}
                    />
                  </div>
                  {/* Status Icon */}
                  <div className="relative h-full w-full flex items-center justify-center   z-10">
                    <div
                      className={`p-2 z-20 rounded-full h-2 w-2 transition-all duration-300 ${
                        statusState === "completed"
                          ? "bg-green-500 text-white"
                          : statusState === "current"
                          ? `${status.color} text-white shadow-lg scale-110`
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {/* <Icon className="h-5 w-5" /> */}
                      {/* {statusState === "current" &&
                      status.status === "processing" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )} */}
                    </div>
                    {/* connecting lines */}
                    {!isLast && (
                      <div
                        className={`absolute left-1/2  top-1/2 w-[130%] h-0.5 ${
                          statusState === "completed"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>

                  {/* Status Content */}
                  <div className="flex-1 items-center justify-center">
                    <p
                      className={`font-medium  text-center ${
                        statusState === "current"
                          ? "text-primary-green"
                          : statusState === "completed"
                          ? "text-secondary-green"
                          : "text-gray-400"
                      }`}
                    >
                      {status.label}
                    </p>
                    <p
                      className={`text-sm text-center ${
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
                {/* {!isLast && (
                  <div
                    className={`absolute left-6  top-10 w-full h-0.5 ${
                      statusState === "completed"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    style={{ transform: "translateX(-50%)" }}
                  />
                )} */}
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
