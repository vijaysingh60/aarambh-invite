import PublicLayout from "@/components/public/PublicLayout";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function BatchesPage() {
  return (
    <PublicLayout>
      <div className="bg-[#faf8f5]">
        {/* Hero */}
        <section className="bg-[#1a0505] py-20 px-4 text-center relative overflow-hidden">
          <div className="absolute top-6 left-6 opacity-15 text-[#c9872a] text-5xl select-none hidden md:block">❋</div>
          <div className="absolute top-6 right-6 opacity-15 text-[#c9872a] text-5xl select-none hidden md:block">❋</div>
          <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4 relative z-10">The Community</p>
          <h1
            className="text-[#fdf6ec] text-4xl sm:text-5xl font-bold mb-4 relative z-10"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Different Batches. Same Roots.
          </h1>
          <p className="text-[#c9872a] text-sm sm:text-base italic relative z-10">
            MCA at SCIS — two batches, one community.
          </p>
        </section>

        {/* Batches */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 2025 */}
            <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-[#8b1a1a] px-6 py-8 text-white text-center">
                <p className="text-[#e8d5c5] text-xs uppercase tracking-widest mb-2">Batch 2025–2027</p>
                <h2 className="text-4xl font-bold tracking-wider" style={{ fontFamily: "Georgia, serif" }}>MCA 2025</h2>
                <p className="text-[#e8d5c5] mt-2 text-sm">The Seniors</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#8b1a1a] mb-4">
                  <Users size={18} />
                  <span className="font-semibold text-sm">36 Students</span>
                </div>
                <p className="text-[#9b7b6b] text-sm leading-relaxed mb-6">
                  The MCA 2025 batch — seniors who&apos;ve navigated SCIS and built experiences worth sharing.
                  They are the foundation of AARAMBH, invited to welcome and inspire the new batch.
                </p>
                <Link
                  href="/batches/2025"
                  className="flex items-center gap-2 text-[#8b1a1a] font-semibold text-sm hover:gap-3 transition-all"
                >
                  View 2025 Batch <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* 2026 */}
            <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-[#5c0a0a] px-6 py-8 text-white text-center">
                <p className="text-[#e8d5c5] text-xs uppercase tracking-widest mb-2">Batch 2026–2028</p>
                <h2 className="text-4xl font-bold tracking-wider" style={{ fontFamily: "Georgia, serif" }}>MCA 2026</h2>
                <p className="text-[#e8d5c5] mt-2 text-sm">The Freshers</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#8b1a1a] mb-4">
                  <Users size={18} />
                  <span className="font-semibold text-sm">Batch details coming soon</span>
                </div>
                <p className="text-[#9b7b6b] text-sm leading-relaxed mb-6">
                  The MCA 2026 batch — freshers beginning their journey at SCIS. AARAMBH is their first
                  milestone, an evening to meet the community they&apos;ve just joined.
                </p>
                <Link
                  href="/batches/2026"
                  className="flex items-center gap-2 text-[#8b1a1a] font-semibold text-sm hover:gap-3 transition-all"
                >
                  View 2026 Batch <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

{/* Philosophy */}
        <section className="bg-[#fdf6ec] border-y border-[#e8d5c5] py-16 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-px bg-[#c9872a] mx-auto mb-6" />
            <p className="text-[#5c3a2a] text-base sm:text-lg leading-relaxed italic">
              &ldquo;The years change. The corridors remain the same.
              Different batches, but the same late nights, the same professors, the same journey.
              At AARAMBH, we celebrate what binds us — our shared roots at SCIS.&rdquo;
            </p>
            <div className="w-12 h-px bg-[#c9872a] mx-auto mt-6" />
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
