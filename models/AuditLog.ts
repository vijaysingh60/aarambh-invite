import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLogDoc extends Document {
  adminId?: string;
  adminName?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLogDoc>(
  {
    adminId: { type: String },
    adminName: { type: String },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ entityType: 1 });

export default mongoose.models.AuditLog ||
  mongoose.model<IAuditLogDoc>("AuditLog", AuditLogSchema);
