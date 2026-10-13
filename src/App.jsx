import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import AdminVerify2FA from './pages/AdminVerify2FA'
import AdminOverview from './pages/AdminOverview'
import AdminLayout from './layouts/AdminLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Screen 1: Administrator Login (Default Landing) */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Screen 2: 2FA Verification */}
        <Route path="/admin/verify-2fa" element={<AdminVerify2FA />} />

        {/* Screen 3: Admin Overview Dashboard */}
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

        {/* Fallback for other sidebar items to return to Overview */}
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
                    &larr; Return to Admin Overview
                  </Link>
                </div>
              </div>
            </AdminLayout>
          }
        />

        {/* Unknown routes redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
