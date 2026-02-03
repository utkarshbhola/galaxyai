import { Node, Edge } from "reactflow";

export function buildExecutionPlan(
  nodes: Node[],
  edges: Edge[]
): Node[][] {
  const inDegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  nodes.forEach((n) => inDegree.set(n.id, 0));

  edges.forEach((e) => {
    inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
    if (!graph.has(e.source)) graph.set(e.source, []);
    graph.get(e.source)!.push(e.target);
  });

  const queue: string[] = [];
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id);
  });

  const levels: string[][] = [];

  while (queue.length) {
    const levelSize = queue.length;
    const level: string[] = [];

    for (let i = 0; i < levelSize; i++) {
      const id = queue.shift()!;
      level.push(id);

      for (const next of graph.get(id) || []) {
        inDegree.set(next, inDegree.get(next)! - 1);
        if (inDegree.get(next) === 0) {
          queue.push(next);
        }
      }
    }

    levels.push(level);
  }

  return levels.map((ids) =>
    ids.map((id) => nodes.find((n) => n.id === id)!)
  );
}
