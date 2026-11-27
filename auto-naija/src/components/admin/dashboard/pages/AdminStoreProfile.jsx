import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Store,
  Mail,
  ClipboardCheck,
  Ban,
  CheckCircle2,
  Check,
  Building2,
  Landmark,
  FileText,
  User,
  Phone,
  Eye,
  Download,
  AlertTriangle,
  Package,
  FileCheck,
  Clock,
  X,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  Camera,
  Upload,
  Trash2,
  Image as ImageIcon,
  Edit3
} from 'lucide-react'
import EditProfileModal from '../EditProfileModal'

const INVENTORY_ITEMS = [
  {
    id: 1,
    name: 'Noise Cancelling Headphones',
    sku: 'NC-V2-BLK',
    category: 'Audio & Acoustics',
    price: '₦85,000',
    stock: 42,
    icon: '🎧'
  },
  {
    id: 2,
    name: 'Mechanical Keyboard Pro',
    sku: 'MK-PRO-104',
    category: 'Computer Accessories',
    price: '₦45,000',
    stock: 18,
    icon: '⌨️'
  },
  {
    id: 3,
    name: 'Wireless Charging Pad',
    sku: '15W WCP-15W',
    category: 'Mobile Charging',
    price: '₦18,500',
    stock: 64,
    icon: '🔋'
  }
]

const SALES_HISTORY = [
  { id: 'ORD-8941', date: 'Oct 23, 2023', item: 'Noise Cancelling Headphones (x2)', amount: '₦170,000', status: 'Delivered' },
  { id: 'ORD-8924', date: 'Oct 21, 2023', item: 'Mechanical Keyboard Pro', amount: '₦45,000', status: 'Delivered' },
  { id: 'ORD-8890', date: 'Oct 19, 2023', item: 'Wireless Charging Pad (x3)', amount: '₦55,500', status: 'Processing' }
]

const DISPUTES = [
  { id: 'DSP-104', buyer: 'Chidi Okeke', issue: 'Package delayed in transit by carrier', amount: '₦85,000', status: 'Open' },
  { id: 'DSP-098', buyer: 'Amina Yusuf', issue: 'Wrong power adapter cable bundled', amount: '₦18,500', status: 'Resolved' }
]

