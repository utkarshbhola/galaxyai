import { Edge } from "reactflow";

export function validateDAG(edges: Edge[]): boolean {
  const graph = new Map<string, string[]>();

  edges.forEach((e) => {
    if (!graph.has(e.source)) graph.set(e.source, []);
    graph.get(e.source)!.push(e.target);
  });

  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(node: string): boolean {
    if (stack.has(node)) return false;
    if (visited.has(node)) return true;

    visited.add(node);
    stack.add(node);

    for (const next of graph.get(node) || []) {
      if (!dfs(next)) return false;
    }

    stack.delete(node);
    return true;
  }

  for (const node of graph.keys()) {
    if (!dfs(node)) return false;
  }

  return true;
}
