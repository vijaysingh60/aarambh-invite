import mongoose, { Schema, Document } from "mongoose";
import { RSVPStatus } from "@/types";

export interface IRSVPDoc extends Document {
  studentId?: mongoose.Types.ObjectId;
  name: string;
  rollNumber: string;
  batch?: string;
  mobile?: string;
  email?: string;
  status: RSVPStatus;
  notes?: string;
  checkedIn: boolean;
  checkedInAt?: Date;
  checkedInBy?: string;
  submittedAt: Date;
  updatedAt: Date;
}

const RSVPSchema = new Schema<IRSVPDoc>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student" },
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true, uppercase: true },
    batch: { type: String, default: "" },
    mobile: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    status: {
      type: String,
      enum: ["PENDING", "ATTENDING", "NOT_ATTENDING"],
      default: "PENDING",
    },
    notes: { type: String },
    checkedIn: { type: Boolean, default: false },
    checkedInAt: { type: Date },
    checkedInBy: { type: String },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

RSVPSchema.index({ rollNumber: 1 }, { unique: true });
RSVPSchema.index({ studentId: 1 }, { unique: true, sparse: true });
RSVPSchema.index({ status: 1 });
RSVPSchema.index({ batch: 1 });

export default mongoose.models.RSVP || mongoose.model<IRSVPDoc>("RSVP", RSVPSchema);
