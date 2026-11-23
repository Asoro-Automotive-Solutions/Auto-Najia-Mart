import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  X,
  Check,
  ChevronRight,
  ZoomIn,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  PauseCircle,
  FileCheck2,
  ExternalLink,
  RotateCcw
} from 'lucide-react'

export default function AdminSellerApproval() {
  const [docStatus, setDocStatus] = useState('Pending Review') // 'Pending Review' | 'Approved' | 'Rejected' | 'On Hold'
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false)
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('Blurred or unreadable document')
  const [rejectionNotes, setRejectionNotes] = useState('')
  const [toastMessage, setToastMessage] = useState(null)

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleApprove = () => {
    setDocStatus('Approved')
    triggerToast('Business Incorporation Certificate marked as Approved')
  }

  const handleConfirmReject = () => {
    setDocStatus('Rejected')
    setIsRejectModalOpen(false)
    triggerToast('Business Incorporation Certificate marked as Rejected')
  }

  const handleHoldReview = () => {
    setDocStatus('On Hold')
    setIsHoldModalOpen(false)
    triggerToast('Review put on hold. Notification sent to compliance team.')
  }

  const handleFinalizeDecision = () => {
    setIsFinalizeModalOpen(false)
    triggerToast(`Decision finalized for TechNova Solutions Ltd. (${docStatus})`)
  }

  const getStatusBadge = () => {
    switch (docStatus) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Approved
          </span>
        )
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Rejected
          </span>
        )
      case 'On Hold':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            On Hold
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ece8fb] text-[#5227d8] border border-[#ded5f8]">
            Pending Review
          </span>
        )
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link
          to="/admin/sellers-management"
          className="hover:text-slate-900 transition-colors"
        >
          Sellers Management
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-[#5227d8]">Verify Seller Documents</span>
      </nav>

      {/* Page Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            TechNova Solutions Ltd.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            Application ID: <span className="font-mono text-slate-600">#APP-2023-8942</span>
          </p>
        </div>

        {/* Action Buttons (Hold Review & Finalize Decision) */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setIsHoldModalOpen(true)}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-colors cursor-pointer"
          >
            Hold Review
          </button>
          <button
            onClick={() => setIsFinalizeModalOpen(true)}
            className="px-5 py-2 bg-[#180880] hover:bg-[#130666] active:bg-[#0f0452] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm shadow-indigo-950/20 transition-all cursor-pointer"
          >
            Finalize Decision
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Document Inspection Card (~70% width = 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-5 sm:p-6 space-y-5">
          {/* Document Header */}
          <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5227d8] flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  Business Incorporation Certificate (CAC)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Uploaded 2 hours ago • PDF • 2.4 MB
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="shrink-0">{getStatusBadge()}</div>
          </div>

          {/* Certificate Document Preview Frame */}
          <div className="relative group rounded-xl overflow-hidden border border-slate-200/90 bg-[#f9f8f6] shadow-inner">
            {/* Visual Styled Certificate of Incorporation matching screenshot */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative p-6 sm:p-10 cursor-pointer select-none bg-gradient-to-br from-[#faf8f4] via-[#f7f3ec] to-[#ece5d8] min-h-[380px] sm:min-h-[460px] flex flex-col justify-between border-[10px] sm:border-[16px] border-[#223348] m-2 sm:m-3 shadow-lg"
            >
              {/* Ornate Inner Double Border */}
              <div className="absolute inset-1.5 sm:inset-2.5 border-2 border-dashed border-[#b89c62]/70 pointer-events-none" />

              {/* Certificate Top Header */}
              <div className="text-center relative z-10 pt-2 sm:pt-4">
                <p className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#34495e] font-bold">
                  The Corporate Affairs Commission
                </p>
                <p className="text-[8px] sm:text-[10px] font-serif uppercase tracking-[0.2em] text-[#7f8c8d] mt-0.5">
                  Federal Republic of Nigeria • Companies and Allied Matters Act
                </p>

                {/* State/Seal Heading */}
                <div className="my-3 sm:my-5 flex items-center justify-center gap-3">
                  <div className="h-[1px] w-12 sm:w-20 bg-[#b89c62]" />
                  <span className="text-[9px] sm:text-xs font-serif font-bold text-[#b89c62] uppercase tracking-widest">
                    OCTOBER 12, 2023
                  </span>
                  <div className="h-[1px] w-12 sm:w-20 bg-[#b89c62]" />
                </div>

                <h3 className="text-lg sm:text-2xl font-serif font-extrabold text-[#1a252f] tracking-wide uppercase">
                  Certificate of Incorporation
                </h3>
              </div>

              {/* Certificate Body Text */}
              <div className="text-center relative z-10 px-4 sm:px-12 my-4 space-y-2">
                <p className="text-[10px] sm:text-xs font-serif italic text-slate-600">
                  This is to certify that
                </p>
                <h4 className="text-base sm:text-xl font-serif font-bold text-[#0f172a] uppercase tracking-wider underline decoration-[#b89c62] decoration-1 underline-offset-4">
                  TechNova Solutions Ltd.
                </h4>
                <p className="text-[9px] sm:text-xs font-serif text-slate-600 max-w-md mx-auto leading-relaxed">
                  is this day incorporated under the Companies and Allied Matters Act 2020 and that the company is Limited by Shares.
                </p>
              </div>

              {/* Certificate Bottom Details with Seals and Signatures */}
              <div className="relative z-10 pt-4 border-t border-[#b89c62]/40 flex items-end justify-between px-2 sm:px-6">
                {/* Left detail: RC & Date */}
                <div className="text-left font-serif text-[9px] sm:text-[11px] text-slate-700 space-y-0.5">
                  <p>
                    <span className="font-semibold text-slate-900">RC Number:</span> RC-98273645
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Given under my hand at Abuja:</span> 12th Oct 2023
                  </p>
                </div>

                {/* Center: Red Stamp / Wax Seal */}
                <div className="relative -mb-2">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-red-700 bg-red-600/10 flex items-center justify-center p-1 shadow-xs">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-red-700/80 text-white flex flex-col items-center justify-center text-[7px] sm:text-[8px] font-bold uppercase tracking-tighter leading-tight shadow-sm text-center">
                      <span>CAC SEAL</span>
                      <span className="text-[6px] opacity-80">VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Right detail: Registrar Signature */}
                <div className="text-center font-serif text-[9px] sm:text-[11px] text-slate-700">
                  <div className="font-serif italic font-semibold text-slate-800 text-xs sm:text-sm border-b border-slate-700 pb-0.5">
                    Hussaini Ishaq Magaji
                  </div>
                  <p className="text-[8px] sm:text-[10px] text-slate-500 mt-0.5">Registrar-General</p>
                </div>
              </div>

              {/* Zoom Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 text-white text-xs font-semibold flex items-center gap-2 shadow-lg backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Click to inspect full resolution
                </span>
              </div>
            </div>
          </div>

          {/* Document Decision Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setIsRejectModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Reject</span>
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={handleApprove}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                docStatus === 'Approved'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#ece8fb] text-[#4d22d2] hover:bg-[#dfd7f8] active:bg-[#d4c9f5]'
              }`}
            >
              <span>{docStatus === 'Approved' ? 'Approved' : 'Approve'}</span>
              <Check className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right Column: Applicant Details Card (~30% width = 4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 space-y-5">
          <h2 className="text-base font-bold text-slate-900">
            Applicant Details
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Field 1: Company Name */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Company Name
              </p>
              <p className="font-semibold text-slate-900 mt-1">
                TechNova Solutions Ltd.
              </p>
            </div>

            {/* Field 2: Registration Number */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Registration Number
              </p>
              <p className="font-semibold text-slate-900 font-mono mt-1">
                RC-98273645
              </p>
            </div>

            {/* Field 3: Contact Email */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Contact Email
              </p>
              <p className="font-semibold text-slate-900 mt-1">
                admin@technova.com
              </p>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Automated Check Status
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  CAC Registry Match
                </span>
                <span className="font-medium text-emerald-600">Verified</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  TIN Tax ID Active
                </span>
                <span className="font-medium text-emerald-600">Valid</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Director ID Verification
                </span>
                <span className="font-medium text-amber-600">Queued</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Certificate Inspection */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Business Incorporation Certificate (High-Resolution Scan)
              </h3>
              <p className="text-xs text-slate-500">
                RC-98273645 • Corporate Affairs Commission • TechNova Solutions Ltd.
              </p>
            </div>

            {/* Enlarged Inspection View */}
            <div className="p-8 sm:p-14 bg-gradient-to-br from-[#faf8f4] to-[#ede5d8] border-[16px] border-[#223348] text-center space-y-6 shadow-xl relative">
              <div className="border-4 border-dashed border-[#b89c62] p-8 space-y-6">
                <p className="text-xs font-serif uppercase tracking-[0.3em] text-[#34495e] font-bold">
                  The Corporate Affairs Commission — Nigeria
                </p>
                <h2 className="text-2xl sm:text-4xl font-serif font-extrabold uppercase text-[#1a252f] tracking-widest">
                  Certificate of Incorporation
                </h2>
                <div className="max-w-xl mx-auto space-y-3 font-serif">
                  <p className="text-sm italic text-slate-600">This is to certify that</p>
                  <p className="text-2xl sm:text-3xl font-bold uppercase text-[#0f172a] underline decoration-[#b89c62] underline-offset-8">
                    TechNova Solutions Ltd.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    is this day incorporated under the Companies and Allied Matters Act 2020 as a private company limited by shares, having satisfied all legal incorporation stipulations.
                  </p>
                </div>
                <div className="pt-8 border-t border-[#b89c62] flex items-center justify-between text-xs font-serif text-slate-700">
                  <div className="text-left">
                    <p className="font-bold">RC Number: RC-98273645</p>
                    <p>Issued: 12th October 2023</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-red-700 text-white font-bold text-[9px] flex items-center justify-center text-center p-2 uppercase">
                    CAC Official Seal
                  </div>
                  <div className="text-right">
                    <p className="italic font-bold">Hussaini Ishaq Magaji</p>
                    <p className="text-[10px] text-slate-500">Registrar-General</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsZoomOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reject Document
                </h3>
                <p className="text-xs text-slate-500">
                  Specify the reason for rejecting this certificate
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <label className="text-xs font-semibold text-slate-700 block">
                Primary Reason
              </label>
              {[
                'Blurred or unreadable document',
                'Registration Number does not match CAC record',
                'Company Name mismatch on document',
                'Expired or incomplete incorporation filing',
                'Official seal or registrar signature missing'
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
                >
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason}
                    checked={rejectionReason === reason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="text-[#180880] focus:ring-[#180880]"
                  />
                  <span>{reason}</span>
                </label>
              ))}

              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Compliance Feedback Notes (Sent to Seller)
                </label>
                <textarea
                  value={rejectionNotes}
                  onChange={(e) => setRejectionNotes(e.target.value)}
                  placeholder="e.g. Please re-upload a clear color scan showing the official stamp and charter number clearly."
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#180880]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finalize Decision Modal */}
      {isFinalizeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#180880] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Finalize Verification Decision
                </h3>
                <p className="text-xs text-slate-500">
                  TechNova Solutions Ltd. (#APP-2023-8942)
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Document Status:</span>
                <span className="font-semibold text-slate-900">{docStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Seller Tier:</span>
                <span className="font-semibold text-slate-900">Verified Dealership</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Automated Notification:</span>
                <span className="text-emerald-600 font-medium">Will email admin@technova.com</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5">
              Confirming this decision will update the seller status in the central registry and publish verification badges to their public storefront.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setIsFinalizeModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Go Back
              </button>
              <button
                onClick={handleFinalizeDecision}
                className="flex-1 py-2.5 bg-[#180880] hover:bg-[#130666] text-white text-xs font-semibold rounded-xl shadow-md"
              >
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hold Review Modal */}
      {isHoldModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <PauseCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Place Review on Hold
                </h3>
                <p className="text-xs text-slate-500">
                  Assign to secondary review or wait for supplementary papers
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              The application will be flagged as <strong>On Hold</strong> and can be resumed at any time from the Seller Approval queue.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setIsHoldModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleHoldReview}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl"
              >
                Confirm Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
