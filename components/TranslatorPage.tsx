import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";

interface TranslatorPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const TranslatorPage: React.FC<TranslatorPageProps> = ({ isOpen, onClose, showToast }) => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [targetLang, setTargetLang] = useState<'Bengali' | 'English' | null>(null);

    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    const handleTranslate = async (language: 'Bengali' | 'English') => {
        if (!inputText.trim()) {
            showToast('Please enter text to translate.', 'error');
            return;
        }
        if (!ai) {
            showToast('AI service is not configured.', 'error');
            return;
        }

        setIsLoading(true);
        setTargetLang(language);
        setOutputText('');

        try {
            const prompt = `Translate the following text to ${language}. Provide only the translated text, without any additional explanations or introductory phrases.\n\nText:\n"""\n${inputText}\n"""`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setOutputText(response.text);
        } catch (error) {
            console.error("Translation error:", error);
            showToast('Translation failed. Please try again.', 'error');
        } finally {
            setIsLoading(false);
            setTargetLang(null);
        }
    };

    const handleSwap = () => {
        setInputText(outputText);
        setOutputText(inputText);
    };

    const handleCopy = () => {
        if (!outputText) return;
        navigator.clipboard.writeText(outputText)
            .then(() => showToast('Translated text copied!', 'success'))
            .catch(() => showToast('Failed to copy text.', 'error'));
    };
    
    const handleClear = () => {
        setInputText('');
        setOutputText('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center justify-between gap-2 sm:gap-4 mb-4">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Go back">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">AI Text Translator</h1>
                </div>
                <button onClick={handleClear} className="px-4 py-2 text-sm bg-danger/20 text-danger rounded-lg font-semibold hover:bg-danger/30 transition-colors">Clear</button>
            </header>

            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
                {/* Input Area */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <h2 className="font-semibold text-muted-content mb-2 px-1">Source Text</h2>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to translate here..."
                        className="w-full flex-grow p-3 bg-base-300/50 border border-primary/20 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary font-bangla"
                        disabled={isLoading}
                    />
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center justify-center gap-4 py-2 lg:py-0">
                    <button onClick={() => handleTranslate('Bengali')} disabled={isLoading || !inputText} className="w-full lg:w-auto px-4 py-2 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus disabled:opacity-50 flex items-center gap-2 justify-center">
                        {isLoading && targetLang === 'Bengali' ? '...' : 'To Bangla'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    <button onClick={handleSwap} disabled={isLoading} className="p-2 rounded-full bg-base-300/50 hover:bg-primary/20 transition-colors" title="Swap languages">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </button>
                     <button onClick={() => handleTranslate('English')} disabled={isLoading || !inputText} className="w-full lg:w-auto px-4 py-2 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus disabled:opacity-50 flex items-center gap-2 justify-center">
                        {isLoading && targetLang === 'English' ? '...' : 'To English'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>

                {/* Output Area */}
                <div className="w-full lg:w-1/2 flex flex-col">
                     <div className="flex justify-between items-center mb-2 px-1">
                        <h2 className="font-semibold text-muted-content">Translated Text</h2>
                        <button onClick={handleCopy} disabled={isLoading || !outputText} className="text-sm text-primary font-semibold hover:underline disabled:opacity-50">Copy</button>
                    </div>
                    <div className="w-full flex-grow p-3 bg-base-300/50 border border-primary/20 rounded-lg overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full text-primary animate-pulse">Translating...</div>
                        ) : (
                            <pre className="whitespace-pre-wrap font-bangla text-base-content">{outputText}</pre>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TranslatorPage;