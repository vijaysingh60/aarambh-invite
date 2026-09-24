"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";
import Link from "next/link";

interface Student {
  _id: string;
  name: string;
  rollNumber: string;
  background?: string;
  batch: string;
}

interface Props {
  batch: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  students: Student[];
  emptyMessage: string;
}

export default function BatchDirectory({ batch, title, subtitle, badge, description, students, emptyMessage }: Props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "roll">("roll");

  const filtered = students
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.rollNumber.localeCompare(b.rollNumber);
    });

  return (
    <div className="bg-[#faf8f5]">
      {/* Hero */}
      <section className="bg-[#1a0505] py-20 px-4 text-center">
        <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">{badge}</p>
        <h1 className="text-[#fdf6ec] text-5xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
          {title}
        </h1>
        <p className="text-[#c9872a] text-sm tracking-[0.3em] uppercase mb-4">{subtitle}</p>
        <p className="text-[#9b7b6b] text-sm max-w-md mx-auto">{description}</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {students.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="text-[#e8d5c5] mx-auto mb-4" />
            <p className="text-[#9b7b6b] text-lg">{emptyMessage || "No students found."}</p>
            <p className="text-[#9b7b6b] text-sm mt-2">Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b7b6b]" />
                <input
                  type="text"
                  placeholder="Search by name or roll number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-[#e8d5c5] rounded bg-white text-[#1a0a0a] text-sm focus:outline-none focus:border-[#8b1a1a] placeholder:text-[#9b7b6b]"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "name" | "roll")}
                className="px-3 py-2.5 border border-[#e8d5c5] rounded bg-white text-sm text-[#1a0a0a] focus:outline-none focus:border-[#8b1a1a]"
              >
                <option value="roll">Sort by Roll No.</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>

            <p className="text-[#9b7b6b] text-xs mb-4">{filtered.length} student{filtered.length !== 1 ? "s" : ""} found</p>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((student) => (
                <div key={student._id} className="bg-white border border-[#e8d5c5] rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#8b1a1a] font-bold text-sm">
                        {student.name.trim()[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1a0a0a] text-sm truncate">{student.name}</p>
                      <p className="text-[#8b1a1a] text-xs font-mono mt-0.5">{student.rollNumber}</p>
                      {student.background && (
                        <p className="text-[#9b7b6b] text-xs mt-1 truncate">{student.background}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && search && (
              <div className="text-center py-12 text-[#9b7b6b]">
                No students matching &ldquo;{search}&rdquo;
              </div>
            )}
          </>
        )}

        <div className="mt-12 text-center">
          <Link href="/batches" className="text-[#8b1a1a] text-sm hover:underline">
            ← Back to Batches
          </Link>
        </div>
      </div>
    </div>
  );
}
