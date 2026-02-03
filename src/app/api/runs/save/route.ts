import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  const run = await prisma.workflowRun.create({
    data: {
      workflowId: body.workflowId,
      userId,
      startedAt: new Date(body.startedAt),
      finishedAt: new Date(body.finishedAt),
      status: body.status,
      result: body.result,
    },
  });

  return NextResponse.json(run);
}
