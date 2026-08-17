import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import Button from "../../components/Button";

const REQUIREMENTS = [
  { key: "length", label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { key: "uppercase", label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { key: "symbol", label: "One number or symbol", test: (pw) => /[0-9!@#$%^&*(),.?":{}|<>_\-+=]/.test(pw) },
];

export default function ResetPasswordPage({ onSubmit = () => {} }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const checks = useMemo(
    () =>
      REQUIREMENTS.map((req) => ({ ...req, met: req.test(password) })),
    [password]
  );

  const allMet = checks.every((c) => c.met);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = allMet && passwordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit({ password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border-b-4 border-[#0F2C52]">
        <form onSubmit={handleSubmit} className="px-7 pt-8 pb-7">
          <p className="text-center text-sm font-bold tracking-wide text-[#241947]">
            AUTO-NAIJA MART
          </p>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 text-center">
            Reset Password
          </h1>
          <p className="mt-2 text-xs text-slate-400 text-center leading-relaxed">
            Create a strong new password to secure your
            <br />
            account.
          </p>

          {/* New password */}
          <div className="mt-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-11 pl-3 pr-9 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors"
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

          {/* Confirm password */}
          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className={[
                  "w-full h-11 pl-3 pr-9 rounded-lg border text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 transition-colors",
                  confirmPassword && !passwordsMatch
                    ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                    : "border-slate-200 focus:ring-[#0F2C52] focus:border-[#0F2C52]",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
            )}
          </div>

          {/* Requirements checklist */}
          <div className="mt-4 rounded-xl bg-[#F1EEFB] px-4 py-3.5 flex flex-col gap-2.5">
            {checks.map((req) => (
              <div key={req.key} className="flex items-center gap-2.5">
                <span
                  className={[
                    "h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    req.met
                      ? "bg-[#241947]"
                      : "border border-slate-300 bg-white",
                  ].join(" ")}
                >
                  {req.met && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                </span>
                <span
                  className={[
                    "text-xs transition-colors",
                    req.met ? "text-slate-700" : "text-slate-400",
                  ].join(" ")}
                >
                  {req.label}
                </span>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-5"
            disabled={!canSubmit}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}