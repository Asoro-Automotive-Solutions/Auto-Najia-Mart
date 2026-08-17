import React from "react";
import { ArrowRight, Users, ShieldCheck, Truck, Settings2 } from "lucide-react";
import Button from "../../components/Button";

const FEATURES = [
  { icon: Users, label: "Verified Sellers" },
  { icon: ShieldCheck, label: "Escrow Safe" },
  { icon: Truck, label: "Nationwide" },
];

export default function OnboardingPage({
  onGetStarted = () => {},
  onLogin = () => {},
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left panel — brand / image */}
        <div className="relative w-full md:w-1/2 min-h-[420px] md:min-h-[560px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=1200&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B2E86]/90 via-[#4B3AA0]/85 to-[#241947]/95" />

          <div className="relative h-full flex flex-col items-center justify-center text-center p-8 md:p-10 text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-xs font-medium tracking-wide">
              <Settings2 className="h-3.5 w-3.5" />
              AUTO-NAIJA MART
            </span>

            <h1 className="mt-6 text-3xl md:text-[32px] leading-tight font-bold">
              The Premier B2B
              <br />
              Automotive
              <br />
              Marketplace
            </h1>

            <p className="mt-4 text-sm text-white/75 leading-relaxed max-w-xs">
              Connect with verified suppliers, secure your transactions with
              Escrow, and experience seamless nationwide logistics.
            </p>

            <div className="mt-10 flex items-center gap-8">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="h-11 w-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] text-white/80 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — copy + actions */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-[28px] leading-snug font-bold text-slate-900">
              Find Auto Parts You
              <br />
              Can Trust
            </h2>

            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Verified Seller, Escrow Protection, Nationwide Delivery. Join
              the professional network today.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={onGetStarted}
              >
                Get Started
              </Button>

              <Button variant="secondary" size="lg" fullWidth onClick={onLogin}>
                Log in
              </Button>
            </div>

            <hr className="mt-8 border-slate-200" />

            <p className="mt-5 text-xs text-slate-400 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#4338CA] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#4338CA] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}