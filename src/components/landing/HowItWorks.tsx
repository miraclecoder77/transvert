import React from 'react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            step: "01",
            title: "Worker Threads Spawn",
            desc: "We initialize a persistent WebWorker that loads the binary payloads (.wasm) into a dedicated memory space."
        },
        {
            step: "02",
            title: "Binary Mapping",
            desc: "Your file is read as an ArrayBuffer and piped directly into the WASM module's virtual filesystem (MEMFS)."
        },
        {
            step: "03",
            title: "Local Execution",
            desc: "The CPU executes the command (FFmpeg/ImageMagick) natively on your machine at near-native speeds."
        },
        {
            step: "04",
            title: "Blob Generation",
            desc: "The output is packaged as a standard Blob URL, triggered for download, and then purged from local memory."
        }
    ];

    return (
        <section id="how" className="py-32 bg-secondary border-b brutalist-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter italic italic mb-8">
                            Under the Hood: <br />
                            <span className="text-neon text-6xl">Binary Sovereignty.</span>
                        </h2>
                    </div>
                    <div className="mono text-sm text-secondary uppercase tracking-widest leading-relaxed">
            /* THE ENTIRE STACK IS CLIENT-SIDE. WE DO NOT HAVE A SERVER. WE DO NOT WANT YOUR DATA. WE WANT YOUR COMPUTE. */
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {steps.map((s, i) => (
                        <div key={i} className="relative group">
                            <div className="text-8xl font-black opacity-10 mono absolute -top-12 -left-4 group-hover:text-neon transition-colors">
                                {s.step}
                            </div>
                            <div className="relative z-10 pt-8">
                                <h3 className="text-lg font-black uppercase tracking-tighter mb-4 italic italic">
                                    {s.title}
                                </h3>
                                <p className="mono text-xs leading-loose text-secondary border-l-2 border-border pl-4">
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
