import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { CounselorResponse } from "@/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { subjects, sunday, salary } = body ?? {};

  if (!subjects || !sunday || !salary) {
    return NextResponse.json(
      { error: "Missing required fields: subjects, sunday, salary" },
      { status: 400 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `Top 3 SPM subjects: ${subjects} | Sunday: ${sunday} | Dream monthly salary: RM${salary}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const data: CounselorResponse = JSON.parse(text);

    return NextResponse.json(data);
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Failed to get response from Gemini. Cuba lagi kejap." },
      { status: 500 }
    );
  }
}
