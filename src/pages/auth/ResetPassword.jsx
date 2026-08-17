import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button";

export default function ForgotPasswordPage({
  onBackToLogin = () => {},
  onSubmit = () => {},
}) {
  const [email, setEmail] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail) onSubmit({ email });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="px-7 pt-6 pb-7">
          <button
            type="button"
            onClick={onBackToLogin}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </button>

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Reset your password
          </h1>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Enter the email address associated with your account and we'll
            send you a link to reset your password.
          </p>

          <div className="mt-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-4"
            disabled={!isValidEmail}
          >
            Send Reset Code
          </Button>
        </form>
      </div>
    </div>
  );
}