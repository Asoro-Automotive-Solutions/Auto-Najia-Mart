import { useState, useRef, useEffect } from 'react'
import {
  Calendar,
  Download,
  ChevronDown,
  TrendingUp,
  Tag,
  Landmark,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  FileText,
  X
} from 'lucide-react'

const INITIAL_TRANSACTIONS = [
  {
    id: 'TX-993821',
    date: 'Oct 24, 2023',
    time: '14:32 PM',
    recipient: 'Acme Corp Store',
    avatarInitials: 'AC',
    avatarBg: 'bg-purple-100 text-[#5227d8]',
    type: 'Seller Payout',
    typeStyle: 'bg-purple-50 text-[#5227d8] border-purple-100',
    amount: '$4,250.00',
    amountType: 'neutral',
    status: 'Completed',
    statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    statusDot: 'bg-emerald-500',
    category: 'Escrow Release',
    notes: 'Disbursement after 48-hour vehicle inspection clearance.'
  },
  {
    id: 'TX-993820',
    date: 'Oct 24, 2023',
    time: '11:15 AM',
    recipient: 'John Doe',
    avatarInitials: 'JD',
    avatarBg: 'bg-indigo-100 text-indigo-700',
    type: 'Refund',
    typeStyle: 'bg-slate-100 text-slate-600 border-slate-200',
    amount: '-$125.50',
    amountType: 'negative',
    status: 'Completed',
    statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    statusDot: 'bg-emerald-500',
    category: 'Listing Fee Refund',
    notes: 'Buyer dispute settled amicably. Funds reversed to wallet.'
  },
  {
    id: 'TX-993819',
    date: 'Oct 23, 2023',
    time: '09:45 AM',
    recipient: 'Global Supplies LLC',
    avatarInitials: 'GS',
    avatarBg: 'bg-violet-100 text-violet-700',
    type: 'Seller Payout',
    typeStyle: 'bg-purple-50 text-[#5227d8] border-purple-100',
    amount: '$12,890.00',
    amountType: 'neutral',
    status: 'Processing',
    statusStyle: 'bg-slate-100 text-slate-600 border-slate-200',
    statusDot: 'bg-slate-400',
    category: 'Automated Batch',
    notes: 'Interbank settlement pending central clearing switch.'
  },
  {
    id: 'TX-993818',
    date: 'Oct 23, 2023',
    time: '08:30 AM',
    recipient: 'Platform Fee Collection',
    avatarInitials: 'PL',
    avatarBg: 'bg-blue-100 text-[#180880]',
    type: 'System',
    typeStyle: 'bg-blue-50 text-blue-700 border-blue-100',
    amount: '+$8,450.25',
    amountType: 'positive',
    status: 'Completed',
    statusStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    statusDot: 'bg-emerald-500',
    category: 'Marketplace Commission',
    notes: 'Auto-swept 3.5% transaction commission from completed escrow deals.'
  },
  {
    id: 'TX-993817',
    date: 'Oct 22, 2023',
    time: '16:20 PM',
    recipient: 'Tech Direct',
    avatarInitials: 'TD',
    avatarBg: 'bg-sky-100 text-sky-700',
    type: 'Seller Payout',
    typeStyle: 'bg-purple-50 text-[#5227d8] border-purple-100',
    amount: '$1,150.00',
    amountType: 'neutral',
    status: 'Failed',
    statusStyle: 'bg-red-50 text-red-700 border-red-200',
    statusDot: 'bg-red-500',
    category: 'Manual Payout',
    notes: 'Recipient account number invalid or KYC tiered limit exceeded.'
  }
]

const DATE_OPTIONS = [
  'Last 7 Days',
  'Last 30 Days',
  'This Quarter',
  'This Year'
]

