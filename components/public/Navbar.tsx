"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/event", label: "Event" },
  { href: "/batches", label: "Batches" },
  { href: "/scis-connect", label: "SCIS Connect" },
  { href: "/contribute", label: "Contribute" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8d5c5] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-[#8b1a1a] font-bold text-lg tracking-widest uppercase font-display">
              AARAMBH
            </span>
            <span className="text-[#9b7b6b] text-xs tracking-wide">MCA Freshers&apos;26</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#8b1a1a]"
                    : "text-[#5c3a2a] hover:text-[#8b1a1a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/rsvp"
              className="ml-2 bg-[#8b1a1a] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#6b1010] transition-colors tracking-wide uppercase"
            >
              Will You Join Us?
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#8b1a1a]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e8d5c5]">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium py-1 ${
                  pathname === link.href
                    ? "text-[#8b1a1a]"
                    : "text-[#5c3a2a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/rsvp"
              onClick={() => setOpen(false)}
              className="mt-2 bg-[#8b1a1a] text-white px-4 py-3 rounded text-center font-semibold uppercase tracking-wide text-sm"
            >
              Will You Join Us?
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
