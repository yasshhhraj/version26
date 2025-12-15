"use client";

import {Sign_in_form} from "@/components/sign_in_form";
import {Sign_up_form} from "@/components/sign_up_form";
import {useState} from "react";
import Image from "next/image";

export default function AuthPage() {
    const [position, setPosition] = useState<'left' | 'right'>('left')
    const slide = () => {
        setPosition((pos) => (pos === 'left' ? 'right' : 'left'))
    }
    return (
      <>
          {/* Mobile (< md) */}
          <div className="block md:hidden min-h-screen w-full bg-gradient-to-b from-slate-900 via-blue-950 to-black">
              {/* Mobile-only logo header */}
              <div className="w-full py-8 flex items-center justify-center">
                  <Image src={'/Assets/final-logo.png'} alt={'version logo'} width={512} height={256} className={'h-auto w-[60%]'} />
              </div>
              {/* Mobile: render a single form based on position */}
              <div className="px-4 pb-10">
                  {position === 'left' ? (
                      <Sign_in_form slide={slide} />
                  ) : (
                      <Sign_up_form slide={slide} />
                  )}
              </div>
          </div>

          {/* Desktop (>= md): keep existing layout with sliding overlay */}
          <div
              className={
                  'hidden md:flex relative w-full sm:w-[90%] h-full sm:h-full ' +
                  'bg-gray-900/25 overflow-visible flex-row justify-start md:items-center rounded-2xl'
              }
          >
              <Sign_up_form slide={slide} />
              <Sign_in_form slide={slide} />
              <div
                  onClick={slide}
                  role={'button'}
                  aria-label={'Toggle auth slider'}
                  className={
                      'hidden md:flex absolute top-0 left-0 h-full w-1/2 z-10 cursor-pointer rounded-2xl overflow-clip ' +
                      'bg-gray-800 shadow-lg ' +
                      ' items-center justify-center ' +
                      'transform transition-transform duration-500 ease-in-out will-change-transform ' +
                      (position === 'left' ? 'translate-x-0' : 'translate-x-full')
                  }
              >
                  <div className={'absolute left-1/2 transform  bottom-0 translate-y-2/3  -translate-x-1/2 h-1/3 aspect-video  bg-blue-400 rounded-full  blur-[clamp(32px,40vw,128px)]  '} />
                  <div className={'opacity-0 sm:opacity-5 md:opacity-25 lg:opacity-20 absolute bottom-0 left-0 transform translate-y-1/2  -translate-x-1/2 h-3/4 aspect-square  bg-blue-400 rounded-full  blur-[clamp(32px,40vw,128px)] transition-all duration-500 '} />
                  <div className={'opacity-5 absolute right-0 top-0 h-1/2 aspect-square  bg-blue-400 rounded-full  blur-[clamp(32px,40vw,128px)] transition-all duration-500 '} />
                  <Image src={'/Assets/final-logo.png'} alt={'version logo'} width={512} height={256} className={'max-w-3/4 '} />
              </div>
          </div>
      </>
    );

}