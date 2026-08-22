import React from "react";
import { Home, Search, MessageSquare, Package, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

/**
 * BottomNav Component
 *
 * Mobile navigation bar with auto-clearing notification badges.
 *
 * Props:
 * - activeKey: string (e.g. "order", "chat", "home")
 * - notifications: optional override { chat: boolean, order: boolean }
 * - onNavigate: (key) => void
 */
export default function BottomNav({
  activeKey,
  notifications: propNotifications,
  onNavigate,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications: contextNotifications, clearNotification } = useNotifications();

  const activeNotifications = propNotifications || contextNotifications;

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
    clearNotification(tab.key);
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
          const hasDot = activeNotifications?.[tab.key] ?? false;
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
              <div className="relative">
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "stroke-[2.4]" : "stroke-[1.8]"
                  }`}
                />
                {hasDot && (
                  <span
                    aria-label={`${tab.label} has new notifications`}
                    className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white"
                  />
                )}
              </div>
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
