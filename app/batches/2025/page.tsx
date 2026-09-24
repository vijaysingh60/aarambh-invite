import PublicLayout from "@/components/public/PublicLayout";
import { connectDB } from "@/lib/mongodb";
import StudentModel from "@/models/Student";
import BatchDirectory from "@/components/public/BatchDirectory";

async function getStudents() {
  try {
    await connectDB();
    const students = await StudentModel.find(
      { batch: "2025" },
      { name: 1, rollNumber: 1, background: 1, batch: 1 }
    )
      .sort({ rollNumber: 1 })
      .lean();
    return JSON.parse(JSON.stringify(students));
  } catch {
    return [];
  }
}

export default async function Batch2025Page() {
  const students = await getStudents();

  return (
    <PublicLayout>
      <BatchDirectory
        batch="2025"
        title="MCA 2025"
        subtitle="The Seniors"
        badge="Batch 2025–2027"
        description="36 students who've already made their mark at the School of Computer and Information Sciences, University of Hyderabad."
        students={students}
        emptyMessage=""
      />
    </PublicLayout>
  );
}
