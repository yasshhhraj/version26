import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/app/components/navbar";
import {ReactNode} from "react";

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
      <body
        className={`${dm_sans.className} {roboto.className} antialiased w-full h-svh `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
