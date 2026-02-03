"use client";

import { Handle, Position, NodeProps } from "reactflow";
import { useCallback } from "react";
import BaseNode from "./base/BaseNode";
import { useWorkflowStore } from "@/store/workflowStore";

export default function TextNode({ id, data }: NodeProps<{ text: string }>) {
  const setNodes = useWorkflowStore((s) => s.setNodes);
  const hasIncoming = useWorkflowStore(
    (s) => s.hasIncomingEdge(id, "input")
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      setNodes([
        {
          id,
          type: "reset",
          data: { ...data, text: value },
        },
      ]);
    },
    [id, data, setNodes]
  );

  return (
    <BaseNode title="Text" nodeId={id}>
      {/* INPUT HANDLE */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="w-3 h-3 bg-neutral-500"
      />

      <textarea
        disabled={hasIncoming}
        className={`w-full rounded p-2 text-sm resize-none ${
          hasIncoming
            ? "bg-neutral-700 text-neutral-400"
            : "bg-neutral-800 border border-neutral-700"
        }`}
        rows={4}
        placeholder="Enter text…"
        value={data?.text ?? ""}
        onChange={onChange}
      />

      {/* OUTPUT HANDLE */}
      <Handle
        type="source"
        position={Position.Right}
        id="text"
        className="w-3 h-3 bg-purple-500"
      />
    </BaseNode>
  );
}
