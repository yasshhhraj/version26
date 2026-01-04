// global.d.ts
declare module 'ccapture.js' {
    export default class CCapture {
        constructor(settings: {
            format?: 'webm' | 'gif' | 'png' | 'jpg' | 'ffmpegserver';
            framerate?: number;
            motionBlurFrames?: number;
            verbose?: boolean;
            display?: boolean;
            quality?: number;
            name?: string;
            workersPath?: string;
            timeLimit?: number;
            autoSaveTime?: number;
        });

        start(): void;
        stop(): void;
        capture(canvas: HTMLCanvasElement): void;
        save(callback?: (blob: Blob) => void): void;
    }
}

interface Window {
    CCapture: unknown;
}
