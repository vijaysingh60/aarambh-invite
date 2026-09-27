"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ClassLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: fd.get("rollNumber") as string,
      password: fd.get("password") as string,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid roll number or password. Please try again.");
    } else {
      router.push("/admin/attendees");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0505] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-[#c9872a] font-bold text-2xl tracking-widest uppercase mb-1">AARAMBH</p>
          <p className="text-[#9b7b6b] text-xs uppercase tracking-wider">Class Login</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-[#1a0a0a] font-bold text-xl mb-2 text-center" style={{ fontFamily: "Georgia, serif" }}>
            Sign In
          </h1>
          <p className="text-[#9b7b6b] text-xs text-center mb-6">
            View the attendee list for your class.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Roll Number</label>
              <input
                name="rollNumber"
                type="text"
                required
                autoComplete="username"
                autoCapitalize="characters"
                className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8b1a1a] uppercase placeholder:normal-case"
                placeholder="25MCMC01"
              />
            </div>
            <div>
              <label className="block text-[#1a0a0a] text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8b1a1a]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8b1a1a] text-white py-3 rounded font-semibold text-sm uppercase tracking-widest hover:bg-[#6b1010] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-[#9b7b6b] text-xs text-center mt-6">
          Access restricted to authorized class representatives.
        </p>
      </div>
    </div>
  );
}
