"use client";

import { useEffect } from "react";
import { useExecutionStore } from "@/store/executionStore";
import { WorkflowRun } from "@/types/execution";

export default function HistoryPanel() {
  const history = useExecutionStore((s) => s.history);
  const setHistory = useExecutionStore((s) => s.setHistory);

  useEffect(() => {
    fetch("/api/runs/load")
      .then((res) => res.json())
      .then((data) => {
        const runs: WorkflowRun[] = data.map((r: any) => ({
          id: r.id,
          startedAt: new Date(r.startedAt).getTime(),
          finishedAt: new Date(r.finishedAt).getTime(),
          status: r.status,
          nodes: r.result,
        }));

        setHistory(runs);
      });
  }, [setHistory]);

  return (
    <div className="space-y-3">
      {history.length === 0 && (
        <p className="text-xs text-neutral-500">
          No workflow runs yet
        </p>
      )}

      {history.map((run) => (
        <div
          key={run.id}
          className="rounded border border-neutral-800 p-3 text-xs"
        >
          <div className="flex justify-between">
            <span>
              {new Date(run.startedAt).toLocaleTimeString()}
            </span>
            <span className="text-green-400">
              {run.status}
            </span>
          </div>

          <div className="mt-1 text-neutral-400">
            Duration: {(run.finishedAt - run.startedAt) / 1000}s
          </div>

          <div className="mt-1 text-neutral-400">
            Nodes run: {run.nodes.length}
          </div>
        </div>
      ))}
    </div>
  );
}
