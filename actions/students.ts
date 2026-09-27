"use server";

import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import { StudentImportSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { auth, isViewer } from "@/lib/auth";
import { createAuditLog } from "@/lib/utils/audit";
import { z } from "zod";

export async function importStudents(records: unknown[]) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };
  if (isViewer((session.user as { role?: string }).role)) return { success: false, error: "Unauthorized" };

  await connectDB();

  const results = { imported: 0, updated: 0, failed: 0, errors: [] as string[] };

  for (const record of records) {
    const validated = StudentImportSchema.safeParse(record);
    if (!validated.success) {
      results.failed++;
      results.errors.push(`Invalid row: ${JSON.stringify(record)}`);
      continue;
    }

    try {
      const { rollNumber, ...rest } = validated.data;
      const existing = await StudentModel.findOne({ rollNumber: rollNumber.toUpperCase() });
      if (existing) {
        await StudentModel.findByIdAndUpdate(existing._id, { ...rest });
        results.updated++;
      } else {
        await StudentModel.create({ rollNumber: rollNumber.toUpperCase(), ...rest });
        results.imported++;
      }
    } catch {
      results.failed++;
      results.errors.push(`Error saving: ${(record as { rollNumber?: string }).rollNumber}`);
    }
  }

  await createAuditLog({
    adminId: (session.user as { id?: string }).id,
    adminName: session.user.name || session.user.email || undefined,
    action: "CSV_IMPORT",
    entityType: "Student",
    metadata: results,
  });

  revalidatePath("/admin/students");
  return { success: true, results };
}

export async function deleteStudent(id: string) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };
  if (isViewer((session.user as { role?: string }).role)) return { success: false, error: "Unauthorized" };

  await connectDB();
  await StudentModel.findByIdAndDelete(id);

  await createAuditLog({
    adminId: (session.user as { id?: string }).id,
    adminName: session.user.name || session.user.email || undefined,
    action: "STUDENT_DELETED",
    entityType: "Student",
    entityId: id,
  });

  revalidatePath("/admin/students");
  return { success: true };
}

export async function updateStudent(id: string, data: z.infer<typeof StudentImportSchema>) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };
  if (isViewer((session.user as { role?: string }).role)) return { success: false, error: "Unauthorized" };

  const validated = StudentImportSchema.safeParse(data);
  if (!validated.success) return { success: false, error: "Invalid data" };

  await connectDB();
  await StudentModel.findByIdAndUpdate(id, validated.data);

  revalidatePath("/admin/students");
  return { success: true };
}
