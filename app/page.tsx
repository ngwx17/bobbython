"use client";

import { useState, useRef } from "react";
import InputForm from "@/components/InputForm";
import ResponseCards from "@/components/ResponseCards";
import { CounselorResponse, InputSnapshot } from "@/types";

interface HistoryEntry {
  input: InputSnapshot;
  response: CounselorResponse;
}

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(subjects: string, sunday: string, salary: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/counsel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects, sunday, salary }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong lah.");
      }

      const data: CounselorResponse = await res.json();
      setHistory((prev) => [...prev, { input: { subjects, sunday, salary }, response: data }]);

      // Scroll to bottom after state update
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Aduh, something went wrong. Cuba lagi!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Fixed Header ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-gray-950/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-black tracking-tight">Abang Kaunselor 💬</h1>
          <p className="text-sm text-gray-400 mt-0.5">Masukkan details kau. Abang tengok.</p>
        </div>
      </header>

      {/* ── Scrollable Chat Area ──────────────────────────────────────────────── */}
      <main className="flex-1 pt-[88px] pb-[160px]">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-10">
          {history.length === 0 && !isLoading && (
            <p className="text-center text-gray-500 text-sm mt-12">
              Belum ada history lagi. Submit form bawah untuk tanya Abang! 👇
            </p>
          )}

          {history.map((entry, i) => (
            <div key={i} className="flex flex-col gap-5">
              {/* Input summary divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-800" />
                <div className="text-xs text-gray-500 bg-gray-900 border border-gray-700 rounded-full px-3 py-1 whitespace-nowrap shrink-0">
                  📚 {entry.input.subjects} &nbsp;·&nbsp; ☀️ {entry.input.sunday} &nbsp;·&nbsp; 💰 RM{entry.input.salary}
                </div>
                <div className="flex-1 h-px bg-gray-800" />
              </div>

              {/* Response cards */}
              <ResponseCards response={entry.response} />
            </div>
          ))}

          {isLoading && (
            <div className="text-center text-yellow-400 text-sm animate-pulse py-6">
              Abang tengah fikir... 🔮
            </div>
          )}

          {/* Bottom anchor for auto-scroll */}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* ── Fixed Bottom Bar ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-950/95 backdrop-blur border-t border-gray-800 shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto px-4 pt-3 pb-4 flex flex-col gap-3">
          {/* Dismissable error card */}
          {error && (
            <div className="flex items-start justify-between gap-3 rounded-2xl border-2 border-red-500 bg-red-950/60 px-4 py-3 text-sm text-red-300">
              <span>⚠️ {error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-200 font-bold shrink-0 leading-none"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
