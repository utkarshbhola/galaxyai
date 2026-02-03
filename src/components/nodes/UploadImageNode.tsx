"use client";

import { Handle, Position, NodeProps } from "reactflow";
import BaseNode from "./base/BaseNode";

export default function UploadImageNode({
    id,
  data,
}: NodeProps<{ url?: string }>) {
  return (
    <BaseNode title="Upload Image" nodeId={id}>
      <input
        type="file"
        accept="image/*"
        className="text-xs text-neutral-300"
        disabled
      />

      <div className="text-xs text-neutral-500">
        (Upload wired later via Transloadit)
      </div>

      {/* OUTPUT HANDLE */}
      <Handle
        type="source"
        position={Position.Right}
        id="image"
        className="w-3 h-3 bg-purple-500"
      />
    </BaseNode>
  );
}
