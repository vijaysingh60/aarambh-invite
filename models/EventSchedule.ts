import mongoose, { Schema, Document } from "mongoose";

export interface IEventScheduleDoc extends Document {
  time: string;
  title: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
}

const EventScheduleSchema = new Schema<IEventScheduleDoc>(
  {
    time: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventScheduleSchema.index({ sortOrder: 1 });

export default mongoose.models.EventSchedule ||
  mongoose.model<IEventScheduleDoc>("EventSchedule", EventScheduleSchema);
