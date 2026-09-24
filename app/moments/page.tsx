import PublicLayout from "@/components/public/PublicLayout";
import MomentsGallery from "@/components/public/MomentsGallery";

export default function MomentsPage() {
  return (
    <PublicLayout>
      <div className="bg-[#faf8f5]">
        {/* Hero */}
        <section className="bg-[#1a0505] py-20 px-4 text-center">
          <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">Gallery</p>
          <h1
            className="text-[#fdf6ec] text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Moments
          </h1>
          <p className="text-[#c9872a] text-sm italic">
            Glimpses from our time together at SCIS.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14">
          <MomentsGallery />
        </section>
      </div>
    </PublicLayout>
  );
}
