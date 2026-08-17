import React from "react";
import { Check, ArrowRight } from "lucide-react";
import Button from "../../components/Button";

export default function PasswordResetSuccessPage({ onBackToLogin = () => {} }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#0F2C52]">
        <div className="px-7 pt-8 pb-7 flex flex-col items-center">
          <div className="h-14 w-14 rounded-full bg-[#EEEBFA] flex items-center justify-center">
            <div className="h-9 w-9 rounded-full bg-[#241947] flex items-center justify-center">
              <Check className="h-4.5 w-4.5 text-white" strokeWidth={3} />
            </div>
          </div>

          <h1 className="mt-4 text-lg font-bold text-slate-900 text-center">
            Password Reset Successful
          </h1>
          <p className="mt-2 text-xs text-slate-400 text-center leading-relaxed max-w-[280px]">
            Your password has been securely updated. You can now use your new
            credentials to access your account.
          </p>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            onClick={onBackToLogin}
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}