export default function AdminStoreProfile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('inventory') // 'inventory' | 'sales' | 'disputes'
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [isSuspended, setIsSuspended] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [toastMessage, setToastMessage] = useState(null)
  const [storeImage, setStoreImage] = useState(null)
  const [storeDetails, setStoreDetails] = useState({
    firstName: 'Asoro Stores',
    lastName: 'Asoro Stores',
    email: 'Asoro Stores',
    phoneNumber: 'Asoro Stores',
    address: 'Asoro Stores',
    city: 'Asoro Stores',
    country: 'Asoro Stores',
    state: 'Asoro Stores'
  })
  const fileInputRef = useRef(null)

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleSaveStoreProfile = (updatedData) => {
    setStoreDetails(updatedData)
    triggerToast('Store profile updated successfully!')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        triggerToast('Please select a valid image file (PNG, JPG, or WEBP)')
        return
      }
      const previewUrl = URL.createObjectURL(file)
      setStoreImage(previewUrl)
      triggerToast('Store photo uploaded successfully!')
    }
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setStoreImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    triggerToast('Store picture reset to default')
  }

  const handleSuspendStore = () => {
    setIsSuspended(true)
    setIsSuspendModalOpen(false)
    triggerToast('TechHaven Electronics store has been suspended.')
  }

  const handleSendMessage = () => {
    setIsMessageModalOpen(false)
    setMessageText('')
    triggerToast('Direct message dispatched to Samuel Johnson (Managing Director)')
  }

  const handleRequestUtilityBill = () => {
    triggerToast('Automated compliance email dispatched: "Upload Updated Utility Bill"')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link
          to="/admin/sellers-management"
          className="hover:text-slate-900 transition-colors"
        >
          Sellers Management
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">TechHaven Store Profile</span>
      </nav>

      {/* Profile Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            TechHaven Electronics
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#5227d8]">
              <CheckCircle2 className="w-3.5 h-3.5 fill-[#5227d8] text-white" />
              Verified Seller
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Joined Oct 2023</span>
            {isSuspended && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                SUSPENDED
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons (Send Message, Verify Documents, Suspend Store) */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setIsMessageModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>Send Message</span>
            <Mail className="w-4 h-4 text-slate-500" />
          </button>

          <Link
            to="/admin/seller-approval"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span>Verify Documents</span>
            <ClipboardCheck className="w-4 h-4 text-slate-500" />
          </Link>

          <button
            onClick={() => setIsSuspendModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] active:bg-[#7f1d1d] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm shadow-red-950/20 transition-all cursor-pointer"
          >
            <span>Suspend Store</span>
            <Ban className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Grid (Left: 8 cols, Right: 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (~66% width = 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Store Details */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#5227d8]" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  Store Details
                </h2>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5227d8] bg-[#ece8fb] hover:bg-[#ded6f8] rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Left Thumbnail with Active badge & Picture Uploader */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Clickable Image Container */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  title="Click to upload/change store picture"
                  className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-2 flex flex-col justify-between shadow-xs relative group cursor-pointer overflow-hidden transition-all hover:border-[#5227d8] hover:shadow-md"
                >
                  {storeImage ? (
                    <div className="w-full h-full relative rounded-lg overflow-hidden flex flex-col justify-between">
                      <img
                        src={storeImage}
                        alt="Store Logo"
                        className="w-full h-14 sm:h-16 object-cover rounded-md"
                      />
                      <div className="text-[9px] text-center font-mono text-slate-500 truncate">
                        RC-123456789
                      </div>

                      {/* Remove Button on hover */}
                      <button
                        onClick={handleRemoveImage}
                        title="Remove custom picture"
                        className="absolute top-1 right-1 p-1 bg-red-600/90 hover:bg-red-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center pt-2">
                        <div className="w-8 h-8 rounded-lg bg-[#5227d8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          TH
                        </div>
                      </div>
                      <div className="text-[9px] text-center font-mono text-slate-400">
                        RC-123456789
                      </div>
                    </>
                  )}

                  {/* Hover Overlay with Camera Icon */}
                  <div className="absolute inset-0 bg-[#180880]/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 rounded-xl backdrop-blur-xs">
                    <Camera className="w-4 h-4" />
                    <span className="text-[9px] font-semibold text-center leading-tight px-1">
                      {storeImage ? 'Change' : 'Upload'}
                    </span>
                  </div>
                </div>

                {/* Active Status Badge */}
                <span className="px-2.5 py-0.5 rounded-full border border-[#5227d8] text-[#5227d8] bg-[#ece8fb]/40 text-[10px] font-semibold tracking-wide">
                  Active
                </span>
              </div>

              {/* Right Business Metadata Grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm">
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                    Business Name
                  </p>
                  <p className="font-semibold text-slate-900 mt-1">
                    TechHaven Electronics Ltd.
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                    Store URL / Handle
                  </p>
                  <p className="font-semibold text-[#5227d8] mt-1 hover:underline cursor-pointer">
                    @techhaven
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                    CAC Registration Number
                  </p>
                  <p className="font-semibold font-mono text-slate-900 mt-1">
                    RC-123456789
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                    Tax ID (TIN)
                  </p>
                  <p className="font-semibold font-mono text-slate-900 mt-1">
                    23456789-0001
                  </p>
                </div>

                <div className="sm:col-span-2 pt-1 border-t border-slate-100/80">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                    Business Address
                  </p>
                  <p className="font-semibold text-slate-800 mt-1">
                    15 Silicon Valley Close, Tech District, Lagos, NG
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Tabbed Inventory / Sales / Disputes */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* Tabs Header */}
            <div className="px-5 border-b border-slate-100 flex items-center gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-4 inline-flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'inventory'
                    ? 'border-[#5227d8] text-[#5227d8]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Inventory (124)</span>
                <Package className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('sales')}
                className={`py-4 inline-flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'sales'
                    ? 'border-[#5227d8] text-[#5227d8]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Sales History</span>
                <FileText className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('disputes')}
                className={`py-4 inline-flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'disputes'
                    ? 'border-[#5227d8] text-[#5227d8]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Disputes (2)</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </button>
            </div>

            {/* Tab 1: Inventory Table */}
            {activeTab === 'inventory' && (
              <div>
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                    <tr>
                      <th className="py-3 px-6">Product</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INVENTORY_ITEMS.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            {/* Product Thumbnail icon badge */}
                            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0 shadow-inner">
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">
                                {item.name}
                              </p>
                              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                                SKU: {item.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer */}
                <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div>Showing 1-3 of 124 items</div>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Sales History */}
            {activeTab === 'sales' && (
              <div className="p-5 space-y-3">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="py-2.5">Order ID</th>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Item</th>
                      <th className="py-2.5">Amount</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SALES_HISTORY.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-mono font-medium text-slate-800">{s.id}</td>
                        <td className="py-3 text-slate-500">{s.date}</td>
                        <td className="py-3 font-semibold text-slate-900">{s.item}</td>
                        <td className="py-3 font-bold text-slate-900">{s.amount}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Disputes */}
            {activeTab === 'disputes' && (
              <div className="p-5 space-y-3">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="text-[11px] font-semibold text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="py-2.5">Ticket</th>
                      <th className="py-2.5">Buyer</th>
                      <th className="py-2.5">Reason</th>
                      <th className="py-2.5">Escrow Amount</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DISPUTES.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-mono font-medium text-slate-800">{d.id}</td>
                        <td className="py-3 font-semibold text-slate-900">{d.buyer}</td>
                        <td className="py-3 text-slate-600">{d.issue}</td>
                        <td className="py-3 font-bold text-slate-900">{d.amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              d.status === 'Open'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3 Stacked Cards (~33% width = 4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Owner Contact */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-[#5227d8]" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Owner Contact
              </h2>
            </div>

            {/* Director Profile Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                {/* Clean professional avatar */}
                <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-indigo-900 text-white flex items-center justify-center font-bold text-sm">
                  SJ
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Samuel Johnson</p>
                <p className="text-xs text-slate-400">Managing Director</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Address</span>
                </div>
                <a
                  href="mailto:samuel@techhaven.com"
                  className="font-semibold text-[#5227d8] hover:underline mt-0.5 block"
                >
                  samuel@techhaven.com
                </a>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </div>
                <p className="font-semibold text-slate-800 mt-0.5 font-mono">
                  +234 800 123
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Bank Details */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Landmark className="w-4 h-4 text-[#5227d8]" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Bank Details
              </h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  Bank Name
                </p>
                <p className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <span>Guaranty Trust Bank</span>
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  Account Name
                </p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  TechHaven Electronics Ltd.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  Account Number
                </p>
                <div className="mt-1 inline-block px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 tracking-wider">
                  0123456789
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Business Documents */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <FileText className="w-4 h-4 text-[#5227d8]" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Business Documents
              </h2>
            </div>

            <div className="space-y-2.5">
              {/* Document 1: Owner ID (NIN) */}
              <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5227d8]/10 text-[#5227d8] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Owner ID (NIN)</p>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedDoc({ title: 'National Identity Number (NIN)', meta: 'Director Identification' })
                    setIsDocViewerOpen(true)
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Document 2: CAC Certificate */}
              <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5227d8]/10 text-[#5227d8] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">CAC Certificate</p>
                    <p className="text-[10px] text-slate-400">PDF • 1.2MB</p>
                  </div>
                </div>
                <button
                  onClick={() => triggerToast('Downloaded CAC_Incorporation_Certificate.pdf')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Document 3: Utility Bill (Expired) */}
              <div className="p-3 bg-red-50/40 border border-red-200/70 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Utility Bill</p>
                    <p className="text-[10px] font-semibold text-red-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Expired
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRequestUtilityBill}
                  className="text-xs font-semibold text-[#5227d8] hover:underline cursor-pointer"
                >
                  Request New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Message Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5227d8] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Message Vendor</h3>
                <p className="text-xs text-slate-400">Recipient: Samuel Johnson (Managing Director)</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  defaultValue="Compliance Notice & Store Operation Update"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#180880]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Message Content
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your official administrative message or inquiry here..."
                  rows={4}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#180880]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 py-2.5 bg-[#180880] hover:bg-[#130666] text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Store Confirmation Modal */}
      {isSuspendModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Ban className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Suspend TechHaven Electronics
                </h3>
                <p className="text-xs text-slate-500">
                  Store listings will be hidden from the public marketplace
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Are you sure you want to suspend this vendor account? The seller will lose access to order fulfillment, and ongoing payouts will be held in escrow until compliance review is cleared.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setIsSuspendModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspendStore}
                className="flex-1 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold rounded-xl shadow-md"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Lightbox Preview */}
      {isDocViewerOpen && selectedDoc && (
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsDocViewerOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDocViewerOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">{selectedDoc.title}</h3>
              <p className="text-xs text-slate-500">{selectedDoc.meta}</p>
            </div>

            <div className="p-8 bg-slate-100 rounded-xl border border-slate-200 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-[#5227d8] flex items-center justify-center mx-auto">
                <FileCheck className="w-8 h-8" />
              </div>
              <p className="text-xs font-semibold text-slate-700">Verified Compliance Document</p>
              <p className="text-[11px] font-mono text-slate-500">NIN-4920-8192-3810 • Federal Republic of Nigeria</p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsDocViewerOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveStoreProfile}
        initialData={storeDetails}
      />
    </div>
  )
}
