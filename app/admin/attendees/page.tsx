import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import RSVPModel from "@/models/RSVP";
import AttendeeTable from "@/components/admin/AttendeeTable";

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
  const query: Record<string, unknown> = {};
  if (filters.status) query.status = filters.status;
  if (filters.batch) {
    const b = filters.batch.trim();
    // Accept "25" or "2025" — match first 2 digits of rollNumber
    const twoDigit = b.length === 4 ? b.slice(2) : b;
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

export default async function AttendeesPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const { rsvps, total } = await getRSVPs({
    status: params.status,
    batch: params.batch,
    search: params.search,
    page,
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
            Attendees
          </h1>
          <p className="text-[#9b7b6b] text-sm">{total} total RSVP{total !== 1 ? "s" : ""}</p>
        </div>
        <a
          href="/api/rsvp?export=true"
          className="bg-[#8b1a1a] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6b1010] transition-colors"
        >
          Export CSV
        </a>
      </div>
      <AttendeeTable rsvps={rsvps} total={total} page={page} initialFilters={params} />
    </div>
  );
}
