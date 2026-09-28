# Abang Kaunselor — Build Plan

## Overview

Build a single Next.js (App Router) full-stack web app called **Abang Kaunselor** — a brutally honest AI career counselor for Malaysian SPM students. The app collects three inputs from the user, calls a Next.js API route that forwards the request to Google Gemini (`gemini-1.5-flash`) with a fixed system prompt, parses the structured JSON response, and renders four distinct visual cards in a chat-style interface. Session history lives in React state only; it clears on reload.

**Stack:**
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v3
- AI: Google Gemini via `@google/generative-ai` SDK
- State: React `useState` only (no persistence)

**Non-goals:**
- No authentication
- No database
- No deployment pipeline (user handles that)
- No streaming responses (single JSON blob is fine)

---

## Sub-Tasks

---

### 1. Project Scaffold

**Intent:** Bootstrap the Next.js app with TypeScript + Tailwind and install the Gemini SDK. Establish the folder layout that every other sub-task depends on.

**Expected Outcomes:**
- `npx create-next-app` output with TypeScript, Tailwind, App Router, no src/ dir
- `@google/generative-ai` package installed
- `.env.local.example` with `GEMINI_API_KEY=` placeholder
- `GEMINI_API_KEY` is read from `process.env` — never hardcoded
- App runs with `npm run dev` and shows the default Next.js page

**Todo List:**
1. Run `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"` in the workspace root
2. Install `@google/generative-ai`
3. Delete the default `app/page.tsx` boilerplate content (keep the file, just clear it for the next sub-task)
4. Create `.env.local.example` with `GEMINI_API_KEY=your_key_here`
5. Add `.env.local` to `.gitignore` (should already be there from create-next-app)

**Relevant Context:**
- Workspace is empty — pure greenfield
- API key must come from `process.env.GEMINI_API_KEY`

**Status:** [x] done

---

### 2. Gemini API Route

**Intent:** Create the server-side API route `/api/counsel` that accepts the three user inputs, sends them to Gemini with the system prompt, and returns the parsed JSON response. This keeps the API key server-side only.

**Expected Outcomes:**
- `POST /api/counsel` accepts `{ subjects: string, sunday: string, salary: string }`
- Returns `200` with `{ vibeCheck, destinedCareer, realityCheck, roadmap }` on success
- Returns `400` if any field is missing, `500` on Gemini error
- The system prompt constant lives in `lib/systemPrompt.ts`
- The Gemini call uses `gemini-1.5-flash` with `responseMimeType: "application/json"` to enforce JSON output

