import PublicLayout from "@/components/public/PublicLayout";
import ContributeForm from "@/components/public/ContributeForm";
import Image from "next/image";
import { Info } from "lucide-react";

export default function ContributePage() {
  return (
    <PublicLayout>
      <div className="bg-[#faf8f5]">
        {/* Hero */}
        <section className="bg-[#1a0505] py-20 px-4 text-center">
          <p className="text-[#9b7b6b] text-xs tracking-[0.5em] uppercase mb-4">Optional</p>
          <h1 className="text-[#fdf6ec] text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Want to Contribute?
          </h1>
          <p className="text-[#9b7b6b] max-w-md mx-auto text-sm">
            Contribution is completely optional. Every rupee helps make the evening more memorable.
          </p>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Notice */}
          <div className="bg-[#fdf6ec] border border-[#e8d5c5] rounded-lg p-4 flex gap-3 mb-10">
            <Info size={18} className="text-[#8b1a1a] mt-0.5 shrink-0" />
            <p className="text-[#5c3a2a] text-sm leading-relaxed">
              <strong>Contribution is completely voluntary</strong> and will help us make the event more memorable.
              There is absolutely no obligation. If you choose to contribute, please scan and pay via PhonePe
              and then fill the form below to record your transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* QR Code */}
            <div>
              <h2 className="text-[#8b1a1a] text-xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Scan & Pay
              </h2>
              <div className="bg-white border border-[#e8d5c5] rounded-lg p-6 text-center">
                <div className="bg-[#fdf6ec] border-2 border-dashed border-[#e8d5c5] rounded p-8 mb-4">
                  <div className="w-48 h-48 mx-auto flex items-center justify-center bg-[#f5f0eb] rounded">
                    <div className="text-center">
                      <p className="text-[#9b7b6b] text-xs">QR Code</p>
                      <p className="text-[#9b7b6b] text-xs mt-1">(Replace with actual QR)</p>
                    </div>
                  </div>
                  <p className="text-[#9b7b6b] text-xs mt-3 italic">
                    📌 Replace /public/contribution-qr.png with actual event QR code
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-[#1a0a0a] text-base">Kumar Shivam</p>
                  <p className="text-[#8b1a1a] text-sm">MCA 2025 Batch</p>
                  <a
                    href="tel:9570068163"
                    className="text-[#9b7b6b] hover:text-[#8b1a1a] text-sm block mt-1"
                  >
                    9570068163
                  </a>
                </div>
                <p className="text-[#9b7b6b] text-xs mt-4 font-medium">Pay via PhonePe / UPI</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-[#8b1a1a] text-xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Record Your Contribution
              </h2>
              <p className="text-[#9b7b6b] text-sm mb-6">
                After paying, fill the form below to record your transaction.
                Your contribution will be verified by the admin.
              </p>
              <ContributeForm />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
