import React from "react";
import { Home, Search, MessageSquare, Package, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav({ activeKey, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentKey =
    activeKey ||
    (location.pathname.startsWith("/orders") || location.pathname.startsWith("/order-history")
      ? "order"
      : location.pathname.startsWith("/chat")
      ? "chat"
      : location.pathname.startsWith("/search")
      ? "search"
      : location.pathname.startsWith("/profile") || location.pathname.startsWith("/notifications")
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
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-around px-3 py-2">
        {tabs.map((tab) => {
          const isActive = currentKey === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-150 relative ${
                isActive
                  ? "bg-[#183661] text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "stroke-[2.4]" : "stroke-[1.8]"
                }`}
              />
              <span
                className={`text-[10px] mt-0.5 capitalize leading-none tracking-tight ${
                  isActive ? "font-bold text-white" : "font-medium"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
