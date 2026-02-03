import { Connection } from "reactflow";

const rules: Record<string, string[]> = {
  text: ["text"],
  image: ["image"],
  video: ["video"],
  number: ["number"],
};

export function isValidConnection(connection: Connection) {
  if (!connection.sourceHandle || !connection.targetHandle) return false;

  const sourceType = connection.sourceHandle;
  const targetType = connection.targetHandle;

  return rules[sourceType]?.includes(targetType);
}
