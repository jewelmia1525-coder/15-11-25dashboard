import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CvData, TemplateId } from '../types';
import * as CvTemplates from './cv-templates/CvTemplates';

declare const jspdf: any;
declare const html2canvas: any;

interface CvMakerPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

type Status = 'idle' | 'parsing' | 'ready' | 'downloading' | 'error';

// Helper type to get only the keys of CvData that are arrays
type ArraySectionKey = keyof {
    [K in keyof CvData as CvData[K] extends Array<any> ? K : never]: any
};

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const createEmptyCvData = (): CvData => ({
    name: "Your Name",
    title: "Your Professional Title",
    contact: { email: "your.email@example.com", phone: "123-456-7890", address: "City, Country" },
    links: [{ label: "LinkedIn", url: "" }],
    summary: "A brief professional summary about yourself.",
    experience: [{ company: "Company Name", role: "Job Title", date: "Month Year - Present", responsibilities: ["Key achievement 1", "Responsibility 2"] }],
    education: [{ institution: "University Name", degree: "Degree, Major", date: "Year - Year" }],
    skills: [{ category: "Core Skills", skills: ["Skill A", "Skill B"] }],
    projects: [{ name: "Project Name", description: "A short description of your project." }],
    languages: [{ lang: "Language", proficiency: "Proficiency Level" }],
    references: "Available upon request.",
});


