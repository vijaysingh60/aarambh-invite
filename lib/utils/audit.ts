import { connectDB } from "@/lib/mongodb";
import AuditLog from "@/models/AuditLog";

export async function createAuditLog({
  adminId,
  adminName,
  action,
  entityType,
  entityId,
  metadata,
}: {
  adminId?: string;
  adminName?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    await connectDB();
    await AuditLog.create({ adminId, adminName, action, entityType, entityId, metadata });
  } catch {
    // Non-critical — don't fail the main operation
    console.error("Failed to write audit log");
  }
}
