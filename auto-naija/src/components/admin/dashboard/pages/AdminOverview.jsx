import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  Wallet,
  Users,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Scale,
  Truck,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Approach A: Only elapsed, verified months with recorded data
const ELAPSED_GMV_MONTHS = [
  { month: 'Jan', value: 22.1, amount: '₦22.1M', growth: 'Baseline' },
  { month: 'Feb', value: 33.8, amount: '₦33.8M', growth: '+52.9%' },
  { month: 'Mar', value: 45.2, amount: '₦45.2M', growth: '+33.7%', current: true },
]

export default function AdminOverview() {
  const [exportToast, setExportToast] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Verify 12 Seller KYC Documents', done: false },
    { id: 2, text: 'Review 3 Refund Requests (High Value)', done: false },
    { id: 3, text: 'Approve Payout Batch #892', done: false },
  ])

  const maxGmvValue = Math.max(...ELAPSED_GMV_MONTHS.map((m) => m.value))
  const monthsCount = ELAPSED_GMV_MONTHS.length
  const periodLabel =
    monthsCount <= 3
      ? 'Q1'
      : monthsCount <= 6
      ? 'H1 (Q1–Q2)'
      : monthsCount <= 9
      ? 'Q1–Q3'
      : 'Full Year'

  const pendingCount = tasks.filter((t) => !t.done).length

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    )
  }

  const handleExport = () => {
    setExportToast(true)
    setTimeout(() => setExportToast(false), 3500)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Export Toast Notification */}
      {exportToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Export generated! Downloading <strong>Marketplace_Metrics_Report.csv</strong></span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Admin Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time platform metrics and status.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#170a8f] hover:bg-[#130777] active:bg-[#0f0563] text-white text-xs sm:text-sm font-medium rounded-xl shadow-md shadow-indigo-950/15 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>Export Report</span>
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>Total Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#170a8f] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            ₦45.2M
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.5% from last month</span>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>Active Users</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#170a8f] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            12,450
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              8.2k Buyers
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              4.2k Sellers
            </span>
          </div>
        </div>

        {/* Card 3: Open Disputes */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>Open Disputes</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-[28px] font-bold text-red-600 tracking-tight">
            42
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-red-600 mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+5 since yesterday</span>
          </div>
        </div>

        {/* Card 4: Pending Verifications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>Pending Verifications</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#170a8f] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            156
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-2">
            Requires attention
          </div>
        </div>
      </div>

      {/* Middle Row: GMV Trend Chart & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GMV Trend (Monthly) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                GMV Trend (Monthly)
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {periodLabel} Elapsed Data (₦) &bull; {monthsCount} {monthsCount === 1 ? 'Month' : 'Months'} Recorded
              </span>
            </div>

            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Financials
            </span>
          </div>

          {/* Bar Chart Graphics - Automatically spaces and closes up as new elapsed months are appended */}
          <div className="h-56 flex items-end justify-center gap-6 sm:gap-12 pt-6 pb-2 px-4 border-b border-slate-100">
            {ELAPSED_GMV_MONTHS.map((item) => {
              const heightPercent = `${Math.round((item.value / maxGmvValue) * 88) + 8}%`
              return (
                <div
                  key={item.month}
                  className="group flex flex-col items-center flex-1 max-w-[84px] h-full justify-end relative cursor-pointer"
                >
                  {/* Floating Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center mb-1.5 pointer-events-none absolute -top-2 z-10">
                    <span className="text-[11px] font-bold text-slate-800 bg-white border border-slate-200 shadow-sm px-2 py-0.5 rounded-md whitespace-nowrap">
                      {item.amount}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-600 mt-0.5">
                      {item.growth}
                    </span>
                  </div>

                  {/* Animated Column Bar */}
                  <div
                    style={{ height: heightPercent }}
                    className={`w-full rounded-t-xl transition-all duration-300 ${
                      item.current
                        ? 'bg-[#5227d8] group-hover:bg-[#431bb8] shadow-sm shadow-indigo-900/20 ring-2 ring-indigo-400/20'
                        : 'bg-[#c8bdf3] group-hover:bg-[#a593ef]'
                    }`}
                  ></div>

                  {/* Month Label */}
                  <span
                    className={`text-xs font-semibold mt-2.5 transition-colors ${
                      item.current ? 'text-slate-900 font-bold' : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 mb-5">
              System Health
            </h2>

            <div className="space-y-3.5">
              {/* Payment Gateway */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-white">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-semibold text-slate-800">
                    Payment Gateway
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                  Operational
                </span>
              </div>

              {/* API Endpoints */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-white">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-semibold text-slate-800">
                    API Endpoints
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                  99.9% Uptime
                </span>
              </div>

              {/* Email Delivery (Degraded) */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-red-200/80 bg-red-50/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-xs font-semibold text-slate-800">
                    Email Delivery
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200/60">
                  <AlertCircle className="w-3 h-3 text-red-600" />
                  Degraded
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Last checked: Just now</span>
            <button
              onClick={() => alert('Diagnostic ping ran: System operational with degraded email delivery.')}
              className="text-[#5227d8] font-semibold hover:underline cursor-pointer"
            >
              Run Diagnostic
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">
              Recent Activity
            </h2>
            <Link
              to="/admin/activity"
              className="text-xs font-semibold text-[#5227d8] hover:underline cursor-pointer"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {/* Activity 1 */}
            <div className="flex items-start gap-3.5 p-2 rounded-lg hover:bg-slate-50/80 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#170a8f] flex items-center justify-center shrink-0 mt-0.5">
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800">
                  <strong className="font-semibold text-slate-900">New Seller Signup:</strong> Autotech Motors Nig
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">2 mins ago</p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-3.5 p-2 rounded-lg hover:bg-slate-50/80 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                <Scale className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800">
                  <strong className="font-semibold text-slate-900">Dispute Escalated:</strong> Order #4592 (Non-delivery)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">15 mins ago</p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-3.5 p-2 rounded-lg hover:bg-slate-50/80 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800">
                  <strong className="font-semibold text-slate-900">Large Order Placed:</strong> ₦450,000 (Engine Blocks)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">
              Pending Actions
            </h2>
            <span className="text-[11px] font-bold text-white bg-[#170a8f] px-2.5 py-0.5 rounded-full">
              {pendingCount} Tasks
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  task.done
                    ? 'bg-slate-50/60 border-slate-200 text-slate-400 line-through'
                    : 'bg-white border-slate-200/90 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 rounded border-slate-300 text-[#170a8f] accent-[#170a8f] cursor-pointer"
                  />
                  <span className="text-xs font-medium">{task.text}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
