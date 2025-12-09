import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export default function VisionPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 transition-colors duration-300">
            {/* Hero Section with Aurora Wave */}
            <section className="relative py-12 overflow-hidden">
                {/* Aurora wave effect */}
                <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
                    <Image src={'/Assets/vision.png'} alt={'header image'} layout={'fill'} objectFit={'cover'} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-center tracking-wider">VISION</h1>
            </section>

            {/* Version Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* AI Humanoid Image */}
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="relative aspect-square rounded-lg overflow-visible border border-purple-500/30">
                            <Image src="/Assets/two.png" alt="AI Humanoid" fill className="object-cover z-20" />
                        </div>
                    </div>

                    {/* Version Content */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="text-black dark:text-white">⚙</span> Version
                        </h2>
                        <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed list-disc list-inside">
                            <li>
                                Embarking on its 33rd edition, Version 2026, the annual All India MCA meet hosted by the students of NIT
                                Trichy, stands as the pinnacle event for MCA students nationwide. Since 1991, Version has been a
                                platform for showcasing talent, fostering healthy competition, and promoting creativity.
                            </li>
                            <li>
                                Beyond a mere contest, Version is an immersive experience featuring coding challenges, hackathons,
                                workshops, and interactions with industry experts. As the star event for MCA at NIT Trichy, it continues
                                to be eagerly anticipated, drawing participants from across India.
                            </li>
                            <li>
                                Version 2026 promises to uphold its legacy of excellence, offering participants a unique opportunity to
                                push boundaries, forge connections, and leave an indelible mark on the landscape of MCA events. Get
                                ready to celebrate innovation, talent, and camaraderie at the grand stage of Version 2026.
                            </li>
                        </ul>
                        <button className="mt-8 px-6 py-2 border border-gray-900 dark:border-white rounded-md flex items-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm">
                            know more
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* AGI Theme Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* AGI Content */}
                    <div className="flex-1 order-2 md:order-1">
                        <p className="text-orange-600 dark:text-orange-500 text-sm mb-1">Themed</p>
                        <h2 className="text-xl font-bold mb-6">Artificial General Intelligence (AGI)</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify">
                            Version 2026 marks a monumental shift as it embraces Artificial General Intelligence (AGI) as its central
                            theme. AGI goes beyond conventional AI by aiming for machines that can think, learn, and adapt across
                            diverse tasks just like humans. It symbolizes the future of intelligent systems capable of creativity,
                            reasoning, and independent decision making. This groundbreaking vision aligns perfectly with the essence
                            of Version: pushing limits, exploring the unknown, and celebrating innovation. Version 2026 will bring AGI
                            to the forefront through cutting-edge challenges, interactive workshops, and collaborative experiences
                            that empower participants to experiment with the technologies shaping tomorrow. As India&#39;s premier MCA
                            meet, Version 2026 invites students to dive into the era of general intelligence and craft solutions that
                            redefine what machines and we can achieve.
                        </p>
                    </div>

                    {/* Robot Image */}
                    <div className="w-full md:w-2/5 flex-shrink-0 order-1 md:order-2">
                        <div className="relative aspect-[3/4]">
                            <Image src="/Assets/one.png" alt="AGI Robot" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <button className="px-6 py-2 border border-gray-900 dark:border-white rounded-md flex items-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm">
                        know more
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h3 className="text-xl font-bold mb-2">TITLE</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam.
                </p>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Progress Bars */}
                    <div className="w-full md:w-1/3">
                        <h4 className="font-semibold mb-6">subtitle</h4>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-end">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">50%</span>
                                    </div>
                                    <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div className="h-full w-1/2 bg-black dark:bg-white rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-5xl font-bold">33</p>
                            <p className="text-gray-600 dark:text-gray-400">years</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold">22+</p>
                            <p className="text-gray-600 dark:text-gray-400">Events</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold">200+</p>
                            <p className="text-gray-600 dark:text-gray-400">participants/year</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold">XXK</p>
                            <p className="text-gray-600 dark:text-gray-400">price distribution</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative py-16 mt-8 overflow-hidden">
                {/* Metallic background */}
                <div className="absolute inset-0">
                    <Image src="/Assets/three.png" alt="Metallic background" fill className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                        Innovation without boundaries. Collaboration without limits. Version&apos;26 is more than a symposium; it is a
                        crucible for the ideas that will define the AGI landscape. We are building the framework for a smarter, more
                        adaptive world, one line of code at a time.
                    </p>
                </div>
            </section>
        </main>
    )
}
