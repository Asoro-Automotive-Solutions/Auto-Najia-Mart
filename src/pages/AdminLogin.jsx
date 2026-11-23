import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, ArrowRight, AlertTriangle, Headphones, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberDevice, setRememberDevice] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.')
      return
    }

    setIsLoading(true)

    // Simulate verification delay before proceeding to 2FA
    setTimeout(() => {
      setIsLoading(false)
      navigate('/admin/verify-2fa')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#ece9f6] flex flex-col items-center justify-center px-4 py-10 selection:bg-indigo-600 selection:text-white">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#170a8f] text-white flex items-center justify-center shadow-lg shadow-indigo-900/20 mb-3">
          <Shield className="w-7 h-7 fill-white/20 stroke-[2.2]" />
        </div>
        <h2 className="text-xl font-medium tracking-tight text-slate-800">
          Auto-Naija Mart
        </h2>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_10px_35px_-5px_rgba(23,10,143,0.08)] border border-slate-200/80 p-8 sm:p-10">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
            Administrator Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Secure access portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@autonaijamart.ng"
                className="w-full h-12 px-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#170a8f] focus:ring-2 focus:ring-[#170a8f]/15 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-3.5 pr-11 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#170a8f] focus:ring-2 focus:ring-[#170a8f]/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Device Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#170a8f] focus:ring-[#170a8f] accent-[#170a8f] cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-xs sm:text-sm text-slate-600 cursor-pointer select-none"
            >
              Remember device
            </label>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#170a8f] hover:bg-[#130777] active:bg-[#0f0563] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-950/20 transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Restricted Access Alert Banner */}
          <div className="bg-red-50/80 border border-red-200/90 rounded-xl p-3.5 sm:p-4 text-left">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>Restricted Access Only</span>
            </div>
            <p className="text-[11px] sm:text-xs text-red-600/90 leading-relaxed pl-6">
              Unauthorized access to this system is prohibited and monitored. All activity is logged.
            </p>
          </div>
        </form>
      </div>

      {/* Footer Links */}
      <div className="mt-8 flex items-center gap-4 text-xs text-slate-500 font-medium">
        <a
          href="#it-support"
          onClick={(e) => {
            e.preventDefault()
            alert('IT Support Helpdesk: support@autonaijamart.ng | Ext: 4402')
          }}
          className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>IT Support</span>
        </a>
        <span className="text-slate-300">•</span>
        <a
          href="#security-policy"
          onClick={(e) => {
            e.preventDefault()
            alert('Security Policy: Enterprise TLS 1.3 encryption with strict Role-Based Access Control.')
          }}
          className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Security Policy</span>
        </a>
      </div>
    </div>
  )
}
