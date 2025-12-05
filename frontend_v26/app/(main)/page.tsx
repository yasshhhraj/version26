import Image from "next/image";
import { memo } from "react";

export default function Home() {
  return (
    <div className="h-auto w-full overflow-x-clip  bg-white dark:bg-transparent ">
      <main className="flex h-full w-full relative flex-col  ">
        <div className=" w-full max-h-screen h-[1013] shrink-0 relative bg-[url('/Assets/background.png')] dark:bg-[url('/Assets/background.png'),url('/Assets/grid_hero.png')] bg-cover ">
          <div className="rounded-full w-72 h-72  bg-[#4600BE] absolute top-1/6 right-1/6 blur-[300px] "></div>
          <div className="rounded-full w-72 h-72  bg-[#4600BE] absolute bottom-1 -left-18 blur-[300px] "></div>
          <div >
            <Image src={'/Assets/hero_palm.png'} alt="Hero Palm" width={745} height={0} className="absolute -z-10 right-1/6 transform translate-x-1/3" />
          </div>
          
          <HeroSection />

        </div>

        <HeroSection2 />
      </main>
    </div>
  );
}



const HeroSection = memo(function HeroSection() {
  return (
    // CONTAINER: Use Flexbox to center/position, use padding (px/py) for spacing.
    // min-h-screen ensures it takes up full view height (optional).
    <div className="w-full  flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 xl:px-32 min-h-screen grow">
      
      {/* BADGE */}
      <div className="mb-6 px-4 py-2 bg-gray-100 dark:bg-[#141414] w-fit border border-gray-200 dark:border-[#2E2F2F] rounded-full flex gap-2 items-center transition-colors">
        <div className="h-1.5 w-1.5 bg-[#EEB846] rounded-full"></div>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-200">33rd Edition</p>
      </div>

      {/* MAIN TITLE: Use responsive text sizes (text-5xl -> md:text-8xl) */}
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight text-gray-900 dark:text-white">
        <span className="text-[#4600be]">V</span>ERSION&apos;26
      </h1>

      {/* SUBTITLE */}
      <p className="text-[#d97706] dark:text-[#F5C041] text-lg md:text-xl mt-2 md:mt-4 font-medium">
        Themed
      </p>

      {/* THEME TITLE: Removed fixed height (h-16) to allow wrapping if necessary */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold mt-1 mb-4 leading-tight text-gray-900 dark:text-white">
        Artificial <span className="text-[#4600be]">General</span> Intelligence
      </h2>

      {/* DESCRIPTION */}
      <p className="text-lg md:text-xl font-extralight text-gray-600 dark:text-gray-300 max-w-2xl">
        Where Human Imagination Meets Machine Evolution.
      </p>

      {/* BUTTONS: Stack on mobile (flex-col), Row on desktop (md:flex-row) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="#"
          className="bg-[#4600BE] hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center group shadow-lg dark:shadow-none"
        >
          <span>Be Part of Version&apos;26</span>
          {/* Use Group Hover for arrow effect if desired */}
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
          href="#"
          className="bg-transparent hover:bg-gray-100 dark:hover:bg-[#4600be]/10 border border-gray-300 dark:border-[#2E2F2F]  text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center"
        >
          <span>Meet the team</span>
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
  );
});

const HeroSection2 = memo(function HeroSection2() {
  return (
    <div className="relative w-full flex flex-col overflow-hidden bg-zinc-50 dark:bg-[#0a0a0a] transition-colors pt-20 md:pt-32 pb-20">
      
      {/* --- BACKGROUNDS --- */}
      
      {/* 1. Grid: Now covers full background (inset-0) but very subtle (opacity-30) */}
      <div className="absolute right-0 top-0 h-1/2 md:h-full w-full md:w-[45%] bg-[url('/Assets/perspective_grid_hero.png')] bg-cover bg-right opacity-10 dark:opacity-60 pointer-events-none z-0 dark:mix-blend-screen filter invert dark:invert-0" />
      
      {/* 2. Ribbon: High Priority. 
          - h-full: Forces it to stretch top-to-bottom.
          - w-full/md:w-[80%]: Gives it horizontal room.
          - bg-[length:auto_100%]: Key fix. Sets height to 100% and calculates width automatically to keep ratio.
      */}
      <div className="absolute left-0 top-0 h-full w-full md:w-[85%] bg-[url('/Assets/ribbion.png')] bg-no-repeat bg-left bg-[length:auto_100%] pointer-events-none z-0 opacity-80 dark:opacity-100 mix-blend-multiply dark:mix-blend-normal" />

      {/* --- CONTENT CONTAINER --- */}
      {/* Added z-10 to ensure text sits ABOVE the ribbon/grid */}
      <div className="relative z-10 w-[90%] max-w-[1400px] mx-auto mt-0 flex flex-col gap-12 md:gap-24">
        
        {/* TYPOGRAPHY */}
        <div className="w-full">
          <h1 className="text-gray-900 dark:text-white text-5xl sm:text-7xl md:text-8xl lg:text-[150px] font-bold leading-[0.9] tracking-tighter drop-shadow-2xl">
            Beyond Intelligence
            <br />
            <span className="block mt-4 md:mt-0 md:ml-[20%] lg:ml-[35%]">
              Toward Infinity
            </span>
          </h1>

          <div className="mt-8 flex justify-end">
            <p className="text-gray-600 dark:text-gray-200 text-lg md:text-xl lg:text-2xl w-full md:w-1/2 lg:w-[45%] leading-relaxed drop-shadow-md bg-white/60 border border-gray-200 dark:border-transparent dark:bg-black/5  p-4 rounded-xl shadow-sm dark:shadow-none">
              As we move into the age of AGI, intelligence is no longer confined
              to predefined tasks. It grows, adapts, and evolves. Our theme,
              “Beyond Intelligence Toward Infinity,” highlights this transition—a
              future where computational systems approach human versatility.
            </p>
          </div>
        </div>

        {/* MEDIA & ACTION */}
        <div className="w-full flex flex-col xl:flex-row items-center gap-10 lg:gap-16">
          
          {/* Video Container */}
          <div className="w-full xl:w-[986px] aspect-video rounded-xl border border-gray-200 dark:border-amber-50/20 overflow-hidden bg-gray-100 dark:bg-zinc-900 shadow-2xl relative z-20">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/wPSnOqOJYM4?autoplay=1&mute=1&loop=1&playlist=wPSnOqOJYM4"
              title="Version'25 After movie"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Button */}
          <a
            href="#"
            className="group w-full md:w-auto xl:min-w-[420px] bg-black/50 backdrop-blur-md hover:bg-white/10 border border-[#2E2F2F] text-white rounded-full transition-all duration-300 flex gap-4 items-center justify-center py-6 px-8 z-20"
          >
            <div className="w-4 h-4 bg-[#77ff00] rounded-full shadow-[0_0_10px_#77ff00] group-hover:scale-125 transition-transform" />
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Version’25 After movie
            </span>
          </a>
        </div>
      </div>
    </div>
  );
});



