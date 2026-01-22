import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Forgot Password | Version'26",
  description: "Reset your Version'26 account password",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {/* background blobs to match auth layout theme */}
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

      <div
        className={
          "w-full md:h-[80%] gap-8 flex flex-col items-center justify-center"
        }
      >
        {children}
      </div>
    </>
  );
}
