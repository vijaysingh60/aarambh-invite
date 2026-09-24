"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { updateContributionStatus } from "@/actions/contributions";
import { CheckCircle, XCircle, Filter } from "lucide-react";
import type { IContribution } from "@/types";

interface Props {
  contributions: IContribution[];
  total: number;
  page: number;
  initialStatus?: string;
}

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  PENDING: { label: "Pending", classes: "bg-yellow-100 text-yellow-800" },
  VERIFIED: { label: "Verified", classes: "bg-green-100 text-green-800" },
  REJECTED: { label: "Rejected", classes: "bg-red-100 text-red-800" },
};

export default function ContributionTable({ contributions, total, page, initialStatus }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [statusFilter, setStatusFilter] = useState(initialStatus || "");
  const [updating, setUpdating] = useState<string | null>(null);

  async function handleUpdate(id: string, status: "VERIFIED" | "REJECTED") {
    setUpdating(id);
    await updateContributionStatus(id, status);
    setUpdating(null);
    router.refresh();
  }

  return (
    <div>
      <div className="bg-white border border-[#e8d5c5] rounded-xl p-4 mb-4 flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); router.push(`${pathname}?status=${e.target.value}`); }}
          className="px-3 py-2 border border-[#e8d5c5] rounded text-sm bg-white focus:outline-none focus:border-[#8b1a1a]"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fdf6ec] text-[#9b7b6b] text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Roll No.</th>
                <th className="px-4 py-3 text-left">Batch</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0ea]">
              {contributions.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-[#9b7b6b]">No contributions found.</td></tr>
              ) : contributions.map((c) => {
                const statusInfo = STATUS_LABELS[c.status] || { label: c.status, classes: "bg-gray-100 text-gray-800" };
                return (
                  <tr key={c._id} className="hover:bg-[#fdf9f6]">
                    <td className="px-4 py-3 font-medium text-[#1a0a0a]">{c.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#8b1a1a]">{c.rollNumber || "—"}</td>
                    <td className="px-4 py-3 text-[#5c3a2a]">{c.batch ? `MCA ${c.batch}` : "—"}</td>
                    <td className="px-4 py-3 font-medium text-[#1a0a0a]">
                      {c.amount ? `₹${c.amount.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#5c3a2a] max-w-[120px] truncate">{c.transactionId || "—"}</td>
                    <td className="px-4 py-3 text-[#9b7b6b] text-xs">
                      {c.paymentDate ? new Date(c.paymentDate).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusInfo.classes}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {c.status === "PENDING" && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleUpdate(c._id, "VERIFIED")}
                            disabled={updating === c._id}
                            title="Verify"
                            className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-30"
                          >
                            <CheckCircle size={15} />
                          </button>
                          <button
                            onClick={() => handleUpdate(c._id, "REJECTED")}
                            disabled={updating === c._id}
                            title="Reject"
                            className="p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-30"
                          >
                            <XCircle size={15} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
