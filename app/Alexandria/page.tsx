import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function AlexandriaPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6">
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
        Something is happening
      </h1>
    </main>
  );
}
