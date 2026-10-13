import type { Metadata } from "next";
import "./globals.css";
import { AUthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Write Club",
  description:
    "A welcoming writing group for shared drafts, thoughtful feedback, and steady creative momentum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AUthProvider>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </AUthProvider>
  );
}
