import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import AuditLogModel from "@/models/AuditLog";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

async function getLogs(page: number) {
  await connectDB();
  const limit = 50;
  const [logs, total] = await Promise.all([
    AuditLogModel.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    AuditLogModel.countDocuments(),
  ]);
  return { logs: JSON.parse(JSON.stringify(logs)), total };
}

const ACTION_COLORS: Record<string, string> = {
  CSV_IMPORT: "bg-blue-100 text-blue-800",
  STUDENT_DELETED: "bg-red-100 text-red-800",
  RSVP_MANUALLY_UPDATED: "bg-yellow-100 text-yellow-800",
  CONTRIBUTION_VERIFIED: "bg-green-100 text-green-800",
  CONTRIBUTION_REJECTED: "bg-red-100 text-red-800",
  EVENT_SETTINGS_UPDATED: "bg-purple-100 text-purple-800",
};

export default async function AuditLogsPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const { logs, total } = await getLogs(page);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Audit Logs</h1>
        <p className="text-[#9b7b6b] text-sm">{total} log entries</p>
      </div>

      <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fdf6ec] text-[#9b7b6b] text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Entity</th>
                <th className="px-4 py-3 text-left">Admin</th>
                <th className="px-4 py-3 text-left">Details</th>
                <th className="px-4 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f0ea]">
              {logs.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-[#9b7b6b]">No audit logs yet.</td></tr>
              ) : logs.map((log: {
                _id: string;
                action: string;
                entityType: string;
                entityId?: string;
                adminName?: string;
                adminId?: string;
                metadata?: Record<string, unknown>;
                createdAt: string;
              }) => (
                <tr key={log._id} className="hover:bg-[#fdf9f6]">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${ACTION_COLORS[log.action] || "bg-gray-100 text-gray-700"}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#5c3a2a] text-xs">{log.entityType}{log.entityId ? ` · ${log.entityId.slice(-6)}` : ""}</td>
                  <td className="px-4 py-3 text-[#9b7b6b] text-xs">{log.adminName || log.adminId?.slice(-6) || "—"}</td>
                  <td className="px-4 py-3 text-[#9b7b6b] text-xs max-w-[200px] truncate">
                    {log.metadata ? JSON.stringify(log.metadata).slice(0, 80) : "—"}
                  </td>
                  <td className="px-4 py-3 text-[#9b7b6b] text-xs whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString("en-IN", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > 50 && (
          <div className="px-4 py-3 border-t border-[#f5f0ea] flex justify-between text-sm">
            <span className="text-[#9b7b6b]">Page {page} of {Math.ceil(total / 50)}</span>
            <div className="flex gap-2">
              {page > 1 && <a href={`?page=${page - 1}`} className="px-3 py-1 border border-[#e8d5c5] rounded text-xs hover:bg-[#fdf6ec]">Prev</a>}
              {page * 50 < total && <a href={`?page=${page + 1}`} className="px-3 py-1 border border-[#e8d5c5] rounded text-xs hover:bg-[#fdf6ec]">Next</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
