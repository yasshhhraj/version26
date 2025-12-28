'use client'

import { useEffect, useRef } from 'react'

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationId: number;

        const stars: Star[] = [];

        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            stars.push(new Star(ctx, width, height));
        }

        function animate() {
            ctx!.clearRect(0, 0, width, height);
            
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
            width = canvas!.width = window.innerWidth;
            height = canvas!.height = window.innerHeight;
            
            // Re-initialize stars on resize to cover new area
            stars.length = 0;
            for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
                stars.push(new Star(ctx!, width, height));
            }
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="block w-full h-full absolute inset-0 pointer-events-none" />
    );
}
