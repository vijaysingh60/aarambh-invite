"use client";

import { useState } from "react";
import { submitRSVP } from "@/actions/rsvp";
import { CheckCircle, XCircle, RotateCcw, Calendar, Clock, MapPin } from "lucide-react";

interface Prefill {
  name: string;
  rollNumber: string;
  batch: "2025" | "2026";
}

interface Props {
  prefill?: Prefill;
}

type Step = "choice" | "form" | "success";
type Choice = "ATTENDING" | "NOT_ATTENDING";

export default function RSVPForm({ prefill }: Props) {
  const [step, setStep] = useState<Step>("choice");
  const [choice, setChoice] = useState<Choice | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Choice | null>(null);

  function selectChoice(c: Choice) {
    setChoice(c);
    setStep("form");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      rollNumber: fd.get("rollNumber") as string,
      batch: fd.get("batch") as "2025" | "2026",
      mobile: fd.get("mobile") as string,
      email: (fd.get("email") as string) || undefined,
      status: choice as Choice,
      notes: (fd.get("notes") as string) || undefined,
    };

    const res = await submitRSVP(data);
    setLoading(false);

    if (res.success) {
      setSubmittedStatus(choice);
      setStep("success");
    } else if (res.error) {
      setErrors(res.error as Record<string, string[]>);
    }
  }

  if (step === "success") {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-[#e8d5c5] rounded-xl p-8 text-center">
          {submittedStatus === "ATTENDING" ? (
            <>
              <div className="text-4xl mb-4">❤️</div>
              <h2 className="text-[#1a0a0a] text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
                You&apos;re on the list!
              </h2>
              <p className="text-[#5c3a2a]">Thank you for confirming your presence at AARAMBH.</p>
            </>
          ) : (
            <>
              <XCircle className="text-[#8b1a1a] mx-auto mb-4" size={40} />
              <h2 className="text-[#1a0a0a] text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
                Thank you for letting us know.
              </h2>
              <p className="text-[#5c3a2a]">We&apos;ll miss you at AARAMBH. Your response has been recorded.</p>
            </>
          )}

          {submittedStatus === "ATTENDING" && (
            <div className="mt-6 bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg p-4 text-left">
              <p className="text-[#8b1a1a] font-semibold text-sm mb-3">AARAMBH — MCA Freshers&apos;26</p>
              <div className="space-y-2 text-sm text-[#5c3a2a]">
                <div className="flex items-center gap-2"><Calendar size={14} className="text-[#8b1a1a]" /> Saturday, 03 October 2026</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-[#8b1a1a]" /> 7:00 PM</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-[#8b1a1a]" /> Amphitheatre, University of Hyderabad</div>
              </div>
            </div>
          )}

          <button
            onClick={() => { setStep("choice"); setChoice(null); setErrors({}); }}
            className="mt-4 flex items-center gap-2 text-[#8b1a1a] text-sm hover:underline mx-auto"
          >
            <RotateCcw size={14} /> Change My Response
          </button>
        </div>
      </div>
    );
  }

  if (step === "choice") {
    return (
      <div className="space-y-4">
        <h2 className="text-center text-[#1a0a0a] font-bold text-xl mb-6" style={{ fontFamily: "Georgia, serif" }}>
          Are you joining us?
        </h2>
        <button
          onClick={() => selectChoice("ATTENDING")}
          className="w-full bg-[#8b1a1a] text-white py-5 rounded-xl font-bold text-lg uppercase tracking-widest hover:bg-[#6b1010] transition-all hover:shadow-lg flex items-center justify-center gap-3"
        >
          <CheckCircle size={22} />
          Yes, I&apos;ll Be There
        </button>
        <button
          onClick={() => selectChoice("NOT_ATTENDING")}
          className="w-full bg-white border-2 border-[#e8d5c5] text-[#5c3a2a] py-5 rounded-xl font-semibold text-base hover:border-[#8b1a1a] hover:text-[#8b1a1a] transition-all flex items-center justify-center gap-3"
        >
          <XCircle size={20} />
          Sorry, I Can&apos;t Make It
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setStep("choice")} className="text-[#8b1a1a] text-sm hover:underline">
          ← Back
        </button>
        <span className="text-[#e8d5c5]">|</span>
        <span className={`text-sm font-semibold ${choice === "ATTENDING" ? "text-green-700" : "text-[#8b1a1a]"}`}>
          {choice === "ATTENDING" ? "✓ Yes, I&apos;ll Be There" : "✗ Sorry, I Can&apos;t Make It"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Full Name *</label>
          <input
            name="name"
            defaultValue={prefill?.name}
            readOnly={!!prefill?.name}
            required
            className={`w-full px-3 py-2.5 border rounded text-sm focus:outline-none focus:border-[#8b1a1a] ${prefill?.name ? "bg-[#fdf6ec] border-[#e8d5c5] text-[#9b7b6b]" : "border-[#e8d5c5] bg-white"}`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Roll Number *</label>
            <input
              name="rollNumber"
              defaultValue={prefill?.rollNumber}
              readOnly={!!prefill?.rollNumber}
              required
              className={`w-full px-3 py-2.5 border rounded text-sm focus:outline-none focus:border-[#8b1a1a] font-mono ${prefill?.rollNumber ? "bg-[#fdf6ec] border-[#e8d5c5] text-[#9b7b6b]" : "border-[#e8d5c5] bg-white"}`}
              placeholder="e.g. 25MCMC34"
            />
            {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber[0]}</p>}
          </div>
          <div>
            <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Batch *</label>
            <select
              name="batch"
              defaultValue={prefill?.batch || ""}
              disabled={!!prefill?.batch}
              required
              className={`w-full px-3 py-2.5 border rounded text-sm focus:outline-none focus:border-[#8b1a1a] ${prefill?.batch ? "bg-[#fdf6ec] border-[#e8d5c5] text-[#9b7b6b]" : "border-[#e8d5c5] bg-white"}`}
            >
              <option value="" disabled>Select batch</option>
              <option value="2025">MCA 2025</option>
              <option value="2026">MCA 2026</option>
            </select>
            {errors.batch && <p className="text-red-500 text-xs mt-1">{errors.batch[0]}</p>}
          </div>
        </div>

        <div>
          <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Mobile Number *</label>
          <input
            name="mobile"
            type="tel"
            required
            className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm bg-white focus:outline-none focus:border-[#8b1a1a]"
            placeholder="10-digit mobile number"
            maxLength={10}
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile[0]}</p>}
        </div>

        <div>
          <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Email <span className="text-[#9b7b6b] font-normal">(optional)</span></label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm bg-white focus:outline-none focus:border-[#8b1a1a]"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-[#1a0a0a] text-sm font-medium mb-1">
            {choice === "ATTENDING" ? "Any message?" : "Reason (optional)"}
            {" "}<span className="text-[#9b7b6b] font-normal">(optional)</span>
          </label>
          <textarea
            name="notes"
            rows={2}
            className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm bg-white focus:outline-none focus:border-[#8b1a1a] resize-none"
            placeholder={choice === "ATTENDING" ? "Looking forward to it!" : "Can't make it because..."}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8b1a1a] text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-[#6b1010] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : choice === "ATTENDING" ? "Confirm My Attendance" : "Submit Response"}
        </button>
      </form>
    </div>
  );
}
