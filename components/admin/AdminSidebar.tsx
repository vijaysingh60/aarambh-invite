"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UsersRound,
  Wallet,
  QrCode,
  Settings,
  ScrollText,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/attendees", label: "Attendees", icon: UserCheck },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/batches", label: "Batches", icon: UsersRound },
  { href: "/admin/contributions", label: "Contributions", icon: Wallet },
  { href: "/admin/check-in", label: "Event Day", icon: QrCode },
  { href: "/admin/settings", label: "Event Settings", icon: Settings },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
];

const viewerNavItems: NavItem[] = [
  { href: "/admin/attendees", label: "Attendees", icon: UserCheck },
];

export default function AdminSidebar({ role }: { role?: string }) {
  const pathname = usePathname();
  const isViewer = role === "VIEWER";
  const items = isViewer ? viewerNavItems : navItems;

  return (
    <aside className="hidden md:flex w-56 lg:w-64 shrink-0 flex-col bg-[#1a0505] min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#3a1515]">
        <Link href={isViewer ? "/admin/attendees" : "/admin"} className="block">
          <p className="text-[#c9872a] font-bold text-base tracking-widest uppercase">AARAMBH</p>
          <p className="text-[#9b7b6b] text-xs">{isViewer ? "Class Login" : "Admin Panel"}</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[#8b1a1a] text-white"
                  : "text-[#e8d5c5] hover:bg-[#2a0808] hover:text-white"
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-3 py-4 border-t border-[#3a1515]">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#9b7b6b] hover:text-[#e8d5c5] transition-colors">
          <span className="text-xs">←</span> Public Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: isViewer ? "/class-login" : "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#9b7b6b] hover:text-red-400 transition-colors"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
}
