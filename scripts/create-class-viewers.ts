import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

const PASSWORD = "passwd@123";
const START = 1;
const END = 41;
const PREFIX = "25MCMC";

async function run() {
  await mongoose.connect(MONGODB_URI);

  const AdminModel = (await import("../models/Admin")).default;
  const StudentModel = (await import("../models/Student")).default;

  const hashed = await bcrypt.hash(PASSWORD, 12);

  let created = 0;
  let updated = 0;

  for (let i = START; i <= END; i++) {
    const rollNumber = `${PREFIX}${String(i).padStart(2, "0")}`;
    const email = rollNumber.toLowerCase();

    const student = await StudentModel.findOne({ rollNumber }).lean() as { name?: string } | null;
    const name = student?.name || rollNumber;

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      existing.name = name;
      existing.password = hashed;
      existing.role = "VIEWER";
      await existing.save();
      updated++;
      console.log(`Updated: ${rollNumber} (${name})`);
    } else {
      await AdminModel.create({
        name,
        email,
        password: hashed,
        role: "VIEWER",
      });
      created++;
      console.log(`Created: ${rollNumber} (${name})`);
    }
  }

  console.log(`\nDone. Created ${created}, updated ${updated}. Password for all: ${PASSWORD}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
