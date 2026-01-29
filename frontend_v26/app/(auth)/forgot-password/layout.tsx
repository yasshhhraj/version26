import type { Metadata } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot Password | Version'26",
  description: "Reset your Version'26 account password",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative h-dvh flex flex-col items-center justify-start overflow-hidden">
      {/* background blobs to match the auth layout theme */}
      <div
        className={
          "absolute -z-10 left-1/2 transform  bottom-0 translate-y-2/3  -translate-x-1/2 h-1/3 aspect-video  bg-blue-400 rounded-full  blur-[clamp(64px,75vw,256px)]  "
        }
      />
      <div
        className={
          "opacity-0 -z-10 sm:opacity-15 md:opacity-45 lg:opacity-75 absolute bottom-0 left-0 transform translate-y-1/2  -translate-x-1/2 h-3/4 aspect-square  bg-blue-400 rounded-full  blur-[clamp(64px,75vw,296px)] transition-all duration-500 "
        }
      />
      <div
        className={
          "opacity-40 -z-10 sm:opacity-50 md:opacity-60 lg:opacity-75 absolute right-0 top-0 h-1/2 aspect-square  bg-blue-400 rounded-full  blur-[clamp(64px,75vw,256px)] transition-all duration-500 "
        }
      />

        <div className={'h-full w-full flex flex-col overflow-x-clip overflow-y-auto'}>
            <div className={' h-30 w-full flex items-center justify-center bg-transparent '}>
                <Link href={'/'}>
                    <Image src={'/Assets/logo_version.png'} alt={'Logo'} width={512} height={256} className={'w-auto max-w-64 md:max-w-80 h-auto'}/>
                </Link>
            </div>

            <div
                className={"w-full  flex-1 flex flex-col items-center justify-start  overflow-visible"}
            >
                {children}
            </div>
        </div>
    </div>
  );
}
