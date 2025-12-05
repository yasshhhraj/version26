import Image from "next/image";
import CircularCarousel, {EventCard} from "@/app/components/CircularCarousal";

const EventsPage = () => {
    return (
        <div className={'relative h-screen w-full overflow-clip bg-[url("/Assets/ellipse.png")] dark:bg-[url("/Assets/grid_hero.png"),url("/Assets/ellipse.png")] bg-center bg-no-repeat bg-white dark:bg-black transition-colors duration-300'}>

            <div
                className={'w-[250%] sm:w-[150%] md:w-4/5 aspect-square scale-x-120 bg-gray-100 dark:bg-black absolute flex items-start justify-center top-[90%] sm:top-[85%] md:top-[80%] left-1/2 transform -translate-x-1/2 rounded-full border border-[#4A68FF]/5 dark:border-[#4A68FF]/20 transition-colors duration-300'}>
                <Image src={'/Assets/shine.svg'} alt={'decorative shine'} width={1980} height={1000}
                       className={'w-full scale-x-90 transform -translate-y-10 md-translate-y-5 md:-translate-x-5 opacity-60 dark:opacity-50 transition-opacity duration-300'}/>
            </div>
            <p className={'font-bold absolute text-[64px] sm:text-[100px] md:text-[128px] top-16 sm:top-20 md:top-24 left-1/2 transform -translate-x-1/2 text-[#4A68FF]/45 dark:text-[#4600BE] drop-shadow-5xl transition-colors duration-300'}>EVENTS</p>
            <div
                className={'w-full h-[80%] absolute bottom-0  flex items-center justify-center gap-10 overflow-clip'}>
                <Carousal />
            </div>
        </div>
    );
}

export default EventsPage;



export function Carousal() {
    const cards = eventsData.map((event) => <EventCard key={event.id} image={'/Assets/event_placeholder.png'} description={event.description} title={event.title} />)

    return (
        <div className="carousal h-full md:max-h-[540px]  w-full  flex items-center justify-center  overflow-clip">
            <CircularCarousel items={cards} />
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

