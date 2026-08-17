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
} from "lucide-react";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import Button from "../../components/Button";

const INITIAL_USER = {
  firstName: "Adeola",
  lastName: "Johnson",
  email: "adeola.j@example.com",
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

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(profileForm);
    setIsEditingProfile(false);
    triggerToast("Personal information updated successfully");
  };

  // Address Modal Open (New or Edit)
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

  // Save Address
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
      {/* Top Navbar */}
      <Navbar brand="Auto-Naija Mart" activeKey="profile" onNavigate={onNavigate} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0F2C52] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content (1280px Canvas) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Profile Card & Navigation Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* User Overview Card */}
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

            {/* Sidebar Navigation Card */}
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
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "notifications"
                    ? "bg-[#2510DF] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
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
                {/* 1. Personal Information Card */}
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
                    {/* First & Last Name */}
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

                    {/* Email Address */}
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

                    {/* Phone Number */}
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

                {/* 2. Saved Addresses Card */}
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

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col gap-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Notification Settings
                </h3>
                <div className="flex flex-col gap-4 divide-y divide-slate-100">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Order Updates</p>
                      <p className="text-xs text-slate-400">Real-time alerts on shipment and delivery status</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0F2C52]" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Chat Messages</p>
                      <p className="text-xs text-slate-400">Receive notifications when sellers reply to inquiries</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0F2C52]" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Promotions & Discounts</p>
                      <p className="text-xs text-slate-400">Exclusive deals on OEM parts and vehicle maintenance</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 accent-[#0F2C52]" />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
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

            {/* Favorites Tab */}
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden pb-16">
        <BottomNav activeKey="profile" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
