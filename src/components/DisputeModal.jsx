import React, { useState } from "react";
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from "lucide-react";
import Button from "./Button";

/**
 * DisputeModal
 *
 * Interactive modal to raise a dispute for an order held in escrow.
 *
 * Props:
 * - isOpen: boolean
 * - order: object { id, orderNumber, title, price }
 * - onClose: () => void
 * - onSubmitDispute: (disputeData) => void
 */
export default function DisputeModal({
  isOpen,
  order,
  onClose,
  onSubmitDispute,
}) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !order) return null;

  const disputeReasons = [
    "Item not delivered / Missing package",
    "Damaged or defective part",
    "Incorrect item / Wrong fitment",
    "Counterfeit or not genuine OEM",
    "Seller unresponsive / Other issue",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitDispute) {
        onSubmitDispute({
          orderId: order.id,
          orderNumber: order.orderNumber,
          reason,
          description,
          createdAt: new Date().toISOString(),
        });
      }
      setTimeout(() => {
        setSubmitted(false);
        setReason("");
        setDescription("");
        onClose();
      }, 1400);
    }, 600);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitted(false);
      setReason("");
      setDescription("");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="text-base font-bold text-slate-900">
              Raise a Dispute
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Dispute Submitted</h4>
            <p className="text-sm text-slate-500 mt-1">
              Escrow funds for Order #{order.orderNumber} have been frozen while our resolution team reviews your claim.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            {/* Order Reference Box */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-500">
                  Order Reference
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  #{order.orderNumber} • {order.title}
                </p>
              </div>
              <span className="text-sm font-bold text-[#0F2C52]">
                ₦{Number(order.price).toLocaleString()}
              </span>
            </div>

            {/* Escrow Alert */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 text-xs">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Raising a dispute places a temporary hold on the escrow release.
                Funds will remain secure until resolved.
              </span>
            </div>

            {/* Reason Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Reason for dispute <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-col gap-2">
                {disputeReasons.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                      reason === item
                        ? "border-[#0F2C52] bg-slate-50 text-[#0F2C52]"
                        : "border-slate-200 hover:bg-slate-50/50 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="disputeReason"
                      value={item}
                      checked={reason === item}
                      onChange={(e) => setReason(e.target.value)}
                      className="accent-[#0F2C52] h-4 w-4"
                      required
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional details */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Additional Details (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide any details, photos, or courier tracking observations..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F2C52] focus:border-[#0F2C52] transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white"
                disabled={!reason || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Dispute"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
