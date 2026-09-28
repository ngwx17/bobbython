# Abang Kaunselor 💬

Kaunselor kerjaya AI yang paling jujur untuk pelajar SPM Malaysia.

## Prerequisites

- Node.js 18+
- A Google Gemini API key (free tier works)

## Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

## Setup

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example env file and add your key:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and replace `your_key_here` with your actual Gemini API key.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Google Gemini (`gemini-1.5-flash`) via `@google/generative-ai`
