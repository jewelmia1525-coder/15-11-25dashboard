import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { GoogleGenAI, FunctionDeclaration, Type, Modality, Blob, LiveServerMessage } from "@google/genai";
import { Transaction } from '../types';
import { TRANSACTION_CATEGORIES } from '../constants';

// --- Audio Helper Functions from Guidelines ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

interface VoiceCommandButtonProps {
    onRecordTransaction: (prefill: Partial<Transaction>) => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const recordTransactionDeclaration: FunctionDeclaration = {
    name: 'recordTransaction',
    parameters: {
        type: Type.OBJECT,
        description: 'Records a financial transaction, either an income or an expense.',
        properties: {
          type: { type: Type.STRING, description: 'The type of transaction, must be "income" or "cost".' },
          amount: { type: Type.NUMBER, description: 'The monetary value of the transaction.' },
          details: { type: Type.STRING, description: 'A description of the transaction (e.g., "groceries at Shawpno", "monthly salary").' },
          category: { type: Type.STRING, description: `An appropriate category for the transaction. Must be one of: ${TRANSACTION_CATEGORIES.join(', ')}` },
        },
        required: ['type', 'amount', 'details', 'category'],
    },
};

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({ onRecordTransaction, showToast }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    // Use `any` for session promise ref as `LiveSession` is not an exported type.
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    const cleanupAudioResources = useCallback(() => {
        scriptProcessorRef.current?.disconnect();
        mediaStreamSourceRef.current?.disconnect();
        inputAudioContextRef.current?.close().catch(e => console.error("Error closing AudioContext:", e));
        streamRef.current?.getTracks().forEach(track => track.stop());

        scriptProcessorRef.current = null;
        mediaStreamSourceRef.current = null;
        inputAudioContextRef.current = null;
        streamRef.current = null;
        sessionPromiseRef.current = null;
        
        setIsListening(false);
        setTranscript('');
    }, []);
    
    const stopSession = useCallback(async () => {
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (e) {
                console.error("Error closing session:", e);
                cleanupAudioResources();
            }
        } else {
            cleanupAudioResources();
        }
    }, [cleanupAudioResources]);
    
    const startSession = async () => {
        if (!ai) {
            showToast('AI is not configured.', 'error');
            return;
        }

        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        if (!streamRef.current || !inputAudioContextRef.current) return;
                        
                        mediaStreamSourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
                        scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                        
                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        
                        mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            setTranscript(prev => prev + message.serverContent.inputTranscription.text);
                        }
                        if (message.serverContent?.turnComplete) {
                            // Keep transcript visible until session closes
                        }
                        if (message.toolCall?.functionCalls) {
                            for (const fc of message.toolCall.functionCalls) {
                                if (fc.name === 'recordTransaction') {
                                    const { type, amount, details, category } = fc.args;
                                    // Explicitly cast arguments to their expected types.
                                    onRecordTransaction({
                                        type: type as 'income' | 'cost',
                                        amount: amount as number,
                                        details: details as string,
                                        category: category as string
                                    });
                                    showToast('Transaction details captured!', 'success');

                                    sessionPromiseRef.current?.then((session) => {
                                        session.sendToolResponse({
                                            functionResponses: { id: fc.id, name: fc.name, response: { result: "ok" } }
                                        });
                                        // Stop the session after a successful command
                                        stopSession();
                                    });
                                }
                            }
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error', e);
                        showToast('Voice command session error.', 'error');
                        cleanupAudioResources();
                    },
                    onclose: () => {
                        cleanupAudioResources();
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO], // Only audio response needed for confirmation sounds (future)
                    inputAudioTranscription: {},
                    tools: [{ functionDeclarations: [recordTransactionDeclaration] }],
                    systemInstruction: `You are a voice assistant for a finance app. Your primary function is to help the user record financial transactions. When the user asks to record an income or expense, use the 'recordTransaction' function with the extracted amount, details, and an appropriate category. Infer the category if not explicitly mentioned. Use Bengali Taka (BDT) as the currency if not specified. Be concise.`,
                },
            });
            setIsListening(true);
        } catch (err) {
            console.error("Failed to start voice session:", err);
            showToast("Could not access microphone. Please check permissions.", "error");
            cleanupAudioResources();
        }
    };
    
    const handleToggleListen = () => {
        if (isListening) {
            stopSession();
        } else {
            startSession();
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sessionPromiseRef.current) {
                stopSession();
            }
        };
    }, [stopSession]);

    return (
        <>
            <button onClick={handleToggleListen} title="Voice Command" className={`p-2 rounded-full transition-colors ${isListening ? 'bg-danger/20 text-danger' : 'text-muted-content hover:text-primary'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            </button>
            {isListening && (
                <div className="fixed bottom-0 left-0 right-0 bg-base-300/90 text-base-content p-4 text-center text-sm font-semibold z-50 backdrop-blur-sm animate-fade-in-up">
                    <p>{transcript || "Listening... Try 'Record a 500 taka expense for groceries'"}</p>
                </div>
            )}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
            `}</style>
        </>
    );
};

export default VoiceCommandButton;
