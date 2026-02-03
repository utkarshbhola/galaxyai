import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  const workflow = await prisma.workflow.upsert({
    where: { id: body.id ?? "" },
    update: {
      nodes: body.nodes,
      edges: body.edges,
    },
    create: {
      userId,
      name: body.name ?? "Untitled Workflow",
      nodes: body.nodes,
      edges: body.edges,
    },
  });

  return NextResponse.json(workflow);
}
