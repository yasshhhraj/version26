import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/src/auth/auth.provider";
import SmoothScroll from "@/components/SmoothScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  preload: true,
  fallback: ["sans-serif", "ui-sans-serif", "system-ui"],
});

export const metadata: Metadata = {
  title: "Version'26",
  description: "Official website for Version'26",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased w-full overflow-x-clip`}>
        <AuthProvider>
            <SmoothScroll>
                {children}
            </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
