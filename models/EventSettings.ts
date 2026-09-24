import mongoose, { Schema, Document } from "mongoose";

export interface IEventSettingsDoc extends Document {
  eventName: string;
  university: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  description?: string;
  contacts: Array<{ name: string; phone: string }>;
  contributionReceiver: string;
  contributionBatch: string;
  contributionPhone: string;
  contributionRequired: boolean;
  scisConnectUrl?: string;
  qrCodeUrl?: string;
  updatedAt: Date;
}

const EventSettingsSchema = new Schema<IEventSettingsDoc>(
  {
    eventName: { type: String, required: true },
    university: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String },
    contacts: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
    contributionReceiver: { type: String, required: true },
    contributionBatch: { type: String, required: true },
    contributionPhone: { type: String, required: true },
    contributionRequired: { type: Boolean, default: false },
    scisConnectUrl: { type: String },
    qrCodeUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.EventSettings ||
  mongoose.model<IEventSettingsDoc>("EventSettings", EventSettingsSchema);
