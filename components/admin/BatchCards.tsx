import Link from "next/link";
import { Users } from "lucide-react";

interface BatchCount {
  code: string;
  year: string;
  total: number;
  attending: number;
}

interface Props {
  batches: BatchCount[];
  activeBatch?: string;
}

export default function BatchCards({ batches, activeBatch }: Props) {
  if (batches.length === 0) return null;

  const normalizedActive = activeBatch?.trim();
  const isActive = (code: string) =>
    normalizedActive === code || normalizedActive === `20${code}`;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
      <Link
        href="/admin/attendees"
        className={`rounded-xl border p-4 transition-colors ${
          !normalizedActive
            ? "bg-[#8b1a1a] border-[#8b1a1a] text-white"
            : "bg-white border-[#e8d5c5] hover:border-[#8b1a1a]"
        }`}
      >
        <div className={`flex items-center gap-2 text-xs uppercase tracking-widest mb-1 ${!normalizedActive ? "text-[#e8d5c5]" : "text-[#9b7b6b]"}`}>
          <Users size={13} /> All Batches
        </div>
        <p className="text-2xl font-bold">{batches.reduce((sum, b) => sum + b.total, 0)}</p>
      </Link>

      {batches.map((b) => (
        <Link
          key={b.code}
          href={`/admin/attendees?batch=${b.code}`}
          className={`rounded-xl border p-4 transition-colors ${
            isActive(b.code)
              ? "bg-[#8b1a1a] border-[#8b1a1a] text-white"
              : "bg-white border-[#e8d5c5] hover:border-[#8b1a1a]"
          }`}
        >
          <p className={`text-xs uppercase tracking-widest mb-1 ${isActive(b.code) ? "text-[#e8d5c5]" : "text-[#9b7b6b]"}`}>
            MCA {b.year}
          </p>
          <p className="text-2xl font-bold">{b.total}</p>
          <p className={`text-xs ${isActive(b.code) ? "text-[#e8d5c5]" : "text-[#9b7b6b]"}`}>
            {b.attending} attending
          </p>
        </Link>
      ))}
    </div>
  );
}
