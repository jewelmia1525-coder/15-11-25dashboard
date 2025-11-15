import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";

interface VideoGeneratorPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const loadingMessages = [
    "Warming up the video engine...",
    "Gathering creative pixels...",
    "Directing the digital actors...",
    "Rendering the main sequence...",
    "Applying cinematic magic...",
    "Finalizing your masterpiece...",
];

const VideoGeneratorPage: React.FC<VideoGeneratorPageProps> = ({ isOpen, onClose, showToast }) => {
    const [prompt, setPrompt] = useState('A neon hologram of a cat driving at top speed');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

    const checkApiKey = async () => {
        if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
            setApiKeySelected(true);
        } else {
            setApiKeySelected(false);
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            checkApiKey();
        }
    }, [isOpen]);
    
    useEffect(() => {
        let interval: number;
        if (isLoading) {
            let messageIndex = 0;
            interval = window.setInterval(() => {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[messageIndex]);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            // Assume success and update UI immediately to avoid race conditions
            setApiKeySelected(true);
        }
    };

    const handleGenerate = async () => {
        if (!prompt) {
            showToast('Please enter a prompt.', 'error');
            return;
        }

        setIsLoading(true);
        setGeneratedVideoUrl(null);
        setLoadingMessage(loadingMessages[0]);
        
        try {
            // Re-initialize AI client just before the call to ensure latest key
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt: prompt + ', 8 seconds long, cinematic quality',
                config: {
                    numberOfVideos: 1,
                    resolution: '720p',
                    aspectRatio: '16:9'
                }
            });

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                 const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                 const blob = await response.blob();
                 const url = URL.createObjectURL(blob);
                 setGeneratedVideoUrl(url);
            } else {
                throw new Error("No video URI found in response.");
            }

        } catch (error: any) {
            console.error("Video generation failed:", error);
            const errorMessage = error.message || "An unknown error occurred.";
            if (errorMessage.includes("Requested entity was not found")) {
                 showToast('API Key is invalid. Please select a valid key.', 'error');
                 setApiKeySelected(false); // Reset key state
            } else {
                showToast(`Video generation failed: ${errorMessage}`, 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center gap-2 sm:gap-4 mb-4">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">AI Video Generator (Veo)</h1>
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col items-center justify-center p-4 gap-4">
                {!apiKeySelected ? (
                    <div className="text-center p-8 max-w-lg mx-auto">
                        <h2 className="text-2xl font-bold text-base-content">API Key Required</h2>
                        <p className="text-muted-content mt-2 mb-6">The Veo model requires you to select your own API key. This is a mandatory step. Please ensure you have billing enabled for your project.</p>
                        <button id="video-generator-select-api-key-button" onClick={handleSelectKey} className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus">Select API Key</button>
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm text-primary hover:underline">Learn more about billing</a>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col lg:flex-row gap-4">
                        <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-4">
                             <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Enter a prompt to generate a video..." className="w-full flex-grow p-3 bg-base-300/50 border border-primary/20 rounded-lg resize-none" />
                             <button onClick={handleGenerate} disabled={isLoading || !prompt} className="w-full py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus disabled:opacity-50">
                                 {isLoading ? 'Generating...' : '🎬 Generate Video'}
                             </button>
                        </div>
                        <div className="flex-grow bg-base-300/30 rounded-lg flex items-center justify-center p-2 relative">
                            {isLoading ? (
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                    <p className="mt-4 font-semibold text-primary">{loadingMessage}</p>
                                    <p className="text-xs text-muted-content mt-1">This can take a few minutes...</p>
                                </div>
                            ) : generatedVideoUrl ? (
                                <video src={generatedVideoUrl} controls autoPlay loop className="max-w-full max-h-full object-contain rounded" />
                            ) : (
                                <p className="text-muted-content text-center">Your generated video will appear here.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VideoGeneratorPage;