export default function AdminFinancial() {
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [selectedTx, setSelectedTx] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  const dateDropdownRef = useRef(null)
  const actionMenuRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActiveMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleExport = () => {
    triggerToast('Financial_Overview_Report.csv downloaded successfully!')
  }

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    triggerToast(`Copied ${id} to clipboard!`)
    setTimeout(() => setCopiedId(null), 2000)
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Financial Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time marketplace revenue and transaction metrics.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Date Selector Dropdown */}
          <div className="relative" ref={dateDropdownRef}>
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-lg text-xs sm:text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isDateDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 text-xs sm:text-sm">
                {DATE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedDateRange(option)
                      setIsDateDropdownOpen(false)
                      triggerToast(`Filtered view for: ${option}`)
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                      selectedDateRange === option
                        ? 'font-semibold text-[#180880] bg-indigo-50/50'
                        : 'text-slate-600'
                    }`}
                  >
                    <span>{option}</span>
                    {selectedDateRange === option && <Check className="w-3.5 h-3.5 text-[#180880]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#180880] hover:bg-[#130666] active:bg-[#0f0452] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm shadow-indigo-950/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 3 Top Financial KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Gross Merchandise Value (GMV) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5227d8] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              +12.5%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Gross Merchandise Value (GMV)
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              $2,450,890.00
            </p>
          </div>
        </div>

        {/* Card 2: Platform Fees Earned */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Tag className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Platform Fees Earned
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              $183,816.75
            </p>
          </div>
        </div>

        {/* Card 3: Net Profit (Hero Highlighted Card) */}
        <div className="bg-[#180880] rounded-2xl p-6 shadow-md shadow-indigo-950/20 text-white hover:shadow-lg transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center backdrop-blur-xs">
              <Landmark className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-xs font-medium border border-white/20 backdrop-blur-xs">
              <TrendingUp className="w-3 h-3" />
              +15.4%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs sm:text-sm font-medium text-indigo-200">
              Net Profit
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              $142,500.20
            </p>
          </div>
        </div>
      </div>

      {/* Recent Payouts & Transactions Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Recent Payouts & Transactions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest financial movements across the marketplace
            </p>
          </div>
          <button
            onClick={() => triggerToast('Viewing all historical marketplace payouts & transactions')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5227d8] hover:text-[#3f1db0] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Transaction ID</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Recipient / Entity</th>
                <th className="py-3.5 px-4 sm:px-6">Type</th>
                <th className="py-3.5 px-4 sm:px-6">Amount</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {INITIAL_TRANSACTIONS.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  onClick={() => setSelectedTx(tx)}
                >
                  {/* Transaction ID */}
                  <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-700 font-medium">
                    {tx.id}
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{tx.date}</div>
                    <div className="text-[11px] text-slate-400">{tx.time}</div>
                  </td>

                  {/* Recipient / Entity */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${tx.avatarBg}`}
                      >
                        {tx.avatarInitials}
                      </div>
                      <span className="font-semibold text-slate-900 whitespace-nowrap">
                        {tx.recipient}
                      </span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium border ${tx.typeStyle}`}
                    >
                      {tx.type}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-bold text-slate-900">
                    <span
                      className={
                        tx.amountType === 'negative'
                          ? 'text-red-600'
                          : tx.amountType === 'positive'
                          ? 'text-[#180880]'
                          : 'text-slate-900'
                      }
                    >
                      {tx.amount}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tx.statusStyle}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${tx.statusDot}`} />
                      <span>{tx.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    className="py-4 px-4 sm:px-6 text-right whitespace-nowrap relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-block relative">
                      <button
                        onClick={() =>
                          setActiveMenuId(activeMenuId === tx.id ? null : tx.id)
                        }
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === tx.id && (
                        <div
                          ref={actionMenuRef}
                          className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-40 text-left text-xs"
                        >
                          <button
                            onClick={() => {
                              setSelectedTx(tx)
                              setActiveMenuId(null)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span>View Details</span>
                          </button>
                          <button
                            onClick={() => {
                              copyToClipboard(tx.id)
                              setActiveMenuId(null)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy TX ID</span>
                          </button>
                          <button
                            onClick={() => {
                              triggerToast(`Downloaded receipt for ${tx.id}`)
                              setActiveMenuId(null)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2 border-t border-slate-100"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-400" />
                            <span>Download Receipt</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedTx.avatarBg}`}
              >
                {selectedTx.avatarInitials}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedTx.recipient}</h3>
                <p className="text-xs font-mono text-slate-400">{selectedTx.id}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Transaction Amount</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${selectedTx.typeStyle}`}>
                  {selectedTx.type}
                </span>
              </div>
              <div
                className={`text-2xl font-extrabold ${
                  selectedTx.amountType === 'negative'
                    ? 'text-red-600'
                    : selectedTx.amountType === 'positive'
                    ? 'text-[#180880]'
                    : 'text-slate-900'
                }`}
              >
                {selectedTx.amount}
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Date & Timestamp</span>
                <span className="font-medium text-slate-800">
                  {selectedTx.date} at {selectedTx.time}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${selectedTx.statusStyle}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedTx.statusDot}`} />
                  <span>{selectedTx.status}</span>
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Movement Category</span>
                <span className="font-medium text-slate-800">{selectedTx.category}</span>
              </div>
              <div className="py-1.5">
                <span className="text-slate-500 block mb-1">Notes / Audit Trail</span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {selectedTx.notes}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  copyToClipboard(selectedTx.id)
                }}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedId === selectedTx.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  triggerToast(`Receipt downloaded for ${selectedTx.id}`)
                  setSelectedTx(null)
                }}
                className="flex-1 py-2.5 px-3 bg-[#180880] hover:bg-[#130666] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
