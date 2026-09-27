import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import RSVPModel from "@/models/RSVP";
import AttendeeTable from "@/components/admin/AttendeeTable";
import BatchCards from "@/components/admin/BatchCards";
import { getPendingList, batchRegexFragment } from "@/lib/pending";

interface Props {
  searchParams: Promise<{
    status?: string;
    batch?: string;
    search?: string;
    page?: string;
  }>;
}

async function getRSVPs(filters: { status?: string; batch?: string; search?: string; page: number }) {
  await connectDB();

  // "Pending" has no real meaning in the RSVP collection — most non-responders
  // never submit a form at all, so there's no RSVP document for them. Build
  // that list from the Student roster instead (students with no RSVP record),
  // merged with any RSVP explicitly reset to PENDING by an admin.
  if (filters.status === "PENDING") {
    const merged = await getPendingList(filters);
    const limit = 50;
    const start = (filters.page - 1) * limit;
    return { rsvps: merged.slice(start, start + limit), total: merged.length };
  }

  const query: Record<string, unknown> = {};
  if (filters.status) query.status = filters.status;
  const twoDigit = batchRegexFragment(filters.batch);
  if (twoDigit) {
    query.rollNumber = { $regex: `^${twoDigit}`, $options: "i" };
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { rollNumber: { $regex: filters.search, $options: "i" } },
    ];
  }

  const limit = 50;
  const skip = (filters.page - 1) * limit;

  const [rsvps, total] = await Promise.all([
    RSVPModel.find(query).sort({ submittedAt: -1 }).skip(skip).limit(limit).lean(),
    RSVPModel.countDocuments(query),
  ]);

  return { rsvps: JSON.parse(JSON.stringify(rsvps)), total };
}

async function getBatchCounts() {
  await connectDB();
  const results = await RSVPModel.aggregate([
    {
      $group: {
        _id: { $substrCP: [{ $toUpper: "$rollNumber" }, 0, 2] },
        total: { $sum: 1 },
        attending: { $sum: { $cond: [{ $eq: ["$status", "ATTENDING"] }, 1, 0] } },
      },
    },
    { $match: { _id: { $regex: /^\d{2}$/ } } },
    { $sort: { _id: 1 } },
  ]);
  return results.map((r) => ({
    code: r._id as string,
    year: `20${r._id}`,
    total: r.total as number,
    attending: r.attending as number,
  }));
}

export default async function AttendeesPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  const role = (session.user as { role?: string }).role;
  const readOnly = role === "VIEWER";

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const [{ rsvps, total }, batchCounts] = await Promise.all([
    getRSVPs({
      status: params.status,
      batch: params.batch,
      search: params.search,
      page,
    }),
    getBatchCounts(),
  ]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
            Attendees
          </h1>
          <p className="text-[#9b7b6b] text-sm">
            {params.status === "PENDING"
              ? `${total} not yet responded`
              : `${total} total RSVP${total !== 1 ? "s" : ""}`}
          </p>
        </div>
        <a
          href="/api/rsvp?export=true"
          className="bg-[#8b1a1a] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6b1010] transition-colors"
        >
          Export CSV
        </a>
      </div>
      <BatchCards batches={batchCounts} activeBatch={params.batch} />
      <AttendeeTable rsvps={rsvps} total={total} page={page} initialFilters={params} readOnly={readOnly} />
    </div>
  );
}
