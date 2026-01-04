import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import visionData from "@/public/vision.json"

export default function VisionPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 transition-colors duration-300">
            {/* Hero Section with Aurora Wave */}
            <section className="relative py-12 overflow-hidden">
                {/* Aurora wave effect */}
                <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
                    <Image src={visionData.hero.image} alt={'header image'} layout={'fill'} objectFit={'cover'} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-center tracking-wider">{visionData.hero.title}</h1>
            </section>

            {/* Version Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* AI Humanoid Image */}
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <div className="relative aspect-square rounded-lg overflow-visible border border-purple-500/30">
                            <Image src={visionData.version.image} alt="AI Humanoid" fill className="object-cover z-20" />
                        </div>
                    </div>

                    {/* Version Content */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="text-black dark:text-white">⚙</span> {visionData.version.title}
                        </h2>
                        <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed list-disc list-inside">
                            {visionData.version.content.map((paragraph, index) => (
                                <li key={index}>{paragraph}</li>
                            ))}
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
                        <p className="text-orange-600 dark:text-orange-500 text-sm mb-1">{visionData.agi.subtitle}</p>
                        <h2 className="text-xl font-bold mb-6">{visionData.agi.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify">
                            {visionData.agi.description}
                        </p>
                    </div>

                    {/* Robot Image */}
                    <div className="w-full md:w-2/5 flex-shrink-0 order-1 md:order-2">
                        <div className="relative aspect-[3/4]">
                            <Image src={visionData.agi.image} alt="AGI Robot" fill className="object-contain" />
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
                <h3 className="text-xl font-bold mb-2">{visionData.stats.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
                    {visionData.stats.description}
                </p>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Progress Bars */}
                    <div className="w-full md:w-1/3">
                        <h4 className="font-semibold mb-6">{visionData.stats.subtitle}</h4>
                        <div className="space-y-4">
                            {visionData.stats.progress.map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-end">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">{item.percentage}</span>
                                    </div>
                                    <div className="h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div 
                                            className="h-full bg-black dark:bg-white rounded-full" 
                                            style={{ width: item.percentage }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 gap-8">
                        {visionData.stats.grid.map((stat, index) => (
                            <div key={index}>
                                <p className="text-5xl font-bold">{stat.value}</p>
                                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Banner */}
            <section className="relative py-16 mt-8 overflow-hidden">
                {/* Metallic background */}
                <div className="absolute inset-0">
                    <Image src={visionData.quote.image} alt="Metallic background" fill className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                        {visionData.quote.text}
                    </p>
                </div>
            </section>
        </main>
    )
}
