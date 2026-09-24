import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import RSVPModel from "@/models/RSVP";
import CheckInTable from "@/components/admin/CheckInTable";

async function getAttendees() {
  await connectDB();
  const [attendees, checkedInCount, totalAttending] = await Promise.all([
    RSVPModel.find({ status: "ATTENDING" }).sort({ batch: 1, name: 1 }).lean(),
    RSVPModel.countDocuments({ status: "ATTENDING", checkedIn: true }),
    RSVPModel.countDocuments({ status: "ATTENDING" }),
  ]);
  return { attendees: JSON.parse(JSON.stringify(attendees)), checkedInCount, totalAttending };
}

export default async function CheckInPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { attendees, checkedInCount, totalAttending } = await getAttendees();
  const remaining = totalAttending - checkedInCount;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Event Day Check-In</h1>
        <p className="text-[#9b7b6b] text-sm">Saturday, 03 October 2026 · Amphitheatre</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[#e8d5c5] rounded-xl p-4 text-center">
          <p className="text-[#1a0a0a] font-bold text-3xl">{totalAttending}</p>
          <p className="text-[#9b7b6b] text-xs mt-1">Expected</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-700 font-bold text-3xl">{checkedInCount}</p>
          <p className="text-green-600 text-xs mt-1">Checked In</p>
        </div>
        <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-xl p-4 text-center">
          <p className="text-[#8b1a1a] font-bold text-3xl">{remaining}</p>
          <p className="text-[#9b7b6b] text-xs mt-1">Remaining</p>
        </div>
      </div>

      <CheckInTable attendees={attendees} />
    </div>
  );
}
