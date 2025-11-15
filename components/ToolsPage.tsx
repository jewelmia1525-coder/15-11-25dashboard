import React from 'react';
import { Widget, Role } from '../types';
import DownloadProjectTool from './DownloadProjectTool';

interface ToolCardProps {
    icon: string;
    title: string;
    description: string;
    onClick: () => void;
    isFeatured?: boolean;
    disabled?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick, isFeatured, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`bg-base-200 border border-primary/20 rounded-2xl p-6 text-left group transition-all duration-300 flex flex-col relative ${isFeatured ? 'md:col-span-2' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-base-300/50 hover:-translate-y-1'}`}
    >
        {disabled && <div className="absolute top-2 right-2 text-xs font-bold text-danger bg-base-100 px-2 py-0.5 rounded-full">Offline</div>}
        <div className="flex items-start gap-4">
            <div className="text-4xl">{icon}</div>
            <div>
                <h3 className="font-bangla text-lg sm:text-xl font-bold text-base-content">{title}</h3>
                <p className="font-bangla text-sm text-muted-content mt-1">{description}</p>
            </div>
        </div>
    </button>
);


interface ToolsPageProps {
    onOpenCvAts: () => void;
    onOpenConvertPage: () => void;
    onOpenFinanceHelper: () => void;
    onOpenCvMaker: () => void;
    onOpenCvParser: () => void;
    onOpenImageEditor: () => void;
    onOpenVideoAnalysis: () => void;
    onOpenTts: () => void;
    onOpenImageAnalysis: () => void;
    onOpenTypingMaster: () => void;
    onOpenVideoGenerator: () => void;
    onOpenFinancialChatbot: () => void;
    onOpenTranslator: () => void;
    onOpenMobileService: () => void;
    onOpenCvCoverLetter: () => void;
    onOpenVideoModify: () => void;
    onWidgetSelect: (widget: Widget) => void;
    role: Role | null;
    isOnline: boolean;
}

const ALL_MAIN_TOOLS = [
    { id: 'mobile-service', icon: '📱', title: 'Mobile Services', description: 'Recharge, buy offers and packages for your mobile number.', roles: ['admin', 'super-admin'], featured: true, online: false },
    { id: 'cv-cover-letter', icon: '💌', title: 'AI CV & Cover Letter', description: 'Upload a CV, provide job details, and let AI generate a tailored cover letter. Download as text/PDF or email directly.', roles: ['admin', 'super-admin'], featured: true, online: true },
    { id: 'video-modify', icon: '🎞️', title: 'AI Video Modifier', description: 'Remove audio, add AI voice-overs, music, logos, and text overlays to your videos.', roles: ['admin', 'super-admin'], featured: true, online: true },
    { id: 'financial-chatbot', icon: '💬', title: 'Financial AI Chatbot', description: 'Ask questions about your spending, income, and budgets in natural language and get instant answers.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'translator', icon: '🌐', title: 'AI Text Translator', description: 'Translate large blocks of text between English and Bengali using Gemini.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'cv-maker', icon: '🧑‍💼', title: 'Professional CV Builder', description: 'Upload your CV and transform it into a professional, modern design with AI assistance. Choose from multiple templates, edit live, and download as a high-quality PDF.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'image-analyzer', icon: '👁️', title: 'AI Image Analyzer', description: 'Upload a photo and ask questions to understand its content. Powered by Gemini vision.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'image-editor', icon: '🎨', title: 'AI Image Editor', description: 'Use text prompts to edit your images with Gemini AI. Add filters, remove objects, and more.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'video-analyzer', icon: '🎥', title: 'AI Video Analyzer', description: 'Extract key information, summarize, or ask questions about a video file using Gemini.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'video-generator', icon: '🎬', title: 'AI Video Generator', description: 'Create stunning 8-second videos from text prompts using the Gemini Veo model.', roles: ['super-admin'], featured: false, online: true },
    { id: 'tts', icon: '🔊', title: 'Text-to-Speech', description: 'Convert text into natural-sounding speech with Gemini AI voices.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'cv-ats', icon: '📄', title: 'CV ATS Analyzer', description: 'Analyze your CV for ATS compatibility, check skill gaps, and get improvement suggestions with AI.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'typing-master', icon: '⌨️', title: 'Typing Master', description: 'Test and improve your typing speed and accuracy. Earn professional certificates for your performance.', roles: ['admin', 'super-admin'], featured: false, online: false },
    { id: 'file-converter', icon: '✨', title: 'File Converter', description: 'A suite of tools to resize images, convert PDF to Text, Text to PDF, and HTML to PDF.', roles: ['admin', 'super-admin'], featured: false, online: true }, // Marked as online because one part (PDF to Text) is.
    { id: 'finance-helper', icon: '🗺️', title: 'Nearby Finance Helper', description: 'Get location-based financial suggestions, find nearby ATMs, or discover budget-friendly places using Google Maps data.', roles: ['admin', 'super-admin'], featured: false, online: true },
    { id: 'cv-parser', icon: '📑', title: 'AI CV Parser', description: 'Upload a CV (PDF) and use AI to extract key information into a structured JSON format. Perfect for developers and data entry.', roles: ['admin', 'super-admin'], featured: false, online: true },
];

