export function Loader() {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#4600be] border-t-transparent rounded-full animate-spin"></div>
            <h2 className="animate-pulse text-xl font-mono tracking-widest text-[#4600be]">LOADING...</h2>
        </div>
    );
}

export function FullScreenLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-black text-white z-50 relative">
            <Loader />
        </div>
    );
}
