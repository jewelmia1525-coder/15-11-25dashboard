import React, { useState, useRef, useCallback, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CvData } from '../types';

interface CvParserPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

type Status = 'idle' | 'parsing' | 'ready' | 'error';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const CvParserPage: React.FC<CvParserPageProps> = ({ isOpen, onClose, showToast }) => {
    const [status, setStatus] = useState<Status>('idle');
    const [jsonResult, setJsonResult] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    const reset = useCallback(() => {
        setStatus('idle');
        setJsonResult('');
        setFileName('');
    }, []);
    
    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [reset, onClose]);

    const handleFile = async (file: File | null) => {
        if (!file) return;
        if (file.type !== 'application/pdf') {
            showToast('Only PDF files are supported.', 'error');
            return;
        }
        if (!ai) {
            showToast('AI service is not available.', 'error');
            return;
        }

        setStatus('parsing');
        setFileName(file.name);
        try {
            const base64 = await fileToBase64(file);
            const pdfPart = { inlineData: { mimeType: 'application/pdf', data: base64 } };

            const cvSchema = {
                type: Type.OBJECT,
                description: "Complete resume data.",
                properties: {
                    name: { type: Type.STRING, description: "Full name of the person." },
                    title: { type: Type.STRING, description: "Professional title or headline (e.g., 'Software Engineer')." },
                    contact: {
                        type: Type.OBJECT,
                        description: "Contact information.",
                        properties: {
                            email: { type: Type.STRING, description: "Email address." },
                            phone: { type: Type.STRING, description: "Phone number." },
                            address: { type: Type.STRING, description: "Physical address or location." }
                        }
                    },
                    links: {
                        type: Type.ARRAY,
                        description: "Professional links like LinkedIn, GitHub, or personal portfolio.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                label: { type: Type.STRING, description: "The name of the website (e.g., 'LinkedIn')." },
                                url: { type: Type.STRING, description: "The full URL." }
                            }
                        }
                    },
                    summary: { type: Type.STRING, description: "Professional summary or personal profile section." },
                    experience: {
                        type: Type.ARRAY,
                        description: "List of professional work experiences.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                company: { type: Type.STRING, description: "Name of the company." },
                                role: { type: Type.STRING, description: "Job title or role." },
                                date: { type: Type.STRING, description: "Employment dates (e.g., 'Jan 2020 - Present')." },
                                responsibilities: {
                                    type: Type.ARRAY,
                                    description: "List of key responsibilities and achievements in this role.",
                                    items: { type: Type.STRING }
                                }
                            }
                        }
                    },
                    education: {
                        type: Type.ARRAY,
                        description: "List of academic qualifications.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                institution: { type: Type.STRING, description: "Name of the school or university." },
                                degree: { type: Type.STRING, description: "Degree obtained (e.g., 'B.S. in Computer Science')." },
                                date: { type: Type.STRING, description: "Dates of attendance or graduation year." }
                            }
                        }
                    },
                    skills: {
                        type: Type.ARRAY,
                        description: "Categorized list of technical and soft skills.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                category: { type: Type.STRING, description: "The category of skills (e.g., 'Programming Languages', 'Tools')." },
                                skills: {
                                    type: Type.ARRAY,
                                    description: "List of skills within the category.",
                                    items: { type: Type.STRING }
                                }
                            }
                        }
                    },
                    projects: {
                        type: Type.ARRAY,
                        description: "List of personal or professional projects.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "Name of the project." },
                                description: { type: Type.STRING, description: "A brief description of the project." },
                                link: { type: Type.STRING, description: "A URL link to the project, if available." }
                            }
                        }
                    },
                    languages: {
                        type: Type.ARRAY,
                        description: "List of languages spoken and their proficiency.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                lang: { type: Type.STRING, description: "The language (e.g., 'English')." },
                                proficiency: { type: Type.STRING, description: "Proficiency level (e.g., 'Native', 'Fluent')." }
                            }
                        }
                    },
                    references: { type: Type.STRING, description: "Information about references (e.g., 'Available upon request')." }
                },
            };

            const prompt = "Thoroughly analyze the entire provided CV PDF document, across all pages.Extract all information and structure it into a JSON object that strictly follows the provided schema. You must extract details for every section defined in the schema, including: personal details (name, title, contact, links), professional summary, all work experience entries with responsibilities, all education entries, all skills categorized, all projects, languages spoken, and the references section. Do not omit any section. The output must be a complete and accurate JSON object.";

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: { parts: [pdfPart, { text: prompt }] },
                config: { responseMimeType: "application/json", responseSchema: cvSchema }
            });

            const parsedData = JSON.parse(response.text) as CvData;
            setJsonResult(JSON.stringify(parsedData, null, 2));
            setStatus('ready');
            showToast('CV parsed successfully!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to parse CV. The document might be complex or unreadable.', 'error');
            setStatus('error');
        }
    };
    
    const handleCopy = () => {
        navigator.clipboard.writeText(jsonResult)
            .then(() => showToast('JSON copied to clipboard!', 'success'))
            .catch(() => showToast('Failed to copy!', 'error'));
    };

    const handleDownload = () => {
        const blob = new Blob([jsonResult], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName.split('.')[0] || 'cv-data'}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const renderContent = () => {
        switch (status) {
            case 'parsing':
                return (
                    <div className="text-center">
                        <svg className="w-16 h-16 text-primary mx-auto animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <p className="text-lg font-semibold text-base-content mt-4">AI is analyzing your CV...</p>
                        <p className="text-sm text-muted-content">{fileName}</p>
                        <p className="text-xs text-muted-content mt-2">This may take a moment for multi-page documents.</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center">
                        <p className="text-lg font-semibold text-danger">Something went wrong.</p>
                        <p className="text-sm text-muted-content mt-1">Could not parse the CV.</p>
                        <button onClick={reset} className="mt-6 px-5 py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all">
                            Try Again
                        </button>
                    </div>
                );
            case 'ready':
                return (
                    <div className="w-full h-full flex flex-col p-4 gap-4">
                        <pre className="flex-grow bg-base-300/50 rounded-lg p-4 overflow-auto text-left text-xs font-mono text-base-content border border-primary/20">
                            <code>{jsonResult}</code>
                        </pre>
                        <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                             <button onClick={handleCopy} className="w-full px-4 py-2 bg-primary/80 text-primary-content font-semibold rounded-lg hover:bg-primary transition-all">Copy JSON</button>
                             <button onClick={handleDownload} className="w-full px-4 py-2 bg-success text-white font-semibold rounded-lg hover:bg-green-600 transition-all">Download .json</button>
                             <button onClick={reset} className="w-full px-4 py-2 bg-base-300/50 text-base-content font-semibold rounded-lg hover:bg-base-300 transition-all">Parse Another</button>
                        </div>
                    </div>
                );
            case 'idle':
            default:
                return (
                    <div className="text-center p-8 border-2 border-dashed border-primary/30 rounded-2xl max-w-lg mx-auto">
                        <h2 className="text-2xl font-bold text-base-content">Upload CV for Parsing</h2>
                        <p className="text-muted-content mt-2 mb-6">Let our AI extract your information into a clean JSON format.</p>
                        <input type="file" accept=".pdf" ref={fileInputRef} className="hidden" onChange={e => handleFile(e.target.files?.[0] || null)} />
                        <button id="cv-parser-upload-button" onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all">
                            Browse PDF File
                        </button>
                    </div>
                );
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="cv-parser-title">
            <header className="flex-shrink-0 flex items-center gap-2 sm:gap-4 mb-4">
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 id="cv-parser-title" className="font-bangla text-2xl sm:text-3xl font-bold text-primary">AI CV Parser</h1>
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col items-center justify-center">
                {renderContent()}
            </main>
        </div>
    );
};

export default CvParserPage;