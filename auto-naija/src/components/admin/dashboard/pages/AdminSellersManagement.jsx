import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Store,
  BadgeCheck,
  ClipboardList,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  X,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

const INITIAL_SELLERS = [
  {
    id: 'SEL-1049',
    name: 'Tech Emporium',
    initials: 'TE',
    avatarBg: 'bg-[#ece8fb] text-[#5227d8]',
    status: 'Verified',
    statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    email: 'contact@techemporium.ng',
    phone: '+234 802 345 6789',
    location: 'Ikeja, Lagos',
    productsCount: 142,
    rating: 4.8,
    joinedDate: 'Jan 15, 2023',
    owner: 'Tunde Adebayo'
  },
  {
    id: 'SEL-1048',
    name: 'Home Goods Plus',
    initials: 'HG',
    avatarBg: 'bg-[#e6edfa] text-[#3b66d8]',
    status: 'Verified',
    statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    email: 'info@homegoodsplus.com',
    phone: '+234 813 987 6543',
    location: 'Garki, Abuja',
    productsCount: 88,
    rating: 4.6,
    joinedDate: 'Mar 22, 2023',
    owner: 'Fatima Bello'
  },
  {
    id: 'SEL-1047',
    name: 'Fashion Avenue',
    initials: 'FA',
    avatarBg: 'bg-[#eee8fa] text-[#6d3bd8]',
    status: 'Pending',
    statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    email: 'sales@fashionave.ng',
    phone: '+234 705 123 4567',
    location: 'Victoria Island, Lagos',
    productsCount: 34,
    rating: 4.2,
    joinedDate: 'Oct 18, 2023',
    owner: 'Chiamaka Okonkwo'
  },
  {
    id: 'SEL-1046',
    name: 'Gadget Galaxy',
    initials: 'GG',
    avatarBg: 'bg-[#fae6e6] text-[#d83b3b]',
    status: 'Suspended',
    statusBadge: 'bg-red-50 text-red-700 border-red-200',
    email: 'support@gadgetgalaxy.io',
    phone: '+234 809 765 4321',
    location: 'Port Harcourt, Rivers',
    productsCount: 65,
    rating: 3.4,
    joinedDate: 'Aug 04, 2022',
    owner: 'Emeka Nwosu'
  },
  {
    id: 'SEL-1045',
    name: 'TechNova Solutions Ltd.',
    initials: 'TS',
    avatarBg: 'bg-[#ece8fb] text-[#5227d8]',
    status: 'Pending',
    statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    email: 'admin@technova.com',
    phone: '+234 803 111 2233',
    location: 'Maitama, Abuja',
    productsCount: 12,
    rating: 5.0,
    joinedDate: 'Today, 2 hrs ago',
    owner: 'Ibrahim Danladi'
  }
]

export default function AdminSellersManagement() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All Statuses') // 'All Statuses' | 'Verified' | 'Pending' | 'Suspended'
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [toastMessage, setToastMessage] = useState(null)

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleExport = () => {
    triggerToast('Exported Marketplace_Sellers_Directory.csv successfully!')
  }

  // Filtered Sellers
  const filteredSellers = useMemo(() => {
    return INITIAL_SELLERS.filter((seller) => {
      const matchesTab =
        activeTab === 'All Statuses' || seller.status === activeTab

      const matchesSearch =
        seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Sellers Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage, review, and monitor marketplace vendors.
          </p>
        </div>

        {/* Action Button: Approve New Sellers */}
        <Link
          to="/admin/seller-approval"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#180880] hover:bg-[#130666] active:bg-[#0f0452] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm shadow-indigo-950/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>Approve New Sellers</span>
          <UserCheck className="w-4 h-4 stroke-[2.2]" />
        </Link>
      </div>

      {/* 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Sellers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Total Sellers
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#5227d8] flex items-center justify-center">
              <Store className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              12,450
            </p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+5.2% from last month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Verified Sellers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Verified Sellers
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#5227d8] flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              11,820
            </p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2.1% from last month</span>
            </p>
          </div>
        </div>

        {/* Card 3: Pending Approvals */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Pending Approvals
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              630
            </p>
            <p className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-2">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-12.5% from last month</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Sellers Directory Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Table Controls Row */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['All Statuses', 'Verified', 'Pending', 'Suspended'].map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border border-[#5227d8] text-[#5227d8] bg-[#ece8fb]/40 font-semibold'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Right Action Icons (Filter & Export) */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              title="Search & Filter"
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={handleExport}
              title="Export Report"
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search Drawer (Optional filter toggled) */}
        {isFilterModalOpen && (
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center gap-3 animate-fade-in">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vendor name, email, or RC number..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#180880]"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Sellers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="border-b border-slate-100 text-xs font-semibold text-slate-400">
              <tr>
                <th className="py-3.5 px-6">Store Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredSellers.map((seller) => (
                <tr
                  key={seller.id}
                  onClick={() => setSelectedSeller(seller)}
                  className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Two-letter square avatar badge matching screenshot */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${seller.avatarBg}`}
                        >
                          {seller.initials}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 text-sm group-hover:text-[#5227d8] transition-colors">
                            {seller.name}
                          </span>
                        </div>
                      </div>

                      {/* Optional subtle status pill if filtered */}
                      <span
                        className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border hidden sm:inline-block ${seller.statusBadge}`}
                      >
                        {seller.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Footer with Pagination */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing 1 to {filteredSellers.length} of 12,450 entries
          </div>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            {/* Prev button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>

            {/* Page 1 (Active) */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                currentPage === 1
                  ? 'border border-[#5227d8] bg-[#ece8fb] text-[#5227d8]'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-7 h-7 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                currentPage === 2
                  ? 'border border-[#5227d8] bg-[#ece8fb] text-[#5227d8]'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              2
            </button>

            {/* Page 3 */}
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-7 h-7 rounded-lg text-xs font-medium flex items-center justify-center transition-colors ${
                currentPage === 3
                  ? 'border border-[#5227d8] bg-[#ece8fb] text-[#5227d8]'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              3
            </button>

            {/* Next button */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Seller Details Modal Drawer */}
      {selectedSeller && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedSeller(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSeller(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${selectedSeller.avatarBg}`}
              >
                {selectedSeller.initials}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedSeller.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Vendor ID: {selectedSeller.id}
                </p>
              </div>
            </div>

            <div className="space-y-3 py-2 border-y border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${selectedSeller.statusBadge}`}
                >
                  {selectedSeller.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Business Owner</span>
                <span className="font-medium text-slate-900">
                  {selectedSeller.owner}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900">
                  {selectedSeller.email}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium text-slate-900">
                  {selectedSeller.phone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-medium text-slate-900">
                  {selectedSeller.location}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Listings</span>
                <span className="font-medium text-slate-900">
                  {selectedSeller.productsCount} Vehicles
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setSelectedSeller(null)
                  navigate('/admin/sellers-management/techhaven')
                }}
                className="flex-1 py-2.5 bg-[#180880] hover:bg-[#130666] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Store Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              {selectedSeller.status === 'Pending' && (
                <button
                  onClick={() => {
                    navigate('/admin/seller-approval')
                  }}
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Verify KYC</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
