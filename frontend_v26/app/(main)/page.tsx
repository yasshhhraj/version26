'use client'
import { memo, Suspense, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail } from "lucide-react";

import dynamic from 'next/dynamic'
const AGIGallery = dynamic(() => import("@/components/AGIGallery"), {
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center"><Loader /></div>
});
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";


import { Loader } from "@/components/ui/Loader";

// Disable SSR for the 3D scene
const ParticleWaves = dynamic(() => import('@/components/three/ParticleWaves'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />
})

const InfinityParticles3D = dynamic(() => import('@/components/InfinityParticles3D'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center"><Loader /></div>
})
const StarField = dynamic(() => import('@/components/StarField'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />
})

const AGIScene = dynamic(() => import('@/components/three/AGIScene'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center"><Loader /></div>
})

interface HeroData {
    heroSection: {
        badge: string;
        mainTitle: string;
        subtitle: string;
        themeTitle: {
            prefix: string;
            highlight: string;
            suffix: string;
        };
        description: string;
        buttons: {
            primary: string;
            secondary: string;
        };
    };
    heroSection2: {
        title: string;
        description: string;
        video: {
            src: string;
            title: string;
        };
        button: string;
    };
}

const heroData: HeroData = {
  "heroSection": {
    "badge": "EST. 1991",
    "mainTitle": "VERSION'26",
    "subtitle": "COGNIX",
    "themeTitle": {
      "prefix": "INTELLIGENCE",
      "highlight": "WITHOUT",
      "suffix": "LIMITS"
    },
    "description": "Beyond static algorithms. Join the 33rd edition as we bridge the gap between binary code and infinite reasoning.",    "buttons": {
      "primary": "EXPLORE EVENTS",
      "secondary": "TEAM"
    }
  },
  "heroSection2": {
    "title": "Beyond Intelligence. Toward Infinity.",
    "description": "Artificial General Intelligence represents a long-term pursuit — systems capable of learning, adapting, and reasoning beyond narrowly defined tasks. While still an open research challenge, AGI invites us to rethink how intelligence might evolve in computational systems. VERSION’26 explores this frontier, focusing on ideas, questions, and possibilities that shape the future of intelligent technology.",
    "video": {
      "src": "https://www.youtube.com/embed/C1GOcj_aLPQ",
      "title": "VERSION’25 After Movie"
    },
    "button": "Watch VERSION’25 After Movie"
  }
};

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="h-auto w-full overflow-x-clip bg-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
              <StarField />
          </Suspense>
      </div>
      <main className="flex h-full w-full relative flex-col z-10 bg-transparent">
        <HeroSection data={heroData.heroSection} onContactClick={() => setIsContactOpen(true)} />
        <HeroSection2 data={heroData.heroSection2} />
        <AGIGallery videoData={heroData.heroSection2.video}/>
        <Footer />
      </main>
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}



