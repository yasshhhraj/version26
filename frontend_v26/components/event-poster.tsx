"use client"

import React, { useEffect, useRef } from "react"

// Shared data contracts
export interface EventCardData {
    id?: string
    title?: string
    tagline?: string
    description?: string
    imageUrl?: string
    eventType?: string
    date?: string
    dateRangeText?: string
    locationType?:  string
    venue?: string
    isOnline?: boolean
}

interface AGIEventPosterProps {
    eventData: EventCardData
    className?: string
    onClick?: () => void
}

export default function AGIEventPoster({ eventData, className, onClick }: AGIEventPosterProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Default values
    const {
        title,
        tagline,
        imageUrl,
        eventType,
        venue,
        isOnline,
    } = eventData

    // Parse date to extract more details if needed
    const dateDisplay = eventData.date || eventData.dateRangeText || "Coming Soon"
    const venueDisplay = venue

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * 2
            canvas.height = rect.height * 2
            ctx.scale(2, 2)
        }

        updateCanvasSize()

        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            opacity: number
        }> = []
        const particleCount = 50 // Reduced particle count for performance in grid

        const width = canvas.width / 2
        const height = canvas.height / 2

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
            })
        }

        let animationId: number

        function animate() {
            if (!ctx || !canvas) return

            const w = canvas.width / 2
            const h = canvas.height / 2

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, w, h)

            particles.forEach((p) => {
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0 || p.x > w) p.vx *= -1
                if (p.y < 0 || p.y > h) p.vy *= -1

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`
                ctx.shadowBlur = 10
                ctx.shadowColor = "rgba(0, 255, 255, 0.8)"
                ctx.fill()
                ctx.shadowBlur = 0
            })

            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - dist / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                })
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [])


    return (
        <div
            className={`relative max-w-72 aspect-3/4 bg-linear-to-br from-black via-purple-950 to-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.5)] group ${className}`}
        >
            {/* Background Image */}
            {imageUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                />
            )}

            {/* Animated Canvas Background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-transparent to-pink-500/20" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
        linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
      `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/30 rounded-full blur-[120px] animate-pulse" />
            <div
                className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/30 rounded-full blur-[120px] animate-pulse"
                style={{ animationDelay: "1s" }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,255,0.6)]">
                            <div className="absolute inset-0.5 bg-black rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="2"
                                >
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#00ffff" />
                                            <stop offset="100%" stopColor="#ff00ff" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-black bg-linear-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent uppercase">
                                {eventType}
                            </div>
                        </div>
                    </div>

                    {isOnline && (
                        <span className="inline-flex items-center rounded-full bg-indigo-50/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30 backdrop-blur-sm">
                            Online
                        </span>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="space-y-2">
                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-4xl font-black leading-none tracking-tighter bg-linear-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_80px_rgba(0,255,255,0.5)]">
                            {title}
                        </h1>

                        {/* Tagline */}
                        {tagline && (
                            <p className="text-sm text-gray-300 font-light leading-relaxed line-clamp-3">
                                {tagline}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-start justify-between mt-auto pt-4 border-t border-white/10 gap-4">
                    <div className="grid grid-cols-2 gap-2 w-full">
                        {[
                            { label: "DATE", value: dateDisplay },
                            { label: "VENUE", value: venueDisplay },
                        ].map((item, i) => (
                            <div key={i} className="space-y-0.5">
                                <div className="text-[8px] font-bold text-cyan-400 tracking-[0.15em]">
                                    {item.label}
                                </div>
                                <div className="text-xs font-bold text-white wrap-break-word">{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={onClick}
                        className="group/btn relative px-6 py-3 bg-linear-to-r from-cyan-500 to-pink-500 rounded-full font-bold text-black text-sm tracking-wide shadow-[0_0_40px_rgba(0,255,255,0.6)] hover:shadow-[0_0_60px_rgba(0,255,255,0.8)] transition-all duration-300 hover:scale-105 overflow-hidden w-full"
                    >
                        <span className="relative z-10">VIEW DETAILS</span>
                        <div className="absolute inset-0    bg-linear-to-r from-pink-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 right-12 w-48 h-48 opacity-20 hidden sm:block">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin" style={{ animationDuration: "20s" }}>
                    <defs>
                        <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="100%" stopColor="#ff00ff" />
                        </linearGradient>
                    </defs>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <circle
                            key={i}
                            cx="100"
                            cy="100"
                            r={30 + i * 20}
                            fill="none"
                            stroke="url(#circleGrad)"
                            strokeWidth="2"
                            opacity={0.6 - i * 0.1}
                        />
                    ))}
                </svg>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-pink-400/50 rounded-br-3xl" />
        </div>
    )
}
