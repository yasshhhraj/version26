"use client";
import { memo, Suspense, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";

import dynamic from "next/dynamic";
const AGIGallery = dynamic(() => import("@/components/AGIGallery"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  ),
});
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";

import { Loader } from "@/components/ui/Loader";

const InfinityParticles3D = dynamic(
  () => import("@/components/InfinityParticles3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    ),
  },
);
const StarField = dynamic(() => import("@/components/StarField"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

interface HeroData {
  heroSection: {
    badge: string;
    mainTitle: string;
    subtitle: string;
    tagline: string;
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
  heroSection: {
    badge: "EST. 1991",
    mainTitle: "COGNIX",
    subtitle: "VERSION '26",
    themeTitle: {
      // Kept for type compatibility if needed, but unused in new Hero
      prefix: "",
      highlight: "",
      suffix: "",
    },
    tagline: "INTELLIGENCE WITHOUT LIMITS",
    description:
      "Beyond static algorithms. Join the 33rd edition as we bridge the gap between binary code and infinite reasoning.",
    buttons: {
      primary: "EXPLORE EVENTS",
      secondary: "CONTACT",
    },
  },
  heroSection2: {
    title: "Beyond Intelligence. Toward Infinity.",
    description:
      "Artificial General Intelligence represents a long-term pursuit — systems capable of learning, adapting, and reasoning beyond narrowly defined tasks. While still an open research challenge, AGI invites us to rethink how intelligence might evolve in computational systems. VERSION’26 explores this frontier, focusing on ideas, questions, and possibilities that shape the future of intelligent technology.",
    video: {
      src: "https://www.youtube.com/embed/C1GOcj_aLPQ",
      title: "VERSION’25 After Movie",
    },
    button: "Watch VERSION’25 After Movie",
  },
};

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="h-auto w-full overflow-x-clip bg-black">
      <div className="fixed inset-0 z-0">
        <Hero
          data={heroData.heroSection}
          onContactClick={() => setIsContactOpen(true)}
        />
      </div>
      <main className="flex h-full w-full relative flex-col z-10 bg-transparent pointer-events-none">
        <div className="w-full h-screen pointer-events-none" />
        <div className="w-full relative flex flex-col pointer-events-auto">
          {/* Background Layer with Stars */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <div className="absolute inset-0 opacity-50">
                <Suspense fallback={null}>
                <StarField />
                </Suspense>
            </div>
          </div>
          
          <HeroSection2 data={heroData.heroSection2} />
          <AGIGallery videoData={heroData.heroSection2.video} />
          <Footer />
        </div>
      </main>
      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

const HeroSection2 = memo(function HeroSection2({
  data,
}: {
  data: HeroData["heroSection2"];
}) {
  return (
    <div className="relative w-full flex flex-col overflow-hidden  transition-colors pt-20 md:pt-32 pb-20">
      {/* --- BACKGROUNDS --- */}
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-transparent via-black/50 to-transparent" />

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
            className="text-[#E6E6E6] text-[clamp(1.5rem,6vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,5rem)] md:text-[clamp(3rem,6vw,7rem)] lg:text-[clamp(3.5rem,7vw,9rem)] xl:text-[clamp(4rem,8vw,10rem)] font-bold leading-[0.9] tracking-tighter drop-shadow-2xl text-center md:text-right"
          >
            <span className="whitespace-nowrap inline-block">Beyond Intelligence.</span>{" "}
            <span className="whitespace-nowrap inline-block">Toward Infinity.</span>
          </motion.h1>

          <div
            className={
              "flex flex-col lg:flex-row mt-8 gap-8 items-center lg:items-start"
            }
          >
            <div
              className={
                "relative w-full lg:w-1/2 aspect-4/3 md:aspect-square h-auto max-h-64 md:max-h-136"
              }
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                <InfinityParticles3D />
              </Suspense>
            </div>
            <p
              className="text-[#8F9999] text-lg md:text-xl lg:text-2xl w-full lg:w-1/2 leading-relaxed drop-shadow-md bg-black/5 border border-transparent p-6 md:p-8 rounded-2xl shadow-none text-center lg:text-left"
            >
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
