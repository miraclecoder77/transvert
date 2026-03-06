import React from 'react';

const UseCases: React.FC = () => {
    const cases = [
        {
            title: "Privacy First Video",
            desc: "Convert internal company meetings or personal family videos without leaking content to cloud providers.",
            tag: "VIDEO"
        },
        {
            title: "Mass Image Optimization",
            desc: "Resize 500+ product photos for your webstore locally. No server timeout, no upload/download bandwidth wasted.",
            tag: "IMAGE"
        },
        {
            title: "AI Poisoning Defense",
            desc: "Strip C2PA and IPTC metadata from your artistic works before posting online to prevent AI training attribution.",
            tag: "METADATA"
        },
        {
            title: "Legacy Code Extraction",
            desc: "Extract frames or audio from proprietary formats using our FFmpeg core without specialized software.",
            tag: "ENGINEERING"
        },
        {
            title: "In-Flight Conversions",
            desc: "Working on a plane? Transvert is a PWA that works 100% offline. No Wi-Fi required to process media.",
            tag: "OFFLINE"
        }
    ];

    return (
        <section id="cases" className="py-32 bg-primary border-b brutalist-border">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-5xl font-black uppercase tracking-tighter italic text-center mb-24">
                    Built For The <br />
                    <span className="text-neon">Sophisticated Rebel.</span>
                </h2>

                <div className="flex flex-col gap-px bg-border brutalist-border">
                    {cases.map((c, i) => (
                        <div key={i} className="bg-primary p-12 flex flex-col md:flex-row gap-12 items-start md:items-center group hover:bg-secondary transition-colors">
                            <div className="mono text-xs font-bold px-3 py-1 bg-neon text-black group-hover:rotate-3 transition-transform">
                                #{c.tag}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic italic">
                                    {c.title}
                                </h3>
                                <p className="mono text-sm text-secondary max-w-2xl leading-relaxed">
                                    {c.desc}
                                </p>
                            </div>
                            <div className="mono text-4xl font-black opacity-20 group-hover:opacity-100 transition-opacity">
                                0{i + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCases;
