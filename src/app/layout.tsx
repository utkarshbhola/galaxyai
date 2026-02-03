import { type Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxy Workflow",
  description: "Visual workflow builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable}
            antialiased bg-[#0b0b0d] text-neutral-200
            min-h-screen flex flex-col`}
        >
          {/* TOP BAR */}
          <header className="h-12 px-4 flex items-center justify-between
                            bg-[#0b0b0d] border-b border-[#1f1f24]">
            <div className="text-sm font-medium text-neutral-300">
              Galaxy Workflow
            </div>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-7 w-7",
                  },
                }}
              />
            </SignedIn>
          </header>

          {/* APP CONTENT */}
          <main className="flex-1 min-h-0">
            {children}
          </main>
        </body>

      </html>
    </ClerkProvider>
  );
}
