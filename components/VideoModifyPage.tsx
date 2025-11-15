import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

declare const JSZip: any;
declare const saveAs: any;

interface VideoModifyPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

// Helper: Base64 decode function from guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// --- WAV Generation Helpers ---
function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function createWavBlob(pcmData: Uint8Array, sampleRate: number, numChannels: number, bitsPerSample: number): Blob {
    const dataSize = pcmData.byteLength;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');

    // fmt sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size for PCM
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true); // ByteRate
    view.setUint16(32, numChannels * (bitsPerSample / 8), true); // BlockAlign
    view.setUint16(34, bitsPerSample, true);

    // data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Write PCM data
    const data = new Uint8Array(buffer, 44);
    data.set(pcmData);

    return new Blob([view], { type: 'audio/wav' });
}


const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }> = ({ title, children, isOpen, onToggle }) => (
    <div className="bg-base-300/30 rounded-lg">
        <button onClick={onToggle} className="w-full text-left font-semibold text-base-content p-3 flex justify-between items-center">
            {title}
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {isOpen && <div className="p-3 border-t border-primary/20">{children}</div>}
    </div>
);


const VideoModifyPage: React.FC<VideoModifyPageProps> = ({ isOpen, onClose, showToast }) => {
    const [video, setVideo] = useState<{ file: File, url: string } | null>(null);
    const [logo, setLogo] = useState<{ file: File, url: string } | null>(null);
    const [photo, setPhoto] = useState<{ file: File, url: string } | null>(null);
    const [textOverlay, setTextOverlay] = useState({ text: 'আপনার নাম', color: '#FFFFFF', size: 24, family: 'bangla', strokeColor: '#000000', strokeWidth: 1 });
    const [audio, setAudio] = useState<{ blob: Blob, url: string, source: string } | null>(null);
    const [volumes, setVolumes] = useState({ original: 1, new: 1 });
    const [ttsText, setTtsText] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading_video' | 'ready' | 'generating_audio' | 'generating_preview' | 'zipping'>('idle');
    const [openAccordion, setOpenAccordion] = useState<string>('overlays');
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [voice, setVoice] = useState('Kore');
    const [effects, setEffects] = useState<string[]>([]);
    
    // Background state
    const [backgroundImage, setBackgroundImage] = useState<{ file: File, url: string } | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#4CAF50'); // Default to green
    const [backgroundType, setBackgroundType] = useState<'color' | 'image'>('color');
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);

    const [logoPosition, setLogoPosition] = useState({ top: 5, left: 5 });
    const [textPosition, setTextPosition] = useState({ top: 85, left: 5 });
    const [dragState, setDragState] = useState<{ item: 'logo' | 'text', startX: number, startY: number, initialTop: number, initialLeft: number } | null>(null);


    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const musicInputRef = useRef<HTMLInputElement>(null);
    const bgImageInputRef = useRef<HTMLInputElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);
    
    const resetState = useCallback(() => {
        setStatus('idle');
        setVideo(null);
        setLogo(null);
        setPhoto(null);
        setTextOverlay({ text: 'আপনার নাম', color: '#FFFFFF', size: 24, family: 'bangla', strokeColor: '#000000', strokeWidth: 1 });
        setAudio(null);
        setVolumes({ original: 1, new: 1 });
        setTtsText('');
        setOpenAccordion('overlays');
        setPlaybackRate(1);
        setLogoPosition({ top: 5, left: 5 });
        setTextPosition({ top: 85, left: 5 });
        setBackgroundImage(null);
        setBackgroundColor('#4CAF50');
        setBackgroundType('color');
        setBackgroundPreview(null);
        setVoice('Kore');
        setEffects([]);
    }, []);
    
    const handleClose = useCallback(() => {
        resetState();
        onClose();
    }, [resetState, onClose]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'logo' | 'photo' | 'music' | 'background') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        
        switch(type) {
            case 'video':
                setStatus('loading_video');
                setVideo({ file, url });
                showToast('Video loaded!', 'success');
                setTimeout(() => setStatus('ready'), 500);
                break;
            case 'logo': 
                setLogo({ file, url }); 
                setLogoPosition({ top: 5, left: 5 });
                break;
            case 'photo': setPhoto({ file, url }); break;
            case 'music': 
                setAudio({ blob: file, url, source: file.name });
                setVolumes({ original: 0, new: 1 }); // Default to replacement
                showToast(`Audio '${file.name}' uploaded!`, 'success');
                break;
            case 'background': setBackgroundImage({ file, url }); setBackgroundType('image'); break;
        }

        if (e.target) e.target.value = '';
    };
    
    const handleGenerateTts = async () => {
        if (!ttsText || !ai) {
            showToast(ai ? 'Please enter text to generate speech.' : 'API Key is not configured.', 'error');
            return;
        }
        setStatus('generating_audio');
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: ttsText }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: voice },
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                const pcmData = decode(base64Audio);
                const wavBlob = createWavBlob(pcmData, 24000, 1, 16);
                const url = URL.createObjectURL(wavBlob);
                const currentAudioSource = audio ? audio.source : null;
                setAudio({ blob: wavBlob, url, source: 'AI_Voice-over.wav' });
                setVolumes({ original: 0, new: 1 }); // Default to replacement
                showToast(`AI Voice generated${currentAudioSource ? ' and replaced current audio' : ''}!`, 'success');
            } else {
                throw new Error("No audio data received.");
            }
        } catch (error) {
            console.error("TTS generation failed:", error);
            showToast('Failed to generate speech. Please try again.', 'error');
        } finally {
            setStatus('ready');
        }
    };

    const handleGenerateBackgroundPreview = async () => {
        if (!videoRef.current || !previewCanvasRef.current || !ai) {
            showToast('Preview cannot be generated.', 'error');
            return;
        }
        setStatus('generating_preview');
        try {
            const videoEl = videoRef.current;
            const canvas = previewCanvasRef.current;
            canvas.width = videoEl.videoWidth;
            canvas.height = videoEl.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
            const frameDataUrl = canvas.toDataURL('image/jpeg');
            const frameBase64 = frameDataUrl.split(',')[1];

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        { inlineData: { data: frameBase64, mimeType: 'image/jpeg' } },
                        { text: 'Remove the background from this image, making it transparent. Keep only the main subject(s). Output a PNG with a transparent background.' },
                    ],
                },
                config: { responseModalities: [Modality.IMAGE] },
            });

            let foundImage = false;
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setBackgroundPreview(imageUrl);
                    showToast('Preview generated!', 'success');
                    foundImage = true;
                    break;
                }
            }
            if (!foundImage) throw new Error("No image data in AI response.");

        } catch (error) {
            console.error(error);
            showToast('Failed to generate background preview.', 'error');
        } finally {
            setStatus('ready');
        }
    };
    
    useEffect(() => {
        const videoEl = videoRef.current;
        const audioEl = audioRef.current;
        if (!videoEl || !audioEl) return;
        
        const syncTime = () => { if (Math.abs(videoEl.currentTime - audioEl.currentTime) > 0.5) audioEl.currentTime = videoEl.currentTime; };
        const onPlay = () => { audioEl.play().catch(e => console.error("Audio play failed:", e)); };
        const onPause = () => audioEl.pause();
        
        videoEl.addEventListener('play', onPlay);
        videoEl.addEventListener('pause', onPause);
        videoEl.addEventListener('timeupdate', syncTime);
        
        return () => {
            videoEl.removeEventListener('play', onPlay);
            videoEl.removeEventListener('pause', onPause);
            videoEl.removeEventListener('timeupdate', syncTime);
        }
    }, [video, audio]);
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
        }
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = audio ? volumes.original : 1;
        }
        if (audioRef.current) {
            audioRef.current.volume = volumes.new;
        }
    }, [volumes, audio]);

    const handleDownload = async () => {
        if (!video) return;
        setStatus('zipping');
        try {
            const zip = new JSZip();
            zip.file(video.file.name, video.file);
            if (logo) zip.file(`logo_${logo.file.name}`, logo.file);
            if (photo) zip.file(`photo_${photo.file.name}`, photo.file);
            if (audio) zip.file(audio.source, audio.blob);
            if (backgroundImage) zip.file(`background_${backgroundImage.file.name}`, backgroundImage.file);
            if (backgroundPreview) {
                const response = await fetch(backgroundPreview);
                const blob = await response.blob();
                zip.file('background_preview.png', blob);
            }
            
            const readme = `Video Modification Assets
===========================

- Original Video: ${video.file.name}
- Playback Speed: ${playbackRate}x
- Visual Effects: ${effects.length > 0 ? effects.join(', ') : 'None'}
- Audio Track: ${audio?.source || 'None'}
- Audio Mix: Original(${Math.round(volumes.original * 100)}%), New Track(${Math.round(volumes.new * 100)}%)
- Logo File: ${logo?.file.name || 'None'} (Position: top ${logoPosition.top.toFixed(1)}%, left ${logoPosition.left.toFixed(1)}%)
- Photo Overlay: ${photo?.file.name || 'None'}
- Text Overlay: "${textOverlay.text}" (Font: ${textOverlay.family}, Size: ${textOverlay.size}px, Color: ${textOverlay.color}, Stroke: ${textOverlay.strokeWidth}px ${textOverlay.strokeColor}, Position: top ${textPosition.top.toFixed(1)}%, left ${textPosition.left.toFixed(1)}%)
- Background: ${backgroundType === 'image' ? (backgroundImage?.file.name || 'None') : backgroundColor}

Instructions:
1.  Open your preferred video editing software (e.g., Adobe Premiere, DaVinci Resolve, CapCut).
2.  Import all the files from this zip archive.
3.  Place the main video on your timeline. Set the clip speed to ${playbackRate}x. Adjust its volume to ${Math.round(volumes.original * 100)}%.
4.  Apply the following visual effects to the main video clip: ${effects.length > 0 ? effects.join(', ') : 'None'}. Most editors have these as standard color correction or effect presets.
5.  Add the new audio track (${audio?.source || 'N/A'}) underneath the video. Adjust its volume to ${Math.round(volumes.new * 100)}%. If you add an audio track, ensure its speed is also adjusted to ${playbackRate}x to match the video.
6.  Add the logo, photo, and text overlays on tracks above the video. Use the position details above as a guide.
7.  For background replacement:
    - If you chose a solid color (e.g., green), use a 'Chroma Key' or 'Green Screen' effect in your editor on the main video clip to make the color transparent. Then, place your new background image or a color layer on a track below the video.
    - For more complex backgrounds, you will need to use your editor's masking or rotoscoping tools to isolate the subject. The included 'background_preview.png' shows the AI's interpretation of the main subject.
`;
            zip.file('readme.txt', readme);
            
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'video-modification-kit.zip');
            showToast('Asset kit downloaded!', 'success');

        } catch (error) {
            console.error(error);
            showToast('Failed to create zip file.', 'error');
        }
        setStatus('ready');
    };

    const handleDragStart = (e: React.PointerEvent<HTMLElement>, item: 'logo' | 'text') => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        target.setPointerCapture(e.pointerId);
        const initialPos = item === 'logo' ? logoPosition : textPosition;
        setDragState({
            item,
            startX: e.clientX,
            startY: e.clientY,
            initialTop: initialPos.top,
            initialLeft: initialPos.left,
        });
    };

    const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragState || !previewContainerRef.current) return;
        const containerRect = previewContainerRef.current.getBoundingClientRect();
        
        const deltaX = e.clientX - dragState.startX;
        const deltaY = e.clientY - dragState.startY;

        const deltaLeft = (deltaX / containerRect.width) * 100;
        const deltaTop = (deltaY / containerRect.height) * 100;
        
        let newLeft = dragState.initialLeft + deltaLeft;
        let newTop = dragState.initialTop + deltaTop;

        const overlayElement = previewContainerRef.current.querySelector(`[data-drag-item="${dragState.item}"]`) as HTMLElement;
        if (!overlayElement) return;

        const overlayWidthPercent = (overlayElement.offsetWidth / containerRect.width) * 100;
        const overlayHeightPercent = (overlayElement.offsetHeight / containerRect.height) * 100;

        newLeft = Math.max(0, Math.min(newLeft, 100 - overlayWidthPercent)); 
        newTop = Math.max(0, Math.min(newTop, 100 - overlayHeightPercent));

        if (dragState.item === 'logo') {
            setLogoPosition({ top: newTop, left: newLeft });
        } else {
            setTextPosition({ top: newTop, left: newLeft });
        }
    };

    const handleDragEnd = (e: React.PointerEvent) => {
        if (!dragState) return;
        const target = e.target as HTMLElement;
        if(target.hasPointerCapture(e.pointerId)){
            target.releasePointerCapture(e.pointerId);
        }
        setDragState(null);
    };

    const handleEffectToggle = (effect: string) => {
        setEffects(prev => 
            prev.includes(effect) 
                ? prev.filter(e => e !== effect) 
                : [...prev, effect]
        );
    };

    const videoFilterStyle = useMemo(() => {
        const filters: string[] = [];
        if (effects.includes('Grayscale')) filters.push('grayscale(100%)');
        if (effects.includes('Sepia')) filters.push('sepia(100%)');
        if (effects.includes('Invert')) filters.push('invert(100%)');
        if (effects.includes('Vintage')) filters.push('sepia(60%) contrast(1.1) brightness(0.9)');
        if (effects.includes('Sharpen')) filters.push('contrast(1.2) brightness(1.1)');
        return { filter: filters.join(' ') };
    }, [effects]);

    if (!isOpen) return null;
    
    const isProcessing = status === 'generating_audio' || status === 'generating_preview' || status === 'zipping' || status === 'loading_video';
    const voices = [
        { id: 'Kore', name: 'Kore (Female)' },
        { id: 'Zephyr', name: 'Zephyr (Female)' },
        { id: 'Puck', name: 'Puck (Male)' },
        { id: 'Charon', name: 'Charon (Male)' },
        { id: 'Fenrir', name: 'Fenrir (Male)' },
    ];
    
    const availableEffects = ['Grayscale', 'Sepia', 'Invert', 'Vintage', 'Sharpen'];

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
             <header className="flex-shrink-0 flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-base-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
                    <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">AI Video Modifier</h1>
                </div>
                 {status !== 'idle' && <button onClick={resetState} className="px-4 py-2 text-sm bg-danger/20 text-danger rounded-lg font-semibold hover:bg-danger/30">Start Over</button>}
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col min-h-0">
                {status === 'idle' || status === 'loading_video' ? (
                    <div className="m-auto text-center p-8">
                        {status === 'loading_video' ? <div className="loader mx-auto mb-4"></div> : <div className="text-5xl mb-4">🎞️</div>}
                        <h2 className="text-2xl font-bold text-base-content">{status === 'loading_video' ? 'Loading Video...' : 'Upload Your Video'}</h2>
                        <p className="text-muted-content mt-2 mb-6">Modify audio, add overlays, and more.</p>
                        <input type="file" accept="video/*" ref={fileInputRef} className="hidden" onChange={e => handleFileUpload(e, 'video')} />
                        <button id="video-modify-upload-button" onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus">Browse Video File</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 p-4 h-full min-h-0">
                        <canvas ref={previewCanvasRef} className="hidden"></canvas>
                        {/* Preview */}
                        <div 
                            ref={previewContainerRef} 
                            className="bg-black rounded-lg flex items-center justify-center relative aspect-video lg:aspect-auto lg:h-full overflow-hidden"
                            onPointerMove={dragState ? handleDragMove : undefined}
                            onPointerUp={dragState ? handleDragEnd : undefined}
                            onPointerCancel={dragState ? handleDragEnd : undefined}
                        >
                            {video && <video ref={videoRef} src={video.url} controls className="max-w-full max-h-full object-contain" style={videoFilterStyle} />}
                            {logo && (
                                <img 
                                    data-drag-item="logo"
                                    src={logo.url} 
                                    alt="Logo" 
                                    className="absolute w-1/5 max-w-[100px] cursor-grab active:cursor-grabbing touch-none" 
                                    style={{ top: `${logoPosition.top}%`, left: `${logoPosition.left}%` }}
                                    onPointerDown={(e) => handleDragStart(e, 'logo')}
                                />
                            )}
                            {photo && <img src={photo.url} alt="Photo" className="absolute bottom-4 right-4 w-1/4 max-w-[150px] rounded-full border-2 border-white pointer-events-none" />}
                             <div 
                                data-drag-item="text"
                                style={{
                                    color: textOverlay.color,
                                    fontSize: `${textOverlay.size}px`,
                                    top: `${textPosition.top}%`,
                                    left: `${textPosition.left}%`,
                                    WebkitTextStroke: textOverlay.strokeWidth > 0 ? `${textOverlay.strokeWidth}px ${textOverlay.strokeColor}` : 'none',
                                    paintOrder: 'stroke'
                                } as React.CSSProperties}
                                className={`absolute cursor-grab active:cursor-grabbing touch-none font-bold font-${textOverlay.family} p-1`}
                                onPointerDown={(e) => handleDragStart(e, 'text')}
                            >
                                {textOverlay.text}
                            </div>
                        </div>
                        {/* Controls */}
                        <div className="flex flex-col gap-3 overflow-y-auto pr-2 min-h-0">
                             <AccordionItem title="Playback Settings" isOpen={openAccordion === 'playback'} onToggle={() => setOpenAccordion('playback')}>
                                <div className="space-y-2">
                                    <label htmlFor="playback-speed" className="text-sm font-semibold text-muted-content">Playback Speed: {playbackRate}x</label>
                                    <input
                                        id="playback-speed"
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.25"
                                        value={playbackRate}
                                        onChange={e => setPlaybackRate(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </AccordionItem>
                            <AccordionItem title="Visual Effects" isOpen={openAccordion === 'effects'} onToggle={() => setOpenAccordion('effects')}>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableEffects.map(effect => (
                                        <label key={effect} className="flex items-center gap-2 p-2 bg-base-100 rounded-md cursor-pointer">
                                            <input type="checkbox" checked={effects.includes(effect)} onChange={() => handleEffectToggle(effect)} className="form-checkbox" />
                                            <span className="text-sm font-semibold">{effect}</span>
                                        </label>
                                    ))}
                                </div>
                            </AccordionItem>
                             <AccordionItem title="Audio Control" isOpen={openAccordion === 'audio'} onToggle={() => setOpenAccordion('audio')}>
                                <div className="space-y-3">
                                    <div>
                                        <textarea value={ttsText} onChange={e => setTtsText(e.target.value)} placeholder="Type text for AI voice-over..." rows={3} className="w-full p-2 bg-base-100 rounded-md" />
                                        <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
                                            <select value={voice} onChange={e => setVoice(e.target.value)} className="w-full p-2 bg-base-100 rounded-md text-sm">
                                                {voices.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                                            </select>
                                            <button onClick={handleGenerateTts} disabled={isProcessing || !ttsText} className="w-full sm:w-auto px-4 py-2 bg-primary/80 text-primary-content font-semibold rounded-lg disabled:opacity-50">{status === 'generating_audio' ? '...' : 'Generate'}</button>
                                        </div>
                                    </div>
                                    <div className="text-center text-xs text-muted-content">OR</div>
                                    <div>
                                        <input type="file" accept="audio/*" ref={musicInputRef} className="hidden" onChange={e => handleFileUpload(e, 'music')} />
                                        <button onClick={() => musicInputRef.current?.click()} className="w-full py-2 bg-base-100 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-base-300/50 transition-colors">🎵 Upload Music File</button>
                                    </div>
                                    {audio && (
                                        <div>
                                            <p className="text-xs text-muted-content truncate">Current: {audio.source}</p>
                                            <audio ref={audioRef} src={audio.url} controls className="w-full mt-1" />
                                            <div className="mt-3 space-y-2 border-t border-primary/20 pt-3">
                                                <h4 className="text-sm font-semibold text-base-content">Audio Mixer</h4>
                                                <div>
                                                    <label className="text-xs font-semibold text-muted-content flex justify-between"><span>Original Video Audio</span> <span>{Math.round(volumes.original * 100)}%</span></label>
                                                    <input type="range" min="0" max="1" step="0.05" value={volumes.original} onChange={e => setVolumes(v => ({...v, original: Number(e.target.value)}))} className="w-full" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-muted-content flex justify-between"><span>New Audio Track</span> <span>{Math.round(volumes.new * 100)}%</span></label>
                                                    <input type="range" min="0" max="1" step="0.05" value={volumes.new} onChange={e => setVolumes(v => ({...v, new: Number(e.target.value)}))} className="w-full" />
                                                </div>
                                            </div>
                                            <button onClick={() => setAudio(null)} className="w-full text-center text-xs text-danger hover:underline mt-2">Remove Audio</button>
                                        </div>
                                    )}
                                </div>
                            </AccordionItem>
                             <AccordionItem title="Overlays" isOpen={openAccordion === 'overlays'} onToggle={() => setOpenAccordion('overlays')}>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => logoInputRef.current?.click()} className="w-full py-2 bg-base-100 font-semibold rounded-lg">Upload Logo</button>
                                        {logo && <button onClick={() => setLogo(null)} className="px-3 bg-danger/20 text-danger rounded-lg">X</button>}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => photoInputRef.current?.click()} className="w-full py-2 bg-base-100 font-semibold rounded-lg">Upload Photo</button>
                                        {photo && <button onClick={() => setPhoto(null)} className="px-3 bg-danger/20 text-danger rounded-lg">X</button>}
                                    </div>
                                    <input type="text" value={textOverlay.text} onChange={e => setTextOverlay(p => ({...p, text: e.target.value}))} placeholder="Text Overlay" className="w-full p-2 bg-base-100 rounded-md" />
                                    <div className="flex flex-wrap items-center gap-2">
                                        <input type="color" value={textOverlay.color} onChange={e => setTextOverlay(p => ({...p, color: e.target.value}))} className="h-10 rounded" />
                                        <input type="range" min="12" max="72" value={textOverlay.size} onChange={e => setTextOverlay(p => ({...p, size: Number(e.target.value)}))} className="flex-grow min-w-0" />
                                        <span className="text-xs w-8 text-center">{textOverlay.size}px</span>
                                        <select value={textOverlay.family} onChange={e => setTextOverlay(p => ({...p, family: e.target.value}))} className="bg-base-100 p-1 rounded-md text-xs flex-grow sm:flex-grow-0">
                                            <option value="sans">Sans</option><option value="bangla">Bangla</option><option value="cursive">Cursive</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <label className="text-xs font-semibold text-muted-content shrink-0">Stroke:</label>
                                        <input type="color" value={textOverlay.strokeColor} onChange={e => setTextOverlay(p => ({...p, strokeColor: e.target.value}))} className="h-8 rounded" />
                                        <input type="range" min="0" max="5" step="0.5" value={textOverlay.strokeWidth} onChange={e => setTextOverlay(p => ({...p, strokeWidth: Number(e.target.value)}))} className="flex-grow min-w-0" />
                                        <span className="text-xs w-10 text-center">{textOverlay.strokeWidth}px</span>
                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem title="Change Background" isOpen={openAccordion === 'background'} onToggle={() => setOpenAccordion('background')}>
                                <div className="space-y-3">
                                    <div className="p-1 bg-base-100 rounded-lg grid grid-cols-2 gap-1 text-sm">
                                        <button onClick={() => setBackgroundType('color')} className={`py-1 rounded-md ${backgroundType === 'color' ? 'bg-primary text-primary-content' : ''}`}>Solid Color</button>
                                        <button onClick={() => setBackgroundType('image')} className={`py-1 rounded-md ${backgroundType === 'image' ? 'bg-primary text-primary-content' : ''}`}>Image</button>
                                    </div>
                                    {backgroundType === 'color' ? (
                                        <div className="flex justify-around">
                                            {['#4CAF50', '#2196F3', '#000000', '#FFFFFF'].map(color => (
                                                <button key={color} onClick={() => setBackgroundColor(color)} style={{ backgroundColor: color }} className={`w-8 h-8 rounded-full border-2 ${backgroundColor === color ? 'border-primary' : 'border-base-100'}`}></button>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <input type="file" accept="image/*" ref={bgImageInputRef} className="hidden" onChange={e => handleFileUpload(e, 'background')} />
                                            <button onClick={() => bgImageInputRef.current?.click()} className="w-full py-2 bg-base-100 font-semibold rounded-lg">Upload BG Image</button>
                                            {backgroundImage && <img src={backgroundImage.url} alt="BG Preview" className="w-full h-16 object-cover rounded-md"/>}
                                        </>
                                    )}
                                    <button onClick={handleGenerateBackgroundPreview} disabled={isProcessing} className="w-full py-2 bg-primary/80 text-primary-content font-semibold rounded-lg disabled:opacity-50">{status === 'generating_preview' ? '...' : '✨ Generate AI Preview (1st Frame)'}</button>
                                </div>
                            </AccordionItem>

                            <div className="bg-base-300/30 rounded-lg p-2">
                                <h3 className="text-sm font-semibold text-muted-content mb-2 px-1">AI Background Preview (Static)</h3>
                                <div style={{
                                    backgroundColor: backgroundType === 'color' ? backgroundColor : '#333',
                                    backgroundImage: backgroundType === 'image' && backgroundImage ? `url(${backgroundImage.url})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }} className="w-full aspect-video rounded-md flex items-center justify-center">
                                    {status === 'generating_preview' && <div className="text-primary animate-pulse">Generating...</div>}
                                    {backgroundPreview ? (
                                        <img src={backgroundPreview} alt="AI Preview" className="max-w-full max-h-full object-contain" />
                                    ) : (status !== 'generating_preview' && <p className="text-xs text-muted-content text-center p-4">Generate a preview to see the AI background removal effect.</p>)}
                                </div>
                            </div>
                            
                            <AccordionItem title="Export" isOpen={openAccordion === 'export'} onToggle={() => setOpenAccordion('export')}>
                                <p className="text-xs text-muted-content mb-3">This will download a .zip file with all your assets and instructions for final assembly in a video editor.</p>
                                <button onClick={handleDownload} disabled={isProcessing} className="w-full py-2 bg-success text-white font-bold rounded-lg disabled:opacity-50">{status === 'zipping' ? '...' : 'Download Assets'}</button>
                            </AccordionItem>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VideoModifyPage;
