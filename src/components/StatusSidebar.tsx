import React from 'react';

interface StatusSidebarProps {
    logs: string[];
}

const StatusSidebar: React.FC<StatusSidebarProps> = ({ logs }) => {
    return (
        <aside className="w-full lg:w-80 brutalist-border-l bg-secondary flex flex-col h-full overflow-y-auto">
            <div className="p-6 border-b brutalist-border">
                <h2 className="mono font-bold uppercase tracking-widest text-sm mb-4">PRIVACY VAULT</h2>

                <div className="brutalist-card p-4 flex flex-col items-center justify-center text-center">
                    <div className="mono text-2xl font-black mb-1">0.00 GB</div>
                    <div className="mono text-[10px] uppercase text-[#666] tracking-tighter">Uploaded to Cloud Servers</div>
                </div>

                <div className="mt-4 brutalist-card p-4 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full stroke-neon fill-none">
                            <path d="M 50 10 L 90 30 L 90 70 L 50 90 L 10 70 L 10 30 Z" strokeWidth="1" className="opacity-20" />
                            <path d="M 50 10 L 50 90 M 10 30 L 90 70 M 10 70 L 90 30" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-50" />
                            <path d="M 50 10 L 90 30 L 90 70 L 50 90 L 10 70 L 10 30 Z" strokeWidth="2" className="animate-pulse" />
                        </svg>
                    </div>
                    <div className="mono text-[10px] font-bold uppercase tracking-tighter text-[#666]">
                        LOCAL_RAM_ENCRYPTION_ACTIVE
                    </div>
                </div>
            </div>

            <div className="p-6 brutalist-border-b">
                <h2 className="mono font-bold uppercase tracking-widest text-sm mb-2">WHY ADS?</h2>
                <p className="mono text-[10px] leading-relaxed text-[#666]">
                    Read our <span className="neon-text underline cursor-pointer">Radical Transparency Model</span>
                </p>
            </div>

            <div className="flex-1 bg-black p-4 mono text-[10px] overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto font-mono space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="text-neon">&gt;</span>
                            <span className="text-white opacity-80">{log}</span>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <span className="text-neon animate-pulse">&gt;</span>
                        <span className="w-2 h-4 bg-neon animate-pulse" />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default StatusSidebar;
