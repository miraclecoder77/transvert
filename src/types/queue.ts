export type FileKind = 'image' | 'video' | 'audio' | 'unknown';
export type ItemStatus = 'pending' | 'processing' | 'done' | 'error';

export interface QueueItem {
    id: string;
    file: File;
    fileKind: FileKind;
    outputFormat: string;
    quality: number;       // 1–100
    stripMetadata: boolean;
    status: ItemStatus;
    progress: number;      // 0–100
    eta: string;           // e.g. "~12s" or ""
    previewUrl: string | null; // object URL set after image conversion
    error: string | null;
}
