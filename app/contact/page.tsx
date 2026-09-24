import PublicLayout from "@/components/public/PublicLayout";
import { Phone, MapPin, Calendar, Clock } from "lucide-react";

export default function ContactPage() {
  const contacts = [
    { name: "Shivam", phone: "9570068163", display: "95700 68163", role: "Organizing Team" },
    { name: "Sahil", phone: "7814913269", display: "78149 13269", role: "Organizing Team" },
    { name: "Aman", phone: "7983878932", display: "79838 78932", role: "Organizing Team" },
  ];

  return (
    <PublicLayout>
      <div className="bg-[#faf8f5]">
        {/* Hero */}
        <section className="bg-[#1a0505] py-20 px-4 text-center">
          <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">Get in Touch</p>
          <h1 className="text-[#fdf6ec] text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Contact Us
          </h1>
          <p className="text-[#9b7b6b] text-sm tracking-[0.2em] uppercase">AARAMBH — MCA Freshers&apos;26</p>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact persons */}
            <div>
              <h2 className="text-[#8b1a1a] text-xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Organizing Team
              </h2>
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.name} className="bg-white border border-[#e8d5c5] rounded-lg p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#8b1a1a] font-bold text-sm">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a0a0a]">{c.name}</p>
                      <p className="text-[#9b7b6b] text-xs mb-1">{c.role}</p>
                      <a
                        href={`tel:${c.phone}`}
                        className="flex items-center gap-1.5 text-[#8b1a1a] font-medium text-sm hover:underline"
                      >
                        <Phone size={14} />
                        {c.display}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Info */}
            <div>
              <h2 className="text-[#8b1a1a] text-xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Event Details
              </h2>
              <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg p-6">
                <h3 className="text-[#1a0a0a] font-bold text-lg mb-1" style={{ fontFamily: "Georgia, serif" }}>AARAMBH</h3>
                <p className="text-[#9b7b6b] text-sm mb-5">MCA Freshers&apos;26 with our Alumni</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-[#8b1a1a] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[#1a0a0a] font-medium text-sm">Saturday, 03 October 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#8b1a1a] mt-0.5 shrink-0" />
                    <p className="text-[#1a0a0a] font-medium text-sm">7:00 PM</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#8b1a1a] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[#1a0a0a] font-medium text-sm">Amphitheatre</p>
                      <p className="text-[#9b7b6b] text-xs">University of Hyderabad</p>
                      <p className="text-[#9b7b6b] text-xs">School of Computer and Information Sciences</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#e8d5c5] text-center">
                  <p className="text-[#c9872a] italic text-sm">&ldquo;Different Batches. Same Roots.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
