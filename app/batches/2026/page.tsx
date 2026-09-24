import PublicLayout from "@/components/public/PublicLayout";
import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import BatchDirectory from "@/components/public/BatchDirectory";

async function getStudents() {
  try {
    await connectDB();
    const students = await StudentModel.find(
      { batch: "2026" },
      { name: 1, rollNumber: 1, background: 1, batch: 1 }
    )
      .sort({ rollNumber: 1 })
      .lean();
    return JSON.parse(JSON.stringify(students));
  } catch {
    return [];
  }
}

export default async function Batch2026Page() {
  const students = await getStudents();

  return (
    <PublicLayout>
      <BatchDirectory
        batch="2026"
        title="MCA 2026"
        subtitle="The Freshers"
        badge="Batch 2026–2028"
        description="The new batch beginning their MCA journey at SCIS. AARAMBH is their first milestone."
        students={students}
        emptyMessage="2026 batch directory will be updated soon."
      />
    </PublicLayout>
  );
}
