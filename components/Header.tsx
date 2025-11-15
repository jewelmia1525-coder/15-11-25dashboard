import React, { useMemo, useState, useEffect } from 'react';
import { Role, Page, Message, AdminUser, Transaction } from '../types';
import { ROLE_DETAILS } from '../constants';
import ProfileCard from './ProfileCard';
import LiveClock from './LiveClock';
import VoiceCommandButton from './VoiceCommandButton';

interface HeaderProps {
    role: Role | null;
    onLogout: () => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    messages: Message[];
    currentUserIdentifier: string;
    onOpenMessageCenter: () => void;
    loggedInAdminUser: AdminUser | null;
    onToggleSidebar: () => void;
    isOnline: boolean;
    onRecordTransaction: (prefill: Partial<Transaction>) => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    fingerprintRequestCount: number;
    onOpenFingerprintWidget: () => void;
}

const BellIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const MenuIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ role, onLogout, theme, setTheme, messages, currentUserIdentifier, onOpenMessageCenter, loggedInAdminUser, onToggleSidebar, isOnline, onRecordTransaction, showToast, fingerprintRequestCount, onOpenFingerprintWidget }) => {
    
    const roleDetails = role ? ROLE_DETAILS[role] : ROLE_DETAILS['viewer'];
    const [animateBell, setAnimateBell] = useState(false);

    const displayName = role === 'admin' && loggedInAdminUser ? loggedInAdminUser.username : roleDetails.name;
    const displayPhoto = (role === 'admin' && loggedInAdminUser?.photo) ? loggedInAdminUser.photo : roleDetails.photo;
    const displayBadge = role === 'admin' ? `${loggedInAdminUser?.username}'s Panel` : roleDetails.badge;


    const unreadCount = useMemo(() => {
        if (!currentUserIdentifier) return 0;
        return messages.filter(m => m.recipient === currentUserIdentifier && !m.isRead).length;
    }, [messages, currentUserIdentifier]);

    useEffect(() => {
        if (unreadCount > 0) {
            setAnimateBell(true);
            const timer = setTimeout(() => setAnimateBell(false), 1000); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [unreadCount]);

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    const showMessageCenter = role === 'admin' || role === 'super-admin';
    const canUseVoiceCommands = role === 'admin' || role === 'super-admin';

    return (
        <header>
            <style>{`
                @keyframes bell-shake {
                    0%, 100% { transform: rotate(0); }
                    10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
                    20%, 40%, 60%, 80% { transform: rotate(10deg); }
                }
                .animate-bell-shake {
                    animation: bell-shake 0.8s ease-in-out;
                }
            `}</style>
            <div className="sticky top-0 z-30 p-3 bg-base-100/80 backdrop-blur-sm border-b border-primary/10">
                <div className="flex justify-between items-center">
                    {/* Left side: Profile info */}
                    <div className="flex items-center gap-3">
                         <button onClick={onToggleSidebar} className="p-2 rounded-full text-muted-content hover:bg-base-300/50 hover:text-primary transition-colors">
                            <MenuIcon />
                        </button>
                        <img src={displayPhoto} alt="Profile" className="w-10 h-10 rounded-full border-2 border-primary object-cover" />
                        <div>
                            <h1 className="font-bold text-base-content leading-tight">{displayName}</h1>
                            <p className="text-xs font-semibold uppercase text-primary">{displayBadge}</p>
                        </div>
                    </div>
                    
                    {/* Right side: Controls */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className={`hidden sm:flex items-center gap-2 text-xs font-semibold ${isOnline ? 'text-success' : 'text-danger'}`}>
                            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-danger'}`}></div>
                            <span>{isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                        <LiveClock />
                        <div className="flex items-center gap-2">
                             {canUseVoiceCommands && isOnline && (
                                <VoiceCommandButton
                                    onRecordTransaction={onRecordTransaction}
                                    showToast={showToast}
                                />
                            )}
                             {role === 'super-admin' && fingerprintRequestCount > 0 && (
                                <button onClick={onOpenFingerprintWidget} className="relative p-2 text-muted-content hover:text-primary transition-colors animate-pulse" title={`${fingerprintRequestCount} Pending Fingerprint Resets`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.052 0 .105 0 .158-.002 1.773 0 3.341.386 4.618 1.055M12 11c-.053 0-.106 0-.158-.002-1.773 0-3.341.386-4.618 1.055m0 0v2.016a5.25 5.25 0 004.618 4.933m-4.618-4.933a5.25 5.25 0 014.618-4.933m4.618 2.878V11m0 0a5.25 5.25 0 01-4.618 4.933m4.618-4.933a5.25 5.25 0 00-4.618-4.933" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5a3 3 0 116 0 3 3 0 01-6 0z" />
                                    </svg>
                                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-danger text-white text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                                        {fingerprintRequestCount}
                                    </span>
                                </button>
                            )}
                            {showMessageCenter && (
                                <button onClick={onOpenMessageCenter} className="relative p-2 text-muted-content hover:text-primary transition-colors">
                                    <div className={animateBell ? 'animate-bell-shake' : ''}><BellIcon /></div>
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-danger text-white text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            )}
                            <button 
                                onClick={handleThemeToggle} 
                                className="w-14 h-8 px-1 flex items-center bg-base-300/50 rounded-full cursor-pointer relative transition-colors duration-300 border border-primary/20"
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                <div className={`w-6 h-6 rounded-full bg-primary shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                <span className={`absolute left-1.5 text-sm transition-opacity duration-200 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>☀️</span>
                                <span className={`absolute right-1.5 text-sm transition-opacity duration-200 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>🌙</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;