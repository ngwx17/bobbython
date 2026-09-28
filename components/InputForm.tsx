"use client";

import { useState, FormEvent } from "react";

interface InputFormProps {
  onSubmit: (subjects: string, sunday: string, salary: string) => void;
  isLoading: boolean;
}

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [subjects, setSubjects] = useState("");
  const [sunday, setSunday] = useState("");
  const [salary, setSalary] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(subjects, sunday, salary);
    setSubjects("");
    setSunday("");
    setSalary("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="subjects"
          className="text-sm font-bold uppercase tracking-wide text-gray-700"
        >
          Top 3 Subjects SPM
        </label>
        <input
          id="subjects"
          type="text"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          placeholder="e.g. Add Maths, Physics, Biology"
          disabled={isLoading}
          required
          className="rounded-2xl border-2 border-black px-4 py-3 text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="sunday"
          className="text-sm font-bold uppercase tracking-wide text-gray-700"
        >
          Kau buat apa hari Ahad?
        </label>
        <input
          id="sunday"
          type="text"
          value={sunday}
          onChange={(e) => setSunday(e.target.value)}
          placeholder="e.g. main Valorant sampai 3 pagi"
          disabled={isLoading}
          required
          className="rounded-2xl border-2 border-black px-4 py-3 text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="salary"
          className="text-sm font-bold uppercase tracking-wide text-gray-700"
        >
          Gaji impian sebulan (RM)
        </label>
        <input
          id="salary"
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="e.g. 8000"
          disabled={isLoading}
          required
          className="rounded-2xl border-2 border-black px-4 py-3 text-sm font-medium placeholder-gray-400 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 rounded-2xl bg-yellow-400 border-2 border-black px-6 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:active:translate-x-0 disabled:active:translate-y-0"
      >
        {isLoading ? "Tunggu sekejap..." : "Tanya Abang 🔮"}
      </button>
    </form>
  );
}
