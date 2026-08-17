import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../../components/Button";

export default function CreateAccountPage({
  onBack = () => {},
  onSignIn = () => {},
  onGoogleSignUp = () => {},
  onFacebookSignUp = () => {},
  onSubmit = () => {},
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-center px-5 py-4 bg-[#0F2C52]">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-5 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-sm font-semibold text-white">Create Account</h1>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 pt-6 pb-6">
          <h2 className="text-xl font-bold text-slate-900">Welcome!</h2>
          <p className="mt-1 text-xs text-slate-400">
            Create your Auto-Naija Mart Account
          </p>

          {/* Username */}
          <div className="mt-5">
            <label className="block text-[11px] font-semibold tracking-wide text-slate-500 mb-1.5">
              USERNAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. adeola_drives"
                className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="block text-[11px] font-semibold tracking-wide text-slate-500 mb-1.5">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 pl-9 pr-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-[11px] font-semibold tracking-wide text-slate-500 mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full h-11 pl-9 pr-9 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth className="mt-5">
            Continue
          </Button>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] text-slate-400 whitespace-nowrap">
              OR SIGN UP WITH
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social sign up */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onGoogleSignUp}
              className="h-11 flex items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <GoogleIcon className="h-4 w-4" />
              Google
            </button>
            <button
              type="button"
              onClick={onFacebookSignUp}
              className="h-11 flex items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
              Facebook
            </button>
          </div>

          <p className="mt-5 text-xs text-center text-slate-500">
            By signing up you agree to our{" "}
            <button
              type="button"
              onClick={onSignIn}
              className="text-[#4338CA] font-medium hover:underline"
            >
              Terms
            </button>{" "}
            &amp;{" "}
            <button
              type="button"
              onClick={onSignIn}
              className="text-[#4338CA] font-medium hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function GoogleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function FacebookIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}