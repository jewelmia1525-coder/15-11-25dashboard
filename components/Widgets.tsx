import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import WidgetContainer from './widgets/WidgetContainer';
import { AdminUser, Role, Task, MobilePaymentMethod, MobileOffer, MobileServiceOperator, Transaction, Contact, Group, FingerprintResetRequest } from '../types';
import { FULL_CV_TEXT, ROLE_DETAILS } from '../constants';
import { GoogleGenAI, Modality } from "@google/genai";

declare const emailjs: any;

// Common props for widgets
interface WidgetProps {
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
}

// --- 1. PasswordGeneratorWidget ---
// HELPER ICONS & COMPONENT
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const MailIconForWidget = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

const InputWithIcon: React.FC<{ icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>> = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-content">{icon}</span>
        <input {...props} className="w-full p-2 pl-10 bg-base-100 rounded-md border border-primary/20" />
    </div>
);

interface PasswordGeneratorWidgetProps extends WidgetProps {
    availablePasswords: string[];
    onAddAdminUser: (user: Omit<AdminUser, 'id'>) => void;
}

export const PasswordGeneratorWidget: React.FC<PasswordGeneratorWidgetProps> = ({ onClose, showToast, availablePasswords, onAddAdminUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const passwordToAssign = availablePasswords.length > 0 ? availablePasswords[0] : 'None Available';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (availablePasswords.length === 0) {
            showToast('No available passwords. Please import more.', 'error');
            return;
        }
        
        const credentialsText = `Username: ${username}\nPassword: ${passwordToAssign}`;
        navigator.clipboard.writeText(credentialsText).then(() => {
            onAddAdminUser({ username, email, mobile, password: passwordToAssign });
            showToast('User created & credentials copied!', 'success');
            setUsername('');
            setEmail('');
            setMobile('');
        }).catch(err => {
            console.error('Failed to copy credentials:', err);
            onAddAdminUser({ username, email, mobile, password: passwordToAssign });
            showToast('User created, but failed to copy credentials.', 'error');
        });
    };

    return (
        <WidgetContainer title="Assign New Admin" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputWithIcon icon={<UserIcon />} type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Username" />
                <InputWithIcon icon={<MailIconForWidget />} type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />
                <InputWithIcon icon={<PhoneIcon />} type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required placeholder="Mobile Number" />
                
                <div className="bg-base-100 p-3 rounded-lg border border-primary/20">
                    <label className="text-xs font-semibold text-muted-content">Password to be Assigned</label>
                    <div className="text-center font-mono text-2xl font-bold text-primary tracking-widest py-2">
                        {passwordToAssign}
                    </div>
                </div>
                
                <button type="submit" disabled={availablePasswords.length === 0} className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                    <ClipboardIcon />
                    Assign & Copy Credentials
                </button>
            </form>
        </WidgetContainer>
    );
};


// --- 2. CalculatorWidget ---
export const CalculatorWidget: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');

    const handleClick = (value: string) => {
        if (value === 'C') {
            setDisplay('0');
            setExpression('');
        } else if (value === '=') {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
                setDisplay(String(result));
                setExpression(String(result));
            } catch {
                setDisplay('Error');
                setExpression('');
            }
        } else {
            if (display === '0' && value !== '.') {
                setDisplay(value);
            } else {
                setDisplay(display + value);
            }
            setExpression(expression + value);
        }
    };

    const buttons = ['C', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'];

    return (
        <WidgetContainer title="Calculator" onClose={onClose}>
            <div className="bg-base-100 p-2 rounded-lg">
                <div className="text-right text-3xl font-mono p-4 break-all">{display}</div>
                <div className="grid grid-cols-4 gap-2">
                    {buttons.map(btn => (
                        <button key={btn} onClick={() => handleClick(btn)} className={`py-3 rounded-md text-lg font-bold ${btn === '=' ? 'col-span-2 bg-primary text-primary-content' : 'bg-base-300'}`}>
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </WidgetContainer>
    );
};

// --- 3. EmailCvWidget ---
interface EmailCvWidgetProps extends WidgetProps {
    isOnline: boolean;
}
export const EmailCvWidget: React.FC<EmailCvWidgetProps> = ({ onClose, showToast, isOnline }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('My Professional CV');
    const [isSending, setIsSending] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isOnline) {
            showToast('You are offline. Please connect to the internet to send emails.', 'error');
            return;
        }
        setIsSending(true);

        const templateParams = {
            to_email: to,
            subject: subject,
            reply_to: 'eng.jewelmia@gmail.com',
            from_name: 'Jewel Mia',
            cv_text: FULL_CV_TEXT
        };
        
        const SERVICE_ID = 'service_7bnmsc5';
        const TEMPLATE_ID = 'template_txw5kbb';
        const PUBLIC_KEY = 'xn72TxUTNzE92DKwt';
        
        emailjs.init({ publicKey: PUBLIC_KEY });

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                showToast('CV sent successfully!', 'success');
                onClose();
            }, (error: any) => {
                console.error(error);
                showToast('Failed to send email.', 'error');
            })
            .finally(() => setIsSending(false));
    };

    return (
        <WidgetContainer title="Email CV" onClose={onClose}>
            <form onSubmit={sendEmail} className="space-y-3">
                <Input label="Recipient Email" type="email" value={to} onChange={e => setTo(e.target.value)} required />
                <Input label="Subject" type="text" value={subject} onChange={e => setSubject(e.target.value)} required />
                <button type="submit" disabled={isSending || !isOnline} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg disabled:opacity-50">
                    {isSending ? 'Sending...' : (isOnline ? 'Send Email' : 'Offline')}
                </button>
            </form>
        </WidgetContainer>
    );
};

