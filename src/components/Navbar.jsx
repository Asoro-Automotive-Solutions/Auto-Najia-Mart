import React, { useState } from "react";
import { Store, Menu, X } from "lucide-react";

const DEFAULT_LINKS = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "chat", label: "Chat", hasBadge: true },
  { key: "order", label: "Order", hasBadge: true },
  { key: "profile", label: "Profile" },
];

/**
 * Navbar
 *
 * Shared top navigation bar with notification badges.
 *
 * Props:
 * - brand: string shown next to the logo mark (default: "Auto-Naija Mart")
 * - links: [{ key, label, hasBadge }]
 * - activeKey: key of the currently active link
 * - notifications: { chat: boolean, order: boolean, ... }
 * - onNavigate: (key) => void called when a link is clicked
 */
export default function Navbar({
  brand = "Auto-Naija Mart",
  links = DEFAULT_LINKS,
  activeKey = "home",
  notifications = { chat: true, order: true },
  onNavigate = () => {},
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (key) => {
    onNavigate(key);
    setOpen(false);
  };

  const hasNotification = (key) => {
    return notifications[key] ?? links.find((l) => l.key === key)?.hasBadge ?? false;
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="h-14 px-4 md:px-6 flex items-center justify-between">
        <div
          onClick={() => handleClick("home")}
          className="flex items-center gap-2 text-[#0F2C52] cursor-pointer"
        >
          <Store className="h-5 w-5" />
          <span className="font-bold text-sm md:text-base">{brand}</span>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => {
            const hasDot = hasNotification(link.key);
            const isActive = activeKey === link.key;

            return (
              <button
                key={link.key}
                onClick={() => handleClick(link.key)}
                className={[
                  "text-sm transition-colors relative inline-flex items-center gap-1.5",
                  isActive
                    ? "text-[#0F2C52] font-bold"
                    : "text-slate-600 hover:text-slate-900 font-medium",
                ].join(" ")}
              >
                <span>{link.label}</span>
                {hasDot && (
                  <span
                    aria-label={`${link.label} has unread notifications`}
                    className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white shrink-0"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors relative p-1"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          {(hasNotification("chat") || hasNotification("order")) && !open && (
            <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-slate-100 px-4 py-2 flex flex-col bg-white">
          {links.map((link) => {
            const hasDot = hasNotification(link.key);
            const isActive = activeKey === link.key;

            return (
              <button
                key={link.key}
                onClick={() => handleClick(link.key)}
                className={[
                  "text-left text-sm py-2.5 px-2 rounded-md transition-colors flex items-center justify-between",
                  isActive
                    ? "text-[#0F2C52] font-bold bg-slate-50"
                    : "text-slate-600 hover:text-slate-900 font-medium",
                ].join(" ")}
              >
                <span>{link.label}</span>
                {hasDot && (
                  <span className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}