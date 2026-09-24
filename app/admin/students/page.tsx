import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import StudentTable from "@/components/admin/StudentTable";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ batch?: string; search?: string; page?: string }>;
}

async function getStudents(filters: { batch?: string; search?: string; page: number }) {
  await connectDB();
  const query: Record<string, unknown> = {};
  if (filters.batch) query.batch = filters.batch;
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { rollNumber: { $regex: filters.search, $options: "i" } },
    ];
  }
  const limit = 50;
  const [students, total] = await Promise.all([
    StudentModel.find(query).sort({ rollNumber: 1 }).skip((filters.page - 1) * limit).limit(limit).lean(),
    StudentModel.countDocuments(query),
  ]);
  return { students: JSON.parse(JSON.stringify(students)), total };
}

export default async function StudentsPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const { students, total } = await getStudents({ batch: params.batch, search: params.search, page });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1a0a0a] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Students</h1>
          <p className="text-[#9b7b6b] text-sm">{total} students in database</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/students/import"
            className="bg-[#8b1a1a] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#6b1010] transition-colors"
          >
            Import CSV
          </Link>
          <a
            href="/api/students?limit=1000"
            className="border border-[#e8d5c5] text-[#5c3a2a] px-4 py-2 rounded text-sm font-medium hover:bg-[#fdf6ec] transition-colors"
          >
            Export CSV
          </a>
        </div>
      </div>
      <StudentTable students={students} total={total} page={page} initialFilters={params} />
    </div>
  );
}
