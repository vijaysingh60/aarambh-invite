"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ScheduleItem {
  _id: string;
  time: string;
  title: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
}

interface Props {
  schedule: ScheduleItem[];
}

export default function ScheduleManager({ schedule: initialSchedule }: Props) {
  const router = useRouter();
  const [schedule, setSchedule] = useState(initialSchedule);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  function addItem() {
    setSchedule([
      ...schedule,
      { _id: `new-${Date.now()}`, time: "", title: "", sortOrder: schedule.length + 1, isActive: true },
    ]);
  }

  function updateItem(id: string, field: keyof ScheduleItem, value: string | boolean | number) {
    setSchedule(schedule.map((s) => (s._id === id ? { ...s, [field]: value } : s)));
  }

  function removeItem(id: string) {
    setSchedule(schedule.filter((s) => s._id !== id));
  }

  async function saveSchedule() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule }),
      });
      if (res.ok) {
        setMsg("Schedule saved.");
        router.refresh();
      } else {
        setMsg("Failed to save.");
      }
    } catch {
      setMsg("Error saving schedule.");
    }
    setSaving(false);
  }

  return (
    <div className="bg-white border border-[#e8d5c5] rounded-xl p-6">
      <p className="text-[#9b7b6b] text-xs italic mb-4">
        Note: These times are configurable placeholders and may not reflect the final schedule.
      </p>

      {msg && <p className="text-green-700 text-sm mb-3">{msg}</p>}

      <div className="space-y-3 mb-4">
        {schedule.map((item) => (
          <div key={item._id} className="border border-[#f0e8e0] rounded-lg p-3">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                value={item.time}
                onChange={(e) => updateItem(item._id, "time", e.target.value)}
                className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]"
                placeholder="Time (e.g. 7:00 PM)"
              />
              <input
                value={item.title}
                onChange={(e) => updateItem(item._id, "title", e.target.value)}
                className="px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]"
                placeholder="Title"
              />
            </div>
            <div className="flex gap-2 items-center">
              <input
                value={item.description || ""}
                onChange={(e) => updateItem(item._id, "description", e.target.value)}
                className="flex-1 px-3 py-2 border border-[#e8d5c5] rounded text-sm focus:outline-none focus:border-[#8b1a1a]"
                placeholder="Description (optional)"
              />
              <label className="flex items-center gap-1.5 text-xs text-[#9b7b6b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.isActive}
                  onChange={(e) => updateItem(item._id, "isActive", e.target.checked)}
                />
                Active
              </label>
              <button onClick={() => removeItem(item._id)} className="p-1 text-red-400 hover:bg-red-50 rounded">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={addItem}
          className="flex items-center gap-2 text-[#8b1a1a] text-sm border border-[#e8d5c5] px-3 py-2 rounded hover:bg-[#fdf6ec]"
        >
          <Plus size={14} /> Add Item
        </button>
        <button
          onClick={saveSchedule}
          disabled={saving}
          className="flex-1 bg-[#8b1a1a] text-white py-2 rounded text-sm font-semibold hover:bg-[#6b1010] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Schedule"}
        </button>
      </div>
    </div>
  );
}
