'use client'

import { useEffect, useRef } from 'react'

const CONFIG = {
    LAYER_COUNT: 8,
    NEURONS_PER_LAYER: 40,
    FRAMES_PER_LAYER: 100,
    SIGNAL_INTERVAL: 25,
    DATA_PARTICLES_PER_LAYER: 4,
    NEURON_SIZE_MIN: 3,
    NEURON_SIZE_MAX: 5,
    CONNECTION_COUNT: 2,
    SIGNAL_SPEED_MIN: 0.015,
    SIGNAL_SPEED_MAX: 0.035,
    PARTICLE_SPEED_MIN: 0.002,
    PARTICLE_SPEED_MAX: 0.004,
    PARTICLE_SIZE: 2,
    BACKGROUND_ALPHA: 0.15,
    MOUSE_INFLUENCE_RADIUS: 120,
    STAR_COUNT: 30,
};

const debounce = (func: (...args: unknown[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

class Neuron {
    t: number;
    layer: number;
    activation: number;
    targetActivation: number;
    size: number;
    connections: Neuron[];
    age: number;
    ctx: CanvasRenderingContext2D;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    x: number;
    y: number;

    constructor(t: number, layer: number, ctx: CanvasRenderingContext2D, centerX: number, centerY: number, width: number, height: number) {
        this.t = t;
        this.layer = layer;
        this.activation = Math.random();
        this.targetActivation = Math.random();
        this.size = CONFIG.NEURON_SIZE_MIN + Math.random() * (CONFIG.NEURON_SIZE_MAX - CONFIG.NEURON_SIZE_MIN);
        this.connections = [];
        this.age = 0;
        this.ctx = ctx;
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.updatePosition();
    }

    updatePosition() {
        const baseScale = Math.min(this.width, this.height) * 0.26;
        const layerOffset = this.layer * 30;
        const scale = baseScale + layerOffset;
        const angle = this.t * Math.PI * 2;

        this.x = this.centerX + (scale * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
        this.y = this.centerY + (scale * Math.sin(angle) * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
    }

    update(mouseX: number, mouseY: number) {
        this.age++;
        this.activation += (this.targetActivation - this.activation) * 0.05;

        if (Math.random() < 0.02) {
            this.targetActivation = Math.random();
        }

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.MOUSE_INFLUENCE_RADIUS) {
            this.activation = Math.min(1, this.activation + 0.05);
        }
    }

    draw() {
        const brightness = this.activation;
        const fadeIn = Math.min(1, this.age / 60);
        const layerAlpha = Math.max(0.1, 1 - (this.layer * 0.12));

        // Outer glow
        const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6);
        gradient.addColorStop(0, `rgba(${200 + brightness * 55}, ${150 + brightness * 105}, 255, ${brightness * 0.4 * fadeIn * layerAlpha})`);
        gradient.addColorStop(1, `rgba(100, 50, 200, 0)`);

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Core
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${220 + brightness * 35}, ${180 + brightness * 75}, 255, ${(0.8 + brightness * 0.2) * fadeIn * layerAlpha})`;
        this.ctx.shadowBlur = 10 * brightness;
        this.ctx.shadowColor = `rgba(180, 150, 255, ${brightness})`;
        this.ctx.fill();
        this.ctx.shadowBlur = 0; // Reset shadow for other draws

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size + 1, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.4 * fadeIn * layerAlpha})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
    }
}

class Signal {
    fromNeuron: Neuron;
    toNeuron: Neuron;
    progress: number;
    speed: number;
    strength: number;
    ctx: CanvasRenderingContext2D;

    constructor(fromNeuron: Neuron, toNeuron: Neuron, ctx: CanvasRenderingContext2D) {
        this.fromNeuron = fromNeuron;
        this.toNeuron = toNeuron;
        this.progress = 0;
        this.speed = CONFIG.SIGNAL_SPEED_MIN + Math.random() * (CONFIG.SIGNAL_SPEED_MAX - CONFIG.SIGNAL_SPEED_MIN);
        this.strength = 0.5 + Math.random() * 0.5;
        this.ctx = ctx;
    }

    update() {
        this.progress += this.speed;

        if (this.progress >= 1) {
            this.toNeuron.targetActivation = Math.min(1, this.toNeuron.targetActivation + 0.3);
            return false;
        }
        return true;
    }

    draw() {
        const x = this.fromNeuron.x + (this.toNeuron.x - this.fromNeuron.x) * this.progress;
        const y = this.fromNeuron.y + (this.toNeuron.y - this.fromNeuron.y) * this.progress;

        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.strength})`);
        gradient.addColorStop(1, `rgba(200, 150, 255, 0)`);

        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.strength})`;
        this.ctx.fill();
    }
}

class DataParticle {
    t: number;
    layer: number;
    speed: number;
    size: number;
    opacity: number;
    ctx: CanvasRenderingContext2D;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    x: number;
    y: number;

    constructor(layer: number, ctx: CanvasRenderingContext2D, centerX: number, centerY: number, width: number, height: number) {
        this.t = Math.random();
        this.layer = layer;
        this.speed = CONFIG.PARTICLE_SPEED_MIN + Math.random() * (CONFIG.PARTICLE_SPEED_MAX - CONFIG.PARTICLE_SPEED_MIN);
        this.size = CONFIG.PARTICLE_SIZE;
        this.opacity = 0.6;
        this.ctx = ctx;
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.updatePosition();
    }

    updatePosition() {
        const baseScale = Math.min(this.width, this.height) * 0.26;
        const layerOffset = this.layer * 30;
        const scale = baseScale + layerOffset;
        const angle = this.t * Math.PI * 2;

        this.x = this.centerX + (scale * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
        this.y = this.centerY + (scale * Math.sin(angle) * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
    }

    update() {
        this.t += this.speed;
        if (this.t > 1) this.t = 0;
        this.updatePosition();
    }

    draw() {
        const layerAlpha = Math.max(0.1, 1 - (this.layer * 0.12));

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(200, 200, 255, ${this.opacity * layerAlpha})`;
        this.ctx.fill();
    }
}


class Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    pulse: number;
    pulseSpeed: number;
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
    }

    draw() {
        this.pulse += this.pulseSpeed;
        const currentOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
        
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        this.ctx.fill();
    }
}


class InfinityController {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    centerX: number = 0;
    centerY: number = 0;
    baseCenterX: number = 0;
    baseCenterY: number = 0;
    animationId: number = 0;
    mouseX: number = -1000;
    mouseY: number = -1000;

    layers: Neuron[][] = [];
    signals: Signal[] = [];
    dataParticles: DataParticle[] = [];
    stars: Star[] = [];
    currentLayer: number = 0;
    frameCount: number = 0;
    signalTimer: number = 0;
    hoverTime: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.handleResize();
        this.init();
    }

    init() {
        this.createLayer(0);
        this.createLayer(1);
        this.createLayer(2);
        this.currentLayer = 2;

        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            this.stars.push(new Star(this.ctx, this.width, this.height));
        }
    }

    createLayer(layerIndex: number) {
        const newLayer: Neuron[] = [];

        // Reduce neurons in inner layers to avoid clutter
        // Innermost layer (0) has fewest neurons, outer layers have more
        const neuronCount = Math.floor(CONFIG.NEURONS_PER_LAYER * (0.3 + (layerIndex * 0.7) / CONFIG.LAYER_COUNT));

        for (let i = 0; i < neuronCount; i++) {
            const neuron = new Neuron(i / neuronCount, layerIndex, this.ctx, this.centerX, this.centerY, this.width, this.height);
            newLayer.push(neuron);
        }

        newLayer.forEach((neuron, i) => {
            for (let j = 1; j <= CONFIG.CONNECTION_COUNT; j++) {
                const targetIdx = (i + j) % newLayer.length;
                neuron.connections.push(newLayer[targetIdx]);
            }

            if (layerIndex > 0 && this.layers[layerIndex - 1]) {
                const prevLayer = this.layers[layerIndex - 1];
                const connectTo = Math.floor(i * prevLayer.length / newLayer.length);
                neuron.connections.push(prevLayer[connectTo]);
                if (prevLayer[connectTo + 1]) {
                    neuron.connections.push(prevLayer[connectTo + 1]);
                }
            }
        });

        this.layers[layerIndex] = newLayer;

        for (let i = 0; i < CONFIG.DATA_PARTICLES_PER_LAYER; i++) {
            this.dataParticles.push(new DataParticle(layerIndex, this.ctx, this.centerX, this.centerY, this.width, this.height));
        }
    }

    drawConnections() {
        this.layers.forEach(layer => {
            layer.forEach(neuron => {
                const fadeIn = Math.min(1, neuron.age / 60);
                const layerAlpha = Math.max(0.1, 1 - (neuron.layer * 0.12));

                neuron.connections.forEach(toNeuron => {
                    const avgActivation = (neuron.activation + toNeuron.activation) / 2;
                    const toFadeIn = Math.min(1, toNeuron.age / 60);

                    this.ctx.beginPath();
                    this.ctx.moveTo(neuron.x, neuron.y);
                    this.ctx.lineTo(toNeuron.x, toNeuron.y);
                    this.ctx.strokeStyle = `rgba(180, 130, 255, ${(0.1 + avgActivation * 0.2) * fadeIn * toFadeIn * layerAlpha})`;
                    this.ctx.lineWidth = 0.5 + avgActivation * 1.5;
                    this.ctx.stroke();
                });
            });
        });
    }

    createSignals() {
        this.signalTimer++;
        if (this.signalTimer > CONFIG.SIGNAL_INTERVAL && this.layers.length > 0) {
            this.signalTimer = 0;

            const layerIdx = Math.floor(Math.random() * this.layers.length);
            const layer = this.layers[layerIdx];
            const fromNeuron = layer[Math.floor(Math.random() * layer.length)];

            if (fromNeuron.connections.length > 0) {
                const toNeuron = fromNeuron.connections[Math.floor(Math.random() * fromNeuron.connections.length)];
                this.signals.push(new Signal(fromNeuron, toNeuron, this.ctx));
            }
        }
    }

    animate = () => {
        this.frameCount++;
        this.hoverTime += 0.01;

        // Subtle hovering motion
        this.centerX = this.baseCenterX + Math.sin(this.hoverTime) * 15;
        this.centerY = this.baseCenterY + Math.cos(this.hoverTime * 0.7) * 10;

        if (this.frameCount % CONFIG.FRAMES_PER_LAYER === 0 && this.currentLayer < CONFIG.LAYER_COUNT - 1) {
            this.currentLayer++;
            this.createLayer(this.currentLayer);
        }

        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.BACKGROUND_ALPHA})`;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.globalCompositeOperation = 'source-over';

        // Draw stars background
        this.stars.forEach(star => star.draw());

        this.drawConnections();

        this.layers.forEach(layer => {
            layer.forEach(neuron => {
                neuron.update(this.mouseX, this.mouseY);
                neuron.draw();
            });
        });

        this.createSignals();
        for (let i = this.signals.length - 1; i >= 0; i--) {
            if (!this.signals[i].update()) {
                this.signals.splice(i, 1);
            } else {
                this.signals[i].draw();
            }
        }

        this.dataParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        this.animationId = requestAnimationFrame(this.animate);
    }

    handleResize = () => {
        const parent = this.canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;

        let cssWidth = parent ? parent.clientWidth : window.innerWidth;
        const cssHeight = parent ? parent.clientHeight : window.innerHeight;

        // On smaller screens, allow the canvas to be slightly wider than its parent
        // to fit the infinity symbol better without being cut off
        if (cssWidth < 768 && parent) {
            const screenWidth = window.innerWidth;
            cssWidth = Math.min(screenWidth, cssWidth * 1.2);
            this.canvas.style.left = `${(parent.clientWidth - cssWidth) / 2}px`;
        } else {
            this.canvas.style.left = '0px';
        }

        this.canvas.style.width = `${cssWidth}px`;
        this.canvas.style.height = `${cssHeight}px`;

        this.canvas.width = cssWidth * dpr;
        this.canvas.height = cssHeight * dpr;

        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.width = cssWidth;
        this.height = cssHeight;

        // Always center in the middle of the canvas
        this.baseCenterX = cssWidth / 2;
        this.baseCenterY = cssHeight / 2;
        this.centerX = this.baseCenterX;
        this.centerY = this.baseCenterY;

        // Re-initialize stars for new dimensions
        this.stars = [];
        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            this.stars.push(new Star(this.ctx, this.width, this.height));
        }

        // Reposition everything
        this.layers.forEach(layer =>
            layer.forEach(neuron => {
                neuron.width = this.width;
                neuron.height = this.height;
                neuron.centerX = this.centerX;
                neuron.centerY = this.centerY;
                neuron.updatePosition();
            })
        );

        this.dataParticles.forEach(particle => {
            particle.width = this.width;
            particle.height = this.height;
            particle.centerX = this.centerX;
            particle.centerY = this.centerY;
            particle.updatePosition();
        });
    };

    handleMouseMove = (e: MouseEvent) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    start() {
        this.animate();
        window.addEventListener('resize', this.debouncedResize);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    stop() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.debouncedResize);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    debouncedResize = debounce(() => this.handleResize(), 100);
}

interface InfinityNeuralNetworkProps {
    className?: string;
}

export default function InfinityNeuralNetwork({ className }: InfinityNeuralNetworkProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const controllerRef = useRef<InfinityController | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        controllerRef.current = new InfinityController(canvas);
        controllerRef.current.start();

        return () => {
            controllerRef.current?.stop();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className={className || "absolute inset-0 w-full h-full"} />
    );
}
