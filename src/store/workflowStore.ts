import { create } from "zustand";
import {
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];

  setNodes: (changes: NodeChange[]) => void;
  setEdges: (changes: EdgeChange[]) => void;

  onConnect: (connection: Connection) => void;

  addNode: (node: Node) => void;
  removeNode: (id: string) => void;

  hasIncomingEdge: (nodeId: string, handleId: string) => boolean;

  // 🔥 NEW
  saveWorkflow: () => Promise<void>;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],

  setNodes: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  setEdges: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  hasIncomingEdge: (nodeId, handleId) =>
    get().edges.some(
      (e) => e.target === nodeId && e.targetHandle === handleId
    ),

  onConnect: (connection) =>
    set({
      edges: addEdge(
        { ...connection, animated: true, style: { stroke: "#a855f7" } },
        get().edges
      ),
    }),

  addNode: (node) =>
    set({
      nodes: [...get().nodes, node],
    }),

  removeNode: (id) =>
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter(
        (e) => e.source !== id && e.target !== id
      ),
    }),

  // 💾 SAVE WORKFLOW TO DB
  saveWorkflow: async () => {
    const { nodes, edges } = get();

    await fetch("/api/workflows/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nodes,
        edges,
      }),
    });
  },
}));
