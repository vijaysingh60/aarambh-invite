"use client";

import { useState } from "react";
import { submitContribution } from "@/actions/contributions";
import { CheckCircle } from "lucide-react";

export default function ContributeForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      rollNumber: fd.get("rollNumber") as string || undefined,
      amount: fd.get("amount") ? Number(fd.get("amount")) : undefined,
      transactionId: fd.get("transactionId") as string,
      paymentDate: fd.get("paymentDate") as string,
    };

    const res = await submitContribution(data);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
    } else if (res.error) {
      setErrors(res.error as Record<string, string[]>);
    }
  }

  if (success) {
    return (
      <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg p-8 text-center">
        <CheckCircle className="text-green-600 mx-auto mb-3" size={40} />
        <h3 className="text-[#1a0a0a] font-bold text-lg mb-2">Thank you!</h3>
        <p className="text-[#9b7b6b] text-sm">
          Your contribution has been recorded and is pending verification by the admin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Full Name *</label>
        <input name="name" required className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Your full name" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
      </div>

      <div>
        <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Roll Number</label>
        <input name="rollNumber" className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="e.g. 25MCMC34" />
      </div>

      <div>
        <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Amount (₹)</label>
        <input name="amount" type="number" min="1" className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Amount paid" />
      </div>

      <div>
        <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Transaction ID / UTR *</label>
        <input name="transactionId" required className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Transaction ID or UTR number" />
        {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId[0]}</p>}
      </div>

      <div>
        <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Payment Date *</label>
        <input name="paymentDate" type="date" required className="w-full px-3 py-2.5 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" />
        {errors.paymentDate && <p className="text-red-500 text-xs mt-1">{errors.paymentDate[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8b1a1a] text-white py-3 rounded font-semibold text-sm uppercase tracking-widest hover:bg-[#6b1010] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Contribution Record"}
      </button>

      <p className="text-[#9b7b6b] text-xs text-center">
        Submitting a transaction ID does NOT automatically verify the payment.
        An admin will verify your contribution.
      </p>
    </form>
  );
}
