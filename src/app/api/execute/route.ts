import { NextResponse } from "next/server";
import { runLLMTask } from "@/lib/trigger/llmTask";

export async function POST(req: Request) {
  const body = await req.json();

  const handle = await runLLMTask.trigger({
    prompt: body.prompt,
  });

  const result = await handle.result();

  return NextResponse.json({
    output: result,
  });
}
