import React, { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button";

const CODE_LENGTH = 6;

export default function VerificationCodePage({
  email = "user@email.com",
  onBack = () => {},
  onResend = () => {},
  onSubmit = () => {},
}) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  };

  const handleChange = (index, value) => {
    // Only keep the last typed character, digits only
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

  const handleSubmit = () => {
    if (isComplete) onSubmit(code);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-center px-5 py-4 border-b border-slate-100">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-5 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-sm font-semibold text-slate-900">
            Verification Code
          </h1>
        </div>

        {/* Body */}
        <div className="px-6 pt-6 pb-6 flex flex-col items-center">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Enter your 6-digits pin sent to
            <br />
            {email}
          </p>

          <div className="mt-5 flex items-center gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                placeholder="-"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={[
                  "h-11 w-11 text-center rounded-lg text-sm font-medium",
                  "bg-[#F4F1FC] placeholder:text-[#B9AEE8] text-slate-800",
                  "border focus:outline-none transition-colors",
                  digit
                    ? "border-[#241947] ring-1 ring-[#241947]"
                    : "border-[#E4DDF7] focus:border-[#241947] focus:ring-1 focus:ring-[#241947]",
                ].join(" ")}
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-400">
            You didn't get the code?{" "}
            <button
              onClick={onResend}
              className="text-[#4338CA] font-medium hover:underline"
            >
              Resend
            </button>
          </p>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-6"
            disabled={!isComplete}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}