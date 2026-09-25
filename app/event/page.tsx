import PublicLayout from "@/components/public/PublicLayout";
import { Calendar, Clock, MapPin, Users, MessageCircle, Sparkles, Utensils } from "lucide-react";
import Link from "next/link";

const schedule = [
  { time: "7:00 PM",  title: "Gathering" },
  { time: "7:15 PM",  title: "Junior Rampwalk & Introduction" },
  { time: "7:30 PM",  title: "Performances by Juniors" },
  { time: "8:00 PM",  title: "Snacks / Starters / Refreshment" },
  { time: "8:15 PM",  title: "Games for Juniors by 2025 Batch" },
  { time: "9:00 PM",  title: "Performances by 2025 Batch" },
  { time: "9:30 PM",  title: "Performances by Juniors" },
  { time: "10:00 PM", title: "Dinner" },
  { time: "11:00 PM", title: "Games for 2025 Batch" },
  { time: "11:30 PM", title: "Mr & Miss Fresher" },
  { time: "12:00 AM", title: "Highlight & to be continued..." },
];

export default async function EventPage() {

  return (
    <PublicLayout>
      <div className="bg-[#faf8f5]">
        {/* Hero */}
        <section className="bg-[#1a0505] px-4 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a0808] to-[#1a0505]" />
          <div className="absolute top-8 left-8 opacity-20 text-[#c9872a] text-5xl select-none hidden md:block">❋</div>
          <div className="absolute top-8 right-8 opacity-20 text-[#c9872a] text-5xl select-none hidden md:block">❋</div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-6">University of Hyderabad · SCIS</p>
            <h1 className="text-[#fdf6ec] text-5xl sm:text-6xl font-bold tracking-widest uppercase mb-2" style={{ fontFamily: "Georgia, serif" }}>
              AARAMBH
            </h1>
            <p className="text-[#e8d5c5] text-lg tracking-[0.3em] uppercase mb-1">MCA Freshers&apos;26</p>
            <p className="text-[#9b7b6b] text-sm tracking-[0.2em] uppercase mb-8">With Our Alumni</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9872a]" />
              <span className="text-[#c9872a]">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9872a]" />
            </div>
            <p className="text-[#c9872a] italic text-base">&ldquo;Different Batches. Same Roots.&rdquo;</p>
          </div>
        </section>

        {/* Event Details Cards */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Calendar size={32} className="text-[#8b1a1a]" />, label: "Date", value: "Saturday", sub: "03 October 2026" },
              { icon: <Clock size={32} className="text-[#8b1a1a]" />, label: "Time", value: "7:00 PM", sub: "Evening onwards" },
              { icon: <MapPin size={32} className="text-[#8b1a1a]" />, label: "Venue", value: "Amphitheatre", sub: "University of Hyderabad" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-[#e8d5c5] rounded-lg p-8 text-center shadow-sm">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <p className="text-[#9b7b6b] text-xs uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-[#1a0a0a] font-bold text-xl mb-1">{item.value}</p>
                <p className="text-[#9b7b6b] text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's in Store */}
        <section className="bg-[#fdf6ec] border-y border-[#e8d5c5] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[#8b1a1a] text-2xl font-bold text-center mb-10" style={{ fontFamily: "Georgia, serif" }}>
              What&apos;s in Store
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Users size={28} />, title: "Meet & Connect" },
                { icon: <MessageCircle size={28} />, title: "Alumni Conversations" },
                { icon: <Sparkles size={28} />, title: "Activities" },
                { icon: <Utensils size={28} />, title: "Dinner & Snacks" },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[#e8d5c5] rounded-lg p-6 text-center">
                  <div className="text-[#8b1a1a] mb-3 flex justify-center">{item.icon}</div>
                  <p className="font-semibold text-[#1a0a0a] text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-[#8b1a1a] text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Evening Schedule
            </h2>
            <p className="text-[#9b7b6b] text-sm italic">Saturday, 03 October 2026 · Amphitheatre</p>
          </div>
          <div className="relative">
            <div className="absolute left-[8.375rem] top-0 bottom-0 w-px bg-[#e8d5c5]" />
            <div className="space-y-6">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-28 shrink-0 text-right">
                    <span className="text-[#8b1a1a] font-semibold text-sm">{item.time}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#8b1a1a] mt-1 shrink-0 relative z-10" />
                  <div className="pb-4">
                    <p className="font-semibold text-[#1a0a0a]">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP CTA */}
        <section className="bg-[#1a0505] py-16 px-4 text-center">
          <h2 className="text-[#fdf6ec] text-2xl font-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Ready to Join Us?
          </h2>
          <p className="text-[#9b7b6b] mb-6 text-sm">Confirm your presence and be part of AARAMBH.</p>
          <Link
            href="/rsvp"
            className="inline-block bg-[#8b1a1a] text-white px-8 py-3 rounded uppercase tracking-widest font-semibold text-sm hover:bg-[#6b1010] transition-colors"
          >
            RSVP Now
          </Link>
        </section>
      </div>
    </PublicLayout>
  );
}
