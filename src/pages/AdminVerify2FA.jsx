import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, ArrowRight, Clock, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function AdminVerify2FA() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(180) // 3:00 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendNotification, setResendNotification] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const inputRefs = useRef([])

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format seconds to M:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleChange = (index, value) => {
    // Only accept numeric inputs
    if (value && !/^\d+$/.test(value)) return

    setErrorMsg('')
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Take the last character
    setOtp(newOtp)

    // Move to next input box if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // If current box is empty, jump back to previous box on backspace
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split('')
    const newOtp = [...otp]
    digits.forEach((digit, idx) => {
      newOtp[idx] = digit
    })
    setOtp(newOtp)

    const nextIndex = Math.min(digits.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleResend = () => {
    setTimeLeft(180)
    setOtp(['', '', '', '', '', ''])
    setResendNotification('A new 6-digit verification code has been dispatched to your device.')
    inputRefs.current[0]?.focus()
    setTimeout(() => setResendNotification(''), 4000)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const fullCode = otp.join('')

    if (fullCode.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.')
      return
    }

    setIsVerifying(true)
    setErrorMsg('')

    // Simulate verification check
    setTimeout(() => {
      setIsVerifying(false)
      // Navigate to the Admin Dashboard (Sprint 2 screen)
      navigate('/admin')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      {/* Top back navigation bar */}
      <header className="p-4 sm:p-6">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </Link>
      </header>

      {/* Center 2FA Card */}
      <main className="w-full max-w-[500px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-[0_12px_40px_-8px_rgba(27,8,163,0.06)] border border-slate-200/90 p-8 sm:p-12 text-center">
          {/* Security Badge Icon */}
          <div className="w-14 h-14 rounded-full bg-[#1b08a3] text-white mx-auto flex items-center justify-center shadow-md shadow-indigo-950/20 mb-6">
            <Lock className="w-6 h-6 stroke-[2.2]" />
          </div>

          <h1 className="text-2xl sm:text-[26px] font-semibold text-slate-900 tracking-tight mb-2">
            Enter Verification Code
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-8">
            We&apos;ve sent a 6-digit verification code to your registered device. Please enter it below to securely access the Admin Portal.
          </p>

          {resendNotification && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium animate-fade-in">
              {resendNotification}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 Digit Input Grid */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#1b08a3] focus:ring-2 focus:ring-[#1b08a3]/20 transition-all shadow-xs"
                />
              ))}
            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
            )}

            {/* Countdown Timer & Resend Option */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  Code Expires in <strong className="text-slate-700 font-semibold">{formatTime(timeLeft)}</strong>
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs sm:text-sm text-[#1b08a3] hover:text-[#14067a] font-semibold hover:underline cursor-pointer transition-colors"
                >
                  Didn&apos;t receive a code? Resend
                </button>
              </div>
            </div>

            {/* Verify Action Button */}
            <button
              type="submit"
              disabled={isVerifying || otp.join('').length < 6}
              className="w-full h-12 bg-[#1b08a3] hover:bg-[#150682] active:bg-[#100465] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-950/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Bottom Global Status Footer */}
      <footer className="w-full border-t border-slate-200/80 py-5 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p className="flex items-center gap-2">
          <span>&copy; 2024 Marketplace Admin Portal. Secure Session Active.</span>
        </p>

        <div className="flex items-center gap-4 text-slate-500">
          <a
            href="#security"
            onClick={(e) => {
              e.preventDefault()
              alert('Security Policy: End-to-end encrypted session with multi-factor authentication.')
            }}
            className="hover:text-slate-800 transition-colors"
          >
            Security Policy
          </a>
          <span>•</span>
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault()
              alert('Privacy Policy: All administrative sessions are recorded for security auditing.')
            }}
            className="hover:text-slate-800 transition-colors"
          >
            Privacy
          </a>
          <span>•</span>
          <a
            href="#report"
            onClick={(e) => {
              e.preventDefault()
              alert('Report Vulnerability: Please contact security@autonaijamart.ng')
            }}
            className="hover:text-slate-800 transition-colors"
          >
            Report Vulnerability
          </a>
        </div>
      </footer>
    </div>
  )
}
