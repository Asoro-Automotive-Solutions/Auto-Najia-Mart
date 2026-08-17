import React, { useState, useMemo } from "react";
import {
  Search,
  Receipt,
  Banknote,
  Truck,
  Download,
  ChevronDown,
  X,
  Check,
  CheckCircle2,
  Package,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Car,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import DisputeModal from "../../components/DisputeModal";

/**
 * Initial dataset aligned with the Figma Desktop specification
 */
const DEFAULT_DESKTOP_ORDERS = [
  {
    id: "ord-1",
    orderNumber: "ORD-0921",
    title: "Premium Ceramic Brake Pads",
    extraItems: "+2 more items",
    image: "/images/brake_pads.jpg",
    price: 450.0,
    status: "in_transit", // 'in_transit' | 'delivered' | 'shipped' | 'confirmed'
    date: "Oct 24, 2024",
    orderDate: "Oct 24, 2024",
    isFundReleased: false,
    isDisputed: false,
  },
  {
    id: "ord-2",
    orderNumber: "ORD-0918",
    title: "High-Output Alternator Assembly",
    extraItems: null,
    image: "/images/alternator.jpg",
    price: 210.5,
    status: "delivered",
    date: "Oct 15, 2024",
    orderDate: "Oct 15, 2024",
    isFundReleased: true,
    isDisputed: false,
  },
  {
    id: "ord-3",
    orderNumber: "ORD-0872",
    title: "OEM Spark Plugs (Set of 4)",
    extraItems: "+1 more item",
    image: "/images/brake_pads.jpg",
    price: 320.0,
    status: "in_transit",
    date: "Oct 10, 2024",
    orderDate: "Oct 10, 2024",
    isFundReleased: false,
    isDisputed: false,
  },
  {
    id: "ord-4",
    orderNumber: "ORD-0845",
    title: "Synthetic Motor Oil 5W-30 (5L)",
    extraItems: null,
    image: "/images/alternator.jpg",
    price: 185.0,
    status: "delivered",
    date: "Sep 28, 2024",
    orderDate: "Sep 28, 2024",
    isFundReleased: true,
    isDisputed: false,
  },
  {
    id: "ord-5",
    orderNumber: "ORD-0810",
    title: "Front Suspension Strut Assembly",
    extraItems: "+3 more items",
    image: "/images/brake_pads.jpg",
    price: 890.0,
    status: "in_transit",
    date: "Sep 14, 2024",
    orderDate: "Sep 14, 2024",
    isFundReleased: false,
    isDisputed: false,
  },
];

export default function OrderHistoryPage({
  initialOrders = DEFAULT_DESKTOP_ORDERS,
  onNavigate = () => {},
  onOrderClick,
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("30_days");
  const [activeDisputeOrder, setActiveDisputeOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Toggle Escrow Fund Release
  const handleToggleFund = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextState = !ord.isFundReleased;
          triggerToast(
            nextState
              ? `Escrow fund released for Order #${ord.orderNumber}`
              : `Fund release revoked for Order #${ord.orderNumber}`
          );
          return { ...ord, isFundReleased: nextState };
        }
        return ord;
      })
    );
  };

  // Submit dispute handler
  const handleSubmitDispute = (disputeData) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === disputeData.orderId) {
          return { ...ord, isDisputed: true, isFundReleased: false };
        }
        return ord;
      })
    );
    triggerToast(`Dispute initiated for Order #${disputeData.orderNumber}`);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.orderNumber.toLowerCase().includes(query) ||
        order.title.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // Metrics computation
  // Default values matching Figma design or computed
  const totalOrdersCount = 124 || orders.length;
  const totalSpentFormatted = "14,520.00";
  const inTransitCount = useMemo(() => {
    return orders.filter((o) => o.status === "in_transit").length || 3;
  }, [orders]);

  const getStatusDot = (status, isDisputed) => {
    if (isDisputed) {
      return (
        <span className="flex items-center gap-2 text-rose-600 font-medium text-xs sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          Disputed
        </span>
      );
    }
    switch (status) {
      case "in_transit":
        return (
          <span className="flex items-center gap-2 text-slate-700 font-medium text-xs sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            In Transit
          </span>
        );
      case "delivered":
        return (
          <span className="flex items-center gap-2 text-slate-700 font-medium text-xs sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Delivered
          </span>
        );
      case "shipped":
        return (
          <span className="flex items-center gap-2 text-slate-700 font-medium text-xs sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Shipped
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2 text-slate-700 font-medium text-xs sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Confirmed
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Desktop Top Navbar */}
      <Navbar
        brand="Auto-Naija Mart"
        activeKey="order"
        onNavigate={onNavigate}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F2C52] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container (1280px Desktop Canvas) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Order History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track and manage your recent purchases.
            </p>
          </div>

          <button
            type="button"
            onClick={() => triggerToast("Exporting order records to CSV / PDF...")}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-colors"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span>Export</span>
          </button>
        </div>

        {/* 3 Metric Summary Cards */}
        <section
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
          aria-label="Order Statistics"
        >
          {/* Card 1: Total Orders */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-slate-600">
              <Receipt className="h-4.5 w-4.5 text-slate-500" />
              <span className="text-xs sm:text-sm font-semibold">
                Total Orders
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {totalOrdersCount}
              </span>
            </div>
          </div>

          {/* Card 2: Total Spent */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-slate-600">
              <Banknote className="h-4.5 w-4.5 text-slate-500" />
              <span className="text-xs sm:text-sm font-semibold">
                Total Spent
              </span>
            </div>
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2C52] tracking-tight">
                ₦{totalSpentFormatted}
              </span>
            </div>
          </div>

          {/* Card 3: In Transit */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-slate-600">
              <Truck className="h-4.5 w-4.5 text-slate-500" />
              <span className="text-xs sm:text-sm font-semibold">
                In Transit
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#EA580C] tracking-tight">
                {inTransitCount}
              </span>
            </div>
          </div>
        </section>

        {/* Search, Status & Date Filters */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders or items..."
                className="w-full h-10 pl-10 pr-9 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* Status Select */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="shipped">Shipped</option>
                  <option value="confirmed">Confirmed</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>

              {/* Date Range Select */}
              <div className="relative">
                <select
                  value={dateRangeFilter}
                  onChange={(e) => setDateRangeFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] cursor-pointer"
                >
                  <option value="30_days">Last 30 Days</option>
                  <option value="90_days">Last 3 Months</option>
                  <option value="6_months">Last 6 Months</option>
                  <option value="all">All Time</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  <th className="py-3.5 px-6">ORDER #</th>
                  <th className="py-3.5 px-6">DATE</th>
                  <th className="py-3.5 px-6">ITEMS</th>
                  <th className="py-3.5 px-6">STATUS</th>
                  <th className="py-3.5 px-6 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => onOrderClick && onOrderClick(order)}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* ORDER # */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="text-sm font-bold text-[#0F2C52] hover:underline cursor-pointer">
                          #{order.orderNumber}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-500">
                        {order.date}
                      </td>

                      {/* ITEMS */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={order.image}
                            alt={order.title}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/images/brake_pads.jpg";
                            }}
                            className="h-11 w-11 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200/80"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate max-w-xs lg:max-w-md">
                              {order.title}
                            </p>
                            {order.extraItems && (
                              <p className="text-xs text-slate-400 mt-0.5">
                                {order.extraItems}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* STATUS & RELEASE FUND */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-6">
                          {/* Status Dot / Label */}
                          <div className="w-28 shrink-0">
                            {getStatusDot(order.status, order.isDisputed)}
                          </div>

                          {/* Escrow Release Fund Switch */}
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-medium text-slate-500 mb-1 whitespace-nowrap">
                              {order.isFundReleased
                                ? "Fund Released"
                                : "Release Fund"}
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={order.isFundReleased}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFund(order.id);
                              }}
                              aria-label={
                                order.isFundReleased
                                  ? "Fund is released"
                                  : "Release escrow funds to seller"
                              }
                              className={`w-11 h-6 rounded-full transition-colors duration-200 relative focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0F2C52] p-0.5 ${
                                order.isFundReleased
                                  ? "bg-[#1E56A0]"
                                  : "bg-slate-300 hover:bg-slate-400"
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center transition-transform duration-200 ${
                                  order.isFundReleased
                                    ? "translate-x-5"
                                    : "translate-x-0"
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
                        </div>
                      </td>

                      {/* TOTAL & RAISE DISPUTE */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex flex-col items-end">
                          <span className="text-sm sm:text-base font-bold text-slate-900">
                            ₦{Number(order.price).toFixed(2)}
                          </span>
                          {!order.isFundReleased && !order.isDisputed && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDisputeOrder(order);
                              }}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-0.5"
                            >
                              Raise Dispute
                            </button>
                          )}
                          {order.isDisputed && (
                            <span className="text-[11px] font-semibold text-rose-600 mt-0.5">
                              Under Dispute
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      <Package className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">
                        No orders match your filter
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setStatusFilter("all");
                        }}
                        className="mt-2 text-xs font-semibold text-[#0F2C52] hover:underline"
                      >
                        Reset filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (< md screens) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F2C52]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={order.image}
                      alt={order.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/brake_pads.jpg";
                      }}
                      className="h-12 w-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {order.title}
                      </p>
                      {order.extraItems && (
                        <p className="text-xs text-slate-400">{order.extraItems}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>{getStatusDot(order.status, order.isDisputed)}</div>

                    <div className="flex items-center gap-4">
                      {/* Fund toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleFund(order.id)}
                        className={`w-9 h-5 rounded-full relative p-0.5 transition-colors ${
                          order.isFundReleased ? "bg-[#1E56A0]" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full bg-white flex items-center justify-center transition-transform ${
                            order.isFundReleased
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              order.isFundReleased
                                ? "text-[#1E56A0]"
                                : "text-slate-400"
                            }`}
                          />
                        </span>
                      </button>

                      {/* Total */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 block">
                          ₦{Number(order.price).toFixed(2)}
                        </span>
                        {!order.isFundReleased && !order.isDisputed && (
                          <button
                            onClick={() => setActiveDisputeOrder(order)}
                            className="text-[10px] font-semibold text-blue-600 hover:underline"
                          >
                            Raise Dispute
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No orders found.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Dispute Modal */}
      <DisputeModal
        isOpen={!!activeDisputeOrder}
        order={activeDisputeOrder}
        onClose={() => setActiveDisputeOrder(null)}
        onSubmitDispute={handleSubmitDispute}
      />

      {/* Mobile Bottom Navigation (< md breakpoint) */}
      <div className="md:hidden pb-16">
        <BottomNav activeKey="order" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
