import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/event`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/rsvp`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/batches`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/batches/2025`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/batches/2026`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/scis-connect`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contribute`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
