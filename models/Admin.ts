import mongoose, { Schema, Document } from "mongoose";
import { AdminRole } from "@/types";

export interface IAdminDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdminDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["ADMIN", "SUPER_ADMIN"], default: "ADMIN" },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model<IAdminDoc>("Admin", AdminSchema);