const Input: React.FC<{label: string} & React.InputHTMLAttributes<HTMLInputElement>> = ({label, ...props}) => (
    <div>
        <label className="text-sm font-medium text-muted-content">{label}</label>
        <input {...props} className="w-full p-2 bg-base-100 rounded-md mt-1" />
    </div>
);

// --- 4. ThemeManagerWidget ---
interface ThemeManagerWidgetProps extends WidgetProps {
    currentTheme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    currentColorTheme: string;
    setColorTheme: (theme: string) => void;
}
export const ThemeManagerWidget: React.FC<ThemeManagerWidgetProps> = ({ onClose, showToast, currentTheme, setTheme, currentColorTheme, setColorTheme }) => {
    const colors = ['theme-gold', 'theme-blue', 'theme-green', 'theme-purple', 'theme-red', 'theme-orange', 'theme-teal', 'theme-pink'];
    const [customColor, setCustomColor] = useState(currentColorTheme.startsWith('#') ? currentColorTheme : '#ffd700');

    return (
        <WidgetContainer title="Theme Manager" onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-sm mb-2">Mode</h4>
                    <div className="flex gap-2">
                        <button onClick={() => setTheme('light')} className={`w-full py-2 rounded-md ${currentTheme === 'light' ? 'bg-primary text-primary-content' : 'bg-base-100'}`}>Light</button>
                        <button onClick={() => setTheme('dark')} className={`w-full py-2 rounded-md ${currentTheme === 'dark' ? 'bg-primary text-primary-content' : 'bg-base-100'}`}>Dark</button>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-2">Color Palette</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {colors.map(color => (
                            <button key={color} onClick={() => setColorTheme(color)} className={`h-10 rounded-md ${color} ${currentColorTheme === color ? 'ring-2 ring-offset-2 ring-offset-base-200 ring-primary' : ''}`}></button>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-sm mb-2">Custom Color</h4>
                    <div className="flex items-center gap-2">
                         <input type="color" value={customColor} onChange={e => setCustomColor(e.target.value)} className="w-10 h-10" />
                         <input type="text" value={customColor} onChange={e => setCustomColor(e.target.value)} className="w-full p-2 bg-base-100 rounded-md font-mono" />
                         <button onClick={() => setColorTheme(customColor)} className="px-3 py-2 bg-primary rounded-md text-primary-content">Set</button>
                    </div>
                </div>
            </div>
        </WidgetContainer>
    );
};

