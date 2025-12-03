import Image from "next/image";
import Navbar from "../components/navbar";
import ParticlesPage from "./particle/page";

export default function Home() {
  return (
    <div className="h-full w-full overflow-x-clip bg-[url('/Assets/grid_hero.png')]  ">
      <main className="flex h-full w-full relative flex-col bg-[url('/Assets/background.png')] bg-cover ">
        <Navbar />
        <div className=" w-full h-fit shrink-0 relative ">
          <div className="rounded-full w-72 h-72  bg-[#4600BE] absolute top-1/6 right-1/6 blur-[300px] "></div>
          <div className="rounded-full w-72 h-72  bg-[#4600BE] absolute bottom-1 -left-18 blur-[300px] "></div>
          <div >
            <Image src={'/Assets/hero_palm.png'} alt="Hero Palm" width={745} height={0} className="absolute -z-10 right-1/6 transform translate-x-1/3" />
            {/* <ParticlesPage /> */}
          </div>
          
          <HeroSection />

        </div>
        <div className="bg-blue-700 shrink-0 w-full h-full relative ">
          <div className="rounded-full w-52 h-52  bg-gray-800  absolute top-1/3 right-1/4 blur-[128px] "></div>
          <div className="rounded-full w-52 h-52  bg-gray-800  absolute bottom-1/4 left-1/5 blur-[128px] "></div>
          <div></div>
        </div>
      </main>
    </div>
  );
}

const HeroSection = () => {
  return (
    // CONTAINER: Use Flexbox to center/position, use padding (px/py) for spacing.
    // min-h-screen ensures it takes up full view height (optional).
    <div className="w-full flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 xl:px-32 min-h-screen">
      
      {/* BADGE */}
      <div className="mb-6 px-4 py-2 bg-[#141414] w-fit border border-[#2E2F2F] rounded-full flex gap-2 items-center">
        <div className="h-1.5 w-1.5 bg-[#EEB846] rounded-full"></div>
        <p className="text-sm md:text-base text-gray-200">33rd Edition</p>
      </div>

      {/* MAIN TITLE: Use responsive text sizes (text-5xl -> md:text-8xl) */}
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight">
        <span className="text-[#4600be]">V</span>ERSION&apos;26
      </h1>

      {/* SUBTITLE */}
      <p className="text-[#F5C041] text-lg md:text-xl mt-2 md:mt-4 font-medium">
        Themed
      </p>

      {/* THEME TITLE: Removed fixed height (h-16) to allow wrapping if necessary */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold mt-1 mb-4 leading-tight">
        Artificial <span className="text-[#4600be]">General</span> Intelligence
      </h2>

      {/* DESCRIPTION */}
      <p className="text-lg md:text-xl font-extralight text-gray-300 max-w-2xl">
        Where Human Imagination Meets Machine Evolution.
      </p>

      {/* BUTTONS: Stack on mobile (flex-col), Row on desktop (md:flex-row) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="#"
          className="bg-[#4600BE] hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center group"
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
          className="bg-transparent hover:bg-[#4600be]/10 border border-[#2E2F2F] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 flex gap-3 items-center justify-center"
        >
          <span>Meet the team</span>
          <div
            className="w-5 h-5 bg-white"
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
};

