"use client";

import { Handle, Position, NodeProps } from "reactflow";
import BaseNode from "./base/BaseNode";

export default function CropImageNode({ id }: NodeProps) {
  return (
    <BaseNode title="Crop Image" nodeId={id}>
      {/* INPUTS */}
      <Handle type="target" position={Position.Left} id="image" />
      <Handle
        type="target"
        position={Position.Left}
        id="number"
        style={{ top: "40%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="number"
        style={{ top: "60%" }}
      />

      <div className="grid grid-cols-2 gap-2 text-xs">
        <input placeholder="x %" className="bg-neutral-800 p-1 rounded" />
        <input placeholder="y %" className="bg-neutral-800 p-1 rounded" />
        <input placeholder="width %" className="bg-neutral-800 p-1 rounded" />
        <input placeholder="height %" className="bg-neutral-800 p-1 rounded" />
      </div>

      {/* OUTPUT */}
      <Handle type="source" position={Position.Right} id="image" />
    </BaseNode>
  );
}