interface WidgetDefinition {
    id: Widget;
    icon: string;
    name: string;
    description: string;
    roles: Role[];
    online: boolean;
}

const ALL_WIDGETS: WidgetDefinition[] = [
    { id: 'groupManagement', icon: '🧑‍🤝‍🧑', name: 'Group Management', description: 'Set rules and limits for the Team Hub.', roles: ['super-admin'], online: false },
    { id: 'taskManagement', icon: '📋', name: 'Task Management', description: 'Create, assign, and track tasks for admins.', roles: ['super-admin', 'admin'], online: false },
    { id: 'fingerprintApproval', icon: '👍', name: 'Fingerprint Requests', description: 'Approve fingerprint reset requests from admins.', roles: ['super-admin'], online: false },
    { id: 'dataSync', icon: '☁️', name: 'Google Drive Sync', description: 'Backup and restore app data with Google Drive.', roles: ['super-admin', 'admin'], online: true },
    { id: 'broadcast', icon: '📢', name: 'Broadcast Controls', description: 'Send scrolling announcements to users.', roles: ['super-admin'], online: false },
    { id: 'password', icon: '🔧', name: 'Password Assignment', description: 'Assign unique passwords to new admin users.', roles: ['super-admin'], online: false },
    { id: 'importPasswords', icon: '📥', name: 'Import Passwords', description: 'Generate and import new passwords into the pool.', roles: ['super-admin'], online: false },
    { id: 'data', icon: '💾', name: 'Data Management', description: 'Import/Export your financial data as CSV.', roles: ['super-admin'], online: false },
    { id: 'adminManagement', icon: '👥', name: 'Admin Management', description: 'Manage all admin user accounts.', roles: ['super-admin'], online: false },
    { id: 'calculator', icon: '🧮', name: 'Calculator', description: 'A simple calculator for quick math.', roles: ['super-admin', 'admin', 'viewer'], online: false },
    { id: 'email', icon: '✉️', name: 'Email CV', description: 'Send your pre-formatted CV via email.', roles: ['super-admin', 'admin', 'viewer'], online: true },
    { id: 'theme', icon: '🎨', name: 'Theme Manager', description: 'Customize the look and feel of the app.', roles: ['super-admin', 'admin', 'viewer'], online: false },
    { id: 'about', icon: '👤', name: 'About Me', description: 'Learn more about the developer.', roles: ['super-admin', 'admin', 'viewer'], online: false },
];

const ToolsPage: React.FC<ToolsPageProps> = (props) => {
    const { role, onWidgetSelect, isOnline, ...toolActions } = props;

    const toolClickMap: Record<string, () => void> = {
        'cv-maker': toolActions.onOpenCvMaker,
        'image-analyzer': toolActions.onOpenImageAnalysis,
        'image-editor': toolActions.onOpenImageEditor,
        'video-analyzer': toolActions.onOpenVideoAnalysis,
        'video-generator': toolActions.onOpenVideoGenerator,
        'tts': toolActions.onOpenTts,
        'cv-ats': toolActions.onOpenCvAts,
        'typing-master': toolActions.onOpenTypingMaster,
        'file-converter': toolActions.onOpenConvertPage,
        'finance-helper': toolActions.onOpenFinanceHelper,
        'cv-parser': toolActions.onOpenCvParser,
        'financial-chatbot': toolActions.onOpenFinancialChatbot,
        'translator': toolActions.onOpenTranslator,
        'mobile-service': toolActions.onOpenMobileService,
        'cv-cover-letter': toolActions.onOpenCvCoverLetter,
        'video-modify': toolActions.onOpenVideoModify,
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
             <style>{`.animate-fade-in { animation: fade-in 0.5s ease-out; } @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <section aria-labelledby="tools-page-title" className="space-y-8">
                <div>
                    <h2 id="tools-page-title" className="font-bangla text-2xl sm:text-3xl font-bold text-base-content mb-2">Tools & Utilities</h2>
                    <p className="text-muted-content">Powerful tools to help you manage your data and workflow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ALL_MAIN_TOOLS.filter(tool => role && tool.roles.includes(role)).map(tool => (
                        <ToolCard
                            key={tool.id}
                            icon={tool.icon}
                            title={tool.title}
                            description={tool.description}
                            onClick={toolClickMap[tool.id]}
                            isFeatured={tool.featured}
                            disabled={tool.online && !isOnline}
                        />
                    ))}
                    {role === 'super-admin' && <DownloadProjectTool />}
                </div>
                
                <div>
                    <h3 className="font-bangla text-2xl font-bold text-base-content mb-4 mt-8">Widgets</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ALL_WIDGETS.map(widget => (
                            (role && widget.roles.includes(role)) && (
                                <ToolCard
                                    key={widget.id}
                                    icon={widget.icon}
                                    title={widget.name}
                                    description={widget.description}
                                    onClick={() => onWidgetSelect(widget.id)}
                                    disabled={widget.online && !isOnline}
                                />
                            )
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ToolsPage;