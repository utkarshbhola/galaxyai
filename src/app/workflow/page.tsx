import { auth } from "@clerk/nextjs/server";
import AppShell from "@/components/layout/AppShell";

export default function WorkflowPage() {
  auth(); // ⛔ blocks unauthenticated users

  return <AppShell />;
}
