import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AARAMBH — MCA Freshers'26 | University of Hyderabad",
  description:
    "AARAMBH — MCA Freshers'26 with our Alumni at the University of Hyderabad, SCIS. Different batches. Same roots.",
  keywords: ["AARAMBH", "MCA", "University of Hyderabad", "SCIS", "Freshers", "Alumni"],
  openGraph: {
    title: "AARAMBH — MCA Freshers'26 | University of Hyderabad",
    description: "Different batches. Same roots. Join us for AARAMBH — MCA Freshers'26.",
    type: "website",
    siteName: "AARAMBH",
  },
  twitter: {
    card: "summary_large_image",
    title: "AARAMBH — MCA Freshers'26 | University of Hyderabad",
    description: "Different batches. Same roots.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {children}
      </body>
    </html>
  );
}
