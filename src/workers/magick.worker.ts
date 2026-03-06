import { initializeImageMagick, ImageMagick, MagickFormat } from '@imagemagick/magick-wasm';
import * as Comlink from 'comlink';

let isInitialized = false;

/**
 * Module-level init guard — avoids the Comlink `rawValue.apply` error
 * that occurs when `this.load()` is called on a proxied object.
 */
async function ensureLoaded() {
    if (isInitialized) return;
    console.log('[Magick Worker] Loading...');
    const response = await fetch('/magick.wasm');
    const wasmBytes = await response.arrayBuffer();
    await initializeImageMagick(new Uint8Array(wasmBytes));
    isInitialized = true;
    console.log('[Magick Worker] Loaded successfully.');
}

const workerApi = {
    async load() {
        await ensureLoaded();
    },

    /**
     * Scrub all metadata from an image and return it as PNG.
     */
    async scrubMetadata(file: File): Promise<Blob> {
        await ensureLoaded();

        const inputBytes = new Uint8Array(await file.arrayBuffer());
        return new Promise<Blob>((resolve, reject) => {
            ImageMagick.read(inputBytes, (image: any) => {
                try {
                    image.strip();
                    image.write(MagickFormat.Png, (outputBytes: Uint8Array) => {
                        resolve(new Blob([outputBytes], { type: 'image/png' }));
                    });
                } catch (e) {
                    reject(e);
                }
            });
        });
    },

    /**
     * Convert an image to a target format, optionally stripping metadata.
     * @param file          Source file
     * @param format        Target format (e.g. 'webp', 'jpeg', 'png', 'avif', 'gif')
     * @param quality       1–100, maps to ImageMagick quality setting
     * @param stripMetadata If true, strips all EXIF/IPTC/C2PA metadata
     */
    async convertImage(
        file: File,
        format: string,
        quality: number = 85,
        stripMetadata: boolean = true
    ): Promise<Blob> {
        await ensureLoaded();

        const inputBytes = new Uint8Array(await file.arrayBuffer());
        // Map format string to MagickFormat enum key
        const magickKey = format.toUpperCase() === 'JPEG' ? 'Jpeg'
            : format.charAt(0).toUpperCase() + format.slice(1).toLowerCase();
        const magickFormat = (MagickFormat as any)[magickKey] ?? MagickFormat.Png;

        return new Promise<Blob>((resolve, reject) => {
            ImageMagick.read(inputBytes, (image: any) => {
                try {
                    if (stripMetadata) image.strip();
                    image.quality = quality;
                    image.write(magickFormat, (outputBytes: Uint8Array) => {
                        const mimeType = format === 'jpg' || format === 'jpeg'
                            ? 'image/jpeg'
                            : `image/${format.toLowerCase()}`;
                        resolve(new Blob([outputBytes], { type: mimeType }));
                    });
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};

Comlink.expose(workerApi);
export type MagickWorkerApi = typeof workerApi;
