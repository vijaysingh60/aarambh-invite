import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

const students2025 = [
  { rollNumber: "25MCMC01", name: "K.S. Shreeya", batch: "2025", background: "B.Sc. Mathematics" },
  { rollNumber: "25MCMC02", name: "Anjali Kumari Shaw", batch: "2025", background: "B.Sc. Mathematics" },
  { rollNumber: "25MCMC03", name: "Gajara Anjali Rameshbhai", batch: "2025", background: "B.Sc. Mathematics" },
  { rollNumber: "25MCMC04", name: "Saurabh Shrivastav", batch: "2025", background: "B.Sc. Physics" },
  { rollNumber: "25MCMC05", name: "Pratibha Yadav", batch: "2025", background: "BSc Computer Science & Mathematics" },
  { rollNumber: "25MCMC06", name: "Sowden Ramu", batch: "2025", background: "BSc Mathematics" },
  { rollNumber: "25MCMC07", name: "Arjun Dhakad", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC08", name: "Dasari Vinayaka Vijay", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC09", name: "Vijay Singh Parihar", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC10", name: "Khushuboo Kumari", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC12", name: "Rohit Kumar", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC13", name: "Archana Kumari", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC14", name: "Loudiya Vikas", batch: "2025", background: "B.Sc." },
  { rollNumber: "25MCMC15", name: "Harsh Raj", batch: "2025", background: "B.Sc. Mathematics" },
  { rollNumber: "25MCMC16", name: "Aryan Seth", batch: "2025", background: "B.Sc. Mathematics" },
  { rollNumber: "25MCMC18", name: "Vaibhav Ranjan Singh", batch: "2025", background: "B.Sc. Mathematics" },
  { rollNumber: "25MCMC19", name: "S. Rajanikanth", batch: "2025", background: "B.Sc." },
  { rollNumber: "25MCMC20", name: "Aman Kumar", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC21", name: "Daksh Dua", batch: "2025", background: "B.C.A." },
  { rollNumber: "25MCMC23", name: "Sudhir Varma", batch: "2025", background: "B.Sc. Computer Science, Mathematics & Statistics" },
  { rollNumber: "25MCMC24", name: "B. Rikheet Kumar", batch: "2025", background: "B.Sc. Computer Science" },
  { rollNumber: "25MCMC26", name: "Vibhishan Kumar", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC27", name: "Rishabh Omar", batch: "2025", background: "B.Sc." },
  { rollNumber: "25MCMC28", name: "Sahil Kumar", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC29", name: "Adarsh Kumar Pandey", batch: "2025", background: "B.Sc. CS (Cyber Security)" },
  { rollNumber: "25MCMC30", name: "Akshay Guru", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC31", name: "Ashish", batch: "2025", background: "BSc Physical Sciences" },
  { rollNumber: "25MCMC33", name: "Suyash Singh", batch: "2025", background: "BSC Mathematics" },
  { rollNumber: "25MCMC34", name: "Kumar Shivam", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC35", name: "Garv Agrawal", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC36", name: "Satyabrata Rath", batch: "2025", background: "B.Sc. Chemistry" },
  { rollNumber: "25MCMC37", name: "Aman Chaudhary", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC38", name: "Lokesh Baraskar", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC39", name: "Ajit Tiwari", batch: "2025", background: "BCA" },
  { rollNumber: "25MCMC40", name: "Aditi Mitra", batch: "2025", background: "BSc Computer Science" },
  { rollNumber: "25MCMC41", name: "Sandeep Vishnoi", batch: "2025", background: "BCA" },
];

const eventSettings = {
  eventName: "AARAMBH — MCA FRESHERS'26 WITH OUR ALUMNI",
  university: "University of Hyderabad",
  date: "03 October 2026",
  day: "Saturday",
  time: "7:00 PM",
  venue: "Amphitheatre",
  contacts: [
    { name: "Shivam", phone: "9570068163" },
    { name: "Sahil", phone: "7814913269" },
    { name: "Aman", phone: "7983878932" },
  ],
  contributionReceiver: "Kumar Shivam",
  contributionBatch: "MCA 2025 Batch",
  contributionPhone: "9570068163",
  contributionRequired: false,
  scisConnectUrl: process.env.NEXT_PUBLIC_SCIS_CONNECT_URL || "",
};

const defaultSchedule = [
  { time: "7:00 PM", title: "Welcome & Registration", sortOrder: 1, isActive: true },
  { time: "7:30 PM", title: "Meet & Connect", sortOrder: 2, isActive: true },
  { time: "8:00 PM", title: "Alumni Conversations", sortOrder: 3, isActive: true },
  { time: "8:45 PM", title: "Activities", sortOrder: 4, isActive: true },
  { time: "9:30 PM", title: "Dinner & Snacks", sortOrder: 5, isActive: true },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const StudentModel = (await import("../models/Student")).default;
  const EventSettingsModel = (await import("../models/EventSettings")).default;
  const EventScheduleModel = (await import("../models/EventSchedule")).default;

  // Seed students
  let inserted = 0, skipped = 0;
  for (const s of students2025) {
    const existing = await StudentModel.findOne({ rollNumber: s.rollNumber });
    if (!existing) {
      await StudentModel.create(s);
      inserted++;
    } else {
      skipped++;
    }
  }
  console.log(`Students: ${inserted} inserted, ${skipped} skipped`);

  // Seed event settings
  const existingSettings = await EventSettingsModel.findOne();
  if (!existingSettings) {
    await EventSettingsModel.create(eventSettings);
    console.log("Event settings created");
  } else {
    console.log("Event settings already exist — skipping");
  }

  // Seed schedule
  const scheduleCount = await EventScheduleModel.countDocuments();
  if (scheduleCount === 0) {
    await EventScheduleModel.insertMany(defaultSchedule);
    console.log("Default schedule created (placeholder times — update via admin)");
  } else {
    console.log("Schedule already exists — skipping");
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
