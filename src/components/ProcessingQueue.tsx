import React from 'react';
import type { QueueItem } from '../types/queue';
import { getFormatOptions, formatBytes, getKindIcon } from '../lib/fileUtils';

interface ProcessingQueueProps {
    queue: QueueItem[];
    onFormatChange: (id: string, format: string) => void;
    onQualityChange: (id: string, quality: number) => void;
    onMetadataToggle: (id: string, strip: boolean) => void;
    onRemove: (id: string) => void;
    onExecuteAll: () => void;
    isProcessing: boolean;
}

const STATUS_COLORS: Record<string, string> = {
    pending: 'text-[#666]',
    processing: 'text-neon animate-pulse',
    done: 'text-green-400',
    error: 'text-red-400',
};

const STATUS_LABEL: Record<string, string> = {
    pending: 'PENDING',
    processing: 'PROCESSING',
    done: 'DONE ✓',
    error: 'ERROR ✗',
};

const ProcessingQueue: React.FC<ProcessingQueueProps> = ({
    queue,
    onFormatChange,
    onQualityChange,
    onMetadataToggle,
    onRemove,
    onExecuteAll,
    isProcessing,
}) => {
    const pendingCount = queue.filter(q => q.status === 'pending').length;
    const allDone = queue.length > 0 && queue.every(q => q.status === 'done' || q.status === 'error');

    return (
        <div className="px-8 pb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="mono font-bold uppercase tracking-widest text-sm">
                    LIVE PROCESSING QUEUE
                    {queue.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-[10px] bg-neon text-black font-black">
                            {queue.length}
                        </span>
                    )}
                </h2>
                {queue.length > 0 && (
                    <button
                        onClick={onExecuteAll}
                        disabled={isProcessing || pendingCount === 0}
                        className={`px-5 py-2 font-black mono text-xs uppercase transition-all duration-200
                            ${isProcessing || pendingCount === 0
                                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                                : 'bg-neon text-black hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,255,0,0.3)]'}`}
                    >
                        {isProcessing
                            ? '[ PROCESSING... ]'
                            : allDone
                                ? '[ ALL DONE ]'
                                : `[ RUN ${pendingCount} FILE${pendingCount !== 1 ? 'S' : ''} ]`}
                    </button>
                )}
            </div>

            <div className="brutalist-card overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 p-3 bg-neutral-100 dark:bg-neutral-800 mono text-[9px] font-bold uppercase tracking-widest text-[#666]">
                    <div className="col-span-3">File</div>
                    <div className="col-span-2">Format</div>
                    <div className="col-span-2">Quality</div>
                    <div className="col-span-2">Strip Metadata</div>
                    <div className="col-span-2">Progress</div>
                    <div className="col-span-1"></div>
                </div>

                {queue.length === 0 ? (
                    <div className="p-10 text-center text-[#666] mono text-xs uppercase tracking-widest">
                        Drop files above to populate the queue...
                    </div>
                ) : (
                    queue.map((item) => {
                        const formatOptions = getFormatOptions(item.fileKind);
                        return (
                            <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-4 brutalist-border-t group">

                                {/* File Info */}
                                <div className="col-span-3 flex flex-col gap-1 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">{getKindIcon(item.fileKind)}</span>
                                        <span className="mono text-xs truncate font-medium" title={item.file.name}>
                                            {item.file.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`mono text-[9px] font-bold ${STATUS_COLORS[item.status]}`}>
                                            {STATUS_LABEL[item.status]}
                                        </span>
                                        {item.status === 'processing' && item.eta && (
                                            <span className="mono text-[9px] text-[#666]">{item.eta}</span>
                                        )}
                                        <span className="mono text-[9px] text-[#444]">
                                            {formatBytes(item.file.size)}
                                        </span>
                                    </div>
                                    {item.error && (
                                        <span className="mono text-[9px] text-red-400 truncate">{item.error}</span>
                                    )}
                                </div>

                                {/* Format Selector */}
                                <div className="col-span-2">
                                    <select
                                        value={item.outputFormat}
                                        onChange={(e) => onFormatChange(item.id, e.target.value)}
                                        disabled={item.status === 'processing' || item.status === 'done'}
                                        className="w-full bg-transparent mono text-xs p-1.5 brutalist-border appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-neon disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {formatOptions.map(fmt => (
                                            <option key={fmt} value={fmt}>.{fmt}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quality Slider */}
                                <div className="col-span-2 flex flex-col gap-1">
                                    <input
                                        type="range"
                                        min={1}
                                        max={100}
                                        value={item.quality}
                                        onChange={(e) => onQualityChange(item.id, Number(e.target.value))}
                                        disabled={item.status === 'processing' || item.status === 'done'}
                                        className="w-full accent-[color:var(--color-neon)] disabled:opacity-40 disabled:cursor-not-allowed"
                                    />
                                    <span className="mono text-[9px] text-[#666] text-center">{item.quality}%</span>
                                </div>

                                {/* Strip Metadata Toggle */}
                                <div className="col-span-2 flex flex-col items-center gap-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <div
                                            onClick={() => {
                                                if (item.status !== 'processing' && item.status !== 'done')
                                                    onMetadataToggle(item.id, !item.stripMetadata);
                                            }}
                                            className={`relative w-8 h-4 transition-colors duration-200 cursor-pointer ${item.stripMetadata ? 'bg-neon' : 'bg-neutral-400 dark:bg-neutral-700'} ${item.status === 'processing' || item.status === 'done' ? 'opacity-40 cursor-not-allowed' : ''}`}
                                        >
                                            <div className={`absolute top-0.5 w-3 h-3 bg-black transition-all duration-200 ${item.stripMetadata ? 'left-4' : 'left-0.5'}`} />
                                        </div>
                                        <span className="mono text-[9px] text-[#666]">{item.stripMetadata ? 'ON' : 'OFF'}</span>
                                    </label>
                                </div>

                                {/* Progress Bar */}
                                <div className="col-span-2">
                                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${item.status === 'done' ? 'bg-green-400' : item.status === 'error' ? 'bg-red-400' : 'bg-neon'}`}
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                    <div className="mono text-[9px] text-[#666] mt-0.5 text-right">{item.progress}%</div>
                                </div>

                                {/* Remove button */}
                                <div className="col-span-1 flex justify-end">
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        disabled={item.status === 'processing'}
                                        className="mono text-xs text-[#666] hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-2 py-1"
                                        title="Remove from queue"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ProcessingQueue;
