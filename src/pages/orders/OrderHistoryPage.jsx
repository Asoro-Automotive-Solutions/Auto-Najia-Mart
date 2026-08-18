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
  ArrowLeft,
  MoreVertical,
  RefreshCw,
  FileText,
  HelpCircle,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import OrderCard from "../../components/OrderCard";
import DisputeModal from "../../components/DisputeModal";

/**
 * Unified orders dataset shared across Desktop and Mobile views
 */
const UNIFIED_ORDERS = [
  {
    id: "ord-1",
    orderNumber: "ANM-8821",
    title: "OEM Brake Pad Set",
    extraItems: "+2 more items",
    image: "/images/brake_pads.jpg",
    price: 37000,
    status: "in_transit",
    expectedDate: "Dec 12 by 5:00pm",
    date: "Dec 19, 2026",
    orderDate: "Dec 19, 2026",
    isFundReleased: false,
    isDisputed: false,
  },
  {
    id: "ord-2",
    orderNumber: "ANM-8821",
    title: "High-Output Alternator Assembly",
    extraItems: null,
    image: "/images/alternator.jpg",
    price: 52500,
    status: "confirmed",
    expectedDate: null,
    date: "Dec 19, 2026",
    orderDate: "Dec 19, 2026",
    isFundReleased: true,
    isDisputed: false,
  },
  {
    id: "ord-3",
    orderNumber: "ANM-8821",
    title: "Engine Part",
    extraItems: "+1 more item",
    image: "/images/brake_pads.jpg",
    price: 37000,
    status: "shipped",
    expectedDate: "April 10-12",
    date: "Dec 19, 2026",
    orderDate: "Dec 19, 2026",
    isFundReleased: false,
    isDisputed: false,
  },
  {
    id: "ord-4",
    orderNumber: "ANM-8821",
    title: "OEM Brake Pad Premium",
    extraItems: null,
    image: "/images/brake_pads.jpg",
    price: 52500,
    status: "delivered",
    expectedDate: null,
    date: "Dec 19, 2026",
    orderDate: "Dec 19, 2026",
    isFundReleased: false,
    isDisputed: false,
  },
  {
    id: "ord-5",
    orderNumber: "ANM-8820",
    title: "Synthetic Motor Oil 5W-30 (5L)",
    extraItems: null,
    image: "/images/alternator.jpg",
    price: 18500,
    status: "delivered",
    expectedDate: null,
    date: "Dec 15, 2026",
    orderDate: "Dec 15, 2026",
    isFundReleased: true,
    isDisputed: false,
  },
  {
    id: "ord-6",
    orderNumber: "ANM-8819",
    title: "Front Suspension Strut Assembly",
    extraItems: "+3 more items",
    image: "/images/brake_pads.jpg",
    price: 89000,
    status: "in_transit",
    expectedDate: "Dec 24 by 2:00pm",
    date: "Dec 10, 2026",
    orderDate: "Dec 10, 2026",
    isFundReleased: false,
    isDisputed: false,
  },
];

