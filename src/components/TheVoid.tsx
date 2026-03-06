import React, { useRef } from 'react';

interface TheVoidProps {
    onFilesSelect: (files: File[]) => void;
    isDragging: boolean;
    setIsDragging: (v: boolean) => void;
}

const TheVoid: React.FC<TheVoidProps> = ({ onFilesSelect, isDragging, setIsDragging }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelect(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelect(Array.from(e.target.files));
            // Reset so same files can be re-dropped if needed
            e.target.value = '';
        }
    };

    return (
        <div className="p-8">
            <h2 className="mono font-bold uppercase tracking-widest text-sm mb-4">DASHBOARD</h2>

            <div
                className={`void-dropzone h-[260px] flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${isDragging ? 'scale-[1.01] border-2 shadow-[0_0_30px_rgba(212,255,0,0.3)]' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="scanline" />

                <div className="flex flex-col items-center text-center px-4 relative z-10 gap-3">
                    <h3 className="mono text-4xl font-extrabold tracking-[0.2em]">THE VOID</h3>
                    <div className="mono text-lg flex items-center gap-3">
                        <span className="text-[#666]">&gt;</span>
                        <span className="font-bold">[ DROP FILES TO DECENTRALIZE ]</span>
                        <span className="text-[#666]">&lt;</span>
                    </div>
                    <p className="text-[10px] mono uppercase text-[#666] tracking-widest">
                        *Multiple files supported. No upload. No limits.*
                    </p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                />
            </div>
        </div>
    );
};

export default TheVoid;
