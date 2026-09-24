import PublicLayout from "@/components/public/PublicLayout";
import RSVPForm from "@/components/public/RSVPForm";
import { getStudentByRoll } from "@/actions/rsvp";

interface Props {
  searchParams: Promise<{ roll?: string }>;
}

export default async function RSVPPage({ searchParams }: Props) {
  const params = await searchParams;
  const rollParam = params.roll?.toUpperCase();

  let prefillStudent = null;
  if (rollParam) {
    prefillStudent = await getStudentByRoll(rollParam);
  }

  return (
    <PublicLayout>
      <div className="bg-[#faf8f5] min-h-screen">
        {/* Hero */}
        <section className="bg-[#1a0505] py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 opacity-15 text-[#c9872a] text-4xl select-none hidden md:block">❋</div>
          <div className="absolute top-4 right-4 opacity-15 text-[#c9872a] text-4xl select-none hidden md:block">❋</div>
          <div className="relative z-10 max-w-xl mx-auto">
            <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">AARAMBH</p>
            <h1 className="text-[#fdf6ec] text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>
              Will We See You at AARAMBH?
            </h1>
            <p className="text-[#9b7b6b] text-sm">
              Your response will help us plan the evening better.
            </p>
          </div>
        </section>

        {/* RSVP Form */}
        <div className="max-w-xl mx-auto px-4 py-12">
          {prefillStudent ? (
            <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg px-6 py-4 mb-6 text-center">
              <p className="text-[#9b7b6b] text-xs uppercase tracking-widest mb-1">Welcome back</p>
              <p className="text-[#1a0a0a] font-bold text-xl" style={{ fontFamily: "Georgia, serif" }}>
                {prefillStudent.name} 👋
              </p>
              <p className="text-[#8b1a1a] text-sm mt-1">
                MCA {prefillStudent.batch} · {prefillStudent.rollNumber}
              </p>
              {prefillStudent.existingStatus && (
                <p className="text-[#9b7b6b] text-xs mt-2">
                  Your current response:{" "}
                  <span className={`font-semibold ${prefillStudent.existingStatus === "ATTENDING" ? "text-green-600" : prefillStudent.existingStatus === "NOT_ATTENDING" ? "text-red-600" : "text-[#9b7b6b]"}`}>
                    {prefillStudent.existingStatus === "ATTENDING" ? "Attending ✓" : prefillStudent.existingStatus === "NOT_ATTENDING" ? "Not Attending" : "Pending"}
                  </span>
                  {" "}— you can change it below.
                </p>
              )}
            </div>
          ) : rollParam ? (
            <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg px-6 py-4 mb-6 text-center">
              <p className="text-[#9b7b6b] text-sm">
                Roll number <strong>{rollParam}</strong> not found in our records.
                You can still fill in your details below.
              </p>
            </div>
          ) : null}

          <RSVPForm
            prefill={prefillStudent ? {
              name: prefillStudent.name,
              rollNumber: prefillStudent.rollNumber,
              batch: prefillStudent.batch as "2025" | "2026",
            } : undefined}
          />
        </div>
      </div>
    </PublicLayout>
  );
}
