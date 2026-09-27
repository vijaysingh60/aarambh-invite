import { connectDB } from "@/lib/mongodb";
import RSVPModel from "@/models/RSVP";
import StudentModel from "@/models/Student";
import { deriveBatchFromRoll } from "@/lib/batch";
import type { IRSVP } from "@/types";

export function batchRegexFragment(batch?: string): string | null {
  if (!batch) return null;
  const b = batch.trim();
  // Accept "25" or "2025" — match first 2 digits of rollNumber
  return b.length === 4 ? b.slice(2) : b;
}

/**
 * "Pending" has no real meaning in the RSVP collection — most non-responders
 * never submit a form at all, so there's no RSVP document for them. This
 * builds that list from the Student roster (students with no RSVP record),
 * merged with any RSVP an admin explicitly reset to PENDING.
 */
export async function getPendingList(filters: { batch?: string; search?: string } = {}): Promise<IRSVP[]> {
  await connectDB();

  const twoDigit = batchRegexFragment(filters.batch);
  const searchOr = filters.search
    ? [
        { name: { $regex: filters.search, $options: "i" } },
        { rollNumber: { $regex: filters.search, $options: "i" } },
      ]
    : undefined;

  const respondedRolls = await RSVPModel.distinct("rollNumber");

  const studentQuery: Record<string, unknown> = {
    rollNumber: {
      $nin: respondedRolls,
      ...(twoDigit ? { $regex: `^${twoDigit}`, $options: "i" } : {}),
    },
  };
  if (searchOr) studentQuery.$or = searchOr;

  const explicitQuery: Record<string, unknown> = { status: "PENDING" };
  if (twoDigit) explicitQuery.rollNumber = { $regex: `^${twoDigit}`, $options: "i" };
  if (searchOr) explicitQuery.$or = searchOr;

  const [nonResponders, explicitPending] = await Promise.all([
    StudentModel.find(studentQuery).lean(),
    RSVPModel.find(explicitQuery).lean(),
  ]);

  return [
    ...explicitPending.map((r) => ({
      _id: String(r._id),
      studentId: r.studentId ? String(r.studentId) : undefined,
      name: r.name,
      rollNumber: r.rollNumber,
      batch: r.batch || deriveBatchFromRoll(r.rollNumber),
      mobile: r.mobile || "",
      email: r.email || "",
      status: "PENDING" as const,
      submittedAt: "",
      updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : "",
    })),
    ...nonResponders.map((s) => ({
      _id: `student-${String(s._id)}`,
      studentId: String(s._id),
      name: s.name,
      rollNumber: s.rollNumber,
      batch: s.batch || deriveBatchFromRoll(s.rollNumber),
      mobile: s.mobile || "",
      email: s.email || "",
      status: "PENDING" as const,
      submittedAt: "",
      updatedAt: "",
    })),
  ].sort((a, b) => a.name.localeCompare(b.name));
}
