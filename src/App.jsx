import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminVerify2FA from './pages/AdminVerify2FA'
import AdminOverview from './pages/AdminOverview'
import AdminLayout from './layouts/AdminLayout'
import { Shield, KeyRound, LayoutDashboard, ArrowRight, ExternalLink } from 'lucide-react'

// Portal Hub / Landing for quick team navigation across all screens
function PortalHub() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          All Assigned Admin Screens Live
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Auto-Naija Mart
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Admin Portal flow complete. Test each screen directly below or start from the login flow:
        </p>

        {/* Quick Route Cards */}
        <div className="grid gap-3 pt-2 text-left">
          {/* Screen 1 */}
          <Link
            to="/admin/login"
            className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  Screen 1: Administrator Login
                </h2>
                <p className="text-xs text-slate-400">
                  Authentication portal with email, password toggle &amp; restricted access notice
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Screen 2 */}
          <Link
            to="/admin/verify-2fa"
            className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                  Screen 2: 2FA Verification Code
                </h2>
                <p className="text-xs text-slate-400">
                  6-digit auto-advancing OTP, paste handler &amp; live countdown timer
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Screen 3 */}
          <Link
            to="/admin"
            className="group flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    Screen 3: Admin Overview Dashboard
                  </h2>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    Sprint 2
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Full sidebar, ₦45.2M Revenue, GMV trend bar chart, System Health &amp; Pending Tasks
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortalHub />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/verify-2fa" element={<AdminVerify2FA />} />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminOverview />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/overview"
          element={
            <AdminLayout>
              <AdminOverview />
            </AdminLayout>
          }
        />
        {/* Placeholder for other sidebar items */}
        <Route
          path="/admin/:section"
          element={
            <AdminLayout>
              <div className="p-8 text-center">
                <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Section in Progress</h2>
                  <p className="text-sm text-slate-500 mb-4">
                    This section is reserved for teammates or upcoming screen development.
                  </p>
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#170a8f] hover:underline"
                  >
                    ← Return to Admin Overview
                  </Link>
                </div>
              </div>
            </AdminLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
