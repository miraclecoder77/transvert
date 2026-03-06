import React from 'react';

interface TopNavProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    onLaunchApp?: () => void;
    isApp?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ theme, setTheme, onLaunchApp, isApp = true }) => {
    return (
        <nav className="h-16 brutalist-border flex items-center justify-between px-6 bg-secondary sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <h1 className="mono font-bold tracking-tighter text-xl cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    [TRANSVERT // <span className="neon-text">v2.0</span>]
                </h1>

                {!isApp && (
                    <div className="hidden lg:flex items-center gap-6 mono text-[10px] uppercase tracking-widest text-secondary font-bold">
                        <a href="#hero" className="hover:text-neon">Problem</a>
                        <a href="#agitation" className="hover:text-neon">Agitation</a>
                        <a href="#solution" className="hover:text-neon">Solution</a>
                        <a href="#cases" className="hover:text-neon">Use-Cases</a>
                        <a href="#faq" className="hover:text-neon">FAQ</a>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 text-xs mono uppercase tracking-widest text-[#666] dark:text-[#999]">
                    STATUS: <span className="neon-text">{isApp ? 'ACTIVE' : 'READY'}</span> / {isApp ? 'AIR-GAPPED' : 'LOCAL-FIRST'}
                    <div className="w-2 h-4 bg-neon animate-pulse ml-2" />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 neon-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    </button>

                    {!isApp && onLaunchApp && (
                        <button
                            onClick={onLaunchApp}
                            className="px-4 py-2 bg-neon text-black mono text-xs font-black uppercase tracking-tighter brutalist-border hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Launch App
                        </button>
                    )}

                    {isApp && (
                        <button className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
