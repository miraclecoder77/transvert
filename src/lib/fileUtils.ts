import type { FileKind } from '../types/queue';

const IMAGE_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'bmp', 'tiff', 'tif', 'heic', 'heif', 'ico', 'svg']);
const VIDEO_EXTS = new Set(['mp4', 'webm', 'mkv', 'mov', 'avi', 'flv', 'wmv', 'm4v', 'ogv', '3gp']);
const AUDIO_EXTS = new Set(['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'opus', 'wma', 'aiff']);

/**
 * Detect the broad media kind for a file.
 * Falls back to extension-based detection when the MIME type is absent or generic.
 */
export function detectFileKind(file: File): FileKind {
    const mime = file.type || '';
    if (mime.startsWith('image/')) return 'image';
    if (mime.startsWith('video/')) return 'video';
    if (mime.startsWith('audio/')) return 'audio';

    // Extension-based fallback
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (IMAGE_EXTS.has(ext)) return 'image';
    if (VIDEO_EXTS.has(ext)) return 'video';
    if (AUDIO_EXTS.has(ext)) return 'audio';

    return 'unknown';
}

const FORMAT_OPTIONS: Record<FileKind, string[]> = {
    image: ['png', 'webp', 'jpeg', 'gif', 'avif', 'bmp', 'tiff'],
    video: ['mp4', 'webm', 'mkv', 'mov', 'avi'],
    audio: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'opus'],
    unknown: ['mp4', 'mp3', 'png'],
};

/** Returns the list of output format options for a given file kind. */
export function getFormatOptions(kind: FileKind): string[] {
    return FORMAT_OPTIONS[kind];
}

/** Returns the default output format for a given file kind. */
export function getDefaultFormat(kind: FileKind): string {
    return FORMAT_OPTIONS[kind][0];
}

/** Human-readable file size string. */
export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/** Generate a file icon character based on kind. */
export function getKindIcon(kind: FileKind): string {
    switch (kind) {
        case 'image': return '🖼';
        case 'video': return '🎬';
        case 'audio': return '🎵';
        default: return '📄';
    }
}
