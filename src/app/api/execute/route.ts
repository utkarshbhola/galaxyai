import { NextResponse } from "next/server";
import { runLLMTask } from "@/lib/trigger/llmTask";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await runLLMTask.triggerAndWait({
    prompt: body.prompt,
  });

  return NextResponse.json({
    output: result,
  });
}
