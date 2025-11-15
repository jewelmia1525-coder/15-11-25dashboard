import React, { useState, useMemo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

declare const jspdf: any;
declare const emailjs: any;

interface CvCoverLetterPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

type Status = 'idle' | 'parsing' | 'ready' | 'generating' | 'sending';

const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const mimeType = result.split(':')[1].split(';')[0];
            const base64 = result.split(',')[1];
            resolve({ base64, mimeType });
        };
        reader.onerror = error => reject(error);
    });
};

const CvCoverLetterPage: React.FC<CvCoverLetterPageProps> = ({ isOpen, onClose, showToast }) => {
    const [status, setStatus] = useState<Status>('idle');
    const [cvText, setCvText] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    const reset = () => {
        setStatus('idle');
        setCvText('');
        setJobTitle('');
        setJobDescription('');
        setCoverLetter('');
        setRecipientEmail('');
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            showToast('Only PDF files are supported.', 'error');
            return;
        }
        if (!ai) {
            showToast('AI service is not configured.', 'error');
            return;
        }

        setStatus('parsing');
        try {
            const { base64, mimeType } = await fileToBase64(file);
            const pdfPart = { inlineData: { data: base64, mimeType } };
            const prompt = "Extract the full text content from this CV document. Provide only the raw text, with no additional formatting or commentary.";
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [pdfPart, { text: prompt }] },
            });
            setCvText(response.text);
            setStatus('ready');
            showToast('CV parsed successfully!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to parse CV.', 'error');
            setStatus('idle');
        }
    };

    const handleGenerate = async () => {
        if (!jobTitle || !jobDescription) {
            showToast('Please provide both job title and description.', 'error');
            return;
        }
        if (!ai) {
            showToast('AI service is not configured.', 'error');
            return;
        }
        setStatus('generating');
        try {
            const prompt = `Based on the following CV text and job details, write a professional and tailored cover letter. The tone should be formal and confident. Highlight the candidate's most relevant skills and experiences from their CV that match the job description. Structure it as a standard cover letter.

            **Candidate's CV:**
            ---
            ${cvText}
            ---

            **Job Details:**
            - Job Title: ${jobTitle}
            - Job Description: ${jobDescription}
            ---

            Generate only the cover letter text, starting with a salutation.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setCoverLetter(response.text);
        } catch (error) {
            console.error(error);
            showToast('Failed to generate cover letter.', 'error');
        } finally {
            setStatus('ready');
        }
    };
    
    const handleDownloadTxt = () => {
        const blob = new Blob([coverLetter], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Cover_Letter_${jobTitle.replace(/\s/g, '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadPdf = () => {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const margin = 15;
        const usableWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        pdf.setFontSize(11);
        const lines = pdf.splitTextToSize(coverLetter, usableWidth);
        pdf.text(lines, margin, margin);
        
        // Check size
        const pdfOutput = pdf.output('blob');
        if (pdfOutput.size > 200 * 1024) { // 200KB check
            showToast('PDF size is larger than 200KB. Consider shortening the text.', 'error');
        }
        
        pdf.save(`Cover_Letter_${jobTitle.replace(/\s/g, '_')}.pdf`);
    };

    const handleSendEmail = () => {
        if (!recipientEmail) {
            showToast('Please enter a recipient email.', 'error');
            return;
        }
        setStatus('sending');
        const emailBody = `${coverLetter}\n\n---\n\n**CANDIDATE CV:**\n\n${cvText}`;
        const templateParams = {
            to_email: recipientEmail,
            subject: `Application for ${jobTitle}`,
            reply_to: 'eng.jewelmia@gmail.com', // Replace with user's email if available
            from_name: 'AI Application Assistant',
            cv_text: emailBody
        };
        
        const SERVICE_ID = 'service_7bnmsc5', TEMPLATE_ID = 'template_txw5kbb', PUBLIC_KEY = 'xn72TxUTNzE92DKwt';
        emailjs.init({ publicKey: PUBLIC_KEY });
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                showToast('Email sent successfully!', 'success');
            }, (error: any) => {
                console.error(error);
                showToast('Failed to send email.', 'error');
            })
            .finally(() => setStatus('ready'));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-base-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
                    <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">AI CV & Cover Letter Generator</h1>
                </div>
                {status !== 'idle' && <button onClick={reset} className="px-4 py-2 text-sm bg-danger/20 text-danger rounded-lg font-semibold hover:bg-danger/30">Start Over</button>}
            </header>

            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col overflow-hidden">
                {status === 'idle' && (
                    <div className="m-auto text-center p-8">
                        <h2 className="text-2xl font-bold text-base-content">Upload Your CV to Begin</h2>
                        <p className="text-muted-content mt-2 mb-6">Let our AI read your CV (PDF) to prepare for generating a cover letter.</p>
                        <input type="file" accept=".pdf" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                        <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus">Browse PDF File</button>
                    </div>
                )}
                {(status === 'parsing' || status === 'generating' || status === 'sending') && (
                     <div className="m-auto text-center p-8">
                        <svg className="w-16 h-16 text-primary mx-auto animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <p className="text-lg font-semibold text-base-content mt-4 capitalize">{status}...</p>
                    </div>
                )}
                {status === 'ready' && (
                    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
                        {/* Box 1: CV Text */}
                        <div className="bg-base-300/40 rounded-xl p-4 border border-primary/20 shadow-sm flex flex-col h-[50vh] min-h-[300px]">
                            <h2 className="font-bold text-base-content mb-2 flex-shrink-0">Full CV Text</h2>
                            <div className="flex-grow bg-base-100/50 p-3 rounded-lg overflow-y-auto text-sm border border-primary/20">
                                <pre className="whitespace-pre-wrap font-sans text-muted-content">{cvText}</pre>
                            </div>
                        </div>

                        {/* Box 2: Job Details */}
                        <div className="bg-base-300/40 rounded-xl p-4 border border-primary/20 shadow-sm flex flex-col gap-3">
                            <h2 className="font-bold text-base-content">Job Details</h2>
                            <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Job Title / Subject" className="w-full p-2 bg-base-100 border border-primary/20 rounded-lg" />
                            <textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste Job Description Here..." rows={5} className="w-full p-2 bg-base-100 border border-primary/20 rounded-lg resize-none" />
                            <button onClick={handleGenerate} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus">✨ Generate Cover Letter</button>
                        </div>

                        {/* Box 3: Generated Cover Letter */}
                        <div className="bg-base-300/40 rounded-xl p-4 border border-primary/20 shadow-sm flex flex-col h-[50vh] min-h-[300px]">
                            <h2 className="font-bold text-base-content mb-2 flex-shrink-0">Generated Cover Letter (Editable)</h2>
                            <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="AI will generate the cover letter here..." className="w-full flex-grow p-3 bg-base-100 border border-primary/20 rounded-lg resize-none" />
                        </div>

                        {/* Box 4: Actions */}
                        <div className="bg-base-300/40 rounded-xl p-4 border border-primary/20 shadow-sm flex flex-col gap-2">
                            <h3 className="font-semibold text-sm">Actions</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={handleDownloadTxt} disabled={!coverLetter} className="py-2 bg-success/20 text-success rounded-lg font-semibold disabled:opacity-50">Download .txt</button>
                                <button onClick={handleDownloadPdf} disabled={!coverLetter} className="py-2 bg-success/20 text-success rounded-lg font-semibold disabled:opacity-50">Download .pdf</button>
                            </div>
                            <div className="flex gap-2">
                                <input type="email" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} placeholder="Recipient Email" className="w-full p-2 bg-base-100 border border-primary/20 rounded-lg" />
                                <button onClick={handleSendEmail} disabled={!coverLetter || !recipientEmail} className="px-4 py-2 bg-primary text-primary-content font-bold rounded-lg disabled:opacity-50">Send</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CvCoverLetterPage;
