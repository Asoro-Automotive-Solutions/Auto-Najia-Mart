import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Heart,
  LogOut,
  Phone,
  Calendar,
  Home,
  Briefcase,
  Plus,
  Edit2,
  Check,
  X,
  MapPin,
  Lock,
  ArrowLeft,
  Mail,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import Button from "../../components/Button";

const INITIAL_USER = {
  firstName: "Adeola",
  lastName: "Johnson",
  username: "@adeola-drives",
  email: "you@example.com",
  phone: "+234 801 234 5678",
  joinedDate: "Mar 2023",
  avatar: "/images/adeola.jpg",
};

const INITIAL_ADDRESSES = [
  {
    id: "addr-1",
    tag: "Home",
    type: "home",
    name: "Adeola Johnson",
    line1: "15 Lekki Phase 1, Eti-Osa",
    cityState: "Lagos, Lagos State",
    phone: "+234 801 234 5678",
  },
  {
    id: "addr-2",
    tag: "Work",
    type: "work",
    name: "Adeola Johnson",
    line1: "42 Victoria Island, Lagos Island",
    cityState: "Lagos, Lagos State",
    phone: "+234 801 234 5678",
  },
];

export default function ProfilePage({
  initialUser = INITIAL_USER,
  initialAddresses = INITIAL_ADDRESSES,
  onNavigate = () => {},
  onLogOut = () => {},
}) {
  const [activeTab, setActiveTab] = useState("personal_info");
  const [user, setUser] = useState(initialUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(initialUser);

  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    tag: "Home",
    name: "",
    line1: "",
    cityState: "",
    phone: "",
  });

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(profileForm);
    setIsEditingProfile(false);
    triggerToast("Personal information updated successfully");
  };

  const openAddressModal = (addr = null) => {
    if (addr) {
      setEditingAddress(addr);
      setAddressForm({ ...addr });
    } else {
      setEditingAddress(null);
      setAddressForm({
        tag: "Other",
        name: `${user.firstName} ${user.lastName}`,
        line1: "",
        cityState: "Lagos, Lagos State",
        phone: user.phone,
      });
    }
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddress.id ? { ...a, ...addressForm } : a))
      );
      triggerToast("Address updated successfully");
    } else {
      const newAddress = {
        id: `addr-${Date.now()}`,
        ...addressForm,
        type: addressForm.tag.toLowerCase(),
      };
      setAddresses((prev) => [...prev, newAddress]);
      triggerToast("New address added successfully");
    }
    setIsAddressModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Desktop Top Navbar (hidden on small mobile screens) */}
      <div className="hidden md:block">
        <Navbar brand="Auto-Naija Mart" activeKey="profile" onNavigate={onNavigate} />
      </div>

      {/* Mobile Top Header App Bar (< md screens) */}
      <header className="md:hidden sticky top-0 z-30 bg-[#0F2C52] text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Go back"
          className="p-1.5 -ml-1 text-white hover:text-slate-200 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-bold tracking-tight text-white">Profile</h1>
        <div className="w-5" /> {/* Balance spacer */}
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F2C52] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📱 MOBILE VIEW (< md screens matching Screen 2 Figma prototype)           */}
      {/* ========================================================================= */}
      <div className="md:hidden flex-1 px-4 py-4 pb-24 max-w-md mx-auto w-full flex flex-col gap-5">
        {/* User Card (Dark Navy Gradient) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#183661] to-[#0D213F] text-white p-5 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";
                  }}
                  className="h-12 w-12 rounded-full object-cover shadow-sm border border-white/40"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 overflow-hidden border border-white/30">
                  <User className="h-6 w-6" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-white/70">{user.username}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-white/80 pt-1 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-white/60" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-white/60" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Saved Addresses</h3>
            <button
              type="button"
              onClick={() => openAddressModal(null)}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Add New
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {addresses.map((addr) => {
              const Icon = addr.tag === "Work" ? Briefcase : Home;
              return (
                <div
                  key={addr.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs">
                      <Icon className="h-4 w-4" />
                      <span>{addr.tag}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAddressModal(addr)}
                      className="text-xs font-semibold text-emerald-600 hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">{addr.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{addr.line1}</p>
                    <p className="text-xs text-slate-500">{addr.cityState}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{addr.phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings Grouped List */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-slate-900">Settings</h3>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            <button
              type="button"
              onClick={() => onNavigate("notifications")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-slate-700 text-xs font-semibold">
                <Bell className="h-4 w-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => triggerToast("Password & Security settings")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-slate-700 text-xs font-semibold">
                <Lock className="h-4 w-4 text-slate-400" />
                <span>Password & Security</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => triggerToast("Favorites list")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-slate-700 text-xs font-semibold">
                <Heart className="h-4 w-4 text-slate-400" />
                <span>Favorites</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => triggerToast("Help & Support center")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-slate-700 text-xs font-semibold">
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?")) {
                  onLogOut();
                }
              }}
              className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-rose-50 text-rose-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-xs font-bold">Log Out</span>
            </button>
          </div>
        </div>

        {/* Footer Brand Info */}
        <div className="text-center text-[10px] text-slate-400 mt-2 flex flex-col gap-1">
          <p className="font-semibold uppercase tracking-wider">Auto-Naija Mart v1.0.0</p>
          <p>Terms of Service • Privacy Policy</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🖥️ DESKTOP VIEW (>= md screens matching Desktop Figma specifications)      */}
      {/* ========================================================================= */}
      <main className="hidden md:block flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Profile Card & Navigation Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";
                  }}
                  className="h-24 w-24 rounded-full object-cover shadow-sm border-2 border-white ring-2 ring-slate-100"
                />
              </div>

              <h2 className="text-lg font-bold text-slate-900 mt-3.5">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>

              <div className="w-full border-t border-slate-100 my-4" />

              <div className="w-full flex flex-col gap-2.5 text-xs text-slate-600 text-left px-2">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>Joined {user.joinedDate}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-2 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("personal_info")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "personal_info"
                    ? "bg-[#2510DF] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <User className="h-4 w-4" />
                <span>Personal Info</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate("notifications")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "security"
                    ? "bg-[#2510DF] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "favorites"
                    ? "bg-[#2510DF] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </button>

              <div className="h-px bg-slate-100 my-1 mx-2" />

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to log out?")) {
                    onLogOut();
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          {/* RIGHT COLUMN: Tab Content Panels */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {activeTab === "personal_info" && (
              <>
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Personal Information
                    </h3>
                    {!isEditingProfile ? (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileForm(user);
                          setIsEditingProfile(true);
                        }}
                        className="text-xs sm:text-sm font-semibold text-[#0F2C52] hover:underline"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2 py-1"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          className="text-xs font-semibold bg-[#0F2C52] text-white px-3 py-1.5 rounded-lg hover:bg-[#0C2340]"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={isEditingProfile ? profileForm.firstName : user.firstName}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, firstName: e.target.value })
                          }
                          className={`w-full h-11 px-4 rounded-xl text-sm font-medium transition-all ${
                            isEditingProfile
                              ? "bg-white border border-[#0F2C52] text-slate-900 focus:outline-none ring-2 ring-[#0F2C52]/10"
                              : "bg-[#F4F2FA] border border-[#E4E0F4] text-slate-700 cursor-default"
                          }`}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={isEditingProfile ? profileForm.lastName : user.lastName}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, lastName: e.target.value })
                          }
                          className={`w-full h-11 px-4 rounded-xl text-sm font-medium transition-all ${
                            isEditingProfile
                              ? "bg-white border border-[#0F2C52] text-slate-900 focus:outline-none ring-2 ring-[#0F2C52]/10"
                              : "bg-[#F4F2FA] border border-[#E4E0F4] text-slate-700 cursor-default"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled={!isEditingProfile}
                        value={isEditingProfile ? profileForm.email : user.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        className={`w-full h-11 px-4 rounded-xl text-sm font-medium transition-all ${
                          isEditingProfile
                            ? "bg-white border border-[#0F2C52] text-slate-900 focus:outline-none ring-2 ring-[#0F2C52]/10"
                            : "bg-[#F4F2FA] border border-[#E4E0F4] text-slate-700 cursor-default"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        disabled={!isEditingProfile}
                        value={isEditingProfile ? profileForm.phone : user.phone}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, phone: e.target.value })
                        }
                        className={`w-full h-11 px-4 rounded-xl text-sm font-medium transition-all ${
                          isEditingProfile
                            ? "bg-white border border-[#0F2C52] text-slate-900 focus:outline-none ring-2 ring-[#0F2C52]/10"
                            : "bg-[#F4F2FA] border border-[#E4E0F4] text-slate-700 cursor-default"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Saved Addresses
                    </h3>
                    <button
                      type="button"
                      onClick={() => openAddressModal(null)}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0F2C52] hover:underline"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New</span>
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {addresses.map((addr) => {
                      const Icon = addr.tag === "Work" ? Briefcase : Home;
                      return (
                        <div
                          key={addr.id}
                          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                                <Icon className="h-4 w-4 text-[#0F2C52]" />
                                <span>{addr.tag}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => openAddressModal(addr)}
                                className="text-xs font-semibold text-slate-400 hover:text-slate-700 hover:underline"
                              >
                                Edit
                              </button>
                            </div>

                            <p className="text-sm font-bold text-slate-800">
                              {addr.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              {addr.line1}
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {addr.cityState}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {addr.phone}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col gap-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Security & Authentication
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Two-Factor Authentication (2FA)</p>
                      <p className="text-xs text-slate-400">Add an extra layer of security for escrow transactions</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => triggerToast("2FA configured")}>
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Password</p>
                      <p className="text-xs text-slate-400">Last changed 3 months ago</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => triggerToast("Password reset link sent to email")}>
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col gap-4 text-center items-center justify-center py-12">
                <Heart className="h-10 w-10 text-slate-300" />
                <h4 className="text-base font-bold text-slate-800">Your Wishlist is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Save parts and spare items to access them quickly when you are ready to purchase.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Address Edit / Add Modal */}
      {isAddressModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Address Label</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Home", "Work", "Other"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAddressForm({ ...addressForm, tag: label })}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        addressForm.tag === label
                          ? "bg-[#0F2C52] text-white border-[#0F2C52]"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Contact Name</label>
                <input
                  type="text"
                  required
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F2C52]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 Lekki Phase 1, Eti-Osa"
                  value={addressForm.line1}
                  onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F2C52]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">City, State</label>
                <input
                  type="text"
                  required
                  value={addressForm.cityState}
                  onChange={(e) => setAddressForm({ ...addressForm, cityState: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F2C52]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F2C52]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Save Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation (< md breakpoint) */}
      <div className="md:hidden">
        <BottomNav activeKey="profile" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
