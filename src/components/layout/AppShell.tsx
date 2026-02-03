"use client";

import WorkflowCanvas from "@/components/canvas/WorkflowCanvas";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function AppShell() {
    console.log("APPSHELL RENDERED");
  return (
    <div className="grid grid-cols-[260px_1fr_320px] h-full bg-[#0b0b0d] text-neutral-200">
      <LeftSidebar />

      <main className="relative overflow-hidden">
        <WorkflowCanvas />
      </main>

      <RightSidebar />
    </div>
  );
}
