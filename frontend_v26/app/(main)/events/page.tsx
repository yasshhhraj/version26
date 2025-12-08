'use client'
import Image from "next/image";
import CircularCarousel from "@/app/components/CircularCarousal";
import {useEffect, useState} from "react";

const EventsPage = () => {
    const [isVertical, setIsVertical] = useState(false);

    useEffect(() => {
        const updateOrientation = () => {
            const portrait = typeof window !== 'undefined' &&
                (window.matchMedia && window.matchMedia('(orientation: portrait)').matches);
            // Fallback to small width if matchMedia not available
            const smallWidth = typeof window !== 'undefined' && window.innerWidth < 768;
            setIsVertical(Boolean(portrait || smallWidth));
        };
        updateOrientation();
    }, []);

    return (
        <div className={'relative flex flex-col items-center justify-start  h-screen w-full overflow-clip bg-[url("/Assets/ellipse.png")] dark:bg-[url("/Assets/grid_hero.png"),url("/Assets/ellipse.png")] bg-center bg-no-repeat bg-white dark:bg-black transition-colors duration-300'}>

            <div className={'w-[250%] sm:w-[150%] md:w-4/5 aspect-square scale-x-120 bg-gray-100 dark:bg-black absolute flex items-start justify-center top-[90%] sm:top-[85%] md:top-[80%] left-1/2 transform -translate-x-1/2 rounded-full border border-[#4A68FF]/5 dark:border-[#4A68FF]/20 transition-colors duration-300'}>
                <Image src={'/Assets/shine.svg'} alt={'decorative shine'} width={1980} height={1000}
                       className={'w-full scale-x-90 transform -translate-y-10 md-translate-y-5 md:-translate-x-5 opacity-60 dark:opacity-50 transition-opacity duration-300'}/>
            </div>
            <div className={"w-1 h-36 sm:h-44 md:h-56  shrink-0 "}></div>
            <div className={'w-full h-0 flex items-center justify-center shrink'}>
                <p className={'font-bold  fluid-text1 text-[clamp(64px,20vw,256px)]   text-version-lavender-purple dark:text-version-mauve text-shadow-lg transition-all duration-300'}>EVENTS</p>
            </div>

            <div
                className={'w-full h-auto grow shrink-0   flex items-center justify-center gap-10 overflow-clip'}>
                <Carousal isVerticle={isVertical} />
            </div>
        </div>
    );
}




export default EventsPage;



export function Carousal({isVerticle}: {isVerticle: boolean}) {

    return (
        <div className={(isVerticle?"md:max-h-full":" md:max-h-[540px]")+"carousal overscroll-y-none touch-pan-y h-full shrink-0  w-full  flex items-center justify-center  overflow-clip"}>
            <CircularCarousel  eventsData={eventsData} />
        </div>
    );
}

const eventsData = [
    {
        id: 1,
        title: "App Innovation Challenge",
        description: "Build next-gen mobile applications using Flutter or React Native in a 24-hour sprint.",
        image: "https://your-image-url.com/app-dev-illustration.png",
        date: "Dec 10, 2025",
        registrationLink: "/register/app-challenge"
    },
    {
        id: 2,
        title: "UI/UX Design Battle",
        description: "Compete to create the most intuitive and visually stunning user interfaces.",
        image: "https://your-image-url.com/design-illustration.png",
        date: "Dec 12, 2025",
        registrationLink: "/register/design-battle"
    },
    {
        id: 3,
        title: "AI Hackathon 2025",
        description: "Solve real-world problems using Machine Learning and Generative AI models.",
        image: "https://your-image-url.com/ai-illustration.png",
        date: "Dec 15, 2025",
        registrationLink: "/register/ai-hackathon"
    },
    {
        id: 4,
        title: "Cyber Security CTF",
        description: "Capture the Flag event testing your skills in cryptography and network security.",
        image: "https://your-image-url.com/security-illustration.png",
        date: "Dec 18, 2025",
        registrationLink: "/register/ctf"
    }
];

