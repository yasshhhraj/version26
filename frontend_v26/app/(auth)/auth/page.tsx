"use client";

import {Sign_in_form} from "@/components/sign_in_form";
import {Sign_up_form} from "@/components/sign_up_form";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleAuthMode = () => {
        setIsSignIn(!isSignIn);
    }

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-between bg-linear-to-b from-slate-900 via-blue-950 to-black overflow-hidden overflow-y-auto">
          
          {/* Header */}
          <div className="w-full h-24 md:h-30  px-8 flex justify-center items-center relative z-10">
              <div className="w-1/3 h-full justify-start">
                  {/* Empty space to balance the Home icon in the grid */}
              </div>
              <div className="w-2/3flexx items-center justify-center">
                  <Image 
                      src={'/Assets/logo_version.png'}
                      alt={'version logo'} 
                      width={512} 
                      height={256} 
                      className={'w-64 object-contain'}
                  />
              </div>
              <div className="w-1/3 h-full flex items-center justify-end">
                  <Link
                      href="/"
                      className=" w-6 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors group flex items-center justify-center"
                      aria-label="Home"
                  >
                      <Home className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </Link>
              </div>
          </div>

          {/* Main Content */}
          <div className="w-full flex items-center justify-center px-4 py-8 z-10">
              <motion.div 
                  layout
                  className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden p-4"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={isSignIn ? 'signin' : 'signup'}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-full"
                      >
                          <div className="w-full flex justify-center">
                              {isSignIn ? (
                                  <Sign_in_form slideAction={toggleAuthMode} />
                              ) : (
                                  <Sign_up_form slideAction={toggleAuthMode} />
                              )}
                          </div>
                      </motion.div>
                  </AnimatePresence>
              </motion.div>
          </div>

          {/* Footer Quote */}
          <div className="w-full px-8 pb-8 text-center z-10">
              <p className="text-base md:text-lg font-medium text-white italic mb-2">
                  {"Intelligence is the ability to adapt to change."}
              </p>
              <p className="text-xs md:text-sm text-gray-400 font-semibold uppercase tracking-widest">
                  — Stephen Hawking
              </p>
          </div>
      </div>
    );
}
