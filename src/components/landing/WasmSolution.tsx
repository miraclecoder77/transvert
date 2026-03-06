import React from 'react';

const WasmSolution: React.FC = () => {
    return (
        <section id="solution" className="py-32 bg-primary border-b brutalist-border relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <div className="brutalist-card p-4 border-2 border-black rotate-1 absolute -top-4 -left-4 z-0 bg-neon w-full h-full"></div>
                            <div className="relative z-10 bg-primary border-2 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <div className="mono text-[10px] uppercase font-bold mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Local WASM Engine: ACTIVE
                                </div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-8 italic">
                                    The Power of <br /> Edge-Computing.
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-1 bg-neon"></div>
                                        <div>
                                            <h4 className="font-bold uppercase text-sm mb-1">Zero-Server Logic</h4>
                                            <p className="mono text-xs text-secondary italic">Your files never touch our backend because we don't have one.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1 bg-neon"></div>
                                        <div>
                                            <h4 className="font-bold uppercase text-sm mb-1">C2PA Destruction</h4>
                                            <p className="mono text-xs text-secondary italic">We strip AI-training tags and identifying metadata at the binary level.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1 bg-neon"></div>
                                        <div>
                                            <h4 className="font-bold uppercase text-sm mb-1">Infinite Parallelism</h4>
                                            <p className="mono text-xs text-secondary italic">Batch convert hundreds of files using WebWorkers. No timeouts.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="inline-block px-3 py-1 border-2 border-black mb-6 mono text-xs font-bold uppercase tracking-widest bg-secondary">
                            The Solution
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none mb-8">
                            Your CPU, <br />
                            <span className="text-neon">Your Rules.</span>
                        </h2>
                        <p className="text-xl text-secondary mb-12 italic leading-relaxed">
                            We've ported industry-standard media engines (FFmpeg and ImageMagick) to WebAssembly. Transvert runs entirely in your browser sandbox.
                            <strong> You provide the iron; we provide the edge.</strong>
                        </p>
                        <ul className="space-y-4 mono text-sm font-bold uppercase tracking-tight">
                            <li className="flex items-center gap-3">
                                <span className="text-neon">→</span> 100% Offline Capable
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-neon">→</span> Unlimited File Sizes
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-neon">→</span> No Signups. Ever.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WasmSolution;
