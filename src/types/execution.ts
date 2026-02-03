export type NodeRun = {
  nodeId: string;
  status: "success" | "failed";
  output?: any;
  durationMs: number;
};

export type WorkflowRun = {
  id: string;
  startedAt: number;
  finishedAt: number;
  status: "success" | "failed";
  nodes: NodeRun[];
};
