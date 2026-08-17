import React, { useRef, useState } from "react";
import { MailCheck, ArrowLeft } from "lucide-react";
import Button from "../../components/Button";

const CODE_LENGTH = 5;

export default function CheckYourEmailPage({
  email = "contact@d...io",
  onResend = () => {},
  onBackToLogin = () => {},
  onSubmit = () => {},
}) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  };

  const handleChange = (index, value) => {
    const char = value.replace(/[^0-9]/g, "").slice(-1);

    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });

    if (char && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    e.preventDefault();

    const next = Array(CODE_LENGTH).fill("");
    pasted
      .slice(0, CODE_LENGTH)
      .split("")
      .forEach((char, i) => (next[i] = char));
    setDigits(next);

    const nextEmptyIndex = next.findIndex((d) => !d);
    focusInput(nextEmptyIndex === -1 ? CODE_LENGTH - 1 : nextEmptyIndex);
  };

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComplete) onSubmit(code);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border-t-2 border-dashed border-[#4338CA]">
        <form onSubmit={handleSubmit} className="px-7 pt-8 pb-7 flex flex-col items-center">
          <div className="h-14 w-14 rounded-full bg-[#F1EEFB] flex items-center justify-center">
            <MailCheck className="h-6 w-6 text-[#241947]" />
          </div>

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Check your email
          </h1>
          <p className="mt-2 text-xs text-slate-400 text-center leading-relaxed max-w-[280px]">
            We sent a reset link to{" "}
            <span className="font-semibold text-slate-600">{email}</span>.
            Enter 5 digit code that mentioned in the email.
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={[
                  "h-12 w-11 text-center rounded-lg text-sm font-medium",
                  "bg-white text-slate-800",
                  "border focus:outline-none transition-colors",
                  digit
                    ? "border-[#241947] ring-1 ring-[#241947]"
                    : "border-slate-200 focus:border-[#4338CA] focus:ring-1 focus:ring-[#4338CA]",
                ].join(" ")}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6 rounded-full"
            disabled={!isComplete}
          >
            Verify Code
          </Button>

          <p className="mt-4 text-xs text-slate-500">
            Haven't got the email yet?{" "}
            <button
              type="button"
              onClick={onResend}
              className="text-[#4338CA] font-semibold hover:underline"
            >
              Resend email
            </button>
          </p>

          <button
            type="button"
            onClick={onBackToLogin}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to log in
          </button>
        </form>
      </div>
    </div>
  );
}