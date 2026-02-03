import { ReactNode } from "react";

export function NodeShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-[260px] rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 shadow">
      <div className="border-b border-zinc-700 px-3 py-2 text-sm font-medium">
        {title}
      </div>
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
}
