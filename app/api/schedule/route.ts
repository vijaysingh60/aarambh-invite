import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EventScheduleModel from "@/models/EventSchedule";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { schedule } = await req.json();

  // Delete existing and re-insert
  await EventScheduleModel.deleteMany({});
  if (schedule && schedule.length > 0) {
    await EventScheduleModel.insertMany(
      schedule.map((item: { time: string; title: string; description?: string; sortOrder: number; isActive: boolean }, idx: number) => ({
        time: item.time,
        title: item.title,
        description: item.description,
        sortOrder: item.sortOrder ?? idx + 1,
        isActive: item.isActive ?? true,
      }))
    );
  }

  return NextResponse.json({ success: true });
}
