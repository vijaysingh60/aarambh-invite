"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { name: "IMG_3115", w: 4000, h: 6000 },
  { name: "IMG_3123", w: 6000, h: 4000 },
  { name: "IMG_3129", w: 6000, h: 4000 },
  { name: "IMG_3144", w: 6000, h: 4000 },
  { name: "IMG_3152", w: 6000, h: 4000 },
  { name: "IMG_3165", w: 4000, h: 6000 },
  { name: "IMG_3170", w: 4000, h: 6000 },
  { name: "IMG_3202", w: 6000, h: 4000 },
  { name: "IMG_3203", w: 6000, h: 4000 },
  { name: "IMG_3232", w: 6000, h: 4000 },
  { name: "IMG_3238", w: 6000, h: 4000 },
  { name: "IMG_3337", w: 6000, h: 4000 },
  { name: "IMG_3340", w: 6000, h: 4000 },
  { name: "IMG_3353", w: 6000, h: 4000 },
  { name: "IMG_3373", w: 6000, h: 4000 },
  { name: "IMG_3378", w: 6000, h: 4000 },
  { name: "IMG_3389", w: 6000, h: 4000 },
  { name: "IMG_3450", w: 4000, h: 6000 },
  { name: "IMG_3497r", w: 4000, h: 6000 },
];

export default function MomentsGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = () => setLightbox(null);
  const prev = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)), []);
  const next = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % photos.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* Pinterest-style CSS columns masonry */}
      <div className="columns-2 lg:columns-3 gap-3 space-y-3">
        {photos.map((photo, idx) => (
          <button
            key={photo.name}
            onClick={() => setLightbox(idx)}
            className="break-inside-avoid block w-full rounded-xl overflow-hidden border border-[#e8d5c5] hover:border-[#8b1a1a] transition-all duration-200 hover:shadow-xl hover:scale-[1.015] focus:outline-none group"
          >
            <Image
              src={`/moments/${photo.name}.webp`}
              alt="AARAMBH moment"
              width={photo.w}
              height={photo.h}
              style={{ width: "100%", height: "auto" }}
              className="block group-hover:brightness-95 transition-[filter] duration-200"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/moments/${photos[lightbox].name}.webp`}
              alt="AARAMBH moment"
              width={photos[lightbox].w}
              height={photos[lightbox].h}
              style={{ maxHeight: "88vh", maxWidth: "90vw", width: "auto", height: "auto" }}
              className="rounded-lg shadow-2xl"
              priority
            />
            <p className="text-white/40 text-xs mt-3">
              {lightbox + 1} / {photos.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}
