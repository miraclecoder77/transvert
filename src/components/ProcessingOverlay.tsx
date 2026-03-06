import React, { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Sponsor cards — shown when Carbon Ads is not yet configured
// ---------------------------------------------------------------------------
const SPONSOR_CARDS = [
    {
        brand: 'CloudSafe VPN',
        tagline: 'Zero-logs. Military-grade encryption. Built for privacy.',
        cta: 'Try free for 30 days →',
        accent: '#D4FF00',
        logo: '🔒',
    },
    {
        brand: 'TeraVault Storage',
        tagline: 'Encrypted cloud storage you actually own. No metadata harvesting.',
        cta: 'Get 100 GB free →',
        accent: '#00FFCC',
        logo: '🗄️',
    },
    {
        brand: 'ShieldMail',
        tagline: 'Disposable email aliases. Stop companies tracking you.',
        cta: 'Create aliases free →',
        accent: '#FF6BFF',
        logo: '📬',
    },
];

// ---------------------------------------------------------------------------
// AdSlot — Carbon Ads if configured, rotating sponsor cards as fallback
// ---------------------------------------------------------------------------
const CARBON_ID = import.meta.env.VITE_CARBON_ADS_ID as string | undefined;
const CARBON_PLACEMENT = (import.meta.env.VITE_CARBON_ADS_PLACEMENT as string | undefined) ?? 'transvert';

const AdSlot: React.FC = () => {
    const carbonRef = useRef<HTMLDivElement>(null);
    const [cardIndex, setCardIndex] = useState(0);
    const [fading, setFading] = useState(false);

    // Inject Carbon Ads script when ID is available
    useEffect(() => {
        if (!CARBON_ID || !carbonRef.current) return;
        const script = document.createElement('script');
        script.src = `https://cdn.carbonads.com/carbon.js?serve=${CARBON_ID}&placement=${CARBON_PLACEMENT}`;
        script.id = '_carbonads_js';
        script.async = true;
        carbonRef.current.appendChild(script);
        return () => {
            // Cleanup if overlay unmounts mid-session
            const existing = document.getElementById('_carbonads_js');
            existing?.remove();
        };
    }, []);

    // Rotate through sponsor cards every 8 s (fallback only)
    useEffect(() => {
        if (CARBON_ID) return;
        const timer = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCardIndex(i => (i + 1) % SPONSOR_CARDS.length);
                setFading(false);
            }, 400);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const card = SPONSOR_CARDS[cardIndex];

    // ── Carbon Ads path ─────────────────────────────────────────────────────
    if (CARBON_ID) {
        return (
            <div
                ref={carbonRef}
                className="carbon-ads-wrapper"
                style={{ minHeight: 120, width: '100%' }}
            />
        );
    }

    // ── Fallback: rotating sponsor card ─────────────────────────────────────
    return (
        <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="sponsor-card"
            style={{
                opacity: fading ? 0 : 1,
                transition: 'opacity 0.4s ease',
                borderColor: card.accent + '44',
                boxShadow: `0 0 18px ${card.accent}18`,
                display: 'block',
                textDecoration: 'none',
            }}
        >
            <span className="sponsor-logo">{card.logo}</span>
            <strong className="sponsor-brand" style={{ color: card.accent }}>
                {card.brand}
            </strong>
            <p className="sponsor-tagline">{card.tagline}</p>
            <span className="sponsor-cta" style={{ color: card.accent }}>
                {card.cta}
            </span>
            {/* Dot indicators */}
            <div className="sponsor-dots">
                {SPONSOR_CARDS.map((_, i) => (
                    <span
                        key={i}
                        className="sponsor-dot"
                        style={{ background: i === cardIndex ? card.accent : '#444' }}
                    />
                ))}
            </div>
        </a>
    );
};

// ---------------------------------------------------------------------------
// ProcessingOverlay
// ---------------------------------------------------------------------------
interface ProcessingOverlayProps {
    progress: number;
    status: string;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ progress, status }) => {
    return (
        <div className="processing-overlay">
            <div className="processing-card">
                {/* Header */}
                <div className="processing-header">
                    <span className="processing-icon">⚡</span>
                    <div>
                        <h2 className="processing-title mono">PROCESSING</h2>
                        <p className="processing-status">{status}</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                    <span className="progress-pct mono">{Math.round(progress)}%</span>
                </div>

                {/* Ad slot */}
                <div className="ad-slot-wrapper">
                    <div className="ad-slot-header">
                        <span className="ad-slot-badge mono">SPONSORED</span>
                        <span className="ad-slot-note">Ads keep Transvert free &amp; open-source</span>
                    </div>
                    <div className="ad-slot-body">
                        <AdSlot />
                    </div>
                </div>

                {/* Privacy footer */}
                <p className="processing-footer mono">
                    ◈ ALL PROCESSING HAPPENS ON YOUR DEVICE — ZERO DATA LEAVES YOUR BROWSER
                </p>
            </div>
        </div>
    );
};

export default ProcessingOverlay;