// --- 5. AboutMeWidget ---
export const AboutMeWidget: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const summary = useMemo(() => {
        const startMarker = "PERSONAL PROFILE & CAREER SUMMARY\\n========================================\\n";
        const endMarker = "\\n========================================";
        const startIndex = FULL_CV_TEXT.indexOf(startMarker) + startMarker.length;
        const endIndex = FULL_CV_TEXT.indexOf(endMarker, startIndex);
        if (startIndex > -1 && endIndex > -1) {
            return FULL_CV_TEXT.substring(startIndex, endIndex).trim();
        }
        // Fallback in case parsing fails
        return "Highly analytical Electrical Engineer specializing in Industrial Automation, Control Systems, and Data-Driven Problem Solving.";
    }, []);

    const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
    const WhatsAppIcon = () => <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.52 3.48A11.87 11.87 0 0012 .6 11.4 11.4 0 00.6 12.08a11.27 11.27 0 001.58 5.83L.6 23.4l5.61-1.47a11.5 11.5 0 005.81 1.53A11.45 11.45 0 0023.4 12a11.87 11.87 0 00-2.88-8.52zM12 21.07a9.29 9.29 0 01-4.74-1.28l-.34-.2-3.33.87.9-3.25-.22-.33A9.22 9.22 0 012.72 12a9.28 9.28 0 1118.56 0A9.28 9.28 0 0112 21.07zm4.84-6.64c-.26-.13-1.54-.76-1.78-.85s-.42-.13-.6.13-.68.85-.83 1-.3.19-.56.06a7.65 7.65 0 01-2.25-1.39 8.43 8.43 0 01-1.56-1.94c-.16-.26 0-.4.12-.53.12-.12.26-.3.4-.45a1.79 1.79 0 00.27-.45.5.5 0 000-.47c-.07-.13-.6-1.44-.83-1.98s-.44-.46-.6-.47h-.51a1 1 0 00-.72.33A3 3 0 007 8.46a5.17 5.17 0 001.1 2.72A11.83 11.83 0 0012 14.68a5.44 5.44 0 001.38.18 3.28 3.28 0 002.13-1.36 2.69 2.69 0 00.33-1.39c0-.26-.02-.46-.06-.64a.47.47 0 00-.14-.22z"/></svg>;

    return (
        <WidgetContainer title="About Me" onClose={onClose}>
            <div className="flex flex-col items-center text-center space-y-4">
                <img 
                    src={ROLE_DETAILS['super-admin'].photo} 
                    alt="Jewel Mia"
                    className="w-24 h-24 rounded-full border-4 border-primary/50 shadow-lg"
                />
                <p className="text-sm text-muted-content leading-relaxed">
                    {summary}
                </p>
                <div className="border-t border-primary/20 w-full pt-4 flex justify-center items-center gap-6">
                    <a href="mailto:Eng.jewelmia@gmil.com" className="flex items-center gap-2 text-muted-content hover:text-primary transition-colors">
                        <MailIcon />
                        <span className="text-sm font-semibold">Email</span>
                    </a>
                    <a href="https://wa.me/8801402284322" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-content hover:text-primary transition-colors">
                        <WhatsAppIcon />
                        <span className="text-sm font-semibold">WhatsApp</span>
                    </a>
                </div>
            </div>
        </WidgetContainer>
    );
};

// --- 6. DataManagementWidget ---
interface DataManagementWidgetProps extends WidgetProps {
    onImport: (type: 'transactions' | 'contacts', data: any[]) => void;
    onBackupToFile: () => void;
    onRestoreFromFile: (data: any) => void;
}
export const DataManagementWidget: React.FC<DataManagementWidgetProps> = ({ onClose, showToast, onImport, onBackupToFile, onRestoreFromFile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                onRestoreFromFile(data);
            } catch (error) {
                showToast('Invalid backup file.', 'error');
            }
        };
        reader.readAsText(file);
    };

    return (
        <WidgetContainer title="Data Management" onClose={onClose}>
            <div className="space-y-3">
                <button onClick={onBackupToFile} className="w-full py-2 bg-base-100 rounded-md font-semibold">Backup All Data to File</button>
                <input type="file" accept=".json" ref={fileInputRef} className="hidden" onChange={handleFileRestore} />
                <button onClick={() => fileInputRef.current?.click()} className="w-full py-2 bg-base-100 rounded-md font-semibold">Restore All Data from File</button>
                <p className="text-xs text-danger text-center">Warning: Restoring will overwrite all current data.</p>
            </div>
        </WidgetContainer>
    );
};

