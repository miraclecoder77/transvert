import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import * as Comlink from 'comlink';

const ffmpeg = new FFmpeg();
let isLoaded = false;

async function ensureLoaded() {
    if (isLoaded) return;
    console.log('[FFmpeg Worker] Loading...');
    const coreRes = await fetch('/ffmpeg-core.js');
    const coreBlob = new Blob([await coreRes.arrayBuffer()], { type: 'text/javascript' });
    const coreURL = URL.createObjectURL(coreBlob);

    const wasmRes = await fetch('/ffmpeg-core.wasm');
    const wasmBlob = new Blob([await wasmRes.arrayBuffer()], { type: 'application/wasm' });
    const wasmURL = URL.createObjectURL(wasmBlob);

    await ffmpeg.load({ coreURL, wasmURL });
    isLoaded = true;
    console.log('[FFmpeg Worker] Loaded successfully.');
}

const workerApi = {
    async load() {
        await ensureLoaded();
    },

    /**
     * Convert a media file to the given output format.
     * @param file         The source file
     * @param outputFormat Target format extension (e.g. 'mp4', 'webm', 'mp3')
     * @param quality      1–100 quality. For video maps to CRF (51→0), for audio to bitrate.
     * @param onProgress   Comlink proxy callback called with 0–100 progress values
     */
    async convert(
        file: File,
        outputFormat: string,
        quality: number = 80,
        onProgress?: (progress: number) => void
    ): Promise<Blob> {
        await ensureLoaded();

        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
        const inputName = `input.${ext}`;
        const outputName = `output.${outputFormat}`;
        const startTime = Date.now();

        await ffmpeg.writeFile(inputName, await fetchFile(file));

        if (onProgress) {
            ffmpeg.on('progress', ({ progress }) => {
                onProgress(Math.round(progress * 100));
            });
        }

        // Build quality args based on output type
        const isAudio = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'opus', 'wma'].includes(outputFormat);
        const args: string[] = ['-i', inputName];

        if (isAudio) {
            // Map quality 1–100 to bitrate 32k–320k
            const bitrate = Math.round(32 + (quality / 100) * 288);
            args.push('-b:a', `${bitrate}k`);
        } else {
            // Map quality 1–100 to CRF 51–0 (lower CRF = higher quality in libx264)
            const crf = Math.round(51 - (quality / 100) * 51);
            args.push('-crf', String(crf), '-preset', 'fast');
        }

        args.push(outputName);
        await ffmpeg.exec(args);

        const data = await ffmpeg.readFile(outputName);
        void startTime; // suppress unused warning

        // Clean up virtual FS entries
        await ffmpeg.deleteFile(inputName).catch(() => { });
        await ffmpeg.deleteFile(outputName).catch(() => { });

        const mimeType = isAudio ? `audio/${outputFormat}` : `video/${outputFormat}`;
        return new Blob([data as unknown as BlobPart], { type: mimeType });
    }
};

Comlink.expose(workerApi);
export type WorkerApi = typeof workerApi;
