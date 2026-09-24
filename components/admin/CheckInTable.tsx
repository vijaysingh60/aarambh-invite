"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkInAttendee } from "@/actions/event";
import { CheckCircle, Search } from "lucide-react";
import type { IRSVP } from "@/types";

interface Props {
  attendees: IRSVP[];
}

export default function CheckInTable({ attendees }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [checking, setChecking] = useState<string | null>(null);

  const filtered = attendees.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCheckIn(id: string) {
    setChecking(id);
    const res = await checkInAttendee(id);
    setChecking(null);
    if (res.success) router.refresh();
    else alert(res.error || "Check-in failed");
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b7b6b]" />
        <input
          type="text"
          placeholder="Search name or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-[#e8d5c5] rounded-xl text-sm bg-white focus:outline-none focus:border-[#8b1a1a] text-base"
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#9b7b6b]">
            {search ? `No attendees matching "${search}"` : "No confirmed attendees yet."}
          </div>
        ) : filtered.map((a) => (
          <div
            key={a._id}
            className={`bg-white border rounded-xl p-4 flex items-center justify-between gap-4 ${a.checkedIn ? "border-green-200 bg-green-50" : "border-[#e8d5c5]"}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${a.checkedIn ? "bg-green-100" : "bg-[#8b1a1a]/10"}`}>
                {a.checkedIn ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : (
                  <span className="text-[#8b1a1a] font-bold text-sm">{a.name[0]}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className={`font-semibold text-sm truncate ${a.checkedIn ? "text-green-800" : "text-[#1a0a0a]"}`}>{a.name}</p>
                <p className="text-xs text-[#9b7b6b] font-mono">{a.rollNumber} · MCA {a.batch}</p>
              </div>
            </div>

            {a.checkedIn ? (
              <div className="text-right shrink-0">
                <p className="text-green-700 font-semibold text-xs">✓ Checked In</p>
                {a.checkedInAt && (
                  <p className="text-green-600 text-xs">{new Date(a.checkedInAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleCheckIn(a._id)}
                disabled={checking === a._id}
                className="shrink-0 bg-[#8b1a1a] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#6b1010] transition-colors disabled:opacity-50 min-w-[90px]"
              >
                {checking === a._id ? "..." : "Check In"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
