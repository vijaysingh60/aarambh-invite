import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDashboardStats } from "@/actions/event";
import { connectDB } from "@/lib/mongodb";
import RSVPModel from "@/models/RSVP";
import DashboardCharts from "@/components/admin/DashboardCharts";
import Link from "next/link";
import { Users, UserCheck, UserX, Clock, Wallet, CheckSquare, BarChart3 } from "lucide-react";

async function getAttendanceByBatch() {
  await connectDB();
  const data = await RSVPModel.aggregate([
    { $group: { _id: { batch: "$batch", status: "$status" }, count: { $sum: 1 } } },
  ]);
  return data;
}

async function getRSVPTimeline() {
  await connectDB();
  const data = await RSVPModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $limit: 30 },
  ]);
  return data;
}

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [stats, batchData, timeline] = await Promise.all([
    getDashboardStats(),
    getAttendanceByBatch(),
    getRSVPTimeline(),
  ]);

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: <Users size={20} />, href: "/admin/students", color: "text-[#8b1a1a]" },
    { label: "Attending", value: stats.attending, icon: <UserCheck size={20} />, href: "/admin/attendees?status=ATTENDING", color: "text-green-700" },
    { label: "Not Attending", value: stats.notAttending, icon: <UserX size={20} />, href: "/admin/attendees?status=NOT_ATTENDING", color: "text-red-700" },
    { label: "Pending", value: stats.pending, icon: <Clock size={20} />, href: "/admin/attendees?status=PENDING", color: "text-orange-600" },
    { label: "Verified Contributions", value: stats.verifiedContributions, icon: <Wallet size={20} />, href: "/admin/contributions?status=VERIFIED", color: "text-emerald-700" },
    { label: "Pending Contributions", value: stats.pendingContributions, icon: <Wallet size={20} />, href: "/admin/contributions?status=PENDING", color: "text-amber-600" },
    { label: "Checked In", value: stats.checkedIn, icon: <CheckSquare size={20} />, href: "/admin/check-in", color: "text-blue-700" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
          Dashboard
        </h1>
        <p className="text-[#9b7b6b] text-sm mt-1">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-[#e8d5c5] rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className={`${card.color} mb-2`}>{card.icon}</div>
            <p className="text-[#1a0a0a] font-bold text-2xl">{card.value}</p>
            <p className="text-[#9b7b6b] text-xs mt-0.5">{card.label}</p>
          </Link>
        ))}
        <div className="bg-white border border-[#e8d5c5] rounded-xl p-5">
          <div className="text-[#8b1a1a] mb-2"><BarChart3 size={20} /></div>
          <p className="text-[#1a0a0a] font-bold text-2xl">
            {stats.totalStudents ? Math.round((stats.attending / stats.totalStudents) * 100) : 0}%
          </p>
          <p className="text-[#9b7b6b] text-xs mt-0.5">Response Rate</p>
        </div>
      </div>

      {/* Charts */}
      <DashboardCharts
        stats={stats}
        batchData={JSON.parse(JSON.stringify(batchData))}
        timeline={JSON.parse(JSON.stringify(timeline))}
      />

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/attendees" className="bg-[#8b1a1a] text-white rounded-xl p-5 hover:bg-[#6b1010] transition-colors">
          <p className="font-semibold text-sm">View All Attendees</p>
          <p className="text-[#e8d5c5] text-xs mt-1">See RSVP status for everyone</p>
        </Link>
        <Link href="/admin/students/import" className="bg-white border border-[#e8d5c5] rounded-xl p-5 hover:shadow-md transition-shadow">
          <p className="text-[#1a0a0a] font-semibold text-sm">Import Students</p>
          <p className="text-[#9b7b6b] text-xs mt-1">Upload CSV for 2026 batch</p>
        </Link>
        <Link href="/admin/check-in" className="bg-[#1a0505] text-white rounded-xl p-5 hover:bg-[#2a0808] transition-colors">
          <p className="font-semibold text-sm">Event Day Check-In</p>
          <p className="text-[#9b7b6b] text-xs mt-1">Check in attendees on event day</p>
        </Link>
      </div>
    </div>
  );
}
