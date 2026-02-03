import { create } from "zustand";
import { nanoid } from "nanoid";
import { useWorkflowStore } from "./workflowStore";
import { buildExecutionPlan } from "@/lib/dag/executionPlanner";
import { WorkflowRun } from "@/types/execution";

type ExecutionState = {
  runningNodes: Set<string>;
  history: WorkflowRun[];
  runWorkflow: () => Promise<void>;
  setHistory: (runs: WorkflowRun[]) => void;
};

export const useExecutionStore = create<ExecutionState>((set, get) => ({
  runningNodes: new Set(),
  history: [],

  // ✅ used by HistoryPanel to load DB history
  setHistory: (runs) => set({ history: runs }),

runWorkflow: async () => {
  const runId = nanoid();
  const startedAt = Date.now();

  const { nodes, edges, setNodes } =
    useWorkflowStore.getState();

  const plan = buildExecutionPlan(nodes, edges);
  const nodeRuns: WorkflowRun["nodes"] = [];

  for (const batch of plan) {
    // glow current batch
    set({
      runningNodes: new Set(batch.map((n) => n.id)),
    });

    await Promise.all(
      batch.map(async (node) => {
        const nodeStart = Date.now();

        let output = node.data?.output;

        // 🔥 REAL LLM EXECUTION
        if (node.type === "llm") {
          const res = await fetch("/api/execute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: "Generate marketing copy for a new SaaS product",
            }),
          });

          const data = await res.json();
          output = data.output;
        }

        // simulate delay for non-LLM nodes
        if (node.type !== "llm") {
          await new Promise((r) => setTimeout(r, 800));
        }

        // update node data
        setNodes([
          {
            id: node.id,
            type: "reset",
            data: {
              ...node.data,
              output,
            },
          },
        ]);

        nodeRuns.push({
          nodeId: node.id,
          status: "success",
          durationMs: Date.now() - nodeStart,
        });
      })
    );
  }

  const finishedAt = Date.now();

  // 🔥 Persist run to DB
  await fetch("/api/runs/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      workflowId: "default-workflow",
      startedAt,
      finishedAt,
      status: "success",
      result: nodeRuns,
    }),
  });

  // update local history
  set({
    runningNodes: new Set(),
    history: [
      {
        id: runId,
        startedAt,
        finishedAt,
        status: "success",
        nodes: nodeRuns,
      },
      ...get().history,
    ],
  });
},
}));
