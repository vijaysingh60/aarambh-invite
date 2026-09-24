import PublicLayout from "@/components/public/PublicLayout";
import { ExternalLink, Users, MessageSquare, Network } from "lucide-react";

export default function ScisConnectPage() {
  const scisConnectUrl = process.env.NEXT_PUBLIC_SCIS_CONNECT_URL;
  const hasUrl = scisConnectUrl && scisConnectUrl !== "YOUR_SCIS_CONNECT_URL";

  return (
    <PublicLayout>
      <div className="bg-[#faf8f5]">
        {/* Hero */}
        <section className="bg-[#1a0505] py-20 px-4 text-center">
          <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">Community</p>
          <h1 className="text-[#fdf6ec] text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            SCIS Connect
          </h1>
          <p className="text-[#c9872a] italic text-base">
            Stay Connected Beyond AARAMBH
          </p>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-[#8b1a1a] text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
              The SCIS Community Lives On
            </h2>
            <div className="w-12 h-px bg-[#c9872a] mx-auto mb-6" />
            <p className="text-[#5c3a2a] text-base leading-relaxed">
              AARAMBH is just the beginning. SCIS Connect helps the School of Computer and Information
              Sciences community stay connected — students, alumni, and faculty — long after an evening at
              the Amphitheatre.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Users size={28} />, title: "Community", desc: "Connect with MCA students and alumni across batches." },
              { icon: <MessageSquare size={28} />, title: "Conversations", desc: "Discussions, opportunities, and shared experiences." },
              { icon: <Network size={28} />, title: "Network", desc: "Build your professional and personal network at SCIS." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[#e8d5c5] rounded-lg p-6 text-center">
                <div className="text-[#8b1a1a] mb-3 flex justify-center">{item.icon}</div>
                <h3 className="font-semibold text-[#1a0a0a] mb-2 text-sm">{item.title}</h3>
                <p className="text-[#9b7b6b] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            {hasUrl ? (
              <a
                href={scisConnectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8b1a1a] text-white px-8 py-3 rounded uppercase tracking-widest text-sm font-semibold hover:bg-[#6b1010] transition-colors"
              >
                Join SCIS Connect <ExternalLink size={16} />
              </a>
            ) : (
              <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg px-8 py-6">
                <p className="text-[#9b7b6b] text-sm mb-2">SCIS Connect link coming soon.</p>
                <p className="text-[#9b7b6b] text-xs">Check back after AARAMBH for the community link.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
