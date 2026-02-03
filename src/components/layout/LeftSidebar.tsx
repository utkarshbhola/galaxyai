"use client";

import { nanoid } from "nanoid";
import {
  FileText,
  Image,
  Video,
  Crop,
  Film,
  Sparkles,
  Play,
} from "lucide-react";
import { useWorkflowStore } from "@/store/workflowStore";
import { useExecutionStore } from "@/store/executionStore";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NodeButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm
                 text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

export default function LeftSidebar() {
  const addNode = useWorkflowStore((s) => s.addNode);
  const runWorkflow = useExecutionStore((s) => s.runWorkflow);

  return (
    <aside className="w-[260px] shrink-0 border-r border-neutral-800 bg-neutral-950 px-3 py-4">
      {/* ACTION */}
      <button
        onClick={runWorkflow}
        className="flex items-center justify-center gap-2 w-full mb-4
                   rounded-md bg-purple-600 hover:bg-purple-700
                   py-2 text-sm font-medium text-white transition"
      >
        <Play size={16} />
        Run Workflow
      </button>

      {/* INPUTS */}
      <Section title="Inputs">
        <NodeButton
          icon={FileText}
          label="Text"
          onClick={() =>
            addNode({
              id: nanoid(),
              type: "text",
              position: { x: 200, y: 200 },
              data: { text: "" },
            })
          }
        />

        <NodeButton
          icon={Image}
          label="Image"
          onClick={() =>
            addNode({
              id: nanoid(),
              type: "uploadImage",
              position: { x: 200, y: 260 },
              data: {},
            })
          }
        />

        <NodeButton
          icon={Video}
          label="Video"
          onClick={() =>
            addNode({
              id: nanoid(),
              type: "uploadVideo",
              position: { x: 200, y: 320 },
              data: {},
            })
          }
        />
      </Section>

      {/* TRANSFORMS */}
      <Section title="Transforms">
        <NodeButton
          icon={Crop}
          label="Crop Image"
          onClick={() =>
            addNode({
              id: nanoid(),
              type: "cropImage",
              position: { x: 400, y: 240 },
              data: {},
            })
          }
        />

        <NodeButton
          icon={Film}
          label="Extract Frame"
          onClick={() =>
            addNode({
              id: nanoid(),
              type: "extractFrame",
              position: { x: 400, y: 300 },
              data: {},
            })
          }
        />
      </Section>

      {/* AI */}
      <Section title="AI">
        <NodeButton
          icon={Sparkles}
          label="Run LLM"
          onClick={() =>
            addNode({
              id: nanoid(),
              type: "llm",
              position: { x: 600, y: 260 },
              data: {},
            })
          }
        />
      </Section>
    </aside>
  );
}
