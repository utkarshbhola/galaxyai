"use client";

import HistoryPanel from "@/components/history/HistoryPanel";

export default function RightSidebar() {
  return (
    <aside className="border-l border-neutral-800 p-4">
      <h2 className="text-sm font-semibold text-neutral-400 mb-3">
        Workflow History
      </h2>
      <HistoryPanel />
    </aside>
  );
}
