import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminVerify2FA from './pages/AdminVerify2FA'
import { Shield, KeyRound, LayoutDashboard, ArrowRight } from 'lucide-react'

// Portal Hub / Landing for quick team navigation
function PortalHub() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Sprint 1 Live: Admin Authentication
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Auto-Naija Mart
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Welcome to the shared frontend environment. The Admin Security &amp; 2FA flow is now active.
        </p>

        {/* Quick Route Cards */}
        <div className="grid gap-3 pt-2 text-left">
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
                  Secure access portal with credentials &amp; restricted access alert
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </Link>

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
                  Auto-advancing 6-digit OTP, countdown timer &amp; resend trigger
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-dashed border-slate-800 opacity-75">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-300">
                  Screen 3: Admin Overview Dashboard
                </h2>
                <p className="text-xs text-slate-500">
                  Assigned for Sprint 2 (Metrics, GMV Trends &amp; System Health)
                </p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
              Up Next
            </span>
          </div>
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
        {/* Fallback to portal hub */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
