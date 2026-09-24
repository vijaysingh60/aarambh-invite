import mongoose, { Schema, Document } from "mongoose";
import { ContributionStatus } from "@/types";

export interface IContributionDoc extends Document {
  studentId?: mongoose.Types.ObjectId;
  name: string;
  rollNumber?: string;
  batch?: string;
  amount?: number;
  transactionId?: string;
  paymentDate?: Date;
  status: ContributionStatus;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContributionSchema = new Schema<IContributionDoc>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student" },
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, trim: true, uppercase: true },
    batch: { type: String, trim: true },
    amount: { type: Number, min: 0 },
    transactionId: { type: String, trim: true },
    paymentDate: { type: Date },
    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
    verifiedBy: { type: String },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

ContributionSchema.index({ rollNumber: 1 });
ContributionSchema.index({ status: 1 });

export default mongoose.models.Contribution ||
  mongoose.model<IContributionDoc>("Contribution", ContributionSchema);
