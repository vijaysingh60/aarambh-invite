"use client";

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";

interface Props {
  stats: { attending: number; notAttending: number; pending: number };
  batchData: Array<{ _id: { batch: string; status: string }; count: number }>;
  timeline: Array<{ _id: string; count: number }>;
}

const COLORS = {
  ATTENDING: "#16a34a",
  NOT_ATTENDING: "#dc2626",
  PENDING: "#d97706",
};

export default function DashboardCharts({ stats, batchData, timeline }: Props) {
  // Attendance pie data
  const pieData = [
    { name: "Attending", value: stats.attending, color: COLORS.ATTENDING },
    { name: "Not Attending", value: stats.notAttending, color: COLORS.NOT_ATTENDING },
    { name: "Pending", value: stats.pending, color: COLORS.PENDING },
  ].filter((d) => d.value > 0);

  // Batch breakdown
  const batches = ["2025", "2026"];
  const barData = batches.map((b) => {
    const attending = batchData.find((d) => d._id.batch === b && d._id.status === "ATTENDING")?.count || 0;
    const notAttending = batchData.find((d) => d._id.batch === b && d._id.status === "NOT_ATTENDING")?.count || 0;
    const pending = batchData.find((d) => d._id.batch === b && d._id.status === "PENDING")?.count || 0;
    return { batch: `MCA ${b}`, attending, notAttending, pending };
  });

  // Timeline
  const lineData = timeline.map((t) => ({ date: t._id, RSVPs: t.count }));

  if (pieData.length === 0 && lineData.length === 0) {
    return (
      <div className="bg-white border border-[#e8d5c5] rounded-xl p-8 text-center">
        <p className="text-[#9b7b6b]">No RSVP data yet. Charts will appear once responses come in.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Attendance Pie */}
      {pieData.length > 0 && (
        <div className="bg-white border border-[#e8d5c5] rounded-xl p-6">
          <h3 className="font-semibold text-[#1a0a0a] text-sm mb-4">Attendance Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Batch Breakdown */}
      <div className="bg-white border border-[#e8d5c5] rounded-xl p-6">
        <h3 className="font-semibold text-[#1a0a0a] text-sm mb-4">Attendance by Batch</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
            <XAxis dataKey="batch" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="attending" name="Attending" fill={COLORS.ATTENDING} />
            <Bar dataKey="notAttending" name="Not Attending" fill={COLORS.NOT_ATTENDING} />
            <Bar dataKey="pending" name="Pending" fill={COLORS.PENDING} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RSVP Timeline */}
      {lineData.length > 0 && (
        <div className="bg-white border border-[#e8d5c5] rounded-xl p-6 lg:col-span-2">
          <h3 className="font-semibold text-[#1a0a0a] text-sm mb-4">RSVP Submissions Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="RSVPs" stroke="#8b1a1a" strokeWidth={2} dot={{ fill: "#8b1a1a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
