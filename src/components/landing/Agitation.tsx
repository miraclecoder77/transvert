import React from 'react';

const Agitation: React.FC = () => {
    const pains = [
        {
            title: "Subscription Fatigue",
            desc: "Why pay $20/month for something your GPU can do in seconds for free?",
            icon: "💸"
        },
        {
            title: "Arbitrary Limits",
            desc: "\"File too large for free tier.\" We don't care about size. Your hardware is the only limit.",
            icon: "🚫"
        },
        {
            title: "The Queue Hell",
            desc: "Waiting in a cloud-processing queue while their servers prioritize paying customers.",
            icon: "⏳"
        },
        {
            title: "Silent Data Mining",
            desc: "Your metadata (GPS, device info, timestamps) is harvested the moment you hit 'Upload'.",
            icon: "🔍"
        }
    ];

    return (
        <section id="agitation" className="py-32 bg-secondary border-b brutalist-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none mb-8">
                            The "Free" sites <br />
                            <span className="text-neon">Are Charging You </span> <br />
                            In Other Ways.
                        </h2>
                    </div>
                    <div className="mono text-xs text-secondary uppercase tracking-[0.2em] mb-4">
                        [ AGITATION_MODULE_02 ]
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border brutalist-border">
                    {pains.map((pain, i) => (
                        <div key={i} className="bg-primary p-8 hover:bg-neon hover:text-black transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-125 transition-transform inline-block">
                                {pain.icon}
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">
                                {pain.title}
                            </h3>
                            <p className="mono text-sm leading-relaxed opacity-80 group-hover:opacity-100">
                                {pain.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-black text-white relative">
                    <div className="absolute top-0 right-0 p-4 mono text-[10px] text-neon uppercase">
                        Live_Log: Subscription_Burner
                    </div>
                    <div className="mono text-lg md:text-2xl text-center italic">
                        "We're tired of being 'users' in someone else's server farm. <br />
                        <span className="text-neon underline decoration-4 underline-offset-8">It's time to reclaim the compute."</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Agitation;
