import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

const [,, name, email, password, role] = process.argv;

if (!name || !email || !password) {
  console.error("Usage: npx ts-node scripts/create-admin.ts <name> <email> <password> [ADMIN|SUPER_ADMIN]");
  process.exit(1);
}

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);

  const AdminModel = (await import("../models/Admin")).default;

  const existing = await AdminModel.findOne({ email });
  if (existing) {
    console.error(`Admin with email ${email} already exists`);
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 12);
  await AdminModel.create({
    name,
    email,
    password: hashed,
    role: (role as "ADMIN" | "SUPER_ADMIN") || "ADMIN",
  });

  console.log(`Admin created: ${name} <${email}> [${role || "ADMIN"}]`);
  await mongoose.disconnect();
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
