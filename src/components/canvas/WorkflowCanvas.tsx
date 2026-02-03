"use client";

import "reactflow/dist/style.css";
import ReactFlow, {
  Background,
  MiniMap,
  Controls,
} from "reactflow";

import TextNode from "@/components/nodes/TextNode";
import UploadImageNode from "@/components/nodes/UploadImageNode";
import LLMNode from "@/components/nodes/LLMNode";
import { useWorkflowStore } from "@/store/workflowStore";
import { isValidConnection } from "@/lib/connections/connectionRules";
import CropImageNode from "@/components/nodes/CropImageNode";
import ExtractFrameNode from "@/components/nodes/ExtractFrameNode";

// 👇 DEFINE NODE TYPES HERE
const nodeTypes = {
  text: TextNode,
  uploadImage: UploadImageNode,
  llm: LLMNode,
  cropImage: CropImageNode,
  extractFrame: ExtractFrameNode,
};

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onConnect,
  } = useWorkflowStore();

  return (
    <div className="h-full w-full bg-[#0b0b0d]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" gap={24} size={1} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

