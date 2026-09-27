import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

import mongoose from "mongoose";
import { deriveBatchFromRoll } from "../lib/batch";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

async function backfill() {
  await mongoose.connect(MONGODB_URI);

  const RSVPModel = (await import("../models/RSVP")).default;

  const missing = await RSVPModel.find({ $or: [{ batch: { $exists: false } }, { batch: "" }] });
  console.log(`Found ${missing.length} RSVP(s) with no batch set.`);

  let updated = 0;
  for (const rsvp of missing) {
    const batch = deriveBatchFromRoll(rsvp.rollNumber);
    if (batch) {
      rsvp.batch = batch;
      await rsvp.save();
      updated++;
    }
  }

  console.log(`Backfilled batch for ${updated} RSVP(s).`);
  await mongoose.disconnect();
}

backfill().catch((err) => {
  console.error(err);
  process.exit(1);
});
