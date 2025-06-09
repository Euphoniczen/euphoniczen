import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { encoding_for_model, TiktokenModel } from "tiktoken";

// Helper: trim input content to token budget
async function trimToTokenLimit(
  input: string,
  model: TiktokenModel,
  maxInputTokens: number
): Promise<string> {
  const encoder = encoding_for_model(model);
  const tokens = encoder.encode(input); // Uint8Array

  if (tokens.length > maxInputTokens) {
    const trimmedTokens = tokens.slice(0, maxInputTokens);
    const trimmed = encoder.decode(trimmedTokens);
    encoder.free();
    return typeof trimmed === "string" ? trimmed : new TextDecoder().decode(trimmed);
  }

  encoder.free();
  return input;
}

export async function POST(req: NextRequest) {
  const { dataForAi } = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  const instructionToExtract =
    "You are an assistant. When the user provides input, extract relevant data like Instagram @, info about the curator, etc.";
  const instructionToComplete =
    "Based on the fetched data, return a clean and readable HTML table with relevant information about the curator or platform. Use proper <table>, <thead>, <tbody>, <tr>, and <td> tags. Include clickable links where relevant. Do not return Markdown or plain text formatting.";

  const braveSecretKey = process.env.BRAVE_SEARCH_SECRET_KEY || "no secret key found or invalid secret key";

  try {
    // Step 1: Extract key data from user input
    const openAi_Extract_dataForAi = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: instructionToExtract },
        { role: "user", content: dataForAi },
      ],
      max_tokens: 100,
    });

    const extractedContentAi = openAi_Extract_dataForAi.choices[0]?.message?.content || "";

    // Step 2: Perform Brave search
    const params = new URLSearchParams({
      q: extractedContentAi,
      count: "20",
    });

    const braveResponse = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "x-subscription-token": braveSecretKey,
      },
    });

    const braveData = await braveResponse.json();

    // Step 3: Prepare brave data input and trim to max input tokens
    const braveJson = JSON.stringify(braveData);

    // Use a valid TiktokenModel enum value for GPT-4o
    const modelForEncoding: TiktokenModel = "gpt-4o";

    const trimmedInput = await trimToTokenLimit(braveJson, modelForEncoding, 500);

    // Step 4: Feed trimmed data to OpenAI for interpretation
    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: instructionToComplete },
        { role: "user", content: trimmedInput },
      ],
      max_tokens: 100,
    });

    const fullAiResponseData = openAIResponse.choices[0]?.message?.content || "";

    return NextResponse.json({
      status: 200,
      fullAiResponseData,
      braveData,
    });
  } catch (err) {
    console.error("Internal server error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}