// --- 7. AdminUserManagementWidget ---
interface AdminUserManagementWidgetProps extends WidgetProps {
    adminUsers: AdminUser[];
    onUpdateUser: (user: AdminUser) => void;
    onSendMessageToUser: (username: string) => void;
}
export const AdminUserManagementWidget: React.FC<AdminUserManagementWidgetProps> = ({ onClose, adminUsers, onUpdateUser, onSendMessageToUser }) => {
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [groupName, setGroupName] = useState('');

    const handleSaveName = () => {
        if (!editingUser) return;
        onUpdateUser({ ...editingUser, groupDisplayName: groupName });
        setEditingUser(null);
        setGroupName('');
    };

    return (
        <WidgetContainer title="Admin Management" onClose={onClose}>
            <ul className="space-y-2">
                {adminUsers.map(user => (
                    <li key={user.id} className="p-2 bg-base-100 rounded-md">
                        {editingUser?.id === user.id ? (
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text" 
                                    value={groupName} 
                                    onChange={e => setGroupName(e.target.value)}
                                    className="w-full p-1 bg-base-200 rounded-md"
                                    placeholder="Group Display Name"
                                />
                                <button onClick={handleSaveName} className="text-success p-1">✓</button>
                                <button onClick={() => setEditingUser(null)} className="text-danger p-1">✗</button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{user.username}</p>
                                    <p className="text-xs text-muted-content">Group Name: {user.groupDisplayName || user.username}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingUser(user); setGroupName(user.groupDisplayName || ''); }} className="text-primary text-lg">✏️</button>
                                    <button onClick={() => onSendMessageToUser(user.username)} className="text-primary text-lg">✉️</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </WidgetContainer>
    );
};

// --- 8. BroadcastWidget ---
interface BroadcastWidgetProps extends WidgetProps {
    onSetAdminBroadcast: (text: string) => void;
    onSetViewerBroadcast: (text: string) => void;
    currentAdminBroadcast: string;
    currentViewerBroadcast: string;
}
export const BroadcastWidget: React.FC<BroadcastWidgetProps> = (props) => {
    const [adminText, setAdminText] = useState(props.currentAdminBroadcast);
    const [viewerText, setViewerText] = useState(props.currentViewerBroadcast);

    const handleSave = () => {
        props.onSetAdminBroadcast(adminText);
        props.onSetViewerBroadcast(viewerText);
        props.showToast('Broadcast messages updated!', 'success');
        props.onClose();
    };

    return (
        <WidgetContainer title="Broadcast Message" onClose={props.onClose}>
            <div className="space-y-3">
                <Input label="For Admins" value={adminText} onChange={e => setAdminText(e.target.value)} />
                <Input label="For Viewers" value={viewerText} onChange={e => setViewerText(e.target.value)} />
                <button onClick={handleSave} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg">Save Broadcasts</button>
            </div>
        </WidgetContainer>
    );
};

// --- 9. ImportPasswordsWidget ---
interface ImportPasswordsWidgetProps extends WidgetProps {
    onImport: (passwords: string[]) => void;
    existingPasswords: string[];
}
export const ImportPasswordsWidget: React.FC<ImportPasswordsWidgetProps> = ({ onClose, onImport, existingPasswords, showToast }) => {
    const [text, setText] = useState('');
    
    const handleImport = () => {
        const newPasswords = text.split(/[\s,]+/).filter(p => p.length > 0 && !existingPasswords.includes(p));
        if (newPasswords.length > 0) {
            onImport(newPasswords);
        } else {
            showToast('No new unique passwords found to import.', 'error');
        }
        onClose();
    };

    return (
        <WidgetContainer title="Import Passwords" onClose={onClose}>
             <div className="space-y-3">
                <p className="text-xs text-muted-content">Paste new passwords, separated by space, comma, or newline.</p>
                <textarea value={text} onChange={e => setText(e.target.value)} rows={5} className="w-full p-2 bg-base-100 rounded-md" />
                <button onClick={handleImport} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg">Import</button>
            </div>
        </WidgetContainer>
    );
};


// --- 10. ProfileSettingsWidget ---
interface ProfileSettingsWidgetProps extends WidgetProps {
    currentUser: AdminUser;
    onUpdateProfile: (data: Partial<AdminUser>) => void;
    onOpenFingerprintSetup: () => void;
}
const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};
export const ProfileSettingsWidget: React.FC<ProfileSettingsWidgetProps> = ({ onClose, currentUser, onUpdateProfile, onOpenFingerprintSetup, showToast }) => {
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [mobile, setMobile] = useState(currentUser.mobile);
    const [groupDisplayName, setGroupDisplayName] = useState(currentUser.groupDisplayName || currentUser.username);
    const [photo, setPhoto] = useState<string | undefined>(currentUser.photo);
    const [isGenerating, setIsGenerating] = useState(false);
    const photoInputRef = useRef<HTMLInputElement>(null);
    
    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    const handleSave = () => {
        const updatedData: Partial<AdminUser> = {};
        if (username !== currentUser.username) updatedData.username = username;
        if (email !== currentUser.email) updatedData.email = email;
        if (mobile !== currentUser.mobile) updatedData.mobile = mobile;
        if (photo !== currentUser.photo) updatedData.photo = photo;
        if (groupDisplayName !== (currentUser.groupDisplayName || currentUser.username)) updatedData.groupDisplayName = groupDisplayName;


        if (Object.keys(updatedData).length > 0) {
            onUpdateProfile(updatedData);
        } else {
            showToast("No changes to save.", "error");
        }
        onClose();
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_DIM = 256;
                let { width, height } = img;

                if (width > height) {
                    if (width > MAX_DIM) { height *= MAX_DIM / width; width = MAX_DIM; }
                } else {
                    if (height > MAX_DIM) { width *= MAX_DIM / height; height = MAX_DIM; }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                setPhoto(dataUrl);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleGenerateAvatar = async () => {
        if (!ai) {
            showToast('AI service not available.', 'error');
            return;
        }
        setIsGenerating(true);
        try {
            const prompt = `A professional, minimalist avatar icon for a person named ${username}. Flat design, simple, clean background.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { responseModalities: [Modality.IMAGE] },
            });
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setPhoto(imageUrl);
                    showToast('AI Avatar generated!', 'success');
                    break;
                }
            }
        } catch (error) {
            console.error("Avatar generation failed:", error);
            showToast('Failed to generate AI Avatar.', 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <WidgetContainer title="Profile Settings" onClose={onClose}>
            <div className="space-y-4">
                <div className="flex flex-col items-center gap-3">
                    {photo ? (
                        <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-primary/50" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary/50">
                            <span className="text-3xl font-bold text-primary">{getInitials(username)}</span>
                        </div>
                    )}
                    <div className="flex gap-2">
                         <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                        <button onClick={() => photoInputRef.current?.click()} className="text-xs px-3 py-1 bg-base-100 rounded-md font-semibold">Upload</button>
                        <button onClick={() => setPhoto(undefined)} className="text-xs px-3 py-1 bg-base-100 rounded-md font-semibold" disabled={!photo}>Remove</button>
                        <button onClick={handleGenerateAvatar} className="text-xs px-3 py-1 bg-base-100 rounded-md font-semibold" disabled={isGenerating}>
                            {isGenerating ? '...' : '✨ AI Avatar'}
                        </button>
                    </div>
                </div>
                <Input label="Username (Login)" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <Input label="Group Display Name" type="text" value={groupDisplayName} onChange={e => setGroupDisplayName(e.target.value)} />
                <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input label="Mobile" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} />
                <button onClick={onOpenFingerprintSetup} className="w-full py-2 bg-base-100 rounded-md font-semibold text-sm">
                    {currentUser.fingerprintId ? 'Reset Fingerprint Login' : 'Setup Fingerprint Login'}
                </button>
                <button onClick={handleSave} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg">Save Changes</button>
            </div>
        </WidgetContainer>
    );
};


// --- 11. AdminOverviewWidget ---
export const AdminOverviewWidget: React.FC<{onClose: () => void, adminUsers: AdminUser[]}> = ({ onClose, adminUsers }) => {
    return (
        <WidgetContainer title="Admin Overview" onClose={onClose}>
            <div className="text-center">
                <p className="text-6xl font-bold">{adminUsers.length}</p>
                <p className="text-muted-content">Total Admin Users</p>
            </div>
        </WidgetContainer>
    );
};


// --- 12. DataSyncWidget ---
interface DataSyncWidgetProps {
    onClose: () => void;
    isSignedIn: boolean;
    isDriveReady: boolean;
    userProfile: any;
    lastBackupDate: string | null;
    signIn: () => void;
    signOut: () => void;
    onBackup: () => void;
    onRestore: () => void;
    isOnline: boolean;
}
export const DataSyncWidget: React.FC<DataSyncWidgetProps> = (props) => {
    if (!props.isOnline) {
        return (
            <WidgetContainer title="Google Drive Sync" onClose={props.onClose}>
                <p className="text-center text-danger">You are offline. Connect to the internet to use Google Drive Sync.</p>
            </WidgetContainer>
        );
    }

    if (!props.isDriveReady) {
        return (
             <WidgetContainer title="Google Drive Sync" onClose={props.onClose}>
                <p className="text-center text-muted-content animate-pulse">Initializing Google Services...</p>
            </WidgetContainer>
        );
    }

    return (
        <WidgetContainer title="Google Drive Sync" onClose={props.onClose}>
            {props.isSignedIn && props.userProfile ? (
                <div className="space-y-3 text-center">
                    <img src={props.userProfile.picture} alt="profile" className="w-16 h-16 rounded-full mx-auto" />
                    <p>Signed in as <strong>{props.userProfile.name}</strong></p>
                    <p className="text-xs text-muted-content">Last Backup: {props.lastBackupDate || 'Never'}</p>
                    <button onClick={props.onBackup} className="w-full py-2 bg-primary/20 text-primary font-semibold rounded-lg">Backup Now</button>
                    <button onClick={props.onRestore} className="w-full py-2 bg-base-100 font-semibold rounded-lg">Restore from Drive</button>
                    <button onClick={props.signOut} className="text-xs text-danger hover:underline">Sign Out</button>
                </div>
            ) : (
                 <div className="space-y-3 text-center">
                    <p className="text-sm text-muted-content">Sign in with your Google Account to back up and restore your data.</p>
                    <button onClick={props.signIn} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg">Sign in with Google</button>
                </div>
            )}
        </WidgetContainer>
    );
};

// --- 13. TaskManagementWidget ---
interface TaskManagementWidgetProps extends WidgetProps {
    tasks: Task[];
    adminUsers: AdminUser[];
    currentUserRole: Role | null;
    loggedInAdminUser: AdminUser | null;
    onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
    onDeleteTask: (id: number) => void;
    onToggleTaskStatus: (id: number) => void;
    onClearCompletedTasks: () => void;
    onReorderTasks: (tasks: Task[]) => void;
}
const PriorityBadge: React.FC<{ priority?: 'low' | 'medium' | 'high' }> = ({ priority }) => {
    const priorityText = priority || 'Normal';
    const colors: Record<string, string> = {
        low: 'bg-blue-500/20 text-blue-400',
        medium: 'bg-yellow-500/20 text-yellow-400',
        high: 'bg-danger/20 text-danger',
        Normal: 'bg-base-300/50 text-muted-content'
    };
    const colorClass = colors[priorityText];

    return (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colorClass}`}>
            {priorityText.charAt(0).toUpperCase() + priorityText.slice(1)}
        </span>
    );
};
export const TaskManagementWidget: React.FC<TaskManagementWidgetProps> = (props) => {
    const [text, setText] = useState('');
    const [assignee, setAssignee] = useState(props.adminUsers[0]?.username || '');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    const handleToggleExpand = (id: number) => {
        setExpandedTaskId(prev => prev === id ? null : id);
    };

    const handleAddTask = () => {
        if (!text || (props.currentUserRole === 'super-admin' && !assignee)) return;
        props.onAddTask({
            text,
            assignee: props.currentUserRole === 'super-admin' ? assignee : props.loggedInAdminUser!.username,
            creator: props.currentUserRole === 'super-admin' ? 'super-admin' : props.loggedInAdminUser!.username,
            priority: priority,
        });
        setText('');
        setPriority('medium');
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('dragging-over');
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('dragging-over');
    };

    const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetTask: Task) => {
        e.preventDefault();
        e.currentTarget.classList.remove('dragging-over');
        if (!draggedTask || draggedTask.id === targetTask.id || draggedTask.status !== targetTask.status) {
            setDraggedTask(null);
            return;
        }

        const currentTasks = [...props.tasks];
        const draggedIndex = currentTasks.findIndex(t => t.id === draggedTask.id);
        const targetIndex = currentTasks.findIndex(t => t.id === targetTask.id);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const [removed] = currentTasks.splice(draggedIndex, 1);
        currentTasks.splice(targetIndex, 0, removed);

        props.onReorderTasks(currentTasks);
        setDraggedTask(null);
    };

    const handleDragEnd = () => {
        setDraggedTask(null);
        // Clean up any stray classes
        document.querySelectorAll('.dragging-over').forEach(el => el.classList.remove('dragging-over'));
    };

    const relevantTasks = props.tasks.filter(task =>
        props.currentUserRole === 'super-admin' || task.assignee === props.loggedInAdminUser?.username
    );

    const pendingRelevantTasks = relevantTasks.filter(t => t.status === 'pending');
    const completedRelevantTasks = relevantTasks.filter(t => t.status === 'completed');
    const isSuperAdmin = props.currentUserRole === 'super-admin';
    
    const renderTaskList = (tasksToRender: Task[], canDrag: boolean) => (
         <ul className="space-y-2">
            {tasksToRender.map(task => (
                <li
                    key={task.id}
                    draggable={canDrag}
                    onDragStart={canDrag ? e => handleDragStart(e, task) : undefined}
                    onDragEnter={canDrag ? handleDragEnter : undefined}
                    onDragLeave={canDrag ? handleDragLeave : undefined}
                    onDragOver={canDrag ? handleDragOver : undefined}
                    onDrop={canDrag ? e => handleDrop(e, task) : undefined}
                    onDragEnd={canDrag ? handleDragEnd : undefined}
                    className={`bg-base-100 rounded-md flex flex-col transition-all duration-300 ${canDrag ? 'cursor-grab' : ''} ${draggedTask?.id === task.id ? 'opacity-30' : ''}`}
                >
                     <div className="p-2 flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={task.status === 'completed'}
                            onChange={() => props.onToggleTaskStatus(task.id)}
                            className="mt-1 flex-shrink-0 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-grow cursor-pointer" onClick={() => handleToggleExpand(task.id)}>
                            <p className={`${task.status === 'completed' ? 'line-through text-muted-content' : 'text-base-content'}`}>{task.text}</p>
                            {isSuperAdmin && (
                                <span className="text-xs font-semibold bg-primary/20 text-primary px-1.5 py-0.5 rounded-md mt-1 inline-block">{task.assignee}</span>
                            )}
                        </div>
                        {isSuperAdmin && (
                            <button
                                onClick={(e) => { e.stopPropagation(); props.onDeleteTask(task.id); }}
                                className="text-danger text-xs flex-shrink-0 opacity-50 hover:opacity-100 p-1"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                     {expandedTaskId === task.id && (
                        <div className="px-4 pb-3 ml-10 border-t border-primary/10 pt-2 space-y-1 animate-fade-in text-xs text-muted-content">
                            <p><strong>Creator:</strong> {task.creator}</p>
                            <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                            <div className="flex items-center gap-2">
                                <strong>Priority:</strong> <PriorityBadge priority={task.priority} />
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <WidgetContainer title="Task Management" onClose={props.onClose}>
             <style>{`.animate-fade-in { animation: fade-in 0.3s ease-out; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .dragging-over { outline: 2px dashed hsl(var(--color-primary)); outline-offset: -2px; }`}</style>
            <div className="space-y-3">
                {(isSuperAdmin || props.currentUserRole === 'admin') && (
                    <div className="space-y-2">
                        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="New task..." className="w-full p-2 bg-base-100 rounded-md"/>
                        <div className="flex gap-2">
                            {isSuperAdmin && (
                                <select value={assignee} onChange={e => setAssignee(e.target.value)} className="p-2 bg-base-100 rounded-md flex-grow">
                                    {props.adminUsers.map(u => <option key={u.id} value={u.username}>{u.username}</option>)}
                                </select>
                            )}
                            <select value={priority} onChange={e => setPriority(e.target.value as any)} className="p-2 bg-base-100 rounded-md flex-grow">
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                            <button onClick={handleAddTask} className="px-3 bg-primary text-primary-content rounded-md font-bold">+</button>
                        </div>
                    </div>
                )}
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {pendingRelevantTasks.length === 0 && completedRelevantTasks.length === 0 && <p className="text-center text-xs text-muted-content py-4">No tasks.</p>}
                    {pendingRelevantTasks.length > 0 && renderTaskList(pendingRelevantTasks, isSuperAdmin)}
                    {completedRelevantTasks.length > 0 && (
                        <>
                            <div className="text-xs text-muted-content font-semibold my-2 border-t border-primary/20 pt-2">Completed</div>
                            {renderTaskList(completedRelevantTasks, false)}
                        </>
                    )}
                </div>
                {props.tasks.some(t => t.status === 'completed') &&
                    <button onClick={props.onClearCompletedTasks} className="text-xs text-muted-content hover:underline w-full text-right mt-2">Clear Completed</button>
                }
            </div>
        </WidgetContainer>
    );
};

// --- 14. GroupManagementWidget ---
interface GroupManagementWidgetProps extends WidgetProps {
    group: Group;
    onSave: (group: Group) => void;
}
export const GroupManagementWidget: React.FC<GroupManagementWidgetProps> = ({ onClose, showToast, group, onSave }) => {
    const [rules, setRules] = useState(group.settings.rules);
    const [maxFileSize, setMaxFileSize] = useState(group.settings.maxFileSizeMB);

    const handleSave = () => {
        onSave({ ...group, settings: { rules, maxFileSizeMB: maxFileSize }});
        showToast('Group settings updated!', 'success');
        onClose();
    };

    return (
        <WidgetContainer title="Group Management" onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-muted-content">Group Rules</label>
                    <textarea 
                        value={rules} 
                        onChange={e => setRules(e.target.value)} 
                        rows={4} 
                        className="w-full p-2 bg-base-100 rounded-md mt-1" 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-content">Max Image Upload Size (MB)</label>
                    <input 
                        type="number" 
                        value={maxFileSize} 
                        onChange={e => setMaxFileSize(Number(e.target.value))} 
                        className="w-full p-2 bg-base-100 rounded-md mt-1" 
                        min="1" 
                        max="10" 
                    />
                </div>
                <button onClick={handleSave} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg">Save Settings</button>
            </div>
        </WidgetContainer>
    );
};


// --- 15. FingerprintApprovalWidget ---
interface FingerprintApprovalWidgetProps extends WidgetProps {
    requests: FingerprintResetRequest[];
    onApprove: (userId: number) => void;
    onDismiss: (userId: number) => void;
}
export const FingerprintApprovalWidget: React.FC<FingerprintApprovalWidgetProps> = ({ onClose, requests, onApprove, onDismiss }) => {
    const pendingRequests = requests.filter(r => r.status === 'pending');
    const approvedRequests = requests.filter(r => r.status === 'approved').sort((a,b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());

    return (
        <WidgetContainer title="Fingerprint Requests" onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-sm text-primary mb-2">Pending Approval</h4>
                    {pendingRequests.length === 0 ? (
                        <p className="text-center text-xs text-muted-content py-2">No pending requests.</p>
                    ) : (
                        <ul className="space-y-2">
                            {pendingRequests.map(req => (
                                <li key={req.userId} className="p-2 bg-base-100 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{req.username}</p>
                                        <p className="text-xs text-muted-content">Requested: {new Date(req.requestedAt).toLocaleString()}</p>
                                    </div>
                                    <button onClick={() => onApprove(req.userId)} className="px-3 py-1 bg-success text-white text-sm rounded">Approve</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {approvedRequests.length > 0 && (
                    <div>
                        <div className="border-t border-primary/20 my-3"></div>
                        <h4 className="font-semibold text-sm text-muted-content mb-2">Recently Approved</h4>
                        <ul className="space-y-2">
                            {approvedRequests.map(req => (
                                <li key={req.userId} className="p-2 bg-base-100 rounded-md flex justify-between items-center opacity-80">
                                    <div>
                                        <p className="font-semibold">{req.username}</p>
                                        <p className="text-xs text-muted-content">Approved</p>
                                    </div>
                                    <button onClick={() => onDismiss(req.userId)} className="px-3 py-1 bg-base-300 text-xs rounded hover:bg-danger/20 hover:text-danger">Dismiss</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </WidgetContainer>
    );
};


// --- 16. MobileServicePage ---
interface MobileServicePageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    mobilePaymentMethods: MobilePaymentMethod[];
    saveMobilePaymentMethods: (methods: MobilePaymentMethod[]) => void;
}
export const MobileServicePage: React.FC<MobileServicePageProps> = ({ isOpen, onClose, showToast, mobilePaymentMethods, saveMobilePaymentMethods }) => {
    // This is a placeholder implementation for the mobile service page.
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center gap-2 sm:gap-4 mb-4">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">Mobile Services</h1>
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold">Coming Soon!</h2>
                    <p className="text-muted-content mt-2">Mobile recharge and offer purchasing will be available here.</p>
                </div>
            </main>
        </div>
    );
};