import React, { useState } from "react";
import {
  Smartphone,
  Mail,
  Truck,
  MessageSquare,
  FileText,
  Shield,
  ArrowRight,
  Check,
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

const INITIAL_SETTINGS = {
  orderUpdates: true,
  messagesChat: true,
  weeklySummary: false,
  enableSound: true,
  enableVibration: true,
};

export default function NotificationSettingsPage({
  initialSettings = INITIAL_SETTINGS,
  onNavigate = () => {},
}) {
  const [settings, setSettings] = useState(initialSettings);
  const [activeSidebarNav, setActiveSidebarNav] = useState("settings");
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const toggleSetting = (key, label) => {
    setSettings((prev) => {
      const nextVal = !prev[key];
      triggerToast(`${label} ${nextVal ? "enabled" : "disabled"}`);
      return { ...prev, [key]: nextVal };
    });
  };

  const ToggleSwitch = ({ checked, onChange, label, ariaLabel }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      aria-label={ariaLabel || label}
      className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F2C52] p-0.5 shrink-0 ${
        checked ? "bg-[#1E56A0]" : "bg-slate-300 hover:bg-slate-400"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {checked ? (
          <Check className="w-3.5 h-3.5 text-[#1E56A0] stroke-[3]" />
        ) : null}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar */}
      <Navbar brand="Auto-Naija Mart" activeKey="profile" onNavigate={onNavigate} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F2C52] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container with Full-Height Sidebar Column */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-56px)]">
        {/* LEFT SIDEBAR: Full-Height Lavender Column */}
        <aside className="w-full md:w-64 bg-[#EFEBF9] border-r border-[#E0D9F2] p-6 flex flex-col gap-6 shrink-0">
          {/* Header */}
          <div>
            <h2 className="text-sm font-bold text-slate-900">Admin Portal</h2>
            <p className="text-xs text-slate-500 mt-0.5">Automotive Marketplace</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Admin Navigation">
            <button
              type="button"
              onClick={() => {
                setActiveSidebarNav("dashboard");
                triggerToast("Dashboard module loaded");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeSidebarNav === "dashboard"
                  ? "bg-[#2510DF] text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-200/60"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSidebarNav("inventory");
                triggerToast("Inventory module loaded");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeSidebarNav === "inventory"
                  ? "bg-[#2510DF] text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-200/60"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Inventory</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSidebarNav("customers");
                triggerToast("Customers module loaded");
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeSidebarNav === "customers"
                  ? "bg-[#2510DF] text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-200/60"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Customers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebarNav("settings")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeSidebarNav === "settings"
                  ? "bg-[#2510DF] text-white shadow-xs"
                  : "text-slate-700 hover:bg-slate-200/60"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* RIGHT CONTENT: Notification Settings */}
        <main className="flex-1 max-w-5xl px-4 sm:px-8 lg:px-10 py-6 md:py-8 flex flex-col gap-6 overflow-y-auto">
          {/* Header & Breadcrumbs */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <span>Settings</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-600 font-medium">Notification Settings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Notification Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage how and when you receive updates from AutoPart Pro.
            </p>
          </div>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: App & Email Notifications */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* 1. App Notifications Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
                  <Smartphone className="h-4.5 w-4.5 text-[#0F2C52]" />
                  <span>App Notifications</span>
                </div>

                <div className="flex flex-col gap-5 divide-y divide-slate-100">
                  {/* Order Updates */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                        <Truck className="h-5 w-5 text-[#0F2C52]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Order Updates
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          Get notified about order status, delivery, and confirmations.
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      checked={settings.orderUpdates}
                      onChange={() => toggleSetting("orderUpdates", "Order Updates")}
                      label="Order Updates"
                    />
                  </div>

                  {/* Messages & Chat */}
                  <div className="flex items-center justify-between gap-4 pt-5">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                        <MessageSquare className="h-5 w-5 text-[#0F2C52]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Messages & Chat
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          New messages from sellers and customer support.
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      checked={settings.messagesChat}
                      onChange={() => toggleSetting("messagesChat", "Messages & Chat")}
                      label="Messages & Chat"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Email Notifications Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
                  <Mail className="h-4.5 w-4.5 text-[#0F2C52]" />
                  <span>Email Notifications</span>
                </div>

                {/* Weekly Summary */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                      <FileText className="h-5 w-5 text-[#0F2C52]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Weekly Summary
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Receive a weekly email with your order summary and personalized recommendations.
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.weeklySummary}
                    onChange={() => toggleSetting("weeklySummary", "Weekly Summary")}
                    label="Weekly Summary"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Device Preferences & Security Alerts */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* 3. Device Preferences Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col gap-5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Device Preferences
                </h3>

                <div className="flex flex-col gap-5 divide-y divide-slate-100">
                  {/* Enable Sound */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <span className="text-sm font-medium text-slate-800">
                      Enable Sound
                    </span>
                    <ToggleSwitch
                      checked={settings.enableSound}
                      onChange={() => toggleSetting("enableSound", "Sound")}
                      label="Enable Sound"
                    />
                  </div>

                  {/* Enable Vibration */}
                  <div className="flex items-center justify-between gap-4 pt-5">
                    <span className="text-sm font-medium text-slate-800">
                      Enable Vibration
                    </span>
                    <ToggleSwitch
                      checked={settings.enableVibration}
                      onChange={() => toggleSetting("enableVibration", "Vibration")}
                      label="Enable Vibration"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Security Alerts Card */}
              <div className="bg-[#F6F4FE] rounded-2xl p-6 border border-[#E7E2FA] shadow-xs flex flex-col gap-3.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Shield className="h-4.5 w-4.5 text-[#0F2C52]" />
                  <span>Security Alerts</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Critical security alerts cannot be disabled to ensure your account safety.
                </p>

                <button
                  type="button"
                  onClick={() => triggerToast("Navigating to Security Settings...")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2C52] hover:text-[#0C2340] hover:underline mt-1 self-start"
                >
                  <span>Review Security Settings</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden pb-16">
        <BottomNav activeKey="profile" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
