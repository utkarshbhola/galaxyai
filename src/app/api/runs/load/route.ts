import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([], { status: 401 });

  const runs = await prisma.workflowRun.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
  });

  return NextResponse.json(runs);
}
