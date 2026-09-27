"use server";

import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import RSVPModel from "@/models/RSVP";
import { revalidatePath } from "next/cache";
import { deriveBatchFromRoll } from "@/lib/batch";

export async function submitRSVP(data: {
  name?: string;
  rollNumber: string;
  mobile?: string;
  email?: string;
  status: "ATTENDING" | "NOT_ATTENDING";
  notes?: string;
}) {
  const rollNumber = data.rollNumber?.trim().toUpperCase();

  if (!rollNumber || rollNumber.length < 3) {
    return { success: false, error: { rollNumber: ["Roll number is required"] } };
  }

  if (data.status === "ATTENDING") {
    if (!data.mobile || !/^[6-9]\d{9}$/.test(data.mobile)) {
      return { success: false, error: { mobile: ["Please enter a valid 10-digit mobile number"] } };
    }
  }

  await connectDB();

  // Auto-detect batch and name from student record if available
  const student = await StudentModel.findOne({ rollNumber }).lean();
  const resolvedBatch = deriveBatchFromRoll(rollNumber) || (student as { batch?: string } | null)?.batch || "";
  const resolvedName = data.name?.trim() || (student as { name?: string } | null)?.name || "Unknown";

  const existing = await RSVPModel.findOne({ rollNumber });

  if (existing) {
    await RSVPModel.findByIdAndUpdate(existing._id, {
      name: resolvedName,
      batch: resolvedBatch,
      mobile: data.mobile || "",
      email: data.email || "",
      status: data.status,
      notes: data.notes || "",
      studentId: (student as { _id?: unknown } | null)?._id,
      updatedAt: new Date(),
    });
  } else {
    await RSVPModel.create({
      studentId: (student as { _id?: unknown } | null)?._id,
      name: resolvedName,
      rollNumber,
      batch: resolvedBatch,
      mobile: data.mobile || "",
      email: data.email || "",
      status: data.status,
      notes: data.notes || "",
      submittedAt: new Date(),
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/attendees");
  return { success: true };
}

export async function getStudentByRoll(rollNumber: string) {
  await connectDB();
  const student = await StudentModel.findOne(
    { rollNumber: rollNumber.toUpperCase() },
    { name: 1, rollNumber: 1, batch: 1, background: 1 }
  ).lean();

  if (!student) return null;

  const rsvp = await RSVPModel.findOne(
    { rollNumber: rollNumber.toUpperCase() },
    { status: 1 }
  ).lean();

  return {
    ...student,
    _id: (student._id as { toString: () => string }).toString(),
    existingStatus: rsvp ? (rsvp as { status: string }).status : null,
  };
}
