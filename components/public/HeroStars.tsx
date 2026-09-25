"use client";

// Predefined to avoid hydration mismatch
const STARS = [
  // Left side
  { id: 1,  left: "2%",   size: 20, dur: 9,  delay: 0,   opacity: 0.30, sym: "❋" },
  { id: 2,  left: "5%",   size: 14, dur: 11, delay: 1.5, opacity: 0.20, sym: "✦" },
  { id: 3,  left: "8%",   size: 24, dur: 8,  delay: 3.2, opacity: 0.35, sym: "❋" },
  { id: 4,  left: "3%",   size: 16, dur: 13, delay: 5.8, opacity: 0.18, sym: "✦" },
  { id: 5,  left: "11%",  size: 18, dur: 10, delay: 2.1, opacity: 0.25, sym: "❋" },
  { id: 6,  left: "6%",   size: 12, dur: 7,  delay: 7.4, opacity: 0.22, sym: "✦" },
  { id: 7,  left: "1%",   size: 22, dur: 12, delay: 4.0, opacity: 0.28, sym: "❋" },
  { id: 8,  left: "9%",   size: 15, dur: 9,  delay: 6.5, opacity: 0.20, sym: "✦" },
  { id: 9,  left: "4%",   size: 19, dur: 14, delay: 0.8, opacity: 0.32, sym: "❋" },
  { id: 10, left: "13%",  size: 13, dur: 8,  delay: 9.0, opacity: 0.18, sym: "✦" },
  { id: 11, left: "7%",   size: 21, dur: 11, delay: 3.7, opacity: 0.26, sym: "❋" },
  { id: 12, left: "10%",  size: 17, dur: 10, delay: 8.2, opacity: 0.22, sym: "✦" },

  // Right side
  { id: 13, left: "98%",  size: 22, dur: 10, delay: 0.5, opacity: 0.30, sym: "❋" },
  { id: 14, left: "95%",  size: 14, dur: 8,  delay: 2.3, opacity: 0.20, sym: "✦" },
  { id: 15, left: "92%",  size: 20, dur: 12, delay: 4.8, opacity: 0.35, sym: "❋" },
  { id: 16, left: "97%",  size: 16, dur: 9,  delay: 6.1, opacity: 0.18, sym: "✦" },
  { id: 17, left: "89%",  size: 18, dur: 11, delay: 1.4, opacity: 0.25, sym: "❋" },
  { id: 18, left: "94%",  size: 12, dur: 7,  delay: 7.9, opacity: 0.22, sym: "✦" },
  { id: 19, left: "99%",  size: 24, dur: 13, delay: 3.3, opacity: 0.28, sym: "❋" },
  { id: 20, left: "91%",  size: 15, dur: 9,  delay: 5.6, opacity: 0.20, sym: "✦" },
  { id: 21, left: "96%",  size: 19, dur: 10, delay: 0.2, opacity: 0.32, sym: "❋" },
  { id: 22, left: "87%",  size: 13, dur: 8,  delay: 8.7, opacity: 0.18, sym: "✦" },
  { id: 23, left: "93%",  size: 21, dur: 14, delay: 2.9, opacity: 0.26, sym: "❋" },
  { id: 24, left: "90%",  size: 17, dur: 11, delay: 6.8, opacity: 0.22, sym: "✦" },
];

export default function HeroStars() {
  return (
    <>
      {STARS.map((s) => (
        <span
          key={s.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: s.left,
            fontSize: s.size,
            color: "#c9872a",
            opacity: 0,
            animation: `starFall ${s.dur}s linear ${s.delay}s infinite`,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          {s.sym}
        </span>
      ))}
    </>
  );
}
