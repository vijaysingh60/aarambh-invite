import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RSVPModel from "@/models/RSVP";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const batch = searchParams.get("batch");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const exportCsv = searchParams.get("export") === "true";

  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (batch) query.batch = batch;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { rollNumber: { $regex: search, $options: "i" } },
    ];
  }

  if (exportCsv) {
    const rsvps = await RSVPModel.find(query).sort({ submittedAt: -1 }).lean();
    const headers = "Name,Roll Number,Batch,Mobile,Email,Status,Checked In,Submitted At\n";
    const rows = rsvps
      .map(
        (r) =>
          `"${r.name}","${r.rollNumber}","${r.batch}","${r.mobile || ""}","${r.email || ""}","${r.status}","${r.checkedIn ? "Yes" : "No"}","${new Date(r.submittedAt).toLocaleString()}"`
      )
      .join("\n");

    return new NextResponse(headers + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=rsvps.csv",
      },
    });
  }

  const [rsvps, total] = await Promise.all([
    RSVPModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ submittedAt: -1 })
      .lean(),
    RSVPModel.countDocuments(query),
  ]);

  return NextResponse.json({ rsvps, total, page, limit });
}
