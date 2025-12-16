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
        <html lang="en">
            <body className={`${dm_sans.className} {roboto.className} antialiased w-svw h-svh overflow-clip flex items-center justify-center `} >
                <div className={'absolute -z-10 left-1/2 transform  bottom-0 translate-y-2/3  -translate-x-1/2 h-1/3 aspect-video  bg-blue-400 rounded-full  blur-[clamp(64px,75vw,256px)]  '} />
                <div className={'opacity-0 -z-10 sm:opacity-15 md:opacity-45 lg:opacity-75 absolute bottom-0 left-0 transform translate-y-1/2  -translate-x-1/2 h-3/4 aspect-square  bg-blue-400 rounded-full  blur-[clamp(64px,75vw,296px)] transition-all duration-500 '} />
                <div className={'opacity-40 -z-10 sm:opacity-50 md:opacity-60 lg:opacity-75 absolute right-0 top-0 h-1/2 aspect-square  bg-blue-400 rounded-full  blur-[clamp(64px,75vw,256px)] transition-all duration-500 '} />

                <div className={'w-full md:h-[80%] gap-8 flex flex-col items-center justify-center'}>
                    {children}
                </div>
            </body>
        </html>
    );
}
