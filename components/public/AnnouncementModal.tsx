"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DISMISS_KEY = "aarambh-postponed-notice-dismissed";

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(DISMISS_KEY)) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      onClick={close}
    >
      <div
        className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#9b7b6b] hover:text-[#8b1a1a] transition-colors"
        >
          <X size={20} />
        </button>

        <p className="text-[#c9872a] text-xs tracking-[0.4em] uppercase text-center mb-4">
          Announcement
        </p>
        <h2
          className="text-[#8b1a1a] text-xl font-bold text-center mb-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Event Postponed
        </h2>

        <div className="text-[#5c3a2a] text-sm leading-relaxed space-y-3">
          <p>
            Hi everyone, just wanted to inform you that due to some unavoidable reasons, the
            fresher event planned for the juniors has been postponed.
          </p>
          <p>
            A big thank you to all our seniors for your support and for being willing to join
            us and make the event special. We really appreciate your understanding and
            support. ❤️
          </p>
        </div>

        <button
          onClick={close}
          className="w-full mt-6 bg-[#8b1a1a] text-white py-3 rounded uppercase tracking-widest text-sm font-semibold hover:bg-[#6b1010] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
