"use client";

import { useState, useRef } from "react";
import { importStudents } from "@/actions/students";
import { Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";

interface ParsedRow {
  name: string;
  rollNumber: string;
  batch: string;
  background?: string;
  email?: string;
  mobile?: string;
}

interface ImportResults {
  imported: number;
  updated: number;
  failed: number;
  errors: string[];
}

function parseCSV(text: string): { valid: ParsedRow[]; invalid: string[] } {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return { valid: [], invalid: [] };

  const headerLine = lines[0].trim().toLowerCase();
  const headers = headerLine.split(",").map((h) => h.trim().replace(/^"|"$/g, ""));

  const nameIdx = headers.indexOf("name");
  const rollIdx = headers.indexOf("rollnumber");
  const batchIdx = headers.indexOf("batch");
  const bgIdx = headers.indexOf("background");
  const emailIdx = headers.indexOf("email");
  const mobileIdx = headers.indexOf("mobile");

  if (nameIdx === -1 || rollIdx === -1 || batchIdx === -1) {
    return { valid: [], invalid: ["CSV must have: name, rollNumber, batch columns"] };
  }

  const valid: ParsedRow[] = [];
  const invalid: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle quoted fields
    const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));

    const name = cols[nameIdx];
    const rollNumber = cols[rollIdx];
    const batch = cols[batchIdx];

    if (!name || !rollNumber || !batch) {
      invalid.push(`Row ${i + 1}: missing required fields (name, rollNumber, batch)`);
      continue;
    }

    valid.push({
      name,
      rollNumber: rollNumber.toUpperCase(),
      batch,
      background: bgIdx >= 0 ? cols[bgIdx] || undefined : undefined,
      email: emailIdx >= 0 ? cols[emailIdx] || undefined : undefined,
      mobile: mobileIdx >= 0 ? cols[mobileIdx] || undefined : undefined,
    });
  }

  return { valid, invalid };
}

export default function CSVImport() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ valid: ParsedRow[]; invalid: string[] } | null>(null);
  const [results, setResults] = useState<ImportResults | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setResults(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setPreview(parseCSV(text));
    };
    reader.readAsText(f);
  }

  async function handleImport() {
    if (!preview?.valid.length) return;
    if (!confirm(`Import ${preview.valid.length} student records?`)) return;

    setLoading(true);
    const res = await importStudents(preview.valid);
    setLoading(false);

    if (res.success && res.results) {
      setResults(res.results as ImportResults);
      setPreview(null);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div
        className="border-2 border-dashed border-[#e8d5c5] rounded-xl p-10 text-center cursor-pointer hover:border-[#8b1a1a] hover:bg-[#fdf6ec] transition-colors"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files[0];
          if (f?.name.endsWith(".csv")) handleFile(f);
        }}
      >
        <Upload className="mx-auto text-[#8b1a1a] mb-3" size={36} />
        <p className="text-[#1a0a0a] font-medium text-sm">
          {file ? file.name : "Click or drag a CSV file here"}
        </p>
        <p className="text-[#9b7b6b] text-xs mt-1">Only .csv files are accepted</p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {/* Results banner */}
      {results && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-600" size={20} />
            <p className="text-green-800 font-semibold">Import Complete</p>
          </div>
          <div className="text-sm text-green-700 space-y-1">
            <p>✓ {results.imported} new students inserted</p>
            <p>↻ {results.updated} existing students updated</p>
            {results.failed > 0 && <p className="text-red-600">✗ {results.failed} failed</p>}
          </div>
          {results.errors.length > 0 && (
            <div className="mt-3 space-y-1">
              {results.errors.slice(0, 5).map((err, i) => (
                <p key={i} className="text-xs text-red-600">{err}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="space-y-4">
          {preview.invalid.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-red-500" size={18} />
                <p className="text-red-700 font-semibold text-sm">{preview.invalid.length} invalid row{preview.invalid.length !== 1 ? "s" : ""}</p>
              </div>
              {preview.invalid.slice(0, 5).map((err, i) => (
                <p key={i} className="text-xs text-red-600">{err}</p>
              ))}
              {preview.invalid.length > 5 && <p className="text-xs text-red-500 mt-1">...and {preview.invalid.length - 5} more</p>}
            </div>
          )}

          {preview.valid.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="text-[#8b1a1a]" size={18} />
                  <p className="text-[#1a0a0a] font-semibold text-sm">{preview.valid.length} valid records to import</p>
                </div>
                <button
                  onClick={handleImport}
                  disabled={loading}
                  className="bg-[#8b1a1a] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#6b1010] disabled:opacity-50"
                >
                  {loading ? "Importing..." : "Confirm Import"}
                </button>
              </div>

              <div className="bg-white border border-[#e8d5c5] rounded-xl overflow-hidden">
                <div className="overflow-x-auto max-h-72">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-[#fdf6ec]">
                      <tr className="text-[#9b7b6b] text-xs uppercase tracking-wider">
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Roll No.</th>
                        <th className="px-4 py-3 text-left">Batch</th>
                        <th className="px-4 py-3 text-left">Background</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f0ea]">
                      {preview.valid.map((s, i) => (
                        <tr key={i} className="hover:bg-[#fdf9f6]">
                          <td className="px-4 py-2 font-medium text-[#1a0a0a]">{s.name}</td>
                          <td className="px-4 py-2 font-mono text-xs text-[#8b1a1a]">{s.rollNumber}</td>
                          <td className="px-4 py-2 text-[#5c3a2a]">MCA {s.batch}</td>
                          <td className="px-4 py-2 text-[#9b7b6b] text-xs">{s.background || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
