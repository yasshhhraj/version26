import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../../globals.css";
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
        <html lang="en" className={'h-dvh  w-dvw overflow-clip  '}>
            <body className={`${dm_sans.className}  {roboto.className} antialiased w-full h-full overflow-clip flex items-center justify-center `} >
                <div className={'w-full h-full bg-[url("/auth-bg-slider.png")] bg-center  gap-8 flex flex-col items-center justify-center'}>
                    {children}
                </div>
            </body>
        </html>
    );
}
