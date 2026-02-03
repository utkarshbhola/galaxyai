import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  const { userId } = auth();

  // ✅ Signed in users go to app
  if (userId) {
    redirect("/workflow");
  }

  // ✅ Signed out users see login
  return (
    <main className="h-screen flex items-center justify-center bg-[#0b0b0d] text-neutral-200">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          Galaxy Workflow
        </h1>
        <p className="text-sm text-neutral-400">
          Sign in to continue
        </p>
        <SignInButton />
      </div>
    </main>
  );
}
