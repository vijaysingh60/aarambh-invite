import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a0505] text-[#e8d5c5] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-[#c9872a] font-bold text-xl tracking-widest uppercase mb-1">
              AARAMBH
            </h2>
            <p className="text-[#9b7b6b] text-sm mb-3">MCA Freshers&apos;26</p>
            <p className="text-[#c9872a] italic text-sm">
              &ldquo;Different Batches. Same Roots.&rdquo;
            </p>
            <p className="text-xs text-[#9b7b6b] mt-4">
              University of Hyderabad<br />
              School of Computer and Information Sciences
            </p>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="text-[#c9872a] font-semibold text-sm uppercase tracking-wider mb-3">
              Event
            </h3>
            <div className="space-y-1 text-sm text-[#e8d5c5]">
              <p>Saturday, 03 October 2026</p>
              <p>7:00 PM</p>
              <p>Amphitheatre</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/rsvp" className="text-[#c9872a] text-sm hover:underline">
                RSVP Now →
              </Link>
              <Link href="/event" className="text-[#9b7b6b] text-sm hover:text-[#c9872a]">
                Event Details
              </Link>
            </div>
          </div>

          {/* Contacts & Links */}
          <div>
            <h3 className="text-[#c9872a] font-semibold text-sm uppercase tracking-wider mb-3">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-[#e8d5c5]">
              <p>
                Shivam —{" "}
                <a href="tel:9570068163" className="text-[#c9872a] hover:underline">
                  95700 68163
                </a>
              </p>
              <p>
                Sahil —{" "}
                <a href="tel:7814913269" className="text-[#c9872a] hover:underline">
                  78149 13269
                </a>
              </p>
              <p>
                Aman —{" "}
                <a href="tel:7983878932" className="text-[#c9872a] hover:underline">
                  79838 78932
                </a>
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <Link href="/scis-connect" className="text-[#9b7b6b] hover:text-[#c9872a]">
                SCIS Connect
              </Link>
              <Link href="/contribute" className="text-[#9b7b6b] hover:text-[#c9872a]">
                Contribute
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#3a1515] text-center text-xs text-[#5c3a2a]">
          AARAMBH — MCA Freshers&apos;26 · University of Hyderabad · SCIS
        </div>
      </div>
    </footer>
  );
}
