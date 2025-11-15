import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Role, TypingLevel, TypingLanguage, TypingResult, CertificateData } from '../types';
import { typingLessons } from '../typingLessons';

declare const html2canvas: any;
declare const jspdf: any;
declare const saveAs: any;

interface TypingMasterPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    role: Role | null;
}

function TypingMasterPage({
    isOpen,
    onClose,
    showToast,
    role,
}: TypingMasterPageProps) {
    const [screen, setScreen] = useState<'selection' | 'typing' | 'results' | 'certificate'>('selection');
    const [language, setLanguage] = useState<TypingLanguage>('english');
    const [typingConfig, setTypingConfig] = useState<{ level: TypingLevel; lesson: number; topic: number } | null>(null);
    const [lastResult, setLastResult] = useState<TypingResult | null>(null);
    const [isSuperAdminMode, setIsSuperAdminMode] = useState(false);

    const handleStart = (level: TypingLevel, lesson: number, topic: number) => {
        setTypingConfig({ level, lesson, topic });
        setScreen('typing');
    };
    
    const handleComplete = (result: TypingResult) => {
        setLastResult(result);
        setScreen('results');
    };
    
    const handleTryAgain = () => {
        setScreen('typing');
    };

    const handleGoHome = () => {
        setTypingConfig(null);
        setLastResult(null);
        setScreen('selection');
    };
    
    const handleCertificate = () => {
        setIsSuperAdminMode(false);
        setScreen('certificate');
    };
    
    const handleSuperAdminGenerate = () => {
        setIsSuperAdminMode(true);
        setScreen('certificate');
    };

    const handleClose = () => {
        setScreen('selection');
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const renderScreen = () => {
        switch (screen) {
            case 'typing':
                if (typingConfig) {
                    return <TypingScreen level={typingConfig.level} lessonIndex={typingConfig.lesson} topicIndex={typingConfig.topic} language={language} onComplete={handleComplete} />;
                }
                return null; // Should not happen
            case 'results':
                if (lastResult) {
                    return <ResultsScreen results={lastResult} onTryAgain={handleTryAgain} onGoHome={handleGoHome} onCertificate={handleCertificate} />;
                }
                return null;
            case 'certificate':
                return <CertificateScreen results={lastResult} onClose={handleGoHome} showToast={showToast} isSuperAdminMode={isSuperAdminMode} />;
            case 'selection':
            default:
                return <SelectionScreen onStart={handleStart} language={language} setLanguage={setLanguage} role={role} onSuperAdminGenerate={handleSuperAdminGenerate} />;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center gap-2 sm:gap-4 mb-4">
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">Typing Master</h1>
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col items-center justify-center">
                {renderScreen()}
            </main>
        </div>
    );
}

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// --- Sub-component: SelectionScreen ---
const SelectionScreen: React.FC<{
    onStart: (level: TypingLevel, lesson: number, topic: number) => void;
    language: TypingLanguage;
    setLanguage: (lang: TypingLanguage) => void;
    role: Role | null;
    onSuperAdminGenerate: () => void;
}> = ({ onStart, language, setLanguage, role, onSuperAdminGenerate }) => {
    const [selectedLevel, setSelectedLevel] = useState<TypingLevel>('easy');
    const [openLesson, setOpenLesson] = useState<number | null>(0);
    const levels: TypingLevel[] = ['easy', 'medium', 'hard'];
    
    const levelData = typingLessons[language][selectedLevel];

    return (
        <div className="w-full max-w-4xl animate-fade-in p-4">
            <div className="flex justify-center items-center gap-2 mb-6">
                <div className="p-1 bg-base-300/50 rounded-lg flex gap-1">
                    <button onClick={() => setLanguage('english')} className={`px-4 py-2 text-sm rounded-md transition-colors ${language === 'english' ? 'bg-primary text-primary-content' : 'hover:bg-primary/20'}`}>English</button>
                    <button onClick={() => setLanguage('bangla')} className={`px-4 py-2 text-sm rounded-md transition-colors ${language === 'bangla' ? 'bg-primary text-primary-content' : 'hover:bg-primary/20'}`}>Bangla</button>
                </div>
                 {role === 'super-admin' && (
                    <button onClick={onSuperAdminGenerate} className="px-4 py-2.5 text-xs bg-success/20 text-success rounded-lg font-semibold hover:bg-success/30 transition-colors animate-pulse">
                        ✨ Special Generate
                    </button>
                )}
            </div>
            <div className="flex justify-center gap-4 mb-6">
                {levels.map(level => (
                    <button key={level} onClick={() => setSelectedLevel(level)} className={`px-6 py-3 text-lg font-bold rounded-lg transition-all border-2 ${selectedLevel === level ? 'bg-primary text-primary-content border-primary' : 'bg-base-300/50 border-transparent hover:border-primary/50'}`}>
                        {typingLessons[language][level].title}
                    </button>
                ))}
            </div>

            <div className="space-y-2 text-left max-h-[60vh] overflow-y-auto pr-2">
                {levelData.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="bg-base-300/30 rounded-lg">
                        <button onClick={() => setOpenLesson(openLesson === lessonIndex ? null : lessonIndex)} className="w-full p-4 flex justify-between items-center font-semibold text-base-content">
                            <span>{lesson.title}</span>
                            <span className={`transition-transform transform ${openLesson === lessonIndex ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {openLesson === lessonIndex && (
                            <div className="p-4 border-t border-primary/20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {lesson.topics.map((topic, topicIndex) => (
                                    <button key={topicIndex} onClick={() => onStart(selectedLevel, lessonIndex, topicIndex)} className="p-3 bg-base-100 rounded-lg text-center hover:bg-primary/20 transition-colors">
                                        <p className="font-semibold text-primary">{topic.title}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Sub-component: TypingScreen ---
const TypingScreen: React.FC<{
    level: TypingLevel;
    lessonIndex: number;
    topicIndex: number;
    language: TypingLanguage;
    onComplete: (result: TypingResult) => void;
}> = ({ level, lessonIndex, topicIndex, language, onComplete }) => {
    const TIME_LIMIT = 60; // 1 minute
    const topic = useMemo(() => typingLessons[language][level].lessons[lessonIndex].topics[topicIndex], [language, level, lessonIndex, topicIndex]);
    const textToType = topic.text;
    const isHard = level === 'hard';

    const [userInput, setUserInput] = useState('');
    const [time, setTime] = useState(TIME_LIMIT);
    const [isTyping, setIsTyping] = useState(false);
    const [mistakes, setMistakes] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const typingAreaRef = useRef<HTMLDivElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
        // Initialize AudioContext. It must be resumed by a user gesture, which happens when typing starts.
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            audioContextRef.current?.close();
        }
    }, []);

    const playSound = useCallback((type: 'correct' | 'incorrect' | 'tick') => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);

        switch (type) {
            case 'correct':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(900, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
                break;
            case 'incorrect':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(150, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
                break;
            case 'tick':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(1500, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.03);
                break;
        }

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }, []);

    const finishTest = useCallback(() => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error("Could not exit fullscreen", err));
        }
        setIsTyping(false);
        const typedChars = userInput.length;
        const correctChars = typedChars - mistakes;
        const timeTaken = TIME_LIMIT - time;
        
        const wpm = timeTaken > 0 ? Math.round(((typedChars / 5) - mistakes) / (timeTaken / 60)) : 0;
        const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;

        onComplete({
            wpm: Math.max(0, wpm),
            accuracy: Math.max(0, accuracy),
            time: timeTaken,
            level,
            language
        });
    }, [userInput, mistakes, time, level, language, onComplete]);

    useEffect(() => {
        let timerId: number | undefined;
        if (isTyping && time > 0) {
            timerId = window.setInterval(() => {
                setTime(prev => prev - 1);
            }, 1000);
        } else if (time === 0 && isTyping) {
            finishTest();
        }
        return () => clearInterval(timerId);
    }, [isTyping, time, finishTest]);
    
    useEffect(() => {
        if (isTyping && time > 0 && time <= 5) {
            playSound('tick');
        }
    }, [isTyping, time, playSound]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (time === 0) return;
        if (!isTyping) {
            setIsTyping(true);
            typingAreaRef.current?.requestFullscreen().catch(err => {
                console.warn(`Could not enter fullscreen mode: ${err.message}`);
            });
        }

        const value = e.target.value;
        const prevValue = userInput;

        if (value.length > prevValue.length) {
            const lastCharIndex = value.length - 1;
            if (value[lastCharIndex] === textToType[lastCharIndex]) {
                playSound('correct');
            } else {
                playSound('incorrect');
            }
        }
        
        setUserInput(value);

        let currentMistakes = 0;
        value.split('').forEach((char, index) => {
            if (char !== textToType[index]) {
                currentMistakes++;
            }
        });
        setMistakes(currentMistakes);

        if (value.length === textToType.length) {
            finishTest();
        }
    };
    
    const textChars = useMemo(() => textToType.split(''), [textToType]);

    return (
        <div ref={typingAreaRef} className="w-full h-full flex flex-col items-center justify-center p-4 animate-fade-in relative bg-base-200">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <p className="font-mono text-3xl font-bold text-primary">{time}</p>
            </div>
            <div onClick={() => inputRef.current?.focus()} className={`w-full max-w-4xl p-6 bg-base-300/50 rounded-lg text-2xl leading-relaxed tracking-wider text-left select-none font-sans ${isHard ? 'font-cursive' : (language === 'bangla' ? 'font-bangla' : 'font-sans')}`}>
                {textChars.map((char, index) => {
                    let className = 'text-muted-content';
                    if (index < userInput.length) {
                        className = char === userInput[index] ? 'text-success' : 'text-danger bg-danger/20';
                    }
                    if (index === userInput.length) {
                        className = 'text-primary animate-pulse border-b-2 border-primary';
                    }
                    return <span key={index} className={className}>{char}</span>;
                })}
            </div>
            <input ref={inputRef} type="text" value={userInput} onChange={handleInputChange} className="absolute opacity-0" />
        </div>
    );
};


// --- Sub-component: ResultsScreen ---
const ResultsScreen: React.FC<{
    results: TypingResult;
    onTryAgain: () => void;
    onGoHome: () => void;
    onCertificate: () => void;
}> = ({ results, onTryAgain, onGoHome, onCertificate }) => {
    
    const [showPopup, setShowPopup] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowPopup(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const canGetCertificate = results.accuracy >= 90; // Certificate eligibility

    return (
        <>
            {showPopup && (
                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10020] animate-fade-in">
                    <div className="bg-base-200 border border-primary rounded-2xl shadow-2xl p-8 text-center animate-scale-in">
                        <h2 className="text-3xl font-bold text-primary mb-2">Congratulations!</h2>
                        <p className="text-lg text-base-content">You've completed the test.</p>
                    </div>
                 </div>
            )}

            <div className="flex flex-col items-center justify-center p-4 animate-fade-in">
                <div className="bg-base-300/40 p-8 rounded-2xl shadow-lg w-full max-w-lg">
                    <h2 className="text-3xl font-bold text-primary mb-6">Your Results</h2>
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="bg-base-100 p-4 rounded-lg">
                            <p className="text-sm text-muted-content">WPM</p>
                            <p className="text-5xl font-bold text-base-content">{results.wpm}</p>
                        </div>
                        <div className="bg-base-100 p-4 rounded-lg">
                            <p className="text-sm text-muted-content">Accuracy</p>
                            <p className="text-5xl font-bold text-base-content">{results.accuracy}%</p>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button onClick={onTryAgain} className="w-full py-3 bg-primary/80 text-primary-content font-bold rounded-lg hover:bg-primary transition-all">Try Again</button>
                        <button onClick={onGoHome} className="w-full py-3 bg-base-100 text-base-content font-bold rounded-lg hover:bg-base-300/50 transition-all">Home</button>
                    </div>
                     {canGetCertificate && (
                        <button onClick={onCertificate} className="w-full mt-4 py-3 bg-success text-white font-bold rounded-lg hover:bg-green-600 transition-all animate-pulse">
                            Generate Certificate
                        </button>
                     )}
                </div>
            </div>
        </>
    );
};

// --- Sub-component: CertificateScreen ---
const CertificateScreen: React.FC<{
    results: TypingResult | null;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    isSuperAdminMode: boolean;
}> = ({ results, onClose, showToast, isSuperAdminMode }) => {
    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [userSignature, setUserSignature] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [institute, setInstitute] = useState("Ornov's Virtual Typing Master Skills Academy");
    
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfPreview, setPdfPreview] = useState<{ blob: Blob; url: string } | null>(null);

    // Super admin state
    const [superAdminLevel, setSuperAdminLevel] = useState<TypingLevel>('easy');

    const certificateData: CertificateData | null = useMemo(() => {
        const baseResult = isSuperAdminMode ? { wpm: 0, accuracy: 100, time: 0, level: superAdminLevel, language: 'english' as TypingLanguage } : results;
        if (!baseResult) return null;
        
        const candidateId = `FH-TS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
        const registrationNumber = `REG-${String(Math.floor(Math.random() * 90000) + 10000).padStart(5, '0')}-TS`;

        return {
            ...baseResult,
            userName,
            userAddress,
            userPhoto,
            userSignature,
            date: new Date().toLocaleDateString('en-GB'),
            candidateId,
            registrationNumber,
            email,
            phone,
            institute,
        };
    }, [results, isSuperAdminMode, superAdminLevel, userName, userAddress, userPhoto, userSignature, email, phone, institute]);

    const handleGeneratePreview = async () => {
        if (!certificateData) return;
        setIsGenerating(true);
        showToast('Generating certificate preview...', 'success');

        const certificateElement = document.getElementById('certificate-render-container');
        if (!certificateElement) {
            showToast('Certificate template not found!', 'error');
            setIsGenerating(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // allow state to update DOM
            const canvas = await html2canvas(certificateElement, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const { jsPDF } = jspdf;
            const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            
            const blob = pdf.output('blob');
            const url = URL.createObjectURL(blob);
            setPdfPreview({ blob, url });
        } catch (error) {
            console.error(error);
            showToast('Failed to generate PDF preview.', 'error');
        } finally {
            setIsGenerating(false);
        }
    };
    
    return (
        <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
            {isGenerating && (
                <div className="fixed inset-0 bg-black/60 z-[10011] flex flex-col items-center justify-center">
                    <div className="loader"></div>
                    <p className="mt-4 text-white font-semibold">Generating Preview...</p>
                </div>
            )}
            {pdfPreview && (
                <div className="fixed inset-0 bg-black/80 z-[10010] flex flex-col p-4">
                    <div className="flex justify-end items-center gap-4 mb-2 flex-shrink-0">
                        <button onClick={() => saveAs(pdfPreview.blob, `${userName}-Typing-Certificate.pdf`)} className="px-4 py-2 bg-success text-white font-semibold rounded-lg">Download</button>
                        <button onClick={() => { URL.revokeObjectURL(pdfPreview.url); setPdfPreview(null); }} className="px-4 py-2 bg-base-300 rounded-lg font-semibold">Close</button>
                    </div>
                    <iframe src={pdfPreview.url} className="w-full h-full border-0 rounded-lg" title="Certificate Preview" />
                </div>
            )}

            <div className="w-full max-w-md flex-shrink-0 bg-base-300/40 p-6 rounded-2xl flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-primary">Certificate Details</h2>
                {isSuperAdminMode && (
                     <div>
                        <label className="text-sm font-semibold text-muted-content">Select Level</label>
                        <select value={superAdminLevel} onChange={e => setSuperAdminLevel(e.target.value as TypingLevel)} className="w-full mt-1 p-2 bg-base-100 rounded-md border border-primary/20">
                            <option value="easy">Easy (Gold)</option>
                            <option value="medium">Medium (Silver)</option>
                            <option value="hard">Hard (Platinum)</option>
                        </select>
                    </div>
                )}
                <Input label="Your Full Name" value={userName} onChange={e => setUserName(e.target.value)} required />
                <Input label="Your Address" value={userAddress} onChange={e => setUserAddress(e.target.value)} required />
                <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input label="Phone Number (Optional)" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                <Input label="Institute Name" value={institute} onChange={e => setInstitute(e.target.value)} />
                <ImageUpload label="Upload Your Photo" onUpload={setUserPhoto} />
                <ImageUpload label="Upload Your Signature" onUpload={setUserSignature} processForSignature />
                <div className="flex-grow"></div>
                <button onClick={handleGeneratePreview} disabled={isGenerating || !userName || !userPhoto || !userSignature || !email} className="w-full py-3 bg-success text-white font-bold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50">
                    {isGenerating ? 'Generating...' : 'Generate Preview'}
                </button>
                 <button onClick={onClose} className="w-full py-2 bg-base-100 text-base-content font-semibold rounded-lg hover:bg-base-300/50">Back</button>
            </div>
            
            <div id="certificate-render-container" className="fixed -left-[9999px] -top-[9999px]">
                {certificateData && <CertificateTemplate data={certificateData} isSuperAdminMode={isSuperAdminMode} />}
            </div>
        </div>
    );
};


// --- Helper components for Certificate Screen ---
const Input: React.FC<{ label: string } & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-semibold text-muted-content">{label}</label>
        <input {...props} className="w-full text-base p-2 bg-base-100 rounded-md mt-1 border border-primary/20" />
    </div>
);
const ImageUpload: React.FC<{ 
    label: string; 
    onUpload: (dataUrl: string) => void;
    processForSignature?: boolean;
}> = ({ label, onUpload, processForSignature }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (processForSignature) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    
                    ctx.drawImage(img, 0, 0);
                    try {
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imageData.data;
                        const threshold = 230; // pixels with R,G,B > 230 will be transparent
                        
                        for (let i = 0; i < data.length; i += 4) {
                            if (data[i] > threshold && data[i + 1] > threshold && data[i + 2] > threshold) {
                                data[i + 3] = 0; // Set alpha to 0 (transparent)
                            }
                        }
                        ctx.putImageData(imageData, 0, 0);
                        const processedDataUrl = canvas.toDataURL('image/png');
                        setPreview(processedDataUrl);
                        onUpload(processedDataUrl);
                    } catch (e) {
                        console.error("Canvas processing failed, falling back to original", e);
                        const fallbackDataUrl = event.target?.result as string;
                        setPreview(fallbackDataUrl);
                        onUpload(fallbackDataUrl);
                    }
                };
                img.onerror = async () => {
                    const fallbackDataUrl = await fileToDataUrl(file);
                    setPreview(fallbackDataUrl);
                    onUpload(fallbackDataUrl);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            const dataUrl = await fileToDataUrl(file);
            setPreview(dataUrl);
            onUpload(dataUrl);
        }
    };
    
    return (
        <div>
            <label className="text-sm font-semibold text-muted-content">{label}</label>
            <div onClick={() => inputRef.current?.click()} className="mt-1 w-full h-24 bg-base-100 rounded-md border-2 border-dashed border-primary/30 flex items-center justify-center cursor-pointer">
                <input type="file" accept="image/*" ref={inputRef} onChange={handleChange} className="hidden" />
                {preview ? <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" /> : <span className="text-xs text-muted-content">Click to upload</span>}
            </div>
        </div>
    );
};

// --- Certificate Template Component (rendered off-screen) ---
const CertificateTemplate: React.FC<{ data: CertificateData; isSuperAdminMode: boolean }> = ({ data, isSuperAdminMode }) => {
    const themes = {
        easy: { frame: '#C1A77C', header: '#80673A', bg: '#fdfbf2', text: '#383838', sealBorder: '#8C6B26', nameGradient: 'from-yellow-500 to-amber-600' }, // Gold
        medium: { frame: '#a0a0a0', header: '#4A5568', bg: '#f7fafc', text: '#2D3748', sealBorder: '#718096', nameGradient: 'from-slate-500 to-gray-700' }, // Silver
        hard: { frame: '#4A5568', header: '#FFFFFF', bg: '#1A202C', text: '#E2E8F0', sealBorder: '#A0AEC0', nameGradient: 'from-blue-300 to-indigo-400' }, // Platinum/Dark
    };
    const theme = themes[data.level] || themes.easy;
    
    return (
        <div style={{
            width: '297mm', height: '210mm', padding: '10mm', fontFamily: "'Poppins', sans-serif",
            backgroundColor: theme.bg, color: theme.text, position: 'relative', boxSizing: 'border-box',
        }}>
            {/* Intricate Border */}
            <div style={{ position: 'absolute', top: '10mm', left: '10mm', right: '10mm', bottom: '10mm', border: `1px solid ${theme.frame}`, padding: '4mm', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', height: '100%', border: `4px solid ${theme.frame}`, boxSizing: 'border-box' }}></div>
            </div>
            <div style={{ position: 'absolute', top: '15mm', left: '15mm', right: '15mm', bottom: '15mm', border: `1px dashed ${theme.frame}` }}></div>
            
            <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', padding: '10mm' }}>
                <header style={{ textAlign: 'center', width: '100%', position: 'relative'}}>
                    <div style={{ position: 'absolute', right: 0, top: 0, textAlign: 'right'}}>
                         <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{data.registrationNumber}</div>
                         <div style={{fontSize: '10px', fontWeight: 'normal'}}>{data.email}</div>
                    </div>
                     <img src="https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg" alt="Authority" crossOrigin="anonymous" style={{ position: 'absolute', left: 0, top: 0, width: '25mm', height: '25mm', borderRadius: '50%', border: `2px solid ${theme.frame}`}} />
                     <div style={{ position: 'absolute', left: 0, top: '28mm', fontSize: '14px', fontWeight: 'bold' }}>{data.candidateId}</div>

                    <h1 style={{ fontFamily: 'serif', fontSize: '32px', fontWeight: 'bold', color: theme.header, letterSpacing: '2px', margin: 0 }}>Certificate of Achievement</h1>
                    <p style={{ margin: '5px 0 0', fontSize: '14px', color: theme.text, opacity: 0.8 }}>This Certificate is Hereby Awarded to</p>
                </header>

                <main style={{ textAlign: 'center', marginTop: '5mm', flexGrow: 1, width: '100%' }}>
                    {data.userPhoto && 
                        <img src={data.userPhoto} alt={data.userName} crossOrigin="anonymous" style={{ width: '35mm', height: '35mm', borderRadius: '8px', objectFit: 'cover', border: `3px solid ${theme.frame}`, margin: '5mm auto' }} />
                    }
                    <h2 className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.nameGradient}`} style={{ fontFamily: "'Cedarville Cursive', cursive", fontSize: '52px', margin: '5px 0', fontWeight: 'bold', WebkitTextStroke: `0.5px ${theme.text}` } as React.CSSProperties}>{data.userName}</h2>
                    
                    <p style={{ marginTop: '8mm', fontSize: '14px', maxWidth: '70%', textAlign: 'center', margin: '8mm auto 0' }}>
                        For successfully completing the official <strong>{data.language.toUpperCase()}</strong> typing proficiency test at the <strong>{data.level.toUpperCase()}</strong> level via the platform of {data.institute || "Ornov's Virtual Typing Master Skills Academy"}.
                    </p>

                    {!isSuperAdminMode && (
                        <div style={{ display: 'flex', gap: '20mm', marginTop: '8mm', justifyContent: 'center' }}>
                            <div style={{ border: `1px solid ${theme.frame}`, padding: '5mm 8mm', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Avg. Speed</p>
                                <p style={{ margin: '2px 0 0', fontSize: '24px', fontWeight: 'bold' }}>{data.wpm} WPM</p>
                            </div>
                            <div style={{ border: `1px solid ${theme.frame}`, padding: '5mm 8mm', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Avg. Accuracy</p>
                                <p style={{ margin: '2px 0 0', fontSize: '24px', fontWeight: 'bold' }}>{data.accuracy}%</p>
                            </div>
                        </div>
                    )}
                </main>
                
                <footer style={{ width: '100%', marginTop: 'auto', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', paddingTop: '10mm' }}>
                        <div style={{ textAlign: 'center', width: '60mm' }}>
                            {data.userSignature && <img src={data.userSignature} alt="User Signature" crossOrigin="anonymous" style={{ height: '15mm', margin: '0 auto 5px', filter: theme.bg === '#1A202C' ? 'invert(1)' : 'none' }} />}
                            <div style={{ height: '1px', backgroundColor: theme.text, width: '100%' }}></div>
                            <p style={{ fontSize: '12px', margin: '5px 0 0 0', fontWeight: 'bold' }}>Candidate's Signature</p>
                        </div>

                         <div style={{textAlign: 'center'}}>
                            <p style={{fontSize: '12px', margin: '0 0 5px 0', fontWeight: 'bold'}}>Issued on: {data.date}</p>
                            <div style={{ width: '30mm', height: '30mm', borderRadius: '50%', border: `2px solid ${theme.sealBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                <div style={{width: '25mm', height: '25mm', borderRadius: '50%', border: `1px solid ${theme.sealBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '8px', fontWeight: 'bold', color: theme.header}}>
                                    ORN'S VIRTUAL SKILLS ACADEMY
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', width: '60mm' }}>
                            <img src="https://i.ibb.co/6g2wzKt/Untitled.png" alt="Auth Signature" crossOrigin="anonymous" style={{ height: '15mm', margin: '0 auto 5px', filter: theme.bg === '#1A202C' ? 'invert(1)' : 'none' }}/>
                            <div style={{ height: '1px', backgroundColor: theme.text, width: '100%' }}></div>
                            <p style={{ fontSize: '12px', margin: '5px 0 0 0', fontWeight: 'bold' }}>Ornov Bin Tusher Jewel</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};


export default TypingMasterPage;