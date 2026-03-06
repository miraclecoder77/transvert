import React from 'react';

const PrivacyFAQ: React.FC = () => {
    const faqs = [
        {
            q: "If it's free, why is there advertising?",
            a: "Because hosting the static .wasm and .js files still costs money. Subscriptions require data collection (email, credit card, address). Ads (served through privacy-respecting networks) allow us to stay anonymous and free while keeping the lights on. We don't want your identity; we just want for our bandwidth to be paid for."
        },
        {
            q: "Can you see my files?",
            a: "Mathematically impossible. The conversion happens in your RAM. We don't have a backend processing server. If you disconnect your internet, the converter still works. That is the proof."
        },
        {
            q: "Why not just use FFmpeg on CLI?",
            a: "Most people shouldn't have to master the command line to own their privacy. Transvert brings CLI power to the browser shell with a UI that doesn't track you."
        },
        {
            q: "What is WASM?",
            a: "WebAssembly is binary code that runs in the browser at near-native speeds. It's safe, fast, and allows us to run 'heavy' software like FFmpeg directly on your hardware."
        }
    ];

    return (
        <section id="faq" className="py-32 bg-secondary border-b brutalist-border relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-8 leading-none">
                            Privacy <br /> <span className="text-neon">Manifesto.</span>
                        </h2>
                        <p className="mono text-sm text-secondary leading-relaxed mb-12">
                            We believe the browser is the ultimate sandbox for privacy. Transvert is our contribution to a web that respects the individual's right to compute without observation.
                        </p>
                        <div className="brutalist-card p-8 border-4 border-black bg-primary">
                            <h4 className="font-black uppercase mb-4 italic tracking-tight">The Anti-Subscription Pledge</h4>
                            <p className="mono text-xs text-secondary leading-loose">
                                We will never charge for file size limits. <br />
                                We will never require an account. <br />
                                We will never sell your metadata. <br />
                                We will only use ads to bridge the gap of infrastructure costs.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {faqs.map((faq, i) => (
                            <div key={i}>
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic italic flex items-center gap-4">
                                    <span className="text-neon text-2xl group-hover:scale-125 transition-transform inline-block font-mono">[Q]</span>
                                    {faq.q}
                                </h3>
                                <p className="mono text-sm text-secondary leading-relaxed pl-10 border-l border-border">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyFAQ;
