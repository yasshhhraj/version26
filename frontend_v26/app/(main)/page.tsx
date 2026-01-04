'use client'
import { memo, useEffect, useState } from "react";
import DotGrid from "@/components/ui/DotGrid";

import dynamic from 'next/dynamic'
import AGIScene from "@/components/three/AGIScene";
import AGIGallery from "@/components/AGIGallery";
import Footer from "@/components/Footer";


// Disable SSR for the 3D scene
const ParticleWaves = dynamic(() => import('@/components/three/ParticleWaves'), {
    ssr: false
})
const InfinityNeuralNetwork = dynamic(() => import('@/components/Infinity'), {
    ssr: false
})
const StarField = dynamic(() => import('@/components/StarField'), {
    ssr: false
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

export default function Home() {
    const [heroData, setHeroData] = useState<HeroData | null>(null);

    useEffect(() => {
        fetch('/hero.json')
            .then(res => res.json())
            .then(setHeroData)
            .catch(err => console.error("Failed to load hero.json", err));
    }, []);

    if (!heroData) return <div className="h-screen w-full bg-white dark:bg-black"></div>; // Or a loading spinner

  return (
    <div className="h-auto w-full overflow-x-clip  bg-white dark:bg-transparent ">
      <main className="flex h-full w-full relative flex-col  ">
        <HeroSection data={heroData.heroSection}/>
        <HeroSection2 data={heroData.heroSection2} />
          <AGIGallery videoData={heroData.heroSection2.video} />
        <Footer />
      </main>
    </div>
  );
}



const HeroSection = memo(function HeroSection({ data }: { data: HeroData['heroSection'] }) {
  return (
    // CONTAINER: Use Flexbox to center/position, use padding (px/py) for spacing.
    // min-h-screen ensures it takes up full view height (optional).
      <div className="w-full min-h-screen overflow-y-visible shrink-0 relative flex flex-col justify-center">
          <div className="rounded-full w-72 h-72 bg-[#4600BE] absolute top-1/6 right-1/6 blur-[300px] opacity-30"></div>
          <div className="rounded-full w-72 h-72 bg-[#4600BE] absolute bottom-1 -left-18 blur-[300px] opacity-30"></div>

          <div className={'h-svh w-full absolute -z-50'}>
              <DotGrid
                  dotSize={2}
                  gap={30}
                  baseColor="#371768ff"
                  activeColor="#5227FF"
                  proximity={120}
                  shockRadius={250}
                  shockStrength={5}
                  resistance={750}
                  returnDuration={1.5}
              />
          </div>

          <div className={'w-full bg-transparent -z-50 h-96 absolute overflow-y-visible bottom-0'}>
              <ParticleWaves  />
          </div>

          <div className={'absolute z-0 w-80 h-80 md:w-112 md:h-112 lg:w-136 lg:h-136 top-[25%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:right-[10%] md:left-auto md:translate-x-0'} >
              <div className={'relative w-full h-full '}>
                  <AGIScene/>
              </div>
          </div>



          <div className="w-full flex flex-col justify-center md:justify-center px-6 py-20 md:px-12 lg:px-24 xl:px-32 min-h-screen grow pointer-events-none relative z-10">

              {/* BADGE */}
              <div className="mb-6 px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-sm w-fit rounded-full flex gap-2 items-center transition-colors pointer-events-auto">
                  <p className="text-xs font-mono tracking-widest text-gray-200 uppercase">{data.badge}</p>
              </div>

              {/* MAIN TITLE: Move ABOVE main hook */}
              <p className="font-mono text-xl tracking-[0.4em] text-gray-500 font-bold uppercase mb-2 pointer-events-auto">
                  {data.mainTitle}
              </p>

              {/* SUBTITLE: MAIN VISUAL HOOK */}
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-purple-600 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] pointer-events-auto">
                  {data.subtitle}
              </h1>

              {/* THEME TITLE: Render on single line */}
              <h2 className="font-sans text-xl md:text-2xl font-light tracking-[0.2em] text-white/90 mt-2 uppercase pointer-events-auto">
                  {data.themeTitle.prefix} {data.themeTitle.highlight} {data.themeTitle.suffix}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-lg md:text-xl font-extralight text-gray-600 dark:text-gray-300 max-w-2xl pointer-events-auto leading-relaxed mt-4">
                  {data.description}
              </p>

              {/* BUTTONS: Hollow glass for primary */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
                  <a
                      href="/events"
                      className="bg-transparent hover:bg-white/10 border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center group shadow-lg dark:shadow-none"
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

                  <a
                      href="/team"
                      className="bg-transparent hover:bg-gray-100 dark:hover:bg-[#4600be]/10 border border-gray-300 dark:border-[#2E2F2F]  text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center"
                  >
                      <span>{data.buttons.secondary}</span>
                      <div
                          className="w-5 h-5 bg-gray-900 dark:bg-white"
                          style={{
                              maskImage: `url(/icons/linkarrow.svg)`,
                              maskSize: "contain",
                              maskRepeat: "no-repeat",
                          }}
                      />
                  </a>
              </div>
          </div>
      </div>
  );
});

const HeroSection2 = memo(function HeroSection2({ data }: { data: HeroData['heroSection2'] }) {
  return (
    <div className="relative w-full flex flex-col overflow-hidden  transition-colors pt-20 md:pt-32 pb-20">
      
      {/* --- BACKGROUNDS --- */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-transparent via-black/50 to-black"/>
        <div className="absolute inset-0 -z-10">
        <StarField />
      </div>
      
      {/* --- CONTENT CONTAINER --- */}
      {/* Added z-10 to ensure text sits ABOVE the ribbon/grid */}
      <div className="relative z-10 w-[90%] max-w-[1400px] mx-auto mt-0 flex flex-col gap-12 md:gap-24">
        
        {/* TYPOGRAPHY */}
        <div className="w-full">
          <h1 className="text-gray-900 dark:text-white text-5xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[150px] font-bold leading-[0.9] tracking-tighter drop-shadow-2xl text-center md:text-right">
            {data.title}
          </h1>

          <div className={'flex flex-col lg:flex-row mt-8 gap-8 items-center lg:items-start'}>
              <div className={'relative w-full lg:w-1/2 aspect-video h-auto max-h-64 lg:max-h-80'}>
                  <InfinityNeuralNetwork/>
              </div>
              <p className="text-gray-600 dark:text -gray-200 text-lg md:text-xl lg:text-2xl w-full lg:w-1/2 leading-relaxed drop-shadow-md bg-white/60 border border-gray-200 dark:border-transparent dark:bg-black/5 p-6 md:p-8 rounded-2xl shadow-sm dark:shadow-none text-center lg:text-left">
                  {data.description}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
});
