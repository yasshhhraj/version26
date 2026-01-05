"use client";

import {Sign_in_form} from "@/components/sign_in_form";
import {Sign_up_form} from "@/components/sign_up_form";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
    const [position, setPosition] = useState<'left' | 'right'>('left')
    const [isTransitioning, setIsTransitioning] = useState(false)

    const togglePortal = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setPosition((pos) => (pos === 'left' ? 'right' : 'left'))
            setIsTransitioning(false)
        }, 500)
    }
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-slate-900 via-blue-950 to-black  overflow-hidden  overflow-y-auto">
          {/* Mobile (< md) */}
          <div className="flex flex-col items-start md:hidden min-h-screen h-full w-full relative">

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
              <div className="grow w-full flex items-start justify-center px-4  ">
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={position}
                          initial={{ clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 }}
                          animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                          exit={{ clipPath: 'inset(50% 50% 50% 50%)', opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-full"
                      >
                          {position === 'left' ? (
                              <Sign_in_form slideAction={togglePortal} />
                          ) : (
                              <Sign_up_form slideAction={togglePortal} />
                          )}
                      </motion.div>
                  </AnimatePresence>
              </div>

              {/* Mobile Quote */}
              <div className="w-full px-8 pb-12 text-center mt-auto">
                  <p className="text-base font-medium text-white italic mb-1">
                      {"Intelligence is the ability to adapt to change."}
                  </p>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                      — Stephen Hawking
                  </p>
              </div>
          </div>

          {/* Desktop (>= md): keep existing layout with sliding overlay */}
          <div
              className={
                  'hidden md:flex h-[85%] relative w-full sm:w-[90%] ' +
                  'bg-gray-900/50 bg-[url("/auth-bg-slider.png")] bg-center bg-cover  overflow-visible flex-row justify-start md:items-center rounded-2xl'
              }
          >
              <Sign_up_form slideAction={togglePortal} />
              <Sign_in_form slideAction={togglePortal} />
              <motion.div
                  onClick={togglePortal}
                  role={'button'}
                  aria-label={'Toggle auth slider'}
                  animate={{
                      clipPath: isTransitioning 
                          ? 'inset(0 50% 0 50% round 1rem)'
                          : (position === 'left' ? 'inset(0 50% 0 0 round 1rem 0 0 1rem)' : 'inset(0 0 0 50% round 0 1rem 1rem 0)'),
                  }}
                  transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                  }}
                  className={
                      'glassmorphism  hidden md:flex absolute top-0 left-0 h-full w-full z-10 cursor-pointer rounded-2xl overflow-clip ' +
                      ' shadow-lg bg-transparent bg-[url("/auth-bg-slider.png")] bg-center bg-cover backdrop-blur-3xl  ' +
                      ' items-center justify-center '
                  }
              >
                  <motion.div 
                      animate={{
                          x: position === 'left' ? '-25%' : '25%',
                          opacity: isTransitioning ? 0 : 1,
                          scale: isTransitioning ? 0.8 : 1
                      }}
                      className="flex flex-col items-center justify-center w-full h-full relative rounded-2xl"
                  >
                      <div className="w-[50%] h-full flex flex-col justify-between p-12 px-24e">
                          <div className={(position=='left'?' ':'flex-row-reverse  ')+"w-full  flex justify-between items-center mx-auto"}>
                              <Image src={'/Assets/final-logo.png'} alt={'version logo'} width={512} height={256} className={'w-48 h-auto'} />
                              <Link
                                  href="/"
                                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                                  onClick={(e) => e.stopPropagation()}
                              >
                                  <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                  <span className=" text-lg font-medium">Back to Home</span>
                              </Link>
                          </div>

                          <div className="text-center max-w-md mx-auto">
                              <p className="text-lg md:text-xl font-medium text-white italic mb-2">
                                  {"Intelligence is the ability to adapt to change."}
                              </p>
                              <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">
                                  — Stephen Hawking
                              </p>
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          </div>
      </div>
    );

}