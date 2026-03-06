import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import * as Comlink from 'comlink';
import type { WorkerApi } from '../workers/ffmpeg.worker';
import type { MagickWorkerApi } from '../workers/magick.worker';

interface WorkerContextValue {
    ffmpegWorker: Comlink.Remote<WorkerApi> | null;
    magickWorker: Comlink.Remote<MagickWorkerApi> | null;
    ffmpegReady: boolean;
    magickReady: boolean;
    logs: string[];
    addLog: (msg: string) => void;
}

const WorkerContext = createContext<WorkerContextValue>({
    ffmpegWorker: null,
    magickWorker: null,
    ffmpegReady: false,
    magickReady: false,
    logs: [],
    addLog: () => { },
});

export function WorkerProvider({ children }: { children: ReactNode }) {
    const ffRef = useRef<Worker | null>(null);
    const mwRef = useRef<Worker | null>(null);
    const ffmpegWorkerRef = useRef<Comlink.Remote<WorkerApi> | null>(null);
    const magickWorkerRef = useRef<Comlink.Remote<MagickWorkerApi> | null>(null);

    const [ffmpegReady, setFfmpegReady] = useState(false);
    const [magickReady, setMagickReady] = useState(false);
    const [logs, setLogs] = useState<string[]>([
        'Initializing NASM Core... Done.',
        'Local memory buffer allocated... Done.',
        'Awaiting user input...',
    ]);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, msg].slice(-50));
    };

    useEffect(() => {
        // Spawn workers once for the lifetime of the app
        const fw = new Worker(new URL('../workers/ffmpeg.worker.ts', import.meta.url), { type: 'module' });
        const mw = new Worker(new URL('../workers/magick.worker.ts', import.meta.url), { type: 'module' });
        ffRef.current = fw;
        mwRef.current = mw;

        const ffmpegApi = Comlink.wrap<WorkerApi>(fw);
        const magickApi = Comlink.wrap<MagickWorkerApi>(mw);

        (async () => {
            // Load FFmpeg
            try {
                addLog('Loading FFmpeg WASM...');
                await ffmpegApi.load();
                ffmpegWorkerRef.current = ffmpegApi;
                setFfmpegReady(true);
                addLog('FFmpeg WASM loaded. ✓');
            } catch (err) {
                console.error('[WorkerContext] FFmpeg init failed:', err);
                addLog('WARNING: FFmpeg failed to load. Video/audio conversion unavailable.');
            }

            // Load ImageMagick
            try {
                addLog('Loading ImageMagick WASM...');
                await magickApi.load();
                magickWorkerRef.current = magickApi;
                setMagickReady(true);
                addLog('ImageMagick WASM loaded. ✓');
            } catch (err) {
                console.error('[WorkerContext] Magick init failed:', err);
                addLog('WARNING: ImageMagick failed to load. Image conversion unavailable.');
            }
        })();

        return () => {
            fw.terminate();
            mw.terminate();
        };
    }, []);

    return (
        <WorkerContext.Provider value={{
            ffmpegWorker: ffmpegWorkerRef.current,
            magickWorker: magickWorkerRef.current,
            ffmpegReady,
            magickReady,
            logs,
            addLog,
        }}>
            {children}
        </WorkerContext.Provider>
    );
}

export function useWorkers() {
    return useContext(WorkerContext);
}
