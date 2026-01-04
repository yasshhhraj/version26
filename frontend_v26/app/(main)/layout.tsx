import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import {ReactNode} from "react";
import Script from "next/script";

const dm_sans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    preload: true,
    fallback: ["sans-serif", "roboto", "ui-sans-serif", "system-ui"],
})


export const metadata: Metadata = {
  title: "Version'26",
  description: "Official website for Version'26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} {roboto.className} antialiased w-full h-svh `} >
        <Navbar />
        {children}
        <Script src="https://unpkg.com/ccapture.js@1.1.0/build/CCapture.all.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
