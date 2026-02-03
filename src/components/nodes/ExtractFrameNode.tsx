"use client";

import { Handle, Position, NodeProps } from "reactflow";
import BaseNode from "./base/BaseNode";

export default function ExtractFrameNode({ id }: NodeProps) {
  return (
    <BaseNode title="Extract Frame" nodeId={id}>
      {/* INPUTS */}
      <Handle type="target" position={Position.Left} id="video" />
      <Handle
        type="target"
        position={Position.Left}
        id="number"
        style={{ top: "60%" }}
      />

      <input
        placeholder="Timestamp (sec or %)"
        className="w-full bg-neutral-800 p-2 rounded text-sm"
      />

      {/* OUTPUT */}
      <Handle type="source" position={Position.Right} id="image" />
    </BaseNode>
  );
}
