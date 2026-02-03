"use client";

import { Handle, Position, NodeProps } from "reactflow";
import BaseNode from "./base/BaseNode";
import { useExecutionStore } from "@/store/executionStore";

type LLMData = {
  model?: string;
  output?: string;
};

export default function LLMNode({ id, data }: NodeProps<LLMData>) {
  const { runningNodeId, runNode } = useExecutionStore();

  const isRunning = runningNodeId === id;

  return (
    <BaseNode title="Run LLM" nodeId={id}>
      {/* INPUT HANDLES */}
      <Handle
        type="target"
        position={Position.Left}
        id="system"
        className="w-3 h-3 bg-neutral-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="user"
        style={{ top: "50%" }}
        className="w-3 h-3 bg-neutral-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="images"
        style={{ top: "75%" }}
        className="w-3 h-3 bg-neutral-500"
      />

      {/* MODEL SELECT */}
      <select
        className="w-full rounded bg-neutral-800 border border-neutral-700 p-2 text-sm"
        defaultValue={data?.model ?? "gemini-1.5-flash"}
      >
        <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
      </select>

      {/* RUN BUTTON */}
      <button
        onClick={() => runNode(id)}
        disabled={isRunning}
        className={`w-full rounded px-3 py-2 text-sm transition ${
          isRunning
            ? "bg-purple-800 animate-pulse"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {isRunning ? "Running…" : "Run"}
      </button>

      {/* OUTPUT */}
      {data?.output && (
        <div className="mt-2 rounded bg-neutral-800 p-2 text-xs text-neutral-200">
          {data.output}
        </div>
      )}

      {/* OUTPUT HANDLE */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-3 h-3 bg-purple-500"
      />
    </BaseNode>
  );
}
