import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import EventSettingsModel from "@/models/EventSettings";
import EventScheduleModel from "@/models/EventSchedule";
import EventSettingsForm from "@/components/admin/EventSettingsForm";
import ScheduleManager from "@/components/admin/ScheduleManager";

async function getData() {
  await connectDB();
  const [settings, schedule] = await Promise.all([
    EventSettingsModel.findOne().lean(),
    EventScheduleModel.find().sort({ sortOrder: 1 }).lean(),
  ]);
  return {
    settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    schedule: JSON.parse(JSON.stringify(schedule)),
  };
}

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { settings, schedule } = await getData();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Event Settings</h1>
        <p className="text-[#9b7b6b] text-sm">Changes here reflect on the public website.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-[#8b1a1a] font-semibold text-sm uppercase tracking-wider mb-4">Event Details</h2>
          <EventSettingsForm settings={settings} />
        </div>
        <div>
          <h2 className="text-[#8b1a1a] font-semibold text-sm uppercase tracking-wider mb-4">Schedule</h2>
          <ScheduleManager schedule={schedule} />
        </div>
      </div>
    </div>
  );
}
