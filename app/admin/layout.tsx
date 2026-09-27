import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  // Login page doesn't need the sidebar layout
  return (
    <div className="flex min-h-screen bg-[#f5f3f0]">
      {session && <AdminSidebar role={role} />}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
