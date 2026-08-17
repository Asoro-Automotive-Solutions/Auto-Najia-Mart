import React from "react";
import { Home, Search, MessageSquare, Package, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * BottomNav Component
 *
 * Persistent bottom navigation bar for mobile / app view.
 * Displays tabs: Home, Search, Chat, Order, and Profile.
 *
 * Props:
 * - activeKey: string (e.g. "order", "chat", "home")
 * - onNavigate: optional callback function(tabKey)
 */
export default function BottomNav({ activeKey, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current active key based on pathname if not explicitly passed
  const currentKey =
    activeKey ||
    (location.pathname.startsWith("/orders") || location.pathname.startsWith("/order-history")
      ? "order"
      : location.pathname.startsWith("/chat")
      ? "chat"
      : location.pathname.startsWith("/search")
      ? "search"
      : location.pathname.startsWith("/profile")
      ? "profile"
      : "home");

  const tabs = [
    { key: "home", label: "Home", icon: Home, route: "/" },
    { key: "search", label: "Search", icon: Search, route: "/search" },
    { key: "chat", label: "Chat", icon: MessageSquare, route: "/chat" },
    { key: "order", label: "Order", icon: Package, route: "/orders" },
    { key: "profile", label: "Profile", icon: User, route: "/profile" },
  ];

  const handleTabClick = (tab) => {
    if (onNavigate) {
      onNavigate(tab.key);
    }
    if (tab.route) {
      navigate(tab.route);
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg md:max-w-md md:mx-auto"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = currentKey === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-150 relative ${
                isActive
                  ? "text-[#0F2C52] font-semibold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {/* Active Dot Indicator */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C52] mb-1 transition-all" />
              )}
              {!isActive && <span className="w-1.5 h-1.5 mb-1 opacity-0" />}

              <Icon
                className={`h-5 w-5 transition-transform ${
                  isActive ? "scale-110 stroke-[2.2]" : "stroke-[1.8]"
                }`}
              />
              <span className="text-[11px] mt-1 capitalize leading-none tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
