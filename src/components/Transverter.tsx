import React, { useState, useCallback } from 'react';
import * as Comlink from 'comlink';
import TopNav from './TopNav';
import TheVoid from './TheVoid';
import ProcessingQueue from './ProcessingQueue';
import StatusSidebar from './StatusSidebar';
import { useWorkers } from '../context/WorkerContext';
import type { QueueItem } from '../types/queue';
import { detectFileKind, getDefaultFormat, formatBytes } from '../lib/fileUtils';

interface TransverterProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

let idCounter = 0;
const makeId = () => `item-${Date.now()}-${idCounter++}`;

const Transverter: React.FC<TransverterProps> = ({ theme, setTheme }) => {
    const { ffmpegWorker, magickWorker, ffmpegReady, magickReady, logs, addLog } = useWorkers();

    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewItems, setPreviewItems] = useState<{ name: string; url: string; format: string }[]>([]);

    // ─── Queue mutators ───────────────────────────────────────────────────────

    const handleFilesSelect = useCallback((files: File[]) => {
        const newItems: QueueItem[] = files.map(file => {
            const kind = detectFileKind(file);
            return {
                id: makeId(),
                file,
                fileKind: kind,
                outputFormat: getDefaultFormat(kind),
                quality: 85,
                stripMetadata: true,
                status: 'pending',
                progress: 0,
                eta: '',
                previewUrl: null,
                error: null,
            };
        });
        setQueue(prev => [...prev, ...newItems]);
        addLog(`Added ${files.length} file${files.length !== 1 ? 's' : ''} to queue.`);
    }, [addLog]);

    const updateItem = useCallback((id: string, patch: Partial<QueueItem>) => {
        setQueue(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item));
    }, []);

    const handleFormatChange = useCallback((id: string, format: string) => {
        updateItem(id, { outputFormat: format });
    }, [updateItem]);

    const handleQualityChange = useCallback((id: string, quality: number) => {
        updateItem(id, { quality });
    }, [updateItem]);

    const handleMetadataToggle = useCallback((id: string, strip: boolean) => {
        updateItem(id, { stripMetadata: strip });
    }, [updateItem]);

    const handleRemove = useCallback((id: string) => {
        setQueue(prev => {
            const item = prev.find(i => i.id === id);
            if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
            return prev.filter(i => i.id !== id);
        });
    }, []);

    // ─── Processing ───────────────────────────────────────────────────────────

    const processQueue = useCallback(async () => {
        const pending = queue.filter(q => q.status === 'pending');
        if (pending.length === 0 || isProcessing) return;

        setIsProcessing(true);

        for (const item of pending) {
            updateItem(item.id, { status: 'processing', progress: 5, eta: 'Calculating...' });
            addLog(`[${item.file.name}] Starting conversion → .${item.outputFormat}`);

            const startTime = Date.now();

            try {
                let resultBlob: Blob | null = null;

                const onProgress = Comlink.proxy((pct: number) => {
                    const elapsed = (Date.now() - startTime) / 1000;
                    const remaining = pct > 0 ? Math.round((elapsed / pct) * (100 - pct)) : 0;
                    const eta = remaining > 0 ? `~${remaining}s` : '';
                    updateItem(item.id, { progress: Math.max(5, pct), eta });
                });

                if (item.fileKind === 'image' && magickWorker) {
                    addLog(`[${item.file.name}] ImageMagick pipeline running...`);
                    resultBlob = await magickWorker.convertImage(
                        item.file,
                        item.outputFormat,
                        item.quality,
                        item.stripMetadata
                    );
                } else if (ffmpegWorker) {
                    addLog(`[${item.file.name}] FFmpeg pipeline running...`);
                    resultBlob = await ffmpegWorker.convert(
                        item.file,
                        item.outputFormat,
                        item.quality,
                        onProgress
                    );
                } else {
                    throw new Error('No suitable worker available for this file type.');
                }

                if (resultBlob) {
                    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                    addLog(`[${item.file.name}] Done in ${elapsed}s. Output: ${formatBytes(resultBlob.size)}`);

                    if (item.fileKind === 'image') {
                        // Image: show preview, let user download manually
                        const previewUrl = URL.createObjectURL(resultBlob);
                        updateItem(item.id, { status: 'done', progress: 100, eta: '', previewUrl });
                        setPreviewItems(prev => [...prev, {
                            name: item.file.name,
                            url: previewUrl,
                            format: item.outputFormat,
                        }]);
                    } else {
                        // Video/audio: auto-download
                        const url = URL.createObjectURL(resultBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        const baseName = item.file.name.replace(/\.[^.]+$/, '');
                        link.download = `${baseName}.${item.outputFormat}`;
                        link.click();
                        URL.revokeObjectURL(url);
                        updateItem(item.id, { status: 'done', progress: 100, eta: '' });
                    }
                }
            } catch (error: any) {
                console.error('[Transverter] Processing error:', error);
                const msg = error?.message ?? 'Unknown error';
                addLog(`[${item.file.name}] ERROR: ${msg}`);
                updateItem(item.id, { status: 'error', progress: 0, eta: '', error: msg });
            }
        }

        setIsProcessing(false);
        addLog('Queue processing complete.');
    }, [queue, isProcessing, ffmpegWorker, magickWorker, addLog, updateItem]);

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="flex flex-col min-h-[100dvh] lg:h-screen lg:overflow-hidden">
            <TopNav theme={theme} setTheme={setTheme} isApp={true} />

            <div className="flex flex-col lg:flex-row flex-1 min-h-0 lg:overflow-hidden">
                <main className="flex-none lg:flex-1 lg:overflow-y-auto bg-primary">
                    <TheVoid
                        onFilesSelect={handleFilesSelect}
                        isDragging={isDragging}
                        setIsDragging={setIsDragging}
                    />

                    <ProcessingQueue
                        queue={queue}
                        onFormatChange={handleFormatChange}
                        onQualityChange={handleQualityChange}
                        onMetadataToggle={handleMetadataToggle}
                        onRemove={handleRemove}
                        onExecuteAll={processQueue}
                        isProcessing={isProcessing}
                    />

                    {/* Image Preview Panel */}
                    {previewItems.length > 0 && (
                        <div className="px-8 pb-8">
                            <h2 className="mono font-bold uppercase tracking-widest text-sm mb-4">
                                CONVERTED PREVIEWS
                                <span className="ml-2 px-2 py-0.5 text-[10px] bg-neon text-black font-black">
                                    {previewItems.length}
                                </span>
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {previewItems.map((p, i) => {
                                    const baseName = p.name.replace(/\.[^.]+$/, '');
                                    return (
                                        <div key={i} className="brutalist-card overflow-hidden group">
                                            <div className="aspect-square bg-neutral-900 overflow-hidden">
                                                <img
                                                    src={p.url}
                                                    alt={p.name}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-3 flex flex-col gap-2">
                                                <p className="mono text-[10px] truncate text-[#666]" title={p.name}>
                                                    {p.name}
                                                </p>
                                                <a
                                                    href={p.url}
                                                    download={`${baseName}.${p.format}`}
                                                    className="flex items-center justify-center min-h-[36px] py-1.5 bg-neon text-black mono text-[10px] font-black uppercase hover:scale-105 active:scale-95 transition-transform"
                                                >
                                                    <span className="hidden sm:inline">↓ DOWNLOAD .{p.format.toUpperCase()}</span>
                                                    <span className="sm:hidden">↓ DL .{p.format.toUpperCase()}</span>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Status bar */}
                    <div className="p-6 border-t brutalist-border bg-secondary">
                        <div className="flex flex-wrap gap-8 mono text-[10px] uppercase tracking-widest text-[#666]">
                            <div className="flex items-center gap-2">
                                [ FFmpeg: <span className={`font-bold ${ffmpegReady ? 'text-neon' : 'text-yellow-400'}`}>
                                    {ffmpegReady ? 'READY' : 'LOADING...'}
                                </span> ]
                            </div>
                            <div className="flex items-center gap-2">
                                [ ImageMagick: <span className={`font-bold ${magickReady ? 'text-neon' : 'text-yellow-400'}`}>
                                    {magickReady ? 'READY' : 'LOADING...'}
                                </span> ]
                            </div>
                            <div className="flex items-center gap-2">
                                [ Privacy: <span className="text-primary font-bold">100%</span> ]
                            </div>
                            <div className="flex items-center gap-2">
                                [ Connection: <span className="text-primary font-bold">Local</span> ]
                            </div>
                        </div>
                    </div>
                </main>

                <StatusSidebar logs={logs} />
            </div>
        </div>
    );
};

export default Transverter;