**Todo List:**
1. Create `lib/systemPrompt.ts` exporting the full `SYSTEM_PROMPT` string (exact text from the user's brief — do not modify it)
2. Create `app/api/counsel/route.ts` as a Next.js Route Handler (`POST`)
3. Inside the handler: validate the three fields, build a user message string, call Gemini with the system prompt injected as a system instruction, parse the response text as JSON, return it
4. Add a `types/index.ts` with the `CounselorResponse` TypeScript interface matching the four output fields

**Relevant Context:**
- `@google/generative-ai` v0.x API: `new GoogleGenerativeAI(key)`, `.getGenerativeModel({ model, systemInstruction })`, `.generateContent(prompt)`, response via `.response.text()`
- Gemini does not have a native "system" role in the same way as OpenAI — pass `systemInstruction` in the model config
- Set `generationConfig: { responseMimeType: "application/json" }` to get clean JSON back
- User message template: `"Top 3 SPM subjects: {subjects} | Sunday: {sunday} | Dream monthly salary: RM{salary}"`

**Status:** [x] done

---

### 3. Input Form Component

**Intent:** Build the three-field input form that a user fills in before submitting. This is the primary interaction surface.

**Expected Outcomes:**
- A single `InputForm` component at `components/InputForm.tsx`
- Three fields: subjects (text), sunday habit (text), dream salary (number/text)
- A submit button that shows a loading state while the API call is in flight
- Form is disabled while loading
- On submit, calls a parent-provided `onSubmit(subjects, sunday, salary)` callback
- Styled in the vibrant/playful Gen Z aesthetic: rounded corners, bold accent colour, playful placeholder text in Manglish

**Todo List:**
1. Create `components/InputForm.tsx` with the three controlled inputs and local form state
2. Use Tailwind utility classes for styling — bold border, rounded-2xl cards, bright accent (`#FACC15` yellow or similar)
3. Add Manglish placeholder hints (e.g. "e.g. Add Maths, Physics, Biology", "e.g. main Valorant sampai 3 pagi", "e.g. 8000")
4. Show a spinner or "Tunggu sekejap..." text on the button when `isLoading` prop is true
5. Disable all inputs and the button while `isLoading` is true

**Relevant Context:**
- Parent (`app/page.tsx`) owns the loading state and history; this component just fires the callback
- No external form library needed — plain React state is fine

**Status:** [x] done

---

### 4. Response Card Components

**Intent:** Parse the Gemini JSON response and render each of the four fields as a distinct, visually differentiated card. This is the "delight" layer of the app.

**Expected Outcomes:**
- Four card components (or one with variants): `VibeCheckCard`, `CareerCard`, `RealityCheckCard`, `RoadmapCard`
- Each card has a distinct accent colour and an icon/emoji header
- `RoadmapCard` renders the steps array as a numbered list with step numbers styled as bold badges
- A `ResponseCards` wrapper component at `components/ResponseCards.tsx` that accepts a `CounselorResponse` and renders all four
- Cards animate in sequentially (CSS `animation-delay` or Tailwind `animate-` classes — no heavy library)

**Todo List:**
1. Create `components/ResponseCards.tsx` as the wrapper
2. Implement `VibeCheckCard` — bold quote style, accent: hot pink / fuchsia (`#EC4899`)
3. Implement `CareerCard` — large centred career title, accent: electric blue (`#3B82F6`), badge-like
4. Implement `RealityCheckCard` — paragraph text, accent: orange (`#F97316`)
5. Implement `RoadmapCard` — numbered steps, accent: green (`#22C55E`), each step in its own mini-card row
6. Add `animate-fade-in-up` CSS keyframe in `globals.css` and apply it to each card with increasing `animation-delay`

**Relevant Context:**
- `CounselorResponse` type from `types/index.ts`
- Keep all styling in Tailwind classes; no CSS modules needed
- No animation library — keep it lightweight

**Status:** [x] done

---

### 5. Chat History + Main Page Assembly

**Intent:** Wire everything together into `app/page.tsx`. Maintain an in-memory list of past reads that the user can scroll through, with the newest response always visible.

**Expected Outcomes:**
- `app/page.tsx` holds `history: Array<{ input: InputSnapshot, response: CounselorResponse }>` in `useState`
- On form submit: call `/api/counsel`, push result to history, scroll to latest
- Previous responses are shown above the current one (oldest at top, newest at bottom), separated by a divider showing the original inputs
- If the API returns an error, show a friendly Manglish error message inline (not a crash)
- The input form is always pinned near the bottom of the viewport
- App title: "Abang Kaunselor 💬" in a bold header
- Mobile-first layout (single column); looks decent on desktop too

**Todo List:**
1. Build `app/page.tsx` with `history` state, `isLoading` state, and an `handleSubmit` async function that POSTs to `/api/counsel`
2. Map over `history` to render past `ResponseCards` with their input summary above each
3. Add a `useRef` + `scrollIntoView` to auto-scroll to the latest response after it loads
4. Render `InputForm` in a sticky bottom section with a subtle top shadow
5. Add a top header bar with the app name and a short tagline ("Masukkan details kau. Abang tengok.")
6. Handle error state: catch fetch errors and show a dismissable inline error card

**Relevant Context:**
- `InputSnapshot` type: `{ subjects: string, sunday: string, salary: string }`
- `ResponseCards` from sub-task 4, `InputForm` from sub-task 3
- Tailwind `sticky bottom-0` + `shadow-[0_-4px_12px_rgba(0,0,0,0.08)]` for the form bar

**Status:** [x] done

---

### 6. Polish & README

**Intent:** Final touches — global font, favicon, meta tags, and a README so the user knows how to run the project with their own API key.

**Expected Outcomes:**
- Google Font `Plus Jakarta Sans` (or `Nunito`) imported via `next/font/google` — matches the playful aesthetic
- `app/layout.tsx` sets a dark/colourful background, the font class, and a `<title>` + `<meta description>`
- `public/favicon.ico` replaced (or `app/icon.tsx` used) with a simple emoji favicon (🎓)
- `README.md` documents: prerequisites, how to get a Gemini API key, env setup, `npm run dev`

**Todo List:**
1. Update `app/layout.tsx` with `next/font/google` import, background colour, and meta tags
2. Create `app/icon.tsx` returning a simple emoji SVG favicon
3. Write `README.md` with setup instructions
4. Do a final pass: ensure no TypeScript errors, no unused imports, Tailwind classes are valid

**Relevant Context:**
- `next/font/google` is the recommended way in App Router — no `<link>` tags in `<head>`
- Emoji favicon via `app/icon.tsx` is the App Router native approach

**Status:** [x] done
