"use server";

import { connectDB } from "@/lib/mongodb";
import ContributionModel from "@/models/Contribution";
import StudentModel from "@/models/Student";
import { ContributionFormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { createAuditLog } from "@/lib/utils/audit";

export async function submitContribution(data: {
  name: string;
  rollNumber?: string;
  batch?: string;
  amount?: number;
  transactionId: string;
  paymentDate: string;
}) {
  const validated = ContributionFormSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  await connectDB();

  const student = data.rollNumber
    ? await StudentModel.findOne({ rollNumber: data.rollNumber.toUpperCase() })
    : null;

  await ContributionModel.create({
    ...validated.data,
    studentId: student?._id,
    status: "PENDING",
  });

  revalidatePath("/admin/contributions");
  return { success: true };
}

export async function updateContributionStatus(
  id: string,
  status: "VERIFIED" | "REJECTED"
) {
  const session = await auth();
  if (!session?.user) return { success: false, error: "Unauthorized" };

  await connectDB();

  await ContributionModel.findByIdAndUpdate(id, {
    status,
    verifiedBy: session.user.name || session.user.email,
    verifiedAt: status === "VERIFIED" ? new Date() : undefined,
  });

  await createAuditLog({
    adminId: (session.user as { id?: string }).id,
    adminName: session.user.name || session.user.email || undefined,
    action: status === "VERIFIED" ? "CONTRIBUTION_VERIFIED" : "CONTRIBUTION_REJECTED",
    entityType: "Contribution",
    entityId: id,
  });

  revalidatePath("/admin/contributions");
  return { success: true };
}
