import React from 'react';
import Hero from './Hero.tsx';
import Agitation from './Agitation.tsx';
import WasmSolution from './WasmSolution.tsx';
import HowItWorks from './HowItWorks.tsx';
import UseCases from './UseCases.tsx';
import PrivacyFAQ from './PrivacyFAQ.tsx';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-primary text-primary selection:bg-neon selection:text-black">
            <Hero />
            <Agitation />
            <WasmSolution />
            <HowItWorks />
            <UseCases />
            <PrivacyFAQ />

            <footer className="py-12 border-t brutalist-border bg-secondary">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="mono text-2xl font-black tracking-tighter italic">
                        TRANS<span className="text-neon">VERT</span>
                    </div>
                    <div className="flex gap-8 mono text-xs uppercase tracking-widest text-secondary">
                        <a href="#hero" className="hover:text-neon transition-colors">Problem</a>
                        <a href="#agitation" className="hover:text-neon transition-colors">Agitation</a>
                        <a href="#solution" className="hover:text-neon transition-colors">Solution</a>
                        <a href="#faq" className="hover:text-neon transition-colors">Privacy</a>
                    </div>
                    <div className="mono text-[10px] text-secondary">
                        © 2026 TRANSVERT. LOCAL-FIRST. REBEL-ALWAYS.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
