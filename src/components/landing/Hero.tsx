import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden border-b brutalist-border">
            <div className="scanline"></div>

            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-in">
                        <div className="inline-block px-3 py-1 bg-neon text-black mono text-xs font-bold mb-6">
                            SYSTEM STATUS: PRIVACY BREACH DETECTED IN CLOUD
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none italic uppercase">
                            Stop Feeding <br />
                            <span className="text-neon">The Machine.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary max-w-xl mb-12 leading-relaxed">
                            Every time you upload a "private" file to a cloud converter, you're handing over your meta-data, your content, and your identity to Big Tech's training sets.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className="px-8 py-4 bg-neon text-black font-black uppercase tracking-tighter text-xl brutalist-border hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(212,255,0,0.3)]"
                            >
                                Enter Transvert
                            </button>
                            <div className="flex items-center gap-4 mono text-xs text-secondary uppercase tracking-widest">
                                <span className="w-8 h-px bg-border"></span>
                                The local-first mutation
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative animate-in" style={{ animationDelay: '0.2s' }}>
                        <div className="brutalist-card p-8 border-4 border-neon shadow-[20px_20px_0px_0px_rgba(212,255,0,0.1)]">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="mono text-[10px] text-secondary font-bold uppercase tracking-tighter">
                                    Cloud_Leak_Warning.exe
                                </div>
                            </div>
                            <div className="space-y-4 mono text-sm">
                                <div className="text-red-500">[CRITICAL] Cloud Upload Initialized...</div>
                                <div className="text-[#666]">Connecting to server-farm-XJ9...</div>
                                <div className="text-yellow-500">[WARN] Metadata scraping in progress...</div>
                                <div className="text-[#666]">Analyzing file entropy for ad-targeting...</div>
                                <div className="text-blue-500">File stored on: THIRD-PARTY-HD-821</div>
                                <div className="text-red-500 blink uppercase font-bold mt-4">Security Protocol: BYPASSED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-6 mono text-[10px] text-secondary uppercase tracking-[0.3em] vertical-rl">
                WASM CORE INFRASTRUCTURE // 2026
            </div>
        </section>
    );
};

export default Hero;
