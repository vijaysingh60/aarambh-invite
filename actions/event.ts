"use server";

import { connectDB } from "@/lib/mongodb";
import EventSettingsModel from "@/models/EventSettings";
import EventScheduleModel from "@/models/EventSchedule";
import RSVPModel from "@/models/RSVP";
import { auth } from "@/lib/auth";
import { createAuditLog } from "@/lib/utils/audit";
import { revalidatePath } from "next/cache";

export async function getEventSettings() {
  await connectDB();
  const settings = await EventSettingsModel.findOne().lean();
  if (!settings) return null;
  return JSON.parse(JSON.stringify(settings));
}

export async function updateEventSettings(data: Record<string, unknown>) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  await connectDB();

  const existing = await EventSettingsModel.findOne();
  if (existing) {
    await EventSettingsModel.findByIdAndUpdate(existing._id, data);
  } else {
    await EventSettingsModel.create(data);
  }

  await createAuditLog({
    adminId: (session.user as { id?: string }).id,
    adminName: session.user.name || session.user.email || undefined,
    action: "EVENT_SETTINGS_UPDATED",
    entityType: "EventSettings",
  });

  revalidatePath("/");
  revalidatePath("/event");
  revalidatePath("/admin/settings");
  return { success: true };
}

export async function getEventSchedule() {
  await connectDB();
  const schedule = await EventScheduleModel.find({ isActive: true })
    .sort({ sortOrder: 1 })
    .lean();
  return JSON.parse(JSON.stringify(schedule));
}

export async function checkInAttendee(rsvpId: string) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  await connectDB();

  const rsvp = await RSVPModel.findById(rsvpId);
  if (!rsvp) return { success: false, error: "Not found" };
  if (rsvp.checkedIn) return { success: false, error: "Already checked in" };

  await RSVPModel.findByIdAndUpdate(rsvpId, {
    checkedIn: true,
    checkedInAt: new Date(),
    checkedInBy: session.user.name || session.user.email,
  });

  revalidatePath("/admin/check-in");
  return { success: true };
}

export async function getDashboardStats() {
  await connectDB();

  const [
    totalStudents,
    attending,
    notAttending,
    checkedIn,
    verifiedContributions,
    pendingContributions,
  ] = await Promise.all([
    (await import("@/models/Student")).default.countDocuments(),
    RSVPModel.countDocuments({ status: "ATTENDING" }),
    RSVPModel.countDocuments({ status: "NOT_ATTENDING" }),
    RSVPModel.countDocuments({ checkedIn: true }),
    (await import("@/models/Contribution")).default.countDocuments({ status: "VERIFIED" }),
    (await import("@/models/Contribution")).default.countDocuments({ status: "PENDING" }),
  ]);

  const pending = totalStudents - attending - notAttending;

  return {
    totalStudents,
    attending,
    notAttending,
    pending: Math.max(0, pending),
    verifiedContributions,
    pendingContributions,
    checkedIn,
  };
}

export async function updateRSVPStatus(
  rollNumber: string,
  status: "ATTENDING" | "NOT_ATTENDING" | "PENDING"
) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  await connectDB();
  await RSVPModel.findOneAndUpdate(
    { rollNumber: rollNumber.toUpperCase() },
    { status, updatedAt: new Date() }
  );

  await createAuditLog({
    adminId: (session.user as { id?: string }).id,
    adminName: session.user.name || session.user.email || undefined,
    action: "RSVP_MANUALLY_UPDATED",
    entityType: "RSVP",
    metadata: { rollNumber, status },
  });

  revalidatePath("/admin/attendees");
  return { success: true };
}
