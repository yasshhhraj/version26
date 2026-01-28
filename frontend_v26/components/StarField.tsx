'use client'

import { useEffect, useRef, useState } from 'react'

const CONFIG = {
    STAR_COUNT: 200,
    BACKGROUND_ALPHA: 0.15, // Optional: if we want trails, otherwise 1 for clear
};

class Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
    speed: number;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        this.brightness = Math.random();
        this.speed = Math.random() * 0.05;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = this.height;
            this.x = Math.random() * this.width;
        }
        this.brightness += (Math.random() - 0.5) * 0.02;
        this.brightness = Math.max(0.2, Math.min(1, this.brightness));
    }

    draw() {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness * 0.8})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        let width = 0;
        let height = 0;
        let animationId: number;
        const stars: Star[] = [];

        const initStars = () => {
            stars.length = 0;
            const starCount = Math.floor(CONFIG.STAR_COUNT * (width * height) / (1920 * 1080));
            const actualCount = Math.max(CONFIG.STAR_COUNT, starCount);
            for (let i = 0; i < actualCount; i++) {
                stars.push(new Star(ctx, width, height));
            }
        };

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width: w, height: h } = entry.contentRect;
                width = canvas.width = w;
                height = canvas.height = h;
                initStars();
            }
        });

        resizeObserver.observe(parent);

        // Initial set ready
        requestAnimationFrame(() => setReady(true));

        function animate() {
            ctx!.clearRect(0, 0, width, height);
            
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className={`block w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out ${ready ? 'opacity-100' : 'opacity-0'}`} 
        />
    );
}
