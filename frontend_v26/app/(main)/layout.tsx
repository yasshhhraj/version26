import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['400', '700'], // Or a single weight like '400'
  subsets: ['latin'],
  display: 'swap', // Recommended for better performance
});

export const metadata: Metadata = {
  title: "Version'26",
  description: "Official website for Version'26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${roboto.className} antialiased w-full h-svh `}
      >
        {children}
      </body>
    </html>
  );
}
