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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* 3 inputs in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="subjects" className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Top 3 Subjects
          </label>
          <input
            id="subjects"
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="Add Maths, Physics, Bio"
            disabled={isLoading}
            required
            className="rounded-xl border-2 border-gray-700 bg-gray-900 text-white px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sunday" className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Hari Ahad kau?
          </label>
          <input
            id="sunday"
            type="text"
            value={sunday}
            onChange={(e) => setSunday(e.target.value)}
            placeholder="main Valorant sampai 3 pagi"
            disabled={isLoading}
            required
            className="rounded-xl border-2 border-gray-700 bg-gray-900 text-white px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="salary" className="text-xs font-bold uppercase tracking-wide text-gray-400">
            Gaji impian (RM)
          </label>
          <input
            id="salary"
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="8000"
            disabled={isLoading}
            required
            className="rounded-xl border-2 border-gray-700 bg-gray-900 text-white px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-xl bg-yellow-400 border-2 border-black px-6 py-2.5 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:active:translate-x-0 disabled:active:translate-y-0 w-full sm:w-auto sm:self-end"
      >
        {isLoading ? "⏳ Tunggu sekejap..." : "Tanya Abang 🔮"}
      </button>
    </form>
  );
}
