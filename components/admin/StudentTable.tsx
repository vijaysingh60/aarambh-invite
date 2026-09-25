"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { deleteStudent } from "@/actions/students";
import { Trash2, Search, Filter } from "lucide-react";
import type { IStudent } from "@/types";

interface Props {
  students: IStudent[];
  total: number;
  page: number;
  initialFilters: { batch?: string; search?: string };
}

export default function StudentTable({ students, total, page, initialFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialFilters.search || "");
  const [batchFilter, setBatchFilter] = useState(initialFilters.batch || "");
  const [deleting, setDeleting] = useState<string | null>(null);

  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (batchFilter) params.set("batch", batchFilter);
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setDeleting(id);
    await deleteStudent(id);
    setDeleting(null);
    router.refresh();
  }

  return (
    <div>
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
          className="bg-[#8b1a1a] text-white px-4 py-2 rounded text-sm hover:bg-[#6b1010] flex items-center gap-2"
        >
          <Filter size={14} /> Filter
        </button>
      </div>

      <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fdf6ec] text-[#9b7b6b] text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Roll No.</th>
                <th className="px-4 py-3 text-left">Batch</th>
                <th className="px-4 py-3 text-left">Background</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0ea]">
              {students.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-[#9b7b6b]">No students found.</td></tr>
              ) : students.map((s) => (
                <tr key={s._id} className="hover:bg-[#fdf9f6]">
                  <td className="px-4 py-3 font-medium text-[#1a0a0a]">{s.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#8b1a1a]">{s.rollNumber}</td>
                  <td className="px-4 py-3 text-[#5c3a2a]">{s.batch ? `MCA ${s.batch}` : "—"}</td>
                  <td className="px-4 py-3 text-[#9b7b6b] text-xs max-w-[160px] truncate">{s.background || "—"}</td>
                  <td className="px-4 py-3 text-[#5c3a2a]">{s.mobile || <span className="text-[#c8b8a8]">—</span>}</td>
                  <td className="px-4 py-3 text-[#5c3a2a] text-xs">{s.email || <span className="text-[#c8b8a8]">—</span>}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(s._id, s.name)}
                      disabled={deleting === s._id}
                      className="p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-30"
                      title="Delete student"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