const CvMakerPage: React.FC<CvMakerPageProps> = ({ isOpen, onClose, showToast }) => {
    const [status, setStatus] = useState<Status>('idle');
    const [fileName, setFileName] = useState<string>('');
    
    // --- State with LocalStorage Persistence ---
    const [cvData, setCvData] = useState<CvData | null>(() => {
        try {
            const saved = localStorage.getItem('cvMakerData');
            return saved ? JSON.parse(saved) : null;
        } catch { return null; }
    });
    const [photo, setPhoto] = useState<string | null>(() => localStorage.getItem('cvMakerPhoto'));
    const [signature, setSignature] = useState<string | null>(() => localStorage.getItem('cvMakerSignature'));
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
        return (localStorage.getItem('cvMakerTemplate') as TemplateId) || 'modern';
    });
    
    useEffect(() => {
        if (cvData) {
            localStorage.setItem('cvMakerData', JSON.stringify(cvData));
            setStatus('ready');
        } else {
             localStorage.removeItem('cvMakerData');
             setStatus('idle');
        }
    }, [cvData]);

    useEffect(() => { photo ? localStorage.setItem('cvMakerPhoto', photo) : localStorage.removeItem('cvMakerPhoto') }, [photo]);
    useEffect(() => { signature ? localStorage.setItem('cvMakerSignature', signature) : localStorage.removeItem('cvMakerSignature') }, [signature]);
    useEffect(() => { localStorage.setItem('cvMakerTemplate', selectedTemplate) }, [selectedTemplate]);


    const pdfPreviewRef = useRef<HTMLDivElement>(null);
    const pdfWrapperRef = useRef<HTMLDivElement>(null);
    const [previewScale, setPreviewScale] = useState(1);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const signatureInputRef = useRef<HTMLInputElement>(null);

    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

     // Effect for scaling the preview responsively
    const updateScale = useCallback(() => {
        if (pdfWrapperRef.current && pdfPreviewRef.current) {
            const containerWidth = pdfWrapperRef.current.offsetWidth;
            const pdfWidth = 210; // A4 width in mm
            setPreviewScale(containerWidth / (pdfWidth * (1 / 0.352778)) * 0.95); // mm to px approx
        }
    }, []);

    useEffect(() => {
        if (isOpen && cvData) {
            updateScale();
            window.addEventListener('resize', updateScale);
            return () => window.removeEventListener('resize', updateScale);
        }
    }, [isOpen, cvData, updateScale]);


    const handleClose = () => {
        setStatus('idle');
        onClose();
    };
    
    const handleReset = () => {
        setCvData(null);
        setPhoto(null);
        setSignature(null);
        setFileName('');
        setStatus('idle');
    };

    const handleParseCv = async (file: File) => {
        if (!ai) {
            showToast('AI service is not available.', 'error');
            return;
        }
        setFileName(file.name);
        setStatus('parsing');
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

            const prompt = "Thoroughly analyze the entire provided CV PDF document, across all pages. Extract all information and structure it into a JSON object that strictly follows the provided schema. You must extract details for every section defined in the schema, including: personal details (name, title, contact, links), professional summary, all work experience entries with responsibilities, all education entries, all skills categorized, all projects, languages spoken, and the references section. Do not omit any section. The output must be a complete and accurate JSON object.";

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: { parts: [pdfPart, { text: prompt }] },
                config: { responseMimeType: "application/json", responseSchema: cvSchema }
            });

            const parsedData = JSON.parse(response.text) as CvData;
            setCvData(parsedData);
            setStatus('ready');
            showToast('CV parsed successfully!', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to parse CV. Try again or use a simpler document.', 'error');
            setStatus('error');
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleParseCv(file);
        }
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'signature') => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            if (type === 'photo') setPhoto(dataUrl);
            else setSignature(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleDownloadPdf = async () => {
        setStatus('downloading');
        showToast('Generating PDF...', 'success');
        const element = pdfPreviewRef.current;
        if (!element) return;
        
        try {
            const canvas = await html2canvas(element, { scale: 3, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${cvData?.name || 'CV'}-${selectedTemplate}.pdf`);
        } catch (error) {
            console.error(error);
            showToast('Failed to generate PDF.', 'error');
        } finally {
            setStatus('ready');
        }
    };
    
    if (!isOpen) return null;

    if (!cvData) {
        return (
             <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col items-center justify-center p-4 animate-fade-in">
                 <button onClick={handleClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                 <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">Professional CV Builder</h1>
                    <p className="text-muted-content max-w-lg mb-8">Upload your existing CV, and let our AI parse it into an editable format. Then, choose a professional template and download your new CV as a PDF.</p>
                     <input type="file" accept=".pdf" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                     <button onClick={() => fileInputRef.current?.click()} disabled={status === 'parsing'} className="px-8 py-4 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all disabled:opacity-50">
                        {status === 'parsing' ? 'Parsing Your CV...' : 'Upload CV to Get Started'}
                    </button>
                    <button onClick={() => setCvData(createEmptyCvData())} className="mt-4 block mx-auto text-sm text-primary hover:underline">
                        Or start with an empty template
                    </button>
                 </div>
             </div>
        );
    }
    
    const CurrentTemplate = CvTemplates[selectedTemplate];

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 animate-fade-in">
            <header className="flex-shrink-0 flex items-center justify-between gap-4 mb-4">
                 <div className="flex items-center gap-4">
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-base-300" aria-label="Go back"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
                    <h1 className="text-2xl font-bold text-primary">CV Editor</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleReset} className="px-4 py-2 text-sm bg-danger/20 text-danger rounded-lg font-semibold hover:bg-danger/30">Reset</button>
                    <button onClick={handleDownloadPdf} disabled={status === 'downloading'} className="px-5 py-2.5 bg-success text-white font-bold rounded-lg hover:bg-green-600 disabled:opacity-50">
                        {status === 'downloading' ? '...' : 'Download PDF'}
                    </button>
                </div>
            </header>
            <main className="flex-grow grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 overflow-hidden">
                <EditorPanel cvData={cvData} setCvData={setCvData} photo={photo} signature={signature} photoInputRef={photoInputRef} signatureInputRef={signatureInputRef} onImageUpload={handleImageUpload} />
                <PreviewPanel pdfWrapperRef={pdfWrapperRef} pdfPreviewRef={pdfPreviewRef} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}>
                     <CurrentTemplate data={cvData} photo={photo} signature={signature} />
                </PreviewPanel>
            </main>
        </div>
    );
};

// --- Sub-components ---
const EditorPanel: React.FC<{
    cvData: CvData;
    setCvData: React.Dispatch<React.SetStateAction<CvData | null>>;
    photo: string | null;
    signature: string | null;
    photoInputRef: React.RefObject<HTMLInputElement>;
    signatureInputRef: React.RefObject<HTMLInputElement>;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'signature') => void;
}> = ({ cvData, setCvData, photo, signature, photoInputRef, signatureInputRef, onImageUpload }) => {
    
    const [openSection, setOpenSection] = useState<string>('personal');

    const handleChange = (section: keyof CvData, value: any, index?: number, field?: string) => {
        setCvData(prev => {
            if (!prev) return null;
            const newData = { ...prev };
            if (index !== undefined && field && Array.isArray(newData[section])) {
                (newData[section] as any[])[index][field] = value;
            } else if (index !== undefined && Array.isArray(newData[section])) {
                 (newData[section] as any[])[index] = value;
            } else {
                (newData as any)[section] = value;
            }
            return newData;
        });
    };
    
    const handleNestedChange = (section: 'contact', field: string, value: string) => {
        setCvData(prev => prev ? { ...prev, [section]: { ...prev[section], [field]: value } } : null);
    };

    const addArrayItem = (section: ArraySectionKey) => {
        setCvData(prev => {
            if (!prev) return null;
            const sectionData = prev[section];
            let newItem;
            switch(section) {
                case 'experience': newItem = { company: '', role: '', date: '', responsibilities: [''] }; break;
                case 'education': newItem = { institution: '', degree: '', date: '' }; break;
                case 'skills': newItem = { category: '', skills: [''] }; break;
                case 'projects': newItem = { name: '', description: '' }; break;
                case 'languages': newItem = { lang: '', proficiency: '' }; break;
                case 'links': newItem = { label: '', url: '' }; break;
                default: newItem = {};
            }
            return { ...prev, [section]: [...sectionData, newItem] };
        });
    };
    
    const removeArrayItem = (section: ArraySectionKey, index: number) => {
        setCvData(prev => prev ? { ...prev, [section]: (prev[section] as any[]).filter((_, i) => i !== index) } : null);
    };

    return (
        <div className="bg-base-200 border border-primary/20 rounded-2xl flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold p-4 border-b border-primary/20">Edit Content</h2>
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
                <CollapsibleSection title="Personal Details" isOpen={openSection === 'personal'} onToggle={() => setOpenSection('personal')}>
                    <button onClick={() => photoInputRef.current?.click()} className="w-full py-2 text-sm border border-dashed rounded-lg">{photo ? 'Change Photo' : 'Upload Photo'}</button>
                    <input type="file" accept="image/*" ref={photoInputRef} onChange={(e) => onImageUpload(e, 'photo')} className="hidden" />
                    <button onClick={() => signatureInputRef.current?.click()} className="w-full py-2 text-sm border border-dashed rounded-lg">{signature ? 'Change Signature' : 'Upload Signature'}</button>
                    <input type="file" accept="image/*" ref={signatureInputRef} onChange={(e) => onImageUpload(e, 'signature')} className="hidden" />
                    
                    <Input label="Full Name" value={cvData.name} onChange={e => handleChange('name', e.target.value)} />
                    <Input label="Title" value={cvData.title} onChange={e => handleChange('title', e.target.value)} />
                    <Input label="Email" value={cvData.contact.email} onChange={e => handleNestedChange('contact', 'email', e.target.value)} />
                    <Input label="Phone" value={cvData.contact.phone} onChange={e => handleNestedChange('contact', 'phone', e.target.value)} />
                    <Input label="Address" value={cvData.contact.address} onChange={e => handleNestedChange('contact', 'address', e.target.value)} />
                </CollapsibleSection>
                <CollapsibleSection title="Summary" isOpen={openSection === 'summary'} onToggle={() => setOpenSection('summary')}>
                     <textarea value={cvData.summary} onChange={e => handleChange('summary', e.target.value)} rows={4} className="w-full p-2 bg-base-100 rounded-md mt-1 border border-primary/20"></textarea>
                </CollapsibleSection>
                <CollapsibleSection title="Experience" isOpen={openSection === 'experience'} onToggle={() => setOpenSection('experience')}>
                    {cvData.experience.map((exp, i) => (
                        <div key={i} className="p-2 border rounded-md mb-2">
                             <Input label="Role" value={exp.role} onChange={e => handleChange('experience', e.target.value, i, 'role')} />
                             <Input label="Company" value={exp.company} onChange={e => handleChange('experience', e.target.value, i, 'company')} />
                             <Input label="Date" value={exp.date} onChange={e => handleChange('experience', e.target.value, i, 'date')} />
                             <textarea placeholder="Responsibilities (one per line)" value={exp.responsibilities.join('\n')} onChange={e => handleChange('experience', e.target.value.split('\n'), i, 'responsibilities')} rows={3} className="w-full p-2 bg-base-100 rounded-md mt-1 border border-primary/20"></textarea>
                             <button onClick={() => removeArrayItem('experience', i)} className="text-xs text-danger">Remove</button>
                        </div>
                    ))}
                    <button onClick={() => addArrayItem('experience')}>+ Add Experience</button>
                </CollapsibleSection>
                <CollapsibleSection title="Education" isOpen={openSection === 'education'} onToggle={() => setOpenSection('education')}>
                    {cvData.education.map((edu, i) => (
                        <div key={i} className="p-2 border rounded-md mb-2">
                            <Input label="Institution" value={edu.institution} onChange={e => handleChange('education', e.target.value, i, 'institution')} />
                            <Input label="Degree" value={edu.degree} onChange={e => handleChange('education', e.target.value, i, 'degree')} />
                            <Input label="Date" value={edu.date} onChange={e => handleChange('education', e.target.value, i, 'date')} />
                            <button onClick={() => removeArrayItem('education', i)} className="text-xs text-danger">Remove</button>
                        </div>
                    ))}
                    <button onClick={() => addArrayItem('education')}>+ Add Education</button>
                </CollapsibleSection>
                {/* Add other sections similarly */}
            </div>
        </div>
    );
};

const PreviewPanel: React.FC<{
    pdfWrapperRef: React.RefObject<HTMLDivElement>;
    pdfPreviewRef: React.RefObject<HTMLDivElement>;
    selectedTemplate: TemplateId;
    setSelectedTemplate: (id: TemplateId) => void;
    children: React.ReactNode;
}> = ({ pdfWrapperRef, pdfPreviewRef, selectedTemplate, setSelectedTemplate, children }) => (
    <div className="bg-base-200 border border-primary/20 rounded-2xl flex flex-col overflow-hidden">
        <div className="p-2 border-b border-primary/20 flex items-center justify-center gap-2">
            {(Object.keys(CvTemplates) as TemplateId[]).map(id => (
                <button key={id} onClick={() => setSelectedTemplate(id)} className={`px-3 py-1.5 text-sm rounded-md capitalize ${selectedTemplate === id ? 'bg-primary text-primary-content' : 'hover:bg-primary/20'}`}>{id}</button>
            ))}
        </div>
        <div ref={pdfWrapperRef} className="flex-grow overflow-auto p-4 bg-gray-400">
            <div ref={pdfPreviewRef} style={{ width: '210mm', height: '297mm', backgroundColor: 'white' }} className="mx-auto shadow-lg">
                {children}
            </div>
        </div>
    </div>
);

const CollapsibleSection: React.FC<{title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode}> = ({ title, isOpen, onToggle, children }) => (
    <div>
        <button onClick={onToggle} className="w-full text-left font-bold text-lg p-2 bg-base-300/50 rounded-md flex justify-between items-center">
            {title} <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {isOpen && <div className="p-2 space-y-2">{children}</div>}
    </div>
);

const Input: React.FC<{label: string} & React.InputHTMLAttributes<HTMLInputElement>> = ({label, ...props}) => (
    <div>
        <label className="text-sm text-muted-content">{label}</label>
        <input {...props} className="w-full p-2 bg-base-100 rounded-md mt-1 border border-primary/20" />
    </div>
);

export default CvMakerPage;
