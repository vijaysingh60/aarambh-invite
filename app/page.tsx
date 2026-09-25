import PublicLayout from "@/components/public/PublicLayout";
import ScrollReveal from "@/components/public/ScrollReveal";
import HeroStars from "@/components/public/HeroStars";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, MessageCircle, Utensils, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <PublicLayout>
      <ScrollReveal />
      <div className="bg-[#faf8f5]">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#1a0505] px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a0808] via-[#1a0505] to-[#0d0202]" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#8b1a1a] rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9872a] rounded-full opacity-8 blur-3xl translate-x-1/3 translate-y-1/3" />
          <HeroStars />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <p className="text-[#9b7b6b] text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in-up">
              University of Hyderabad · SCIS
            </p>
            <p className="text-[#c9872a] text-sm sm:text-base tracking-[0.6em] uppercase mb-4 animate-fade-in-up animate-delay-100">
              You&apos;re Invited
            </p>
            <h1
              className="text-[#fdf6ec] text-6xl sm:text-7xl md:text-8xl font-bold tracking-widest uppercase mb-3 animate-fade-in-up animate-delay-200"
              style={{ fontFamily: "Georgia, serif" }}
            >
              AARAMBH
            </h1>
            <div className="flex items-center justify-center gap-4 my-5 animate-fade-in-up animate-delay-200">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9872a]" />
              <span className="text-[#c9872a] text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9872a]" />
            </div>
            <p className="text-[#e8d5c5] text-xl sm:text-2xl tracking-[0.3em] uppercase mb-1 animate-fade-in-up animate-delay-300">
              MCA Freshers&apos;26
            </p>
            <p className="text-[#9b7b6b] text-sm sm:text-base tracking-[0.2em] uppercase mb-8 animate-fade-in-up animate-delay-300">
              With Our Alumni
            </p>
            <p className="text-[#c9872a] text-base sm:text-lg italic mb-10 animate-fade-in-up animate-delay-400">
              &ldquo;Different Batches. Same Roots.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#e8d5c5] text-sm mb-10 animate-fade-in-up animate-delay-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#c9872a]" />
                <span>Saturday, 03 October 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#c9872a]" />
                <span>7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#c9872a]" />
                <span>Amphitheatre</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/rsvp"
                className="w-full sm:w-auto bg-[#8b1a1a] hover:bg-[#6b1010] text-white px-8 py-4 rounded font-semibold text-base uppercase tracking-widest transition-all hover:shadow-lg min-w-[220px] text-center"
              >
                Will You Join Us?
              </Link>
              <Link
                href="/event"
                className="w-full sm:w-auto border border-[#c9872a] text-[#c9872a] hover:bg-[#c9872a]/10 px-8 py-4 rounded font-medium text-base uppercase tracking-widest transition-all min-w-[220px] text-center"
              >
                View Event Details
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#c9872a] opacity-60 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </section>

        {/* ─── INTRO ────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p data-animate="up" className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">The Gathering</p>
          <h2 data-animate="up" data-delay="100" className="text-[#8b1a1a] text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
            One Evening. Many Memories.
          </h2>
          <div data-animate="fade" data-delay="200" className="w-16 h-px bg-[#c9872a] mx-auto mb-6" />
          <p data-animate="up" data-delay="300" className="text-[#5c3a2a] text-base sm:text-lg leading-relaxed">
            AARAMBH is a celebration of beginnings — where the MCA 2025 batch and the new MCA 2026 batch
            come together for an evening of conversation, connection, and community. This is more than an
            event. It is the beginning of a shared journey at SCIS.
          </p>
        </section>

        {/* ─── EVENT DETAILS ────────────────────────────────────── */}
        <section className="bg-[#1a0505] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <p data-animate="up" className="text-[#c9872a] text-xs tracking-[0.5em] uppercase text-center mb-8">The Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: <Calendar size={28} />, label: "Date", value: "Saturday, 03 October 2026", delay: "100" },
                { icon: <Clock size={28} />, label: "Time", value: "7:00 PM onwards", delay: "200" },
                { icon: <MapPin size={28} />, label: "Venue", value: "Amphitheatre, University of Hyderabad", delay: "300" },
              ].map((item) => (
                <div key={item.label} data-animate="up" data-delay={item.delay} className="bg-[#2a0808] border border-[#3a1515] rounded-lg p-6 text-center">
                  <div className="text-[#c9872a] mb-3 flex justify-center">{item.icon}</div>
                  <p className="text-[#9b7b6b] text-xs uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-[#fdf6ec] font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT'S IN STORE ──────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p data-animate="up" className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-3">The Evening</p>
            <h2 data-animate="up" data-delay="100" className="text-[#8b1a1a] text-3xl sm:text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
              What&apos;s in Store
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users size={32} />, title: "Meet & Connect", desc: "Bridge the gap between batches. Find your mentors. Meet your juniors.", delay: "100" },
              { icon: <MessageCircle size={32} />, title: "Alumni Conversations", desc: "Hear from those who've walked the same corridors, faced the same exams.", delay: "200" },
              { icon: <Sparkles size={32} />, title: "Activities", desc: "Fun, engaging activities that bring out the best in everyone.", delay: "300" },
              { icon: <Utensils size={32} />, title: "Dinner & Snacks", desc: "An evening wouldn't be complete without good food and good company.", delay: "400" },
            ].map((item) => (
              <div key={item.title} data-animate="up" data-delay={item.delay} className="bg-white border border-[#e8d5c5] rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-[#8b1a1a] mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-[#1a0a0a] font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-[#9b7b6b] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

{/* ─── MESSAGE TO SENIORS ───────────────────────────────── */}
        <section className="bg-[#fdf6ec] border-y border-[#e8d5c5] py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p data-animate="fade" className="text-[#c9872a] text-4xl mb-6">✉</p>
            <h2 data-animate="up" data-delay="100" className="text-[#8b1a1a] text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
              A Message to Our Seniors
            </h2>
            <div data-animate="fade" data-delay="200" className="w-12 h-px bg-[#c9872a] mx-auto mb-8" />
            <blockquote data-animate="up" data-delay="200" className="text-[#5c3a2a] text-base sm:text-lg leading-relaxed italic">
              &ldquo;You&apos;ve already walked the path we&apos;re beginning. Come back, reconnect,
              share your stories, and make the beginning of a new batch a little more memorable.
              Your presence is not just welcome — it matters.&rdquo;
            </blockquote>
            <p data-animate="fade" data-delay="300" className="text-[#9b7b6b] text-sm mt-6">— MCA 2026, SCIS</p>
            <Link
              data-animate="up" data-delay="400"
              href="/rsvp"
              className="inline-block mt-8 bg-[#8b1a1a] text-white px-8 py-3 rounded uppercase tracking-widest text-sm font-semibold hover:bg-[#6b1010] transition-colors"
            >
              I&apos;ll Be There
            </Link>
          </div>
        </section>

        {/* ─── RSVP CTA ─────────────────────────────────────────── */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 data-animate="up" className="text-[#8b1a1a] text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Will We See You There?
            </h2>
            <p data-animate="fade" data-delay="100" className="text-[#9b7b6b] mb-8">Let us know if you&apos;re joining — it helps us plan the evening better.</p>
            <Link
              data-animate="up" data-delay="200"
              href="/rsvp"
              className="inline-block bg-[#8b1a1a] text-white px-10 py-4 rounded-lg uppercase tracking-widest font-bold text-base hover:bg-[#6b1010] transition-all hover:shadow-xl hover:shadow-[#8b1a1a]/20"
            >
              Confirm Your Presence
            </Link>
          </div>
        </section>

        {/* ─── BATCHES ──────────────────────────────────────────── */}
        <section className="bg-[#1a0505] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p data-animate="up" className="text-[#c9872a] text-xs tracking-[0.5em] uppercase mb-4">The Community</p>
            <h2 data-animate="up" data-delay="100" className="text-[#fdf6ec] text-3xl font-bold mb-10" style={{ fontFamily: "Georgia, serif" }}>
              Meet the Batches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { href: "/batches/2025", year: "MCA 2025", label: "The Seniors", desc: "36 students who've already made their mark at SCIS.", badge: "Batch 2025–2027", delay: "150" },
                { href: "/batches/2026", year: "MCA 2026", label: "The Freshers", desc: "The new batch, beginning their MCA journey at SCIS.", badge: "Batch 2026–2028", delay: "300" },
              ].map((b) => (
                <Link key={b.href} href={b.href} data-animate="up" data-delay={b.delay} className="bg-[#2a0808] border border-[#3a1515] rounded-lg p-8 hover:border-[#8b1a1a] transition-all group">
                  <p className="text-[#c9872a] text-xs uppercase tracking-widest mb-2">{b.badge}</p>
                  <h3 className="text-[#fdf6ec] text-2xl font-bold mb-1 group-hover:text-[#c9872a] transition-colors" style={{ fontFamily: "Georgia, serif" }}>{b.year}</h3>
                  <p className="text-[#9b7b6b] text-sm mb-3">{b.label}</p>
                  <p className="text-[#e8d5c5] text-sm">{b.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SCIS CONNECT & CONTRIBUTE ─────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div data-animate="left" data-delay="100" className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg p-8">
            <h3 className="text-[#8b1a1a] font-bold text-xl mb-2" style={{ fontFamily: "Georgia, serif" }}>SCIS Connect</h3>
            <p className="text-[#9b7b6b] text-sm mb-4">Stay connected with the SCIS community beyond AARAMBH.</p>
            <Link href="/scis-connect" className="text-[#8b1a1a] font-semibold text-sm hover:underline">Learn more →</Link>
          </div>
          <div data-animate="right" data-delay="100" className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg p-8">
            <h3 className="text-[#8b1a1a] font-bold text-xl mb-2" style={{ fontFamily: "Georgia, serif" }}>Want to Contribute?</h3>
            <p className="text-[#9b7b6b] text-sm mb-4">Contribution is completely optional. Help us make the evening special.</p>
            <Link href="/contribute" className="text-[#8b1a1a] font-semibold text-sm hover:underline">Contribute →</Link>
          </div>
        </section>

        {/* ─── CONTACT ──────────────────────────────────────────── */}
        <section className="bg-[#fdf6ec] border-t border-[#e8d5c5] py-16 px-4 text-center">
          <h2 className="text-[#8b1a1a] text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>Have Questions?</h2>
          <p className="text-[#9b7b6b] mb-6 text-sm">Reach out to the organizing team</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { name: "Shivam", phone: "9570068163", display: "95700 68163" },
              { name: "Sahil", phone: "7814913269", display: "78149 13269" },
              { name: "Aman", phone: "7983878932", display: "79838 78932" },
            ].map((c) => (
              <div key={c.name} className="text-center">
                <p className="font-semibold text-[#1a0a0a]">{c.name}</p>
                <a href={`tel:${c.phone}`} className="text-[#8b1a1a] hover:underline">{c.display}</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
