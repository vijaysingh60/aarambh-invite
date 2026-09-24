import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  const { searchParams } = new URL(req.url);
  const batch = searchParams.get("batch");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");

  const query: Record<string, unknown> = {};
  if (batch) query.batch = batch;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { rollNumber: { $regex: search, $options: "i" } },
    ];
  }

  const [students, total] = await Promise.all([
    StudentModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ rollNumber: 1 })
      .lean(),
    StudentModel.countDocuments(query),
  ]);

  return NextResponse.json({ students, total, page, limit });
}