const HeroSection = memo(function HeroSection({ data, onContactClick }: { data: HeroData['heroSection'], onContactClick: () => void }) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

  return (
    // CONTAINER: Use Flexbox to center/position, use padding (px/py) for spacing.
    // min-h-screen ensures it takes up full view height (optional).
      <div className="w-full min-h-screen overflow-y-visible shrink-0 relative flex flex-col justify-center">
          <div className="rounded-full w-72 h-72 bg-[#4600BE] absolute top-1/6 right-1/6 blur-[300px] opacity-30"></div>
          <div className="rounded-full w-72 h-72 bg-[#4600BE] absolute bottom-1 -left-18 blur-[300px] opacity-30"></div>



          <div className={'w-full bg-transparent -z-40 h-96 absolute overflow-y-visible bottom-0'}>
              <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
                  <ParticleWaves  />
              </Suspense>
          </div>

          <div className={'absolute z-0 w-80 h-80 md:w-md md:h-112 lg:w-136 lg:h-136 top-[25%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:right-[10%] md:left-auto md:translate-x-0'} >
              <motion.div
                  className={'relative w-full h-full '}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.6, ease: "easeInOut" }}
              >
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader /></div>}>
                      <AGIScene/>
                  </Suspense>
              </motion.div>
          </div>



          <motion.div
              className="w-full flex flex-col justify-center md:justify-center px-6 py-20 md:px-12 lg:px-24 xl:px-32 min-h-screen grow pointer-events-none relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
          >

              {/* BADGE */}
              <motion.div variants={itemVariants} className="mb-6 px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-sm w-fit rounded-full flex gap-2 items-center transition-colors pointer-events-auto">
                  <p className="text-xs font-mono tracking-widest text-gray-200 uppercase">{data.badge}</p>
              </motion.div>

              {/* MAIN TITLE: Move ABOVE main hook */}
              <motion.p variants={itemVariants} className="font-mono text-xl tracking-[0.4em] text-gray-500 font-bold uppercase mb-2 pointer-events-auto">
                  {data.mainTitle}
              </motion.p>

              {/* SUBTITLE: MAIN VISUAL HOOK */}
              <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-500 to-purple-600 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] pointer-events-auto">
                  {data.subtitle}
              </motion.h1>

              {/* THEME TITLE: Render on single line */}
              <motion.h2 variants={itemVariants} className="font-sans text-xl md:text-2xl font-light tracking-[0.2em] text-white/90 mt-2 uppercase pointer-events-auto">
                  {data.themeTitle.prefix} {data.themeTitle.highlight} {data.themeTitle.suffix}
              </motion.h2>

              {/* DESCRIPTION */}
              <motion.p variants={itemVariants} className="text-lg md:text-xl font-extralight text-gray-300 max-w-2xl pointer-events-auto leading-relaxed mt-4">
                  {data.description}
              </motion.p>

              {/* BUTTONS: Hollow glass for primary */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
                  <a
                      href="/events"
                      className="bg-transparent hover:bg-[#4600be]/10 border border-[#2E2F2F]  text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center"
                  >
                      <span>{data.buttons.primary}</span>
                      <div
                          className="w-5 h-5 bg-white transition-transform group-hover:translate-x-1"
                          style={{
                              maskImage: `url(/icons/linkarrow.svg)`,
                              maskSize: "contain",
                              maskRepeat: "no-repeat",
                          }}
                      />
                  </a>

                  <button
                      onClick={onContactClick}
                      className="bg-transparent hover:bg-[#4600be]/10 border border-[#2E2F2F]  text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center cursor-pointer"
                  >
                      <span>CONTACT</span>
                      <Mail size={18} />
                  </button>
              </motion.div>
          </motion.div>
      </div>
  );
});

const HeroSection2 = memo(function HeroSection2({ data }: { data: HeroData['heroSection2'] }) {
  return (
    <div className="relative w-full flex flex-col overflow-hidden  transition-colors pt-20 md:pt-32 pb-20">
      
      {/* --- BACKGROUNDS --- */}
        <div className="absolute inset-0 -z-20 bg-linear-to-b from-transparent via-black/50 to-black"/>
      
      {/* --- CONTENT CONTAINER --- */}
      {/* Added z-10 to ensure text sits ABOVE the ribbon/grid */}
      <div className="relative z-10 w-[90%] max-w-[1400px] mx-auto mt-0 flex flex-col gap-12 md:gap-24">
        
        {/* TYPOGRAPHY */}
        <div className="w-full">
          <motion.h1
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[150px] font-bold leading-[0.9] tracking-tighter drop-shadow-2xl text-center md:text-right"
          >
            {data.title}
          </motion.h1>

          <div className={'flex flex-col lg:flex-row mt-8 gap-8 items-center lg:items-start'}>
              <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={'relative w-full lg:w-1/2 aspect-4/3 md:aspect-square h-auto max-h-64 md:max-h-136'}
              >
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Loader /></div>}>
                      <InfinityParticles3D />
                  </Suspense>
              </motion.div>
              <motion.p
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-gray-200 text-lg md:text-xl lg:text-2xl w-full lg:w-1/2 leading-relaxed drop-shadow-md bg-black/5 border border-transparent p-6 md:p-8 rounded-2xl shadow-none text-center lg:text-left"
              >
                  {data.description}
              </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
});
