import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import ContributionModel from "@/models/Contribution";
import ContributionTable from "@/components/admin/ContributionTable";

interface Props {
  searchParams: Promise<{ status?: string; page?: string }>;
}

async function getContributions(filters: { status?: string; page: number }) {
  await connectDB();
  const query: Record<string, unknown> = {};
  if (filters.status) query.status = filters.status;

  const limit = 50;
  const [contributions, total] = await Promise.all([
    ContributionModel.find(query).sort({ createdAt: -1 }).skip((filters.page - 1) * limit).limit(limit).lean(),
    ContributionModel.countDocuments(query),
  ]);

  const verifiedTotal = await ContributionModel.aggregate([
    { $match: { status: "VERIFIED" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return {
    contributions: JSON.parse(JSON.stringify(contributions)),
    total,
    verifiedTotal: verifiedTotal[0]?.total || 0,
  };
}

export default async function ContributionsPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const { contributions, total, verifiedTotal } = await getContributions({ status: params.status, page });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Contributions</h1>
        <p className="text-[#9b7b6b] text-sm">{total} contribution record{total !== 1 ? "s" : ""}</p>
      </div>
      {verifiedTotal > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-800 font-semibold text-sm">
            Verified contributions total: ₹{verifiedTotal.toLocaleString("en-IN")}
          </p>
        </div>
      )}
      <ContributionTable contributions={contributions} total={total} page={page} initialStatus={params.status} />
    </div>
  );
}
