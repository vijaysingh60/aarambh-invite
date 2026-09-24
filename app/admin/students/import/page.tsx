import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CSVImport from "@/components/admin/CSVImport";

export default async function ImportPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
          Import Students
        </h1>
        <p className="text-[#9b7b6b] text-sm">Upload a CSV file to import students. Duplicates by roll number will be updated.</p>
      </div>

      <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-xl p-5 mb-6">
        <h2 className="text-[#8b1a1a] font-semibold text-sm mb-2">Expected CSV Format</h2>
        <code className="text-xs text-[#5c3a2a] block">
          name,rollNumber,batch,background,email,mobile
        </code>
        <code className="text-xs text-[#5c3a2a] block mt-1">
          Rahul Sharma,26MCMC01,2026,BCA,rahul@example.com,9876543210
        </code>
        <ul className="mt-3 text-xs text-[#9b7b6b] space-y-1 list-disc list-inside">
          <li><strong>name</strong> — required</li>
          <li><strong>rollNumber</strong> — required, must be unique</li>
          <li><strong>batch</strong> — required (e.g. 2026)</li>
          <li><strong>background</strong> — optional (e.g. BCA, B.Sc. Mathematics)</li>
          <li><strong>email</strong> — optional</li>
          <li><strong>mobile</strong> — optional</li>
        </ul>
      </div>

      <CSVImport />
    </div>
  );
}
