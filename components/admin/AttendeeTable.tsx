"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateRSVPStatus } from "@/actions/event";
import { CheckCircle, XCircle, RotateCcw, Search, Filter } from "lucide-react";
import type { IRSVP } from "@/types";

interface Props {
  rsvps: IRSVP[];
  total: number;
  page: number;
  initialFilters: { status?: string; batch?: string; search?: string };
}

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  ATTENDING: { label: "Attending", classes: "bg-green-100 text-green-800" },
  NOT_ATTENDING: { label: "Not Attending", classes: "bg-red-100 text-red-800" },
  PENDING: { label: "Pending", classes: "bg-yellow-100 text-yellow-800" },
};

export default function AttendeeTable({ rsvps, total, page, initialFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialFilters.search || "");
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || "");
  const [batchFilter, setBatchFilter] = useState(initialFilters.batch || "");
  const [updating, setUpdating] = useState<string | null>(null);

  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (batchFilter) params.set("batch", batchFilter);
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handleStatusChange(rollNumber: string, status: "ATTENDING" | "NOT_ATTENDING" | "PENDING") {
    setUpdating(rollNumber);
    await updateRSVPStatus(rollNumber, status);
    setUpdating(null);
    router.refresh();
  }

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-[#e8d5c5] rounded-xl p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b7b6b]" />
          <input
            type="text"
            placeholder="Search name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="w-full pl-9 pr-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a] bg-white"
        >
          <option value="">All Status</option>
          <option value="ATTENDING">Attending</option>
          <option value="NOT_ATTENDING">Not Attending</option>
          <option value="PENDING">Pending</option>
        </select>
        <input
          type="text"
          placeholder="Filter by batch..."
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a] w-40"
        />
        <button
          onClick={applyFilters}
          className="bg-[#8b1a1a] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6b1010] transition-colors flex items-center gap-2"
        >
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fdf6ec] text-[#9b7b6b] text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Roll No.</th>
                <th className="px-4 py-3 text-left">Batch</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Submitted</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0ea]">
              {rsvps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[#9b7b6b]">
                    No RSVPs found with these filters.
                  </td>
                </tr>
              ) : rsvps.map((rsvp) => {
                const status = STATUS_LABELS[rsvp.status] || { label: rsvp.status, classes: "bg-gray-100 text-gray-800" };
                return (
                  <tr key={rsvp._id} className="hover:bg-[#fdf9f6]">
                    <td className="px-4 py-3 font-medium text-[#1a0a0a]">{rsvp.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#8b1a1a]">{rsvp.rollNumber}</td>
                    <td className="px-4 py-3 text-[#5c3a2a]">{rsvp.batch ? `MCA ${rsvp.batch}` : "—"}</td>
                    <td className="px-4 py-3 text-[#5c3a2a]">
                      {rsvp.mobile ? (
                        <a href={`tel:${rsvp.mobile}`} className="hover:text-[#8b1a1a]">{rsvp.mobile}</a>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.classes}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#9b7b6b] text-xs">
                      {new Date(rsvp.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStatusChange(rsvp.rollNumber, "ATTENDING")}
                          disabled={updating === rsvp.rollNumber || rsvp.status === "ATTENDING"}
                          title="Mark Attending"
                          className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(rsvp.rollNumber, "NOT_ATTENDING")}
                          disabled={updating === rsvp.rollNumber || rsvp.status === "NOT_ATTENDING"}
                          title="Mark Not Attending"
                          className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <XCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(rsvp.rollNumber, "PENDING")}
                          disabled={updating === rsvp.rollNumber || rsvp.status === "PENDING"}
                          title="Reset to Pending"
                          className="p-1 text-[#9b7b6b] hover:bg-gray-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <RotateCcw size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 50 && (
          <div className="px-4 py-3 border-t border-[#f5f0ea] flex items-center justify-between text-sm">
            <span className="text-[#9b7b6b]">Showing {Math.min((page - 1) * 50 + 1, total)}–{Math.min(page * 50, total)} of {total}</span>
            <div className="flex gap-2">
              {page > 1 && (
                <button onClick={() => router.push(`${pathname}?page=${page - 1}`)} className="px-3 py-1 border border-[#e8d5c5] rounded text-xs hover:bg-[#fdf6ec]">Prev</button>
              )}
              {page * 50 < total && (
                <button onClick={() => router.push(`${pathname}?page=${page + 1}`)} className="px-3 py-1 border border-[#e8d5c5] rounded text-xs hover:bg-[#fdf6ec]">Next</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
