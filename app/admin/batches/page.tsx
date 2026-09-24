import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import RSVPModel from "@/models/RSVP";
import Link from "next/link";

async function getBatchStats() {
  await connectDB();
  const [s2025, s2026, r2025, r2026] = await Promise.all([
    StudentModel.countDocuments({ batch: "2025" }),
    StudentModel.countDocuments({ batch: "2026" }),
    RSVPModel.aggregate([
      { $match: { batch: "2025" } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    RSVPModel.aggregate([
      { $match: { batch: "2026" } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  const toMap = (arr: { _id: string; count: number }[]) =>
    Object.fromEntries(arr.map((a) => [a._id, a.count]));

  return {
    batch2025: { students: s2025, rsvp: toMap(r2025) },
    batch2026: { students: s2026, rsvp: toMap(r2026) },
  };
}

export default async function BatchesAdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { batch2025, batch2026 } = await getBatchStats();

  const batches = [
    { year: "2025", label: "The Seniors", data: batch2025, importHref: "/admin/students/import" },
    { year: "2026", label: "The Freshers", data: batch2026, importHref: "/admin/students/import" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Batches</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((b) => {
          const attending = b.data.rsvp["ATTENDING"] || 0;
          const notAttending = b.data.rsvp["NOT_ATTENDING"] || 0;
          const pending = b.data.students - attending - notAttending;

          return (
            <div key={b.year} className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden">
              <div className="bg-[#8b1a1a] px-5 py-4">
                <p className="text-[#e8d5c5] text-xs uppercase tracking-wider mb-0.5">Batch {b.year}</p>
                <h2 className="text-white font-bold text-xl" style={{ fontFamily: "Georgia, serif" }}>MCA {b.year}</h2>
                <p className="text-[#e8d5c5] text-sm">{b.label}</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#fdf6ec] rounded-lg p-3 text-center">
                    <p className="text-[#1a0a0a] font-bold text-2xl">{b.data.students}</p>
                    <p className="text-[#9b7b6b] text-xs">Students</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-green-700 font-bold text-2xl">{attending}</p>
                    <p className="text-green-600 text-xs">Attending</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <p className="text-red-700 font-bold text-2xl">{notAttending}</p>
                    <p className="text-red-600 text-xs">Not Attending</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <p className="text-yellow-700 font-bold text-2xl">{Math.max(0, pending)}</p>
                    <p className="text-yellow-600 text-xs">Pending</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/attendees?batch=${b.year}`}
                    className="flex-1 border border-[#e8d5c5] text-[#5c3a2a] py-2 rounded text-xs font-medium text-center hover:bg-[#fdf6ec]"
                  >
                    View RSVPs
                  </Link>
                  <Link
                    href={`/admin/students?batch=${b.year}`}
                    className="flex-1 border border-[#e8d5c5] text-[#5c3a2a] py-2 rounded text-xs font-medium text-center hover:bg-[#fdf6ec]"
                  >
                    View Students
                  </Link>
                  {b.data.students === 0 && (
                    <Link
                      href={b.importHref}
                      className="flex-1 bg-[#8b1a1a] text-white py-2 rounded text-xs font-medium text-center hover:bg-[#6b1010]"
                    >
                      Import CSV
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
