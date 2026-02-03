"use client";

import { ReactNode } from "react";
import { useExecutionStore } from "@/store/executionStore";

export default function BaseNode({
  title,
  children,
  nodeId,
}: {
  title: string;
  children: ReactNode;
  nodeId?: string;
}) {
  const runningNodes = useExecutionStore((s) => s.runningNodes);
  const isRunning = nodeId && runningNodes.has(nodeId);

  return (
    <div
      className={`rounded-xl border bg-neutral-900 text-white min-w-[240px] transition ${
        isRunning
          ? "border-purple-500 shadow-[0_0_20px_#a855f7] animate-pulse"
          : "border-neutral-800"
      }`}
    >
      <div className="px-4 py-2 border-b border-neutral-800 text-sm font-medium">
        {title}
      </div>
      <div className="p-4 space-y-3 text-sm">{children}</div>
    </div>
  );
}
