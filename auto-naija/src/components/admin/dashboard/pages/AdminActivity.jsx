import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  RefreshCw,
  UserPlus,
  Scale,
  ShoppingCart,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  KeyRound,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-9021',
    category: 'seller',
    type: 'New Seller Signup',
    title: 'Autotech Motors Nig registered for verification',
    details: 'Uploaded CAC certificate and tax identification documents from Ikeja, Lagos.',
    actor: 'System / Public Registration',
    time: '2 mins ago',
    timestamp: 'Today, 6:46 PM',
    status: 'Pending KYC',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: UserPlus,
    iconColor: 'bg-indigo-50 text-[#170a8f]'
  },
  {
    id: 'ACT-9020',
    category: 'dispute',
    type: 'Dispute Escalated',
    title: 'Order #4592 escalated for Non-Delivery',
    details: 'Buyer Chidi O. requested mediator intervention for ₦450,000 engine block order.',
    actor: 'Buyer: Chidi O. (chidi.o@gmail.com)',
    time: '15 mins ago',
    timestamp: 'Today, 6:33 PM',
    status: 'High Priority',
    statusColor: 'bg-red-50 text-red-700 border-red-200',
    icon: Scale,
    iconColor: 'bg-red-50 text-red-600'
  },
  {
    id: 'ACT-9019',
    category: 'order',
    type: 'Large Order Placed',
    title: 'Order #4601 secured via Escrow (₦450,000)',
    details: 'Complete V6 transmission assembly purchased with Escrow protection funds held.',
    actor: 'Buyer: Emeka Motors',
    time: '1 hour ago',
    timestamp: 'Today, 5:48 PM',
    status: 'Escrow Secured',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: ShoppingCart,
    iconColor: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'ACT-9018',
    category: 'payout',
    type: 'Escrow Payout Batch',
    title: 'Payout Batch #892 released to 14 verified sellers',
    details: 'Total disbursement of ₦4,850,000 approved following 48hr inspection clearance.',
    actor: 'Super Admin (admin@autonaijamart.ng)',
    time: '2 hours ago',
    timestamp: 'Today, 4:50 PM',
    status: 'Disbursed',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
    iconColor: 'bg-emerald-50 text-emerald-600'
  },
  {
    id: 'ACT-9017',
    category: 'security',
    type: 'Security Notice',
    title: 'Failed 2FA verification attempt detected',
    details: 'Multiple invalid OTP attempts on account moderator_02 from IP 102.89.23.4 (MTN NG).',
    actor: 'Security Firewall Sentinel',
    time: '3 hours ago',
    timestamp: 'Today, 3:45 PM',
    status: 'Investigated',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: ShieldAlert,
    iconColor: 'bg-amber-50 text-amber-600'
  },
  {
    id: 'ACT-9016',
    category: 'seller',
    type: 'KYC Document Approved',
    title: 'Prime Autos Abuja verified and certified',
    details: 'Physical dealership location and business license verified by verification team.',
    actor: 'Admin User (Super Admin)',
    time: '5 hours ago',
    timestamp: 'Today, 1:52 PM',
    status: 'Approved',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: ShieldCheck,
    iconColor: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'ACT-9015',
    category: 'system',
    type: 'System Health Check',
    title: 'Automated diagnostic check flagged degraded email gateway',
    details: 'SMTP latency peaked at 1,420ms; failover secondary endpoint engaged automatically.',
    actor: 'Health Daemon',
    time: '6 hours ago',
    timestamp: 'Today, 12:40 PM',
    status: 'Resolved',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: AlertTriangle,
    iconColor: 'bg-red-50 text-red-500'
  },
  {
    id: 'ACT-9014',
    category: 'security',
    type: 'Permissions Updated',
    title: 'Support Desk role granted to Chinedu N.',
    details: 'Assigned customer dispute read-only privileges and verified ticket resolution rights.',
    actor: 'Super Admin',
    time: 'Yesterday',
    timestamp: 'Yesterday, 5:12 PM',
    status: 'Active',
    statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: KeyRound,
    iconColor: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'ACT-9013',
    category: 'order',
    type: 'Listing Moderated',
    title: 'Listing #991 approved: 2021 Lexus RX350 Clean Title',
    details: 'Vehicle VIN check and clear odometer verified against national vehicle database.',
    actor: 'Content Moderation Team',
    time: 'Yesterday',
    timestamp: 'Yesterday, 3:30 PM',
    status: 'Live on Market',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: FileText,
    iconColor: 'bg-indigo-50 text-[#170a8f]'
  }
]

export default function AdminActivity() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [exportNotice, setExportNotice] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 600)
  }

  const handleExport = () => {
    setExportNotice(true)
    setTimeout(() => setExportNotice(false), 3000)
  }

  const filteredActivities = useMemo(() => {
    return INITIAL_ACTIVITIES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Export notification popup */}
      {exportNotice && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Audit log export generated: <strong>Audit_Logs_Activity.csv</strong></span>
        </div>
      )}

      {/* Top Breadcrumb & Return to Overview */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#170a8f] hover:text-[#5227d8] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Admin Overview</span>
        </Link>

        <span className="text-xs text-slate-400 font-medium">
          Auto-Naija Mart Audit Trail
        </span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Recent Activity &amp; Audit Logs
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Live Feed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological audit log of administrative actions, user verifications, escrow events, and security pings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            title="Refresh Activity"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#170a8f] hover:bg-[#130777] active:bg-[#0f0563] text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-950/15 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Events Today</p>
          <p className="text-xl font-bold text-slate-900 mt-1">148</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">+18% vs yesterday</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Disputes Logged</p>
          <p className="text-xl font-bold text-red-600 mt-1">5</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">2 pending mediation</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">KYC Reviews</p>
          <p className="text-xl font-bold text-[#170a8f] mt-1">12</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Requires approval</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">System Security</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">Normal</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">TLS 1.3 Active</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by action, user, order ID, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#5227d8] focus:ring-2 focus:ring-[#5227d8]/10 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: 'all', label: 'All Activities' },
              { key: 'seller', label: 'Seller & KYC' },
              { key: 'dispute', label: 'Disputes' },
              { key: 'order', label: 'Orders & Escrow' },
              { key: 'security', label: 'Security & Staff' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.key
                    ? 'bg-[#170a8f] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'Activity' : 'Activities'}
          </h2>
          <span className="text-xs text-slate-400">
            Auto-refreshed with real-time log stream
          </span>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Filter className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-600">No matching activities found</p>
            <p className="text-xs text-slate-400">Try adjusting your search query or switching categories.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredActivities.map((act) => {
              const Icon = act.icon
              return (
                <div
                  key={act.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-xl ${act.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {act.type}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          [{act.id}]
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${act.statusColor}`}>
                          {act.status}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-800">
                        {act.title}
                      </p>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {act.details}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-400">
                        <span>Actor: <strong className="text-slate-600 font-medium">{act.actor}</strong></span>
                        <span>•</span>
                        <span>{act.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Clock className="w-3 h-3" />
                      {act.time}
                    </span>

                    <button
                      onClick={() => alert(`Log Entry ${act.id}\n\nType: ${act.type}\nActor: ${act.actor}\nTimestamp: ${act.timestamp}\nStatus: ${act.status}\n\nFull raw audit checksum verified.`)}
                      className="text-xs font-semibold text-[#170a8f] hover:text-[#5227d8] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1 to {filteredActivities.length} of {filteredActivities.length} entries</span>
          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-300 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-1 bg-[#170a8f] text-white rounded-lg font-bold">1</span>
            <button
              disabled
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-300 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