export default function OrderHistoryPage({
  initialOrders = UNIFIED_ORDERS,
  onNavigate = () => {},
  onOrderClick,
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("30_days");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDisputeOrder, setActiveDisputeOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Toggle Fund Release state for an order (synchronously updates dataset)
  const handleToggleFund = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const next = !ord.isFundReleased;
          triggerToast(
            next
              ? `Escrow fund released for Order #${ord.orderNumber}`
              : `Fund release revoked for Order #${ord.orderNumber}`
          );
          return { ...ord, isFundReleased: next };
        }
        return ord;
      })
    );
  };

  // Handle Dispute
  const handleSubmitDispute = (disputeData) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === disputeData.orderId
          ? { ...ord, isDisputed: true, isFundReleased: false }
          : ord
      )
    );
    triggerToast(`Dispute initiated for Order #${disputeData.orderNumber}`);
  };

  // Filtered orders list (used by both Desktop & Mobile views)
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

  // Synchronized computed totals
  const totalOrdersCount = orders.length;
  const totalSpentAmount = useMemo(() => {
    return orders.reduce((sum, ord) => sum + (Number(ord.price) || 0), 0);
  }, [orders]);
  const inTransitCount = useMemo(() => {
    return orders.filter((o) => o.status === "in_transit").length;
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
      {/* ========================================================================= */}
      {/* 📱 MOBILE TOP HEADER APP BAR (< md screens)                               */}
      {/* ========================================================================= */}
      <header className="md:hidden sticky top-0 z-30 bg-[#0F2C52] text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Go back"
          className="p-1.5 -ml-1 text-white hover:text-slate-200 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h1 className="text-base font-bold tracking-tight text-white">
          Order History
        </h1>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Order options menu"
            aria-expanded={menuOpen}
            className="p-1.5 -mr-1 text-white hover:text-slate-200 hover:bg-white/10 rounded-full transition-colors"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                  <span>Reset Filters</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerToast("Downloading order invoice summary...");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>Export Invoices</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Desktop Top Navbar (hidden on mobile) */}
      <div className="hidden md:block">
        <Navbar brand="Auto-Naija Mart" activeKey="order" onNavigate={onNavigate} />
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F2C52] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📱 MOBILE VIEW (< md screens)                                             */}
      {/* ========================================================================= */}
      <div className="md:hidden flex-1 px-4 py-4 pb-24 max-w-md mx-auto w-full flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order or items"
            className="w-full h-10 pl-9 pr-9 rounded-2xl bg-[#F6F5FC] border border-[#E3DEFA] text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F2C52] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* 2 Metric Summary Cards */}
        <section className="grid grid-cols-2 gap-3" aria-label="Order Metrics">
          <div className="relative overflow-hidden rounded-2xl bg-[#EEEDFA] border border-[#DDD8F8] p-3.5 flex flex-col justify-between">
            <div className="absolute -right-2 -top-2 w-16 h-16 bg-[#DFDCF8] rounded-full opacity-60 pointer-events-none" />
            <div className="flex items-center gap-1.5 relative z-10">
              <div className="w-5 h-5 rounded-md bg-[#0F2C52] flex items-center justify-center text-white shrink-0">
                <Package className="h-3 w-3" />
              </div>
              <span className="text-xs font-semibold text-[#1A2E56]">
                Total Orders
              </span>
            </div>
            <div className="mt-2.5 relative z-10">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {totalOrdersCount}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#FBF1EA] border border-[#F4E0D2] p-3.5 flex flex-col justify-between">
            <div className="absolute -right-2 -top-2 w-16 h-16 bg-[#F5E2D4] rounded-full opacity-60 pointer-events-none" />
            <div className="flex items-center gap-1.5 relative z-10">
              <div className="w-5 h-5 rounded-md bg-[#E8732A] flex items-center justify-center text-white shrink-0">
                <Banknote className="h-3 w-3" />
              </div>
              <span className="text-xs font-semibold text-[#8C3F0C]">
                Total Spent
              </span>
            </div>
            <div className="mt-2.5 relative z-10">
              <span className="text-lg font-black text-slate-900 tracking-tight">
                ₦{totalSpentAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Recent Orders Section */}
        <section className="flex flex-col gap-2.5">
          <h2 className="text-sm font-bold text-slate-900">Recent Orders</h2>

          {filteredOrders.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onToggleFund={handleToggleFund}
                  onRaiseDispute={(ord) => setActiveDisputeOrder(ord)}
                  onClick={onOrderClick}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
              No orders found matching your search.
            </div>
          )}
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 🖥️ DESKTOP VIEW (>= md screens)                                           */}
      {/* ========================================================================= */}
      <main className="hidden md:block flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
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
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-colors"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Export</span>
            </button>
          </div>

          {/* 3 Summary Cards */}
          <section className="grid grid-cols-3 gap-6" aria-label="Order Statistics">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-slate-600">
                <Receipt className="h-4.5 w-4.5 text-slate-500" />
                <span className="text-sm font-semibold">Total Orders</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {totalOrdersCount}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-slate-600">
                <Banknote className="h-4.5 w-4.5 text-slate-500" />
                <span className="text-sm font-semibold">Total Spent</span>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-[#0F2C52] tracking-tight">
                  ₦{totalSpentAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-slate-600">
                <Truck className="h-4.5 w-4.5 text-slate-500" />
                <span className="text-sm font-semibold">In Transit</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-[#EA580C] tracking-tight">
                  {inTransitCount}
                </span>
              </div>
            </div>
          </section>

          {/* Desktop Table Container */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 flex items-center justify-between gap-4 border-b border-slate-100">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders or items..."
                  className="w-full h-10 pl-10 pr-9 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F2C52] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="shipped">Shipped</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>

                <div className="relative">
                  <select
                    value={dateRangeFilter}
                    onChange={(e) => setDateRangeFilter(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] cursor-pointer"
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

            <div className="overflow-x-auto">
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
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="text-sm font-bold text-[#0F2C52] hover:underline cursor-pointer">
                            #{order.orderNumber}
                          </span>
                        </td>

                        <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-500">
                          {order.date}
                        </td>

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

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-6">
                            <div className="w-28 shrink-0">
                              {getStatusDot(order.status, order.isDisputed)}
                            </div>

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

                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex flex-col items-end">
                            <span className="text-base font-bold text-slate-900">
                              ₦{Number(order.price).toLocaleString()}
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
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* Dispute Modal */}
      <DisputeModal
        isOpen={!!activeDisputeOrder}
        order={activeDisputeOrder}
        onClose={() => setActiveDisputeOrder(null)}
        onSubmitDispute={handleSubmitDispute}
      />

      {/* Mobile Bottom Navigation (< md breakpoint) */}
      <div className="md:hidden">
        <BottomNav activeKey="order" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
