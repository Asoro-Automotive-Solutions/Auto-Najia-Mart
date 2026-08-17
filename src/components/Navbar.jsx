import React, { useState } from "react";
import { Store, Menu, X } from "lucide-react";

const DEFAULT_LINKS = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "chat", label: "Chat" },
  { key: "order", label: "Order" },
  { key: "profile", label: "Profile" },
];

/**
 * Navbar
 *
 * Shared top navigation bar. Collapses into a hamburger menu below the
 * `md` breakpoint so every page that uses it gets responsive nav for free.
 *
 * Props:
 * - brand: string shown next to the logo mark        (default: "Auto-Naija Mart")
 * - links: [{ key, label }]                          (default: DEFAULT_LINKS)
 * - activeKey: key of the currently active link
 * - onNavigate: (key) => void                        called when a link is clicked
 */
export default function Navbar({
  brand = "Auto-Naija Mart",
  links = DEFAULT_LINKS,
  activeKey = "home",
  onNavigate = () => {},
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (key) => {
    onNavigate(key);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="h-14 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#0F2C52]">
          <Store className="h-5 w-5" />
          <span className="font-bold text-sm md:text-base">{brand}</span>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => handleClick(link.key)}
              className={[
                "text-sm transition-colors",
                activeKey === link.key
                  ? "text-[#0F2C52] font-semibold"
                  : "text-slate-500 hover:text-slate-700",
              ].join(" ")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-slate-100 px-4 py-2 flex flex-col">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => handleClick(link.key)}
              className={[
                "text-left text-sm py-2.5 px-1 rounded-md transition-colors",
                activeKey === link.key
                  ? "text-[#0F2C52] font-semibold bg-slate-50"
                  : "text-slate-500 hover:text-slate-700",
              ].join(" ")}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}