"use client";

import {Sign_in_form} from "@/components/sign_in_form";
import {Sign_up_form} from "@/components/sign_up_form";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function AuthPage() {
    const [position, setPosition] = useState<'left' | 'right'>('left')
    const slide = () => {
        setPosition((pos) => (pos === 'left' ? 'right' : 'left'))
    }
    return (
      <>
          {/* Mobile (< md) */}
          <div className="flex flex-col md:hidden min-h-screen w-full bg-linear-to-b from-slate-900 via-blue-950 to-black relative">

              {/* Mobile-only logo header */}
              <div className="w-full py-8 flex items-center justify-center relative">
                  <Image src={'/Assets/final-logo.png'} alt={'version logo'} width={512} height={256} className={'h-auto w-[60%]'} />
                  <Link
                      href="/"
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors z-20"
                      aria-label="Home"
                  >
                      <Home className="w-5 h-5 text-white" />

                  </Link>
              </div>
              {/* Mobile: render a single form based on position */}
              <div className="grow w-full flex items-start justify-center px-4 ">

                  {position === 'left' ? (
                      <Sign_in_form slideAction={slide} />
                  ) : (
                      <Sign_up_form slideAction={slide} />
                  )}
              </div>
          </div>

          {/* Desktop (>= md): keep existing layout with sliding overlay */}
          <div
              className={
                  'hidden md:flex h-[85%] relative w-full sm:w-[90%] ' +
                  'bg-gray-900/50  overflow-visible flex-row justify-start md:items-center rounded-2xl'
              }
          >
              <Link
                  href="/"
                  className="absolute -top-10 left-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <Sign_up_form slideAction={slide} />
              <Sign_in_form slideAction={slide} />
              <div
                  onClick={slide}
                  role={'button'}
                  aria-label={'Toggle auth slider'}

                  className={
                      'hidden md:flex absolute top-0 left-0 h-full w-1/2 z-10 cursor-pointer rounded-2xl overflow-clip ' +
                      ' shadow-lg bg-transparent bg-[url("/plasma.png")] bg-right  bg-cover backdrop-blur-3xl' +
                      ' items-center justify-center ' +
                      'transform transition-transform duration-500 ease-in-out will-change-transform ' +
                      (position === 'left' ? 'translate-x-0' : 'translate-x-full')
                  }
              >
                  <Image src={'/Assets/final-logo.png'} alt={'version logo'} width={512} height={256} className={'max-w-3/4 '} />
              </div>
          </div>
      </>
    );

}