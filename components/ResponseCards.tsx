import { CounselorResponse } from "@/types";

// ── Sub-components ────────────────────────────────────────────────────────────

function VibeCheckCard({ text }: { text: string }) {
  return (
    <div className="border-2 border-pink-500 bg-pink-100 rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-3">
        🎭 <span className="ml-1">Vibe Check</span>
      </h3>
      <p className="italic text-gray-700 before:content-['\u201C'] after:content-['\u201D'] before:text-pink-400 after:text-pink-400 before:text-2xl after:text-2xl before:leading-none after:leading-none">
        {text}
      </p>
    </div>
  );
}

function CareerCard({ career }: { career: string }) {
  return (
    <div className="border-2 border-blue-500 bg-blue-100 rounded-2xl p-5 text-center">
      <h3 className="font-bold text-lg mb-3">
        🎯 <span className="ml-1">Destined Career</span>
      </h3>
      <p className="text-2xl font-bold text-blue-800">{career}</p>
    </div>
  );
}

function RealityCheckCard({ text }: { text: string }) {
  return (
    <div className="border-2 border-orange-500 bg-orange-100 rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-3">
        💣 <span className="ml-1">Reality Check</span>
      </h3>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function RoadmapCard({ steps }: { steps: string[] }) {
  return (
    <div className="border-2 border-green-500 bg-green-100 rounded-2xl p-5">
      <h3 className="font-bold text-lg mb-3">
        🗺️ <span className="ml-1">Roadmap</span>
      </h3>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <span className="text-gray-700 pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── Wrapper ───────────────────────────────────────────────────────────────────

const DELAYS = ["0ms", "150ms", "300ms", "450ms"];

interface ResponseCardsProps {
  response: CounselorResponse;
}

export default function ResponseCards({ response }: ResponseCardsProps) {
  const cards = [
    <VibeCheckCard key="vibe" text={response.vibeCheck} />,
    <CareerCard key="career" career={response.destinedCareer} />,
    <RealityCheckCard key="reality" text={response.realityCheck} />,
    <RoadmapCard key="roadmap" steps={response.roadmap} />,
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: DELAYS[index] }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
