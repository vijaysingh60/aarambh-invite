"use client";

import { useState } from "react";
import { updateEventSettings } from "@/actions/event";
import { CheckCircle } from "lucide-react";

interface Props {
  settings: Record<string, unknown> | null;
}

export default function EventSettingsForm({ settings }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {
      eventName: fd.get("eventName"),
      university: fd.get("university"),
      date: fd.get("date"),
      day: fd.get("day"),
      time: fd.get("time"),
      venue: fd.get("venue"),
      description: fd.get("description"),
      contributionReceiver: fd.get("contributionReceiver"),
      contributionBatch: fd.get("contributionBatch"),
      contributionPhone: fd.get("contributionPhone"),
      contributionRequired: fd.get("contributionRequired") === "on",
      scisConnectUrl: fd.get("scisConnectUrl"),
      contacts: [
        { name: fd.get("contact1Name"), phone: fd.get("contact1Phone") },
        { name: fd.get("contact2Name"), phone: fd.get("contact2Phone") },
        { name: fd.get("contact3Name"), phone: fd.get("contact3Phone") },
      ].filter((c) => c.name && c.phone),
    };

    const res = await updateEventSettings(data);
    setLoading(false);
    if (res.success) setSaved(true);
  }

  const contacts = (settings?.contacts as Array<{ name: string; phone: string }>) || [];

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#e8d5c5] rounded-xl p-6 space-y-4">
      {saved && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-sm">
          <CheckCircle size={16} /> Settings saved.
        </div>
      )}

      {[
        { name: "eventName", label: "Event Name", defaultValue: (settings?.eventName as string) || "AARAMBH — MCA FRESHERS'26 WITH OUR ALUMNI" },
        { name: "university", label: "University", defaultValue: (settings?.university as string) || "University of Hyderabad" },
        { name: "date", label: "Date", defaultValue: (settings?.date as string) || "03 October 2026" },
        { name: "day", label: "Day", defaultValue: (settings?.day as string) || "Saturday" },
        { name: "time", label: "Time", defaultValue: (settings?.time as string) || "7:00 PM" },
        { name: "venue", label: "Venue", defaultValue: (settings?.venue as string) || "Amphitheatre" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-[#1a0a0a] text-xs font-medium mb-1 uppercase tracking-wide">{field.label}</label>
          <input name={field.name} defaultValue={field.defaultValue} className="w-full px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" />
        </div>
      ))}

      <div>
        <label className="block text-[#1a0a0a] text-xs font-medium mb-1 uppercase tracking-wide">SCIS Connect URL</label>
        <input name="scisConnectUrl" defaultValue={(settings?.scisConnectUrl as string) || ""} className="w-full px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="https://..." />
      </div>

      <div className="border-t border-[#f5f0ea] pt-4">
        <p className="text-[#9b7b6b] text-xs uppercase tracking-wide mb-3">Contacts (max 3)</p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid grid-cols-2 gap-2 mb-2">
            <input name={`contact${i + 1}Name`} defaultValue={contacts[i]?.name || ""} className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder={`Contact ${i + 1} name`} />
            <input name={`contact${i + 1}Phone`} defaultValue={contacts[i]?.phone || ""} className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Phone" />
          </div>
        ))}
      </div>

      <div className="border-t border-[#f5f0ea] pt-4">
        <p className="text-[#9b7b6b] text-xs uppercase tracking-wide mb-3">Contribution</p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input name="contributionReceiver" defaultValue={(settings?.contributionReceiver as string) || "Kumar Shivam"} className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Receiver name" />
          <input name="contributionPhone" defaultValue={(settings?.contributionPhone as string) || "9570068163"} className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Phone" />
        </div>
        <input name="contributionBatch" defaultValue={(settings?.contributionBatch as string) || "MCA 2025 Batch"} className="w-full px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]" placeholder="Batch label" />
        <label className="flex items-center gap-2 mt-2 text-sm text-[#1a0a0a]">
          <input type="checkbox" name="contributionRequired" defaultChecked={(settings?.contributionRequired as boolean) || false} />
          Mark contribution as required (not recommended)
        </label>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#8b1a1a] text-white py-2.5 rounded text-sm font-semibold uppercase tracking-widest hover:bg-[#6b1010] disabled:opacity-50">
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
