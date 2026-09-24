import mongoose, { Schema, Document } from "mongoose";

export interface IStudentDoc extends Document {
  name: string;
  rollNumber: string;
  batch: string;
  background?: string;
  email?: string;
  mobile?: string;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudentDoc>(
  {
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true, uppercase: true },
    batch: { type: String, required: true, trim: true },
    background: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    mobile: { type: String, trim: true },
    profilePhoto: { type: String },
  },
  { timestamps: true }
);

StudentSchema.index({ rollNumber: 1 }, { unique: true });
StudentSchema.index({ batch: 1 });
StudentSchema.index({ name: "text" });

export default mongoose.models.Student ||
  mongoose.model<IStudentDoc>("Student", StudentSchema);
