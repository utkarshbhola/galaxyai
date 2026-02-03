"use client";

import { Handle, Position, NodeProps } from "reactflow";
import BaseNode from "./base/BaseNode";

export default function UploadVideoNode({ id }: NodeProps) {
  return (
    <BaseNode title="Upload Video" nodeId={id}>
      <input
        type="file"
        accept="video/mp4,video/webm,video/mov"
        className="text-xs text-neutral-300"
        disabled
      />

      <div className="text-xs text-neutral-500">
        (Upload wired later)
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="video"
        className="w-3 h-3 bg-purple-500"
      />
    </BaseNode>
  );
}
