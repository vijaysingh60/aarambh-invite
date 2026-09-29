const MESSAGE = "FRESHER EVENT POSTPONED — NEW DATE TO BE ANNOUNCED SOON";

function MarqueeGroup() {
  return (
    <div className="flex shrink-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="mx-6 inline-flex items-center gap-6 text-xs font-semibold tracking-widest uppercase whitespace-nowrap">
          {MESSAGE}
          <span className="text-[#c9872a]">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-[#8b1a1a] text-[#fdf6ec] py-2">
      <div className="flex w-max animate-marquee">
        <MarqueeGroup />
        <div aria-hidden="true" className="flex shrink-0">
          <MarqueeGroup />
        </div>
      </div>
    </div>
  );
}
