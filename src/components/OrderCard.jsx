import React from "react";
import {
  Truck,
  CheckCircle2,
  Package,
  CheckCheck,
  Calendar,
  AlertCircle,
  Check,
} from "lucide-react";

/**
 * Status Badge Configuration
 */
const STATUS_CONFIG = {
  in_transit: {
    label: "In Transit",
    icon: Truck,
    badgeClass: "bg-[#EFEAFF] text-[#5B3DF5] border border-[#DDD4FF]",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    badgeClass: "bg-[#E3F9E9] text-[#16A34A] border border-[#C2F2D0]",
  },
  shipped: {
    label: "Shipped",
    icon: Package,
    badgeClass: "bg-[#F1EEFB] text-[#6D28D9] border border-[#E0D7FA]",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCheck,
    badgeClass: "bg-[#ECEFF3] text-[#475569] border border-[#D5DCE5]",
  },
  disputed: {
    label: "Disputed",
    icon: AlertCircle,
    badgeClass: "bg-[#FFEAEA] text-[#E11D48] border border-[#FFD0D0]",
  },
};

/**
 * OrderCard Component
 *
 * Renders an individual order record matching the Figma prototype.
 *
 * Props:
 * - order: object {
 *     id: string,
 *     orderNumber: string,
 *     title: string,
 *     price: number | string,
 *     status: string,
 *     expectedDate?: string,
 *     orderDate: string,
 *     isFundReleased: boolean,
 *     isDisputed?: boolean,
 *   }
 * - onToggleFund: (orderId: string) => void
 * - onRaiseDispute: (order: object) => void
 * - onClick: (order: object) => void
 */
export default function OrderCard({
  order,
  onToggleFund = () => {},
  onRaiseDispute = () => {},
  onClick,
}) {
  const statusKey = order.isDisputed ? "disputed" : (order.status || "confirmed").toLowerCase().replace(/[\s-]/g, "_");
  const statusInfo = STATUS_CONFIG[statusKey] || STATUS_CONFIG.confirmed;
  const StatusIcon = statusInfo.icon;

  const formattedPrice =
    typeof order.price === "number"
      ? `₦${order.price.toLocaleString()}`
      : order.price.startsWith("₦")
      ? order.price
      : `₦${order.price}`;

  const handleFundToggle = (e) => {
    e.stopPropagation();
    onToggleFund(order.id);
  };

  const handleDisputeClick = (e) => {
    e.stopPropagation();
    onRaiseDispute(order);
  };

  return (
    <div
      onClick={() => onClick && onClick(order)}
      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col gap-3"
    >
      {/* Top Header Row: Order Number, Release Fund Switch & Price / Dispute */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500">
            Order #{order.orderNumber}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 tracking-tight leading-snug">
            {order.title}
          </h3>
        </div>

        {/* Center/Right Actions: Fund Release Switch & Price */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Release Fund Toggle */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-medium text-slate-500 mb-1 whitespace-nowrap">
              {order.isFundReleased ? "Fund Released" : "Release Fund"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={order.isFundReleased}
              onClick={handleFundToggle}
              aria-label={order.isFundReleased ? "Fund is released" : "Release escrow funds to seller"}
              className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F2C52] p-0.5 ${
                order.isFundReleased ? "bg-[#1E56A0]" : "bg-slate-300 hover:bg-slate-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center transition-transform duration-200 ease-in-out ${
                  order.isFundReleased ? "translate-x-5" : "translate-x-0"
                }`}
              >
                {order.isFundReleased ? (
                  <Check className="w-3.5 h-3.5 text-[#1E56A0] stroke-[3]" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />
                )}
              </span>
            </button>
          </div>

          {/* Price & Raise Dispute Link */}
          <div className="flex flex-col items-end">
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              {formattedPrice}
            </span>
            {!order.isFundReleased && !order.isDisputed && (
              <button
                type="button"
                onClick={handleDisputeClick}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-0.5"
              >
                Raise Dispute
              </button>
            )}
            {order.isDisputed && (
              <span className="text-[10px] font-semibold text-rose-600 mt-0.5">
                Under Dispute
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center pt-1">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.badgeClass}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{statusInfo.label}</span>
        </span>
      </div>

      {/* Footer Divider & Dates */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 mt-1">
        {order.expectedDate ? (
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-normal text-[11px] sm:text-xs">
              Expected: {order.expectedDate}
            </span>
          </div>
        ) : (
          <span />
        )}
        <span className="text-[11px] sm:text-xs text-slate-400 font-normal ml-auto">
          {order.orderDate}
        </span>
      </div>
    </div>
  );
}
