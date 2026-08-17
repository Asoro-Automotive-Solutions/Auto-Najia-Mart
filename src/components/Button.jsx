import React from "react";

/**
 * Button
 *
 * Shared button component. Keep this as the single source of truth for
 * button styling so every screen (onboarding, auth, dashboard...) stays
 * visually consistent.
 *
 * Props:
 * - variant: "primary" | "secondary" | "ghost"   (default: "primary")
 * - size:    "sm" | "md" | "lg"                  (default: "md")
 * - fullWidth: boolean                           (default: false)
 * - icon: optional React node rendered after the label (e.g. an arrow)
 * - as: render as a different element/component (defaults to "button")
 * - ...rest: any other button props (onClick, type, disabled, etc.)
 */
const VARIANT_STYLES = {
  primary:
    "bg-[#0F2C52] text-white hover:bg-[#0C2340] active:bg-[#0A1D38] border border-transparent",
  secondary:
    "bg-white text-[#0F2C52] hover:bg-slate-50 active:bg-slate-100 border border-slate-200",
  ghost:
    "bg-transparent text-[#0F2C52] hover:bg-slate-100 active:bg-slate-200 border border-transparent",
};

const SIZE_STYLES = {
  sm: "text-sm px-3.5 py-2 rounded-lg gap-1.5",
  md: "text-sm px-4 py-3 rounded-xl gap-2",
  lg: "text-base px-5 py-3.5 rounded-xl gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon = null,
  as: Component = "button",
  className = "",
  ...rest
}) {
  return (
    <Component
      className={[
        "inline-flex items-center justify-center font-medium",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F2C52]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      <span>{children}</span>
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
    </Component>
  );
}