"use server";

import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import RSVPModel from "@/models/RSVP";
import { RSVPFormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitRSVP(data: {
  name: string;
  rollNumber: string;
  batch: string;
  mobile: string;
  email?: string;
  status: "ATTENDING" | "NOT_ATTENDING";
  notes?: string;
}) {
  const validated = RSVPFormSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  await connectDB();

  const { name, rollNumber, batch, mobile, email, status, notes } = validated.data;

  const student = await StudentModel.findOne({ rollNumber: rollNumber.toUpperCase() });

  const existing = await RSVPModel.findOne({ rollNumber: rollNumber.toUpperCase() });

  if (existing) {
    await RSVPModel.findByIdAndUpdate(existing._id, {
      name,
      batch,
      mobile,
      email,
      status,
      notes,
      studentId: student?._id,
      updatedAt: new Date(),
    });
  } else {
    await RSVPModel.create({
      studentId: student?._id,
      name,
      rollNumber: rollNumber.toUpperCase(),
      batch,
      mobile,
      email,
      status,
      notes,
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
