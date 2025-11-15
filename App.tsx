import React, { useState, useEffect, useCallback, useMemo } from 'react';
// FIX: Import FingerprintResetRequest to use the type for state and props.
import { Transaction, Contact, Role, Page, Widget, AdminUser, Budget, DashboardModule, Message, Task, SavingsGoal, Achievement, MobilePaymentMethod, Group, GameSession, FingerprintResetRequest } from './types';
import { PASSWORDS } from './constants';
import LoginComponent from './components/LoginComponent';
import SuccessPopup from './components/SuccessPopup';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PersonsPage from './components/PersonsPage';
import ToolsPage from './components/ToolsPage';
import FAB from './components/FAB';
import TransactionModal from './components/TransactionModal';
import ContactModal from './components/ContactModal';
import PermissionModal from './components/PermissionModal';
import Toast from './components/Toast';
import ConfirmationModal from './components/ConfirmationModal';
import SignatureModal from './components/SignatureModal';
import EmailSummaryModal from './components/EmailSummaryModal';
import PDFPreview from './components/PDFPreview';
import CursorFollower from './components/CursorFollower';
import BudgetModal from './components/BudgetModal';
import CustomizeDashboardModal from './components/CustomizeDashboardModal';
import CvAtsPage from './components/CvAtsPage';
import ConvertPage from './components/ConvertPage';
import FinanceHelperPage from './components/FinanceHelperPage';
import CvMakerPage from './components/CvMakerPage';
import CvParserPage from './components/CvParserPage';
import ImageEditorPage from './components/ImageEditorPage';
import VideoAnalysisPage from './components/VideoAnalysisPage';
import TtsPage from './components/TtsPage';
import ImageAnalysisPage from './components/ImageAnalysisPage';
import TypingMasterPage from './components/TypingMasterPage';
import MessageCenterModal from './components/MessageCenterModal';
import FingerprintSetupModal from './components/FingerprintSetupModal';
import VideoGeneratorPage from './components/VideoGeneratorPage';
import FinancialChatbotPage from './components/FinancialChatbotPage';
import SidebarNav from './components/SidebarNav';
import SavingsGoalModal from './components/SavingsGoalModal';
import OnboardingModal from './components/OnboardingModal';
import AddFundsModal from './components/AddFundsModal';
import TranslatorPage from './components/TranslatorPage';
import CvCoverLetterPage from './components/CvCoverLetterPage';
import VideoModifyPage from './components/VideoModifyPage';
import GroupCollaborationPage from './components/GroupCollaborationPage';
import { 
    PasswordGeneratorWidget, 
    CalculatorWidget, 
    EmailCvWidget, 
    ThemeManagerWidget, 
    AboutMeWidget,
    DataManagementWidget,
    AdminUserManagementWidget,
    BroadcastWidget,
    ImportPasswordsWidget,
    ProfileSettingsWidget,
    AdminOverviewWidget,
    DataSyncWidget,
    TaskManagementWidget,
    GroupManagementWidget,
    // FIX: Import FingerprintApprovalWidget to be used in renderWidget function.
    FingerprintApprovalWidget,
} from './components/Widgets';
import { MobileServicePage } from './components/Widgets';
import { useGoogleDrive } from './hooks/useGoogleDrive';

declare const html2canvas: any;
declare const jspdf: any;

const imageUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const hexToHslString = (hex: string): { primary: string; focus: string } | null => {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return null;

    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return {
        primary: `${h} ${s}% ${l}%`,
        focus: `${h} ${s}% ${Math.max(0, l - 5)}%`,
    };
};

const initialLayout: DashboardModule[] = [
  { id: 'summary', name: 'Financial Summary', isVisible: true },
  { id: 'group_hub', name: 'Team Collaboration Hub', isVisible: true },
  { id: 'savings_goals', name: 'Savings Goals', isVisible: true },
  { id: 'upcoming_bills', name: 'Upcoming Bills', isVisible: true },
  { id: 'achievements', name: 'Achievements', isVisible: true },
  { id: 'ai_insights', name: 'AI Insights', isVisible: true },
  { id: 'budgets', name: 'Budget Progress', isVisible: true },
  { id: 'visualizations', name: 'Weekly & Category Charts', isVisible: true },
  { id: 'monthly_chart', name: 'Monthly Summary Chart', isVisible: true },
  { id: 'transactions', name: 'Transaction List', isVisible: true },
  { id: 'reports', name: 'Reports and Actions', isVisible: false },
];

const allAchievements: Omit<Achievement, 'achieved'>[] = [
    { id: 'first_transaction', name: 'First Step', description: 'Log your very first transaction.', icon: '💸' },
    { id: 'goal_setter', name: 'Dreamer', description: 'Set your first savings goal.', icon: '🎯' },
    { id: 'budget_master', name: 'Budget Master', description: 'Set a budget for any category.', icon: '📊' },
    { id: 'first_week', name: 'Consistent Coder', description: 'Log transactions for 7 days in a row.', icon: '🗓️' },
];

const App: React.FC = () => {
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [loggedInAdminUser, setLoggedInAdminUser] = useState<AdminUser | null>(null);
    
    // Data states
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [mobilePaymentMethods, setMobilePaymentMethods] = useState<MobilePaymentMethod[]>([]);
    const [signature, setSignature] = useState<string | null>(null);

    const [activePage, setActivePage] = useState<Page>('dashboard');
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successRole, setSuccessRole] = useState<Role | null>(null);
    
    const [isTxModalOpen, setTxModalOpen] = useState(false);
    const [editingTx, setEditingTx] = useState<Transaction | null>(null);
    const [prefillTx, setPrefillTx] = useState<Partial<Transaction> | null>(null);

    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [contactModalType, setContactModalType] = useState<'receivable' | 'payable'>('receivable');

    const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
    const [isBudgetModalOpen, setBudgetModalOpen] = useState(false);
    const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);
    
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [activeWidget, setActiveWidget] = useState<Widget | null>(null);
    const [colorTheme, setColorTheme] = useState<string>('theme-gold');

    const [isSignatureModalOpen, setSignatureModalOpen] = useState(false);
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isGeneratingPdf, setGeneratingPdf] = useState(false);

    // Global App States (not user-specific)
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [availablePasswords, setAvailablePasswords] = useState<string[]>([]);
    const [usedPasswords, setUsedPasswords] = useState<string[]>([]);
    const [fullPasswordPool, setFullPasswordPool] = useState<string[]>([...PASSWORDS]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [adminBroadcast, setAdminBroadcast] = useState<string>('');
    const [viewerBroadcast, setViewerBroadcast] = useState<string>('');
    const [fingerprintResetRequests, setFingerprintResetRequests] = useState<FingerprintResetRequest[]>([]);
    const [group, setGroup] = useState<Group | null>(null);
    
    // Page states
    const [isCvAtsOpen, setCvAtsOpen] = useState(false);
    const [isConvertPageOpen, setConvertPageOpen] = useState(false);
    const [isFinanceHelperOpen, setFinanceHelperOpen] = useState(false);
    const [isCvMakerOpen, setCvMakerOpen] = useState(false);
    const [isCvParserOpen, setCvParserOpen] = useState(false);
    const [isImageEditorOpen, setImageEditorOpen] = useState(false);
    const [isVideoAnalysisOpen, setVideoAnalysisOpen] = useState(false);
    const [isTtsOpen, setTtsOpen] = useState(false);
    const [isImageAnalysisOpen, setImageAnalysisOpen] = useState(false);
    const [isTypingMasterOpen, setTypingMasterOpen] = useState(false);
    const [isVideoGeneratorOpen, setVideoGeneratorOpen] = useState(false);
    const [isFinancialChatbotOpen, setFinancialChatbotOpen] = useState(false);
    const [isTranslatorOpen, setTranslatorOpen] = useState(false);
    const [isMobileServiceOpen, setMobileServiceOpen] = useState(false);
    const [isCvCoverLetterOpen, setCvCoverLetterOpen] = useState(false);
    const [isVideoModifyOpen, setVideoModifyOpen] = useState(false);
    const [isGroupPageOpen, setGroupPageOpen] = useState(false);

    const [isMessageCenterOpen, setMessageCenterOpen] = useState(false);
    const [initialMessageRecipient, setInitialMessageRecipient] = useState<string | null>(null);
    const [isFingerprintModalOpen, setFingerprintModalOpen] = useState(false);

    // New feature states
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isSavingsGoalModalOpen, setSavingsGoalModalOpen] = useState(false);
    const [editingSavingsGoal, setEditingSavingsGoal] = useState<SavingsGoal | null>(null);
    const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
    const [targetGoalForFunds, setTargetGoalForFunds] = useState<SavingsGoal | null>(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [hasFinePointer, setHasFinePointer] = useState(false);
    
    // Responsive state
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const [dashboardLayout, setDashboardLayout] = useState<DashboardModule[]>(initialLayout);

    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const googleDriveUsername = useMemo(() => {
        if (currentUserRole === 'super-admin') return 'super-admin';
        if (currentUserRole === 'admin' && loggedInAdminUser) return `admin_${loggedInAdminUser.username}`;
        return null;
    }, [currentUserRole, loggedInAdminUser]);

    const { isSignedIn, isDriveReady, userProfile, lastBackupDate, signIn, signOut, backupData, restoreData } = useGoogleDrive(showToast, googleDriveUsername);
    
    const getUserScope = useCallback(() => {
        if (currentUserRole === 'super-admin') return 'super_admin';
        if (currentUserRole === 'admin' && loggedInAdminUser) return `admin_${loggedInAdminUser.username}`;
        if (currentUserRole === 'viewer') return 'super_admin'; // Viewers see super-admin's data
        return null;
    }, [currentUserRole, loggedInAdminUser]);

    const getScopedKey = useCallback((key: string) => {
        const scope = getUserScope();
        return scope ? `${scope}_${key}` : null;
    }, [getUserScope]);

    const loadUserData = useCallback(() => {
        const scope = getUserScope();
        if (!scope) return;

        const loadItem = (key: string, setter: Function, defaultValue: any, processor?: (data: any) => any) => {
            try {
                const saved = localStorage.getItem(`${scope}_${key}`);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setter(processor ? processor(parsed) : parsed);
                } else {
                    setter(defaultValue);
                }
            } catch (e) {
                console.error(`Failed to load ${key} from localStorage`, e);
                setter(defaultValue);
            }
        };

        loadItem('transactions', setTransactions, [], (data: any[]) => data.map(tx => ({ ...tx, category: tx.category || 'Other', completed: tx.completed || false })));
        loadItem('contacts', setContacts, []);
        loadItem('budgets', setBudgets, []);
        loadItem('tasks', setTasks, []);
        loadItem('savings_goals', setSavingsGoals, []);
        loadItem('mobile_methods', setMobilePaymentMethods, []);
        loadItem('achievements', setAchievements, allAchievements.map(a => ({ ...a, achieved: false })));
        loadItem('signature', setSignature, null);
        loadItem('dashboard_layout', setDashboardLayout, initialLayout);

    }, [getUserScope]);
    
    // Load global data on initial app load
    useEffect(() => {
        const savedUsers = localStorage.getItem('finance_admin_users');
        const loadedUsers: AdminUser[] = savedUsers ? JSON.parse(savedUsers) : [];
        setAdminUsers(loadedUsers);

        const savedPool = localStorage.getItem('finance_password_pool');
        const loadedPool: string[] = savedPool ? JSON.parse(savedPool) : [...PASSWORDS];
        setFullPasswordPool(loadedPool);
        
        const used = new Set(loadedUsers.map(u => u.password));
        setUsedPasswords(Array.from(used));
        setAvailablePasswords(loadedPool.filter(p => !used.has(p)));
        
        const savedMessages = localStorage.getItem('finance_messages');
        if (savedMessages) setMessages(JSON.parse(savedMessages));
        const savedAdminBroadcast = localStorage.getItem('finance_broadcast_admin');
        if (savedAdminBroadcast) setAdminBroadcast(savedAdminBroadcast);
        const savedViewerBroadcast = localStorage.getItem('finance_broadcast_viewer');
        if (savedViewerBroadcast) setViewerBroadcast(savedViewerBroadcast);
        
        const savedGroup = localStorage.getItem('finance_group');
        if (savedGroup) {
            setGroup(JSON.parse(savedGroup));
        } else {
            const allUserIds = loadedUsers.map(u => u.id);
            const memberIds = [0, ...allUserIds]; 
            setGroup({ id: 'main_group', name: 'Team Hub', members: memberIds.map(userId => ({ userId })), messages: [], games: [], settings: { rules: '1. Be respectful.\\n2. No inappropriate content.\\n3. Keep discussions professional.', maxFileSizeMB: 2 } });
        }
        
        const savedFingerprintRequests = localStorage.getItem('finance_fp_requests');
        if (savedFingerprintRequests) {
            setFingerprintResetRequests(JSON.parse(savedFingerprintRequests));
        }
        
        const savedTheme = localStorage.getItem('finance_theme_mode') as 'light' | 'dark';
        if (savedTheme) setTheme(savedTheme);
        const savedColorTheme = localStorage.getItem('finance_color_theme');
        if (savedColorTheme) setColorTheme(savedColorTheme);
    }, []);

    // Load user-specific data on login
    useEffect(() => {
        if (isLoggedIn) {
            loadUserData();
        }
    }, [isLoggedIn, loadUserData, currentUserRole, loggedInAdminUser]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setMobileNavOpen(false);
        };
        window.addEventListener('resize', handleResize);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
        const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
        setHasFinePointer(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            mediaQuery.removeEventListener('change', handler);
        };
    }, []);
    
     useEffect(() => {
        // Persistent Login Check
        try {
            const savedUser = localStorage.getItem('loggedInUser');
            if (savedUser) {
                const { role, user } = JSON.parse(savedUser);
                if (role && (role === 'viewer' || role === 'super-admin' || (role === 'admin' && user))) {
                    setCurrentUserRole(role);
                    if (user) setLoggedInAdminUser(user);
                    setIsLoggedIn(true);
                }
            }
        } catch (e) {
            console.error("Failed to load user from localStorage", e);
            localStorage.removeItem('loggedInUser');
        }
        const hasOnboarded = localStorage.getItem('finance_onboarded_v1');
        if (!hasOnboarded) {
            setShowOnboarding(true);
        }
    }, []);

    useEffect(() => {
        const checkBillReminders = () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const reminderWindow = 7; 
            contacts.forEach(contact => {
                if (contact.type === 'payable' && contact.dueDate) {
                    const dueDate = new Date(contact.dueDate);
                    const timeDiff = dueDate.getTime() - today.getTime();
                    const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const notificationKey = getScopedKey(`bill_reminder_${contact.id}`);
                    if (!notificationKey) return;
                    const hasNotified = localStorage.getItem(notificationKey);

                    if (daysUntilDue > 0 && daysUntilDue <= reminderWindow && !hasNotified) {
                        showToast(`Reminder: Bill for '${contact.reason}' is due in ${daysUntilDue} day(s).`, 'error');
                        localStorage.setItem(notificationKey, 'true');
                    } else if (daysUntilDue <= 0 && hasNotified) {
                        localStorage.removeItem(notificationKey);
                    }
                }
            });
        };
        if (isLoggedIn) {
            checkBillReminders();
            const intervalId = setInterval(checkBillReminders, 1000 * 60 * 60);
            return () => clearInterval(intervalId);
        }
    }, [contacts, showToast, isLoggedIn, getScopedKey]);

    useEffect(() => {
        if (savingsGoals.length > 0 && transactions.length > 0) {
            setSavingsGoals(prevGoals => {
                return prevGoals.map(goal => {
                    const relevantTx = transactions.filter(tx => tx.savingsGoalId === goal.id && tx.type === 'cost');
                    const savedAmount = relevantTx.reduce((sum, tx) => sum + tx.amount, 0);
                    return { ...goal, savedAmount };
                });
            });
        }
    }, [transactions]);


    useEffect(() => {
        document.body.classList.remove('light-theme');
        if (theme === 'light') document.body.classList.add('light-theme');
        localStorage.setItem('finance_theme_mode', theme);
    }, [theme]);

    useEffect(() => {
        document.body.classList.remove('theme-gold', 'theme-blue', 'theme-green', 'theme-purple', 'theme-red', 'theme-orange', 'theme-teal', 'theme-pink');
        document.body.style.removeProperty('--color-primary');
        document.body.style.removeProperty('--color-primary-focus');
    
        if (colorTheme && colorTheme.startsWith('#')) {
            const hsl = hexToHslString(colorTheme);
            if (hsl) {
                document.body.style.setProperty('--color-primary', hsl.primary);
                document.body.style.setProperty('--color-primary-focus', hsl.focus);
            }
        } else if (colorTheme) {
            document.body.classList.add(colorTheme);
        }
    
        if (colorTheme) localStorage.setItem('finance_color_theme', colorTheme);
    }, [colorTheme]);
    
    useEffect(() => {
        const key = getScopedKey('dashboard_layout');
        if (key) localStorage.setItem(key, JSON.stringify(dashboardLayout));
    }, [dashboardLayout, getScopedKey]);
    
    const currentUserIdentifier = useMemo(() => currentUserRole === 'super-admin' ? 'super-admin' : loggedInAdminUser?.username, [currentUserRole, loggedInAdminUser]);

    const handleLogin = (username: string, password?: string, isFingerprintLogin = false): boolean => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password?.trim();

        let role: Role | null = null;
        let adminUserToSet: AdminUser | null = null;
        
        if (trimmedUsername.toLowerCase() === 'jewel' && trimmedPassword === 'Jewel0099') {
            role = 'super-admin';
        } else if (trimmedPassword === '12345') {
            role = 'viewer';
        } else {
            let foundUser: AdminUser | undefined;
            if (isFingerprintLogin) {
                 foundUser = adminUsers.find(user => user.username.toLowerCase() === trimmedUsername.toLowerCase());
            } else if (trimmedPassword) {
                foundUser = adminUsers.find(user => user.username.toLowerCase() === trimmedUsername.toLowerCase() && user.password === trimmedPassword);
                if (!foundUser && trimmedPassword.length >= 6) foundUser = adminUsers.find(user => user.password === trimmedPassword);
            }

            if (foundUser) {
                role = 'admin';
                adminUserToSet = foundUser;
            }
        }

        if (role) {
            setCurrentUserRole(role);
            if (role === 'admin' && adminUserToSet) {
                setLoggedInAdminUser(adminUserToSet);
                if (!adminUserToSet.fingerprintId) {
                    setFingerprintModalOpen(true);
                }
            }
            setSuccessRole(role);
            setIsLoggedIn(true);
            setShowSuccess(true);
            localStorage.setItem('loggedInUser', JSON.stringify({ role, user: adminUserToSet }));
            setTimeout(() => setShowSuccess(false), 2000);
            return true;
        }
        return false;
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUserRole(null);
        setLoggedInAdminUser(null);
        // Clear user-specific state
        setTransactions([]);
        setContacts([]);
        setBudgets([]);
        setTasks([]);
        setSavingsGoals([]);
        setAchievements([]);
        setMobilePaymentMethods([]);
        setSignature(null);

        localStorage.removeItem('loggedInUser');
        if (isSignedIn) {
            signOut();
        }
    };

    const handleToggleSidebar = () => {
        if (isMobile) {
            setMobileNavOpen(!isMobileNavOpen);
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

    const checkPermission = useCallback(() => {
        if (currentUserRole === 'viewer') {
            setPermissionModalOpen(true);
            return false;
        }
        return true;
    }, [currentUserRole]);
    
    // --- Generic Save Function ---
    const saveData = useCallback((key: string, data: any) => {
        const scopedKey = getScopedKey(key);
        if(scopedKey) localStorage.setItem(scopedKey, JSON.stringify(data));
    }, [getScopedKey]);

    // --- Data Saving Wrappers ---
    const saveTransactions = (newTransactions: Transaction[]) => { setTransactions(newTransactions); saveData('transactions', newTransactions); checkAchievements(newTransactions, savingsGoals); };
    const saveContacts = (newContacts: Contact[]) => { setContacts(newContacts); saveData('contacts', newContacts); };
    const saveBudgets = (newBudgets: Budget[]) => { setBudgets(newBudgets); saveData('budgets', newBudgets); };
    const saveTasks = (newTasks: Task[]) => { setTasks(newTasks); saveData('tasks', newTasks); };
    const saveMobilePaymentMethods = (methods: MobilePaymentMethod[]) => { setMobilePaymentMethods(methods); saveData('mobile_methods', methods); };
    const saveSavingsGoals = (newGoals: SavingsGoal[]) => { setSavingsGoals(newGoals); saveData('savings_goals', newGoals); };
    const saveAchievements = (newAchievements: Achievement[]) => { setAchievements(newAchievements); saveData('achievements', newAchievements); };
    
    // Global Data Savers (not user-scoped)
    const saveMessages = (newMessages: Message[]) => { setMessages(newMessages); localStorage.setItem('finance_messages', JSON.stringify(newMessages)); };
    const saveGroup = useCallback((updatedGroup: Group) => { setGroup(updatedGroup); localStorage.setItem('finance_group', JSON.stringify(updatedGroup)); }, []);
    const saveFingerprintResetRequests = (requests: FingerprintResetRequest[]) => { setFingerprintResetRequests(requests); localStorage.setItem('finance_fp_requests', JSON.stringify(requests)); };
    const saveAdminUsersAndPasswords = (users: AdminUser[], pool: string[]) => {
        setAdminUsers(users);
        setFullPasswordPool(pool);
        const used = new Set(users.map(u => u.password));
        setUsedPasswords(Array.from(used));
        setAvailablePasswords(pool.filter(p => !used.has(p)));
        localStorage.setItem('finance_admin_users', JSON.stringify(users));
        localStorage.setItem('finance_password_pool', JSON.stringify(pool));
    };

    const handleSendMessage = (message: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => {
        const newMessage: Message = { ...message, id: Date.now(), timestamp: new Date().toISOString(), isRead: false };
        saveMessages([...messages, newMessage]);
    };

    const handleMarkConversationAsRead = (participant: string) => {
        if (!currentUserIdentifier) return;
        const updatedMessages = messages.map(msg => 
            (msg.recipient === currentUserIdentifier && msg.sender === participant && !msg.isRead) ? { ...msg, isRead: true } : msg
        );
        saveMessages(updatedMessages);
    };

    const handleOpenMessageCenterWithUser = (username: string) => { setInitialMessageRecipient(username); setMessageCenterOpen(true); };
    const handleSetAdminBroadcast = (text: string) => { setAdminBroadcast(text); localStorage.setItem('finance_broadcast_admin', text); };
    const handleSetViewerBroadcast = (text: string) => { setViewerBroadcast(text); localStorage.setItem('finance_broadcast_viewer', text); };

    const checkAchievements = useCallback((currentTx: Transaction[], currentGoals: SavingsGoal[]) => {
        let changed = false;
        const updatedAchievements = achievements.map(ach => {
            if (ach.achieved) return ach;
            let justAchieved = false;
            if(ach.id === 'first_transaction' && currentTx.length > 0) justAchieved = true;
            if(ach.id === 'goal_setter' && currentGoals.length > 0) justAchieved = true;
            if(ach.id === 'budget_master' && budgets.length > 0) justAchieved = true;

            if (justAchieved) {
                changed = true;
                showToast(`Achievement Unlocked: ${ach.name}!`, 'success');
                return { ...ach, achieved: true };
            }
            return ach;
        });
        if (changed) saveAchievements(updatedAchievements);
    }, [achievements, budgets.length, showToast]);

    const handleAddAdminUser = (newUser: Omit<AdminUser, 'id'>) => {
        const newAdmin: AdminUser = { ...newUser, id: Date.now() };
        const updatedUsers = [...adminUsers, newAdmin];
        saveAdminUsersAndPasswords(updatedUsers, fullPasswordPool);
        if (group) {
            const updatedGroup = { ...group, members: [...group.members, { userId: newAdmin.id }]};
            saveGroup(updatedGroup);
        }
        showToast('New admin user assigned!', 'success');
    };

    const handleUpdateAdminUser = (updatedUser: AdminUser) => {
        const updatedUsers = adminUsers.map(user => user.id === updatedUser.id ? updatedUser : user);
        saveAdminUsersAndPasswords(updatedUsers, fullPasswordPool);
        if (loggedInAdminUser && loggedInAdminUser.id === updatedUser.id) {
            setLoggedInAdminUser(updatedUser);
        }
        showToast('Admin user updated!', 'success');
    };
    
    const handleProfileUpdate = (updatedData: Partial<AdminUser>) => {
        if (!loggedInAdminUser) return;
        const { id, password, ...safeUpdateData } = updatedData;
        const updatedUser = { ...loggedInAdminUser, ...safeUpdateData };
        handleUpdateAdminUser(updatedUser);
    };

    const handleImportPasswords = (newPasswords: string[]) => {
        const updatedPool = [...new Set([...fullPasswordPool, ...newPasswords])];
        saveAdminUsersAndPasswords(adminUsers, updatedPool);
        showToast(`${newPasswords.length} new passwords imported!`, 'success');
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
        const newTask: Task = { ...task, id: Date.now(), createdAt: new Date().toISOString(), status: 'pending' };
        saveTasks([...tasks, newTask]);
        showToast('Task created successfully!', 'success');
    };

    const handleDeleteTask = (id: number) => { saveTasks(tasks.filter(task => task.id !== id)); showToast('Task deleted!', 'error'); };
    const handleToggleTaskStatus = (id: number) => { saveTasks(tasks.map(task => task.id === id ? { ...task, status: 'completed' } : task)); showToast('Task marked as complete!', 'success'); };
    const handleClearCompletedTasks = () => { setConfirmModal({ isOpen: true, title: 'Clear Completed Tasks', message: 'Are you sure?', onConfirm: () => { saveTasks(tasks.filter(t => t.status !== 'completed')); showToast('Completed tasks cleared!'); setConfirmModal(c => ({...c, isOpen: false})); } }); };
    const handleRequestFingerprintReset = () => { if (!loggedInAdminUser) return; if (fingerprintResetRequests.some(req => req.userId === loggedInAdminUser.id && req.status === 'pending')) { showToast('You already have a pending reset request.', 'error'); setFingerprintModalOpen(false); return; } const newRequest: FingerprintResetRequest = { userId: loggedInAdminUser.id, username: loggedInAdminUser.username, status: 'pending', requestedAt: new Date().toISOString() }; saveFingerprintResetRequests([...fingerprintResetRequests, newRequest]); showToast('Fingerprint reset requested. Super-admin approval needed.', 'success'); setFingerprintModalOpen(false); };
    const handleCompleteFingerprintReset = (userId: number) => { saveFingerprintResetRequests(fingerprintResetRequests.filter(req => !(req.userId === userId && req.status === 'approved'))); };
    const handleApproveFingerprintReset = (userId: number) => { saveFingerprintResetRequests(fingerprintResetRequests.map(req => req.userId === userId ? { ...req, status: 'approved' as 'approved' } : req)); const user = adminUsers.find(u => u.id === userId); if (user) { handleSendMessage({ sender: 'super-admin', recipient: user.username, text: 'Your fingerprint reset request has been approved. Please go to Profile Settings to set up your new fingerprint login.' }); } showToast('Reset request approved!', 'success'); };
    const handleDismissFingerprintRequest = (userId: number) => { saveFingerprintResetRequests(fingerprintResetRequests.filter(req => req.userId !== userId)); showToast('Approved request dismissed.', 'success'); };
    const handleOpenFingerprintWidget = () => { setActivePage('tools'); setActiveWidget('fingerprintApproval'); };
    const handleOpenTxModal = (tx: Transaction | null = null, prefill: Partial<Transaction> | null = null) => { if (!checkPermission()) return; setEditingTx(tx); setPrefillTx(prefill); setTxModalOpen(true); };

    const handleSaveTransaction = (tx: Omit<Transaction, 'id' | 'date' | 'completed'> & { id?: number }) => {
        let updatedTransactions: Transaction[];
        if (tx.id) {
            updatedTransactions = transactions.map(t => t.id === tx.id ? { ...t, ...tx, amount: Number(tx.amount) } : t);
        } else {
            const newTx: Transaction = { ...tx, id: Date.now(), date: new Date().toISOString(), amount: Number(tx.amount), category: tx.category || 'Other', completed: false };
            updatedTransactions = [...transactions, newTx];
        }
        saveTransactions(updatedTransactions);
        showToast(tx.id ? 'Transaction updated' : 'Transaction saved');
        if (tx.type === 'cost' && !tx.id) {
            const budget = budgets.find(b => b.category === tx.category);
            if (budget && budget.amount > 0) {
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                const currentMonthSpending = updatedTransactions.filter(t => t.type === 'cost' && t.category === tx.category && new Date(t.date) >= startOfMonth && new Date(t.date) <= endOfMonth).reduce((sum, t) => sum + t.amount, 0);
                const spendingPercentage = (currentMonthSpending / budget.amount) * 100;
                const notificationKey = getScopedKey(`budget_alert_${now.getFullYear()}_${now.getMonth()}_${tx.category}`);
                if (notificationKey) {
                    const hasNotified = localStorage.getItem(notificationKey);
                    if (spendingPercentage >= 90 && !hasNotified) { showToast(`Budget Alert: You've spent ${Math.round(spendingPercentage)}% of your budget for ${tx.category}.`, 'error'); localStorage.setItem(notificationKey, 'true'); } 
                    else if (spendingPercentage < 90 && hasNotified) { localStorage.removeItem(notificationKey); }
                }
            }
        }
        setTxModalOpen(false);
        setPrefillTx(null);
    };

    const handleDeleteTransaction = (id: number) => { if (!checkPermission()) return; setConfirmModal({ isOpen: true, title: 'Delete Transaction', message: 'Are you sure?', onConfirm: () => { saveTransactions(transactions.filter(t => t.id !== id)); showToast('Transaction deleted', 'error'); setConfirmModal(c => ({...c, isOpen: false})); } }); };
    const handleToggleTransactionCompleted = (id: number) => { if (!checkPermission()) return; saveTransactions(transactions.map(tx => tx.id === id ? { ...tx, completed: !tx.completed } : tx)); showToast(`Transaction status updated`, 'success'); };
    const handleOpenContactModal = (type: 'receivable' | 'payable', contact: Contact | null = null) => { if (!checkPermission()) return; setContactModalType(type); setEditingContact(contact); setContactModalOpen(true); };
    const handleSaveContact = (contact: Omit<Contact, 'id' | 'date'> & { id?: number }) => { if (contact.id) { saveContacts(contacts.map(c => c.id === contact.id ? { ...c, ...contact, amount: Number(contact.amount) } as Contact : c)); showToast('Person updated'); } else { saveContacts([...contacts, { ...contact, id: Date.now(), date: new Date().toISOString(), amount: Number(contact.amount) }]); showToast('Person saved'); } setContactModalOpen(false); };
    const handleDeleteContact = (id: number) => { if (!checkPermission()) return; setConfirmModal({ isOpen: true, title: 'Delete Person', message: 'Are you sure?', onConfirm: () => { saveContacts(contacts.filter(c => c.id !== id)); showToast('Person deleted', 'error'); setConfirmModal(c => ({...c, isOpen: false})); } }); };
    const handleSaveBudgets = (updatedBudgets: Budget[]) => { saveBudgets(updatedBudgets); showToast('Budgets saved successfully!'); setBudgetModalOpen(false); };
    const handleWidgetSelect = (widget: Widget) => { setActiveWidget(prev => prev === widget ? null : widget); };
    const handleSaveSignature = (imgBase64: string) => { if (currentUserRole === 'admin') { handleProfileUpdate({ signature: imgBase64 }); } else { setSignature(imgBase64); const key = getScopedKey('signature'); if (key) localStorage.setItem(key, imgBase64); } setSignatureModalOpen(false); showToast('Signature saved!'); };
    
    const handleGeneratePdf = () => {
        showToast('Generating PDF...', 'success');
        setGeneratingPdf(true);
        setTimeout(() => {
            const { jsPDF } = jspdf;
            const reportElement = document.getElementById('pdf-report');
            if (reportElement) {
                html2canvas(reportElement, { scale: 2, useCORS: true }).then((canvas: any) => {
                    const imgData = canvas.toDataURL('image/jpeg', 0.7);
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth(); const canvasAspectRatio = canvas.width / canvas.height; const scaledHeight = pdfWidth / canvasAspectRatio; let position = 0; let heightLeft = scaledHeight; const pageHeight = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight);
                    heightLeft -= pageHeight;
                    while (heightLeft > 0) { position -= pageHeight; pdf.addPage(); pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, scaledHeight); heightLeft -= pageHeight; }
                    pdf.save('finance-summary.pdf');
                    setGeneratingPdf(false);
                }).catch((err: any) => { console.error(err); showToast('Error generating PDF', 'error'); setGeneratingPdf(false); });
            } else { showToast('Could not find report element', 'error'); setGeneratingPdf(false); }
        }, 500);
    };
    
    const handleBackupToFile = () => {
        if (!checkPermission()) return;
        const dataToBackup = { transactions, contacts, budgets, tasks, savingsGoals, achievements, mobilePaymentMethods, signature, dashboardLayout };
        const blob = new Blob([JSON.stringify(dataToBackup, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `finance_dashboard_backup_${getUserScope()}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(link.href);
        showToast('Local backup downloaded!', 'success');
    };

    const handleRestoreFromFile = (restoredData: any) => {
        if (!checkPermission()) return;
        setConfirmModal({
            isOpen: true,
            title: 'Restore Data From File',
            message: 'Are you sure? This will overwrite ALL your current data.',
            onConfirm: () => {
                if (restoredData) {
                    saveTransactions(restoredData.transactions || []);
                    saveContacts(restoredData.contacts || []);
                    saveBudgets(restoredData.budgets || []);
                    saveTasks(restoredData.tasks || []);
                    saveSavingsGoals(restoredData.savingsGoals || []);
                    saveAchievements(restoredData.achievements || allAchievements.map(a => ({...a, achieved: false})));
                    saveMobilePaymentMethods(restoredData.mobilePaymentMethods || []);
                    setDashboardLayout(restoredData.dashboardLayout || initialLayout);
                    const newSignature = restoredData.signature || null; setSignature(newSignature); const key = getScopedKey('signature'); if(key && newSignature) localStorage.setItem(key, newSignature);
                    showToast('All data has been restored from file.', 'success');
                }
                setConfirmModal(c => ({...c, isOpen: false}));
            }
        });
    };
    
    const handleBackup = async () => { if (!checkPermission()) return; const dataToBackup = { transactions, contacts, budgets, tasks, savingsGoals, achievements, mobilePaymentMethods, signature, dashboardLayout }; await backupData(dataToBackup); };
    const handleRestore = () => { if (!checkPermission()) return; setConfirmModal({ isOpen: true, title: 'Restore from Google Drive', message: 'Are you sure? This will overwrite ALL your current data.', onConfirm: async () => { setConfirmModal(c => ({...c, isOpen: false})); const restored = await restoreData(); if (restored) { saveTransactions(restored.transactions || []); saveContacts(restored.contacts || []); saveBudgets(restored.budgets || []); saveTasks(restored.tasks || []); saveSavingsGoals(restored.savingsGoals || []); saveAchievements(restored.achievements || allAchievements.map(a => ({...a, achieved: false}))); saveMobilePaymentMethods(restored.mobilePaymentMethods || []); setDashboardLayout(restored.dashboardLayout || initialLayout); const newSignature = restored.signature || null; setSignature(newSignature); const key = getScopedKey('signature'); if(key && newSignature) localStorage.setItem(key, newSignature); showToast('Data restored.', 'success'); } } }); };
    const handleSaveSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'savedAmount' | 'createdAt'> & { id?: number }) => { if (goal.id) { saveSavingsGoals(savingsGoals.map(g => g.id === goal.id ? { ...g, ...goal } : g)); showToast('Savings goal updated!'); } else { saveSavingsGoals([...savingsGoals, { ...goal, id: Date.now(), savedAmount: 0, createdAt: new Date().toISOString() }]); showToast('New savings goal created!'); } checkAchievements(transactions, savingsGoals); setSavingsGoalModalOpen(false); };
    const handleDeleteSavingsGoal = (id: number) => { setConfirmModal({ isOpen: true, title: 'Delete Savings Goal', message: 'Are you sure?', onConfirm: () => { saveTransactions(transactions.map(tx => tx.savingsGoalId === id ? { ...tx, savingsGoalId: undefined } : tx)); saveSavingsGoals(savingsGoals.filter(g => g.id !== id)); showToast('Savings goal deleted.', 'error'); setConfirmModal(c => ({...c, isOpen: false})); } }); };
    const handleOpenSavingsGoalModal = (goal: SavingsGoal | null = null) => { setEditingSavingsGoal(goal); setSavingsGoalModalOpen(true); };
    const handleOpenAddFundsModal = (goal: SavingsGoal) => { setTargetGoalForFunds(goal); setAddFundsModalOpen(true); };
    const closeAddFundsModalAndOpenTx = (goal: SavingsGoal, amount?: number) => { setAddFundsModalOpen(false); setTargetGoalForFunds(null); handleOpenTxModal(null, { type: 'cost', category: 'Savings', savingsGoalId: goal.id, details: `Contribution to ${goal.name}`, amount: amount }); };
    const handleOnboarded = () => { localStorage.setItem('finance_onboarded_v1', 'true'); setShowOnboarding(false); }

    const renderWidget = () => {
        switch (activeWidget) {
            case 'password': return <PasswordGeneratorWidget onClose={() => setActiveWidget(null)} showToast={showToast} availablePasswords={availablePasswords} onAddAdminUser={handleAddAdminUser} />;
            case 'calculator': return <CalculatorWidget onClose={() => setActiveWidget(null)} />;
            case 'email': return <EmailCvWidget onClose={() => setActiveWidget(null)} showToast={showToast} isOnline={isOnline} />;
            case 'theme': return <ThemeManagerWidget onClose={() => setActiveWidget(null)} currentTheme={theme} setTheme={setTheme} currentColorTheme={colorTheme} setColorTheme={setColorTheme} showToast={showToast} />;
            // FIX: Removed 'role' prop as it is not defined on AboutMeWidget.
            case 'about': return <AboutMeWidget onClose={() => setActiveWidget(null)} />;
            // FIX: Added missing 'onImport' prop to DataManagementWidget to satisfy its required props. A dummy function is passed as it's not currently used.
            case 'data': return <DataManagementWidget onClose={() => setActiveWidget(null)} showToast={showToast} onBackupToFile={handleBackupToFile} onRestoreFromFile={handleRestoreFromFile} onImport={() => {}} />;
            case 'adminManagement': return <AdminUserManagementWidget onClose={() => setActiveWidget(null)} showToast={showToast} adminUsers={adminUsers} onUpdateUser={handleUpdateAdminUser} onSendMessageToUser={handleOpenMessageCenterWithUser} />;
            case 'broadcast': return <BroadcastWidget onClose={() => setActiveWidget(null)} showToast={showToast} onSetAdminBroadcast={handleSetAdminBroadcast} onSetViewerBroadcast={handleSetViewerBroadcast} currentAdminBroadcast={adminBroadcast} currentViewerBroadcast={viewerBroadcast} />;
            case 'importPasswords': return <ImportPasswordsWidget onClose={() => setActiveWidget(null)} showToast={showToast} onImport={handleImportPasswords} existingPasswords={fullPasswordPool} />;
            case 'profileSettings': return loggedInAdminUser && <ProfileSettingsWidget onClose={() => setActiveWidget(null)} showToast={showToast} currentUser={loggedInAdminUser} onUpdateProfile={handleProfileUpdate} onOpenFingerprintSetup={() => setFingerprintModalOpen(true)} />;
            case 'adminOverview': return <AdminOverviewWidget onClose={() => setActiveWidget(null)} adminUsers={adminUsers} />;
            case 'dataSync': return <DataSyncWidget onClose={() => setActiveWidget(null)} isSignedIn={isSignedIn} isDriveReady={isDriveReady} userProfile={userProfile} lastBackupDate={lastBackupDate} signIn={signIn} signOut={signOut} onBackup={handleBackup} onRestore={handleRestore} isOnline={isOnline} />;
            case 'taskManagement': return <TaskManagementWidget onClose={() => setActiveWidget(null)} showToast={showToast} tasks={tasks} adminUsers={adminUsers} currentUserRole={currentUserRole} loggedInAdminUser={loggedInAdminUser} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} onToggleTaskStatus={handleToggleTaskStatus} onClearCompletedTasks={handleClearCompletedTasks} onReorderTasks={saveTasks} />;
            case 'groupManagement': return group && <GroupManagementWidget onClose={() => setActiveWidget(null)} showToast={showToast} group={group} onSave={saveGroup} />;
            case 'fingerprintApproval': return <FingerprintApprovalWidget onClose={() => setActiveWidget(null)} showToast={showToast} requests={fingerprintResetRequests} onApprove={handleApproveFingerprintReset} onDismiss={handleDismissFingerprintRequest} />;
            default: return null;
        }
    };


    if (!isLoggedIn) {
        return (
            <>
                <LoginComponent onLogin={handleLogin} adminUsers={adminUsers} showToast={showToast} />
                {hasFinePointer && !isMobile && <CursorFollower />}
            </>
        );
    }

    return (
        <div className={`role-${currentUserRole} min-h-screen transition-all duration-300 ${isMobile ? '' : (isSidebarCollapsed ? 'pl-20' : 'pl-64')}`}>
            {hasFinePointer && !isMobile && <CursorFollower />}
            {showSuccess && successRole && <SuccessPopup role={successRole} adminUser={loggedInAdminUser} />}
            <Toast message={toast?.message} type={toast?.type} isVisible={!!toast} />
            <PermissionModal isOpen={isPermissionModalOpen} onClose={() => setPermissionModalOpen(false)} />
            <OnboardingModal isOpen={showOnboarding} onClose={handleOnboarded} />
            
            {isMobile && isMobileNavOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileNavOpen(false)}></div>
            )}

            <SidebarNav isCollapsed={isSidebarCollapsed} activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} onOpenCustomizeModal={() => setCustomizeModalOpen(true)} isMobile={isMobile} isMobileNavOpen={isMobileNavOpen} onCloseMobileNav={() => setMobileNavOpen(false)} />
            
            <Header role={currentUserRole} onLogout={handleLogout} theme={theme} setTheme={setTheme} messages={messages} currentUserIdentifier={currentUserIdentifier || ''} onOpenMessageCenter={() => setMessageCenterOpen(true)} loggedInAdminUser={loggedInAdminUser} onToggleSidebar={handleToggleSidebar} isOnline={isOnline} onRecordTransaction={handleOpenTxModal} showToast={showToast} fingerprintRequestCount={fingerprintResetRequests.filter(r => r.status === 'pending').length} onOpenFingerprintWidget={handleOpenFingerprintWidget} />

            {renderWidget()}
            
            <CustomizeDashboardModal isOpen={isCustomizeModalOpen} onClose={() => setCustomizeModalOpen(false)} layout={dashboardLayout} setLayout={setDashboardLayout} />
            
            {(currentUserRole === 'admin' || currentUserRole === 'super-admin') && (
                <MessageCenterModal isOpen={isMessageCenterOpen} onClose={() => { setMessageCenterOpen(false); setInitialMessageRecipient(null); }} messages={messages} currentUserIdentifier={currentUserIdentifier!} onSendMessage={handleSendMessage} onMarkConversationAsRead={handleMarkConversationAsRead} role={currentUserRole!} showToast={showToast} initialSelectedUser={initialMessageRecipient} adminUsers={adminUsers} />
            )}
            
            {loggedInAdminUser && (
                <FingerprintSetupModal isOpen={isFingerprintModalOpen} onClose={() => setFingerprintModalOpen(false)} showToast={showToast} currentUser={loggedInAdminUser} onUpdateUser={handleUpdateAdminUser} resetRequests={fingerprintResetRequests} onRequestReset={handleRequestFingerprintReset} onCompleteReset={handleCompleteFingerprintReset} />
            )}

            <main className="relative z-0 pt-6 pb-24 px-4 sm:px-6">
                {activePage === 'dashboard' ? (
                    <Dashboard transactions={transactions} contacts={contacts} budgets={budgets} savingsGoals={savingsGoals} achievements={achievements} group={group} adminUsers={adminUsers} onOpenGroupPage={() => setGroupPageOpen(true)} onEditTransaction={tx => handleOpenTxModal(tx)} onDeleteTransaction={handleDeleteTransaction} onToggleCompleted={handleToggleTransactionCompleted} onAddTransaction={() => handleOpenTxModal()} onEditContact={handleOpenContactModal} onDeleteContact={handleDeleteContact} onAddReceivable={() => handleOpenContactModal('receivable')} onAddPayable={() => handleOpenContactModal('payable')} onGeneratePdf={handleGeneratePdf} onOpenEmailModal={() => setEmailModalOpen(true)} onOpenSignatureModal={() => setSignatureModalOpen(true)} onOpenBudgetModal={() => setBudgetModalOpen(true)} onOpenSavingsGoalModal={handleOpenSavingsGoalModal} onOpenAddFundsModal={handleOpenAddFundsModal} onDeleteSavingsGoal={handleDeleteSavingsGoal} dashboardLayout={dashboardLayout} currentUserRole={currentUserRole} adminBroadcast={adminBroadcast} viewerBroadcast={viewerBroadcast} isOnline={isOnline} />
                ) : activePage === 'persons' ? (
                    <PersonsPage contacts={contacts} onEditContact={handleOpenContactModal} onDeleteContact={handleDeleteContact} onAddReceivable={() => handleOpenContactModal('receivable')} onAddPayable={() => handleOpenContactModal('payable')} />
                ) : (
                    <ToolsPage onOpenCvAts={() => setCvAtsOpen(true)} onOpenConvertPage={() => setConvertPageOpen(true)} onOpenFinanceHelper={() => setFinanceHelperOpen(true)} onOpenCvMaker={() => setCvMakerOpen(true)} onOpenCvParser={() => setCvParserOpen(true)} onOpenImageEditor={() => setImageEditorOpen(true)} onOpenVideoAnalysis={() => setVideoAnalysisOpen(true)} onOpenTts={() => setTtsOpen(true)} onOpenImageAnalysis={() => setImageAnalysisOpen(true)} onOpenTypingMaster={() => setTypingMasterOpen(true)} onOpenVideoGenerator={() => setVideoGeneratorOpen(true)} onOpenFinancialChatbot={() => setFinancialChatbotOpen(true)} onOpenTranslator={() => setTranslatorOpen(true)} onOpenMobileService={() => setMobileServiceOpen(true)} onOpenCvCoverLetter={() => setCvCoverLetterOpen(true)} onOpenVideoModify={() => setVideoModifyOpen(true)} onWidgetSelect={handleWidgetSelect} role={currentUserRole} isOnline={isOnline} />
                )}
            </main>
            
            <CvAtsPage isOpen={isCvAtsOpen} onClose={() => setCvAtsOpen(false)} showToast={showToast} />
            <ConvertPage isOpen={isConvertPageOpen} onClose={() => setConvertPageOpen(false)} showToast={showToast} />
            <FinanceHelperPage isOpen={isFinanceHelperOpen} onClose={() => setFinanceHelperOpen(false)} showToast={showToast} />
            <CvMakerPage isOpen={isCvMakerOpen} onClose={() => setCvMakerOpen(false)} showToast={showToast} />
            <CvParserPage isOpen={isCvParserOpen} onClose={() => setCvParserOpen(false)} showToast={showToast} />
            <ImageEditorPage isOpen={isImageEditorOpen} onClose={() => setImageEditorOpen(false)} showToast={showToast} />
            <VideoAnalysisPage isOpen={isVideoAnalysisOpen} onClose={() => setVideoAnalysisOpen(false)} showToast={showToast} />
            <TtsPage isOpen={isTtsOpen} onClose={() => setTtsOpen(false)} showToast={showToast} />
            <ImageAnalysisPage isOpen={isImageAnalysisOpen} onClose={() => setImageAnalysisOpen(false)} showToast={showToast} />
            <TypingMasterPage isOpen={isTypingMasterOpen} onClose={() => setTypingMasterOpen(false)} showToast={showToast} role={currentUserRole} />
            <VideoGeneratorPage isOpen={isVideoGeneratorOpen} onClose={() => setVideoGeneratorOpen(false)} showToast={showToast} />
            <FinancialChatbotPage isOpen={isFinancialChatbotOpen} onClose={() => setFinancialChatbotOpen(false)} showToast={showToast} transactions={transactions} contacts={contacts} budgets={budgets} />
            <TranslatorPage isOpen={isTranslatorOpen} onClose={() => setTranslatorOpen(false)} showToast={showToast} />
            <MobileServicePage isOpen={isMobileServiceOpen} onClose={() => setMobileServiceOpen(false)} showToast={showToast} mobilePaymentMethods={mobilePaymentMethods} saveMobilePaymentMethods={saveMobilePaymentMethods} />
            <CvCoverLetterPage isOpen={isCvCoverLetterOpen} onClose={() => setCvCoverLetterOpen(false)} showToast={showToast} />
            <VideoModifyPage isOpen={isVideoModifyOpen} onClose={() => setVideoModifyOpen(false)} showToast={showToast} />
            {group && (currentUserRole === 'super-admin' || loggedInAdminUser) && (
                <GroupCollaborationPage isOpen={isGroupPageOpen} onClose={() => setGroupPageOpen(false)} showToast={showToast} group={group} onSave={saveGroup} currentUser={currentUserRole === 'super-admin' ? { id: 0, username: 'super-admin', email: '', mobile: '', password: '' } : loggedInAdminUser!} allUsers={adminUsers} currentUserRole={currentUserRole} />
            )}

            {activePage === 'dashboard' && <FAB onClick={() => handleOpenTxModal(null)} />}
            {isTxModalOpen && <TransactionModal isOpen={isTxModalOpen} onClose={() => setTxModalOpen(false)} onSave={handleSaveTransaction} transaction={editingTx} prefillData={prefillTx} savingsGoals={savingsGoals} />}
            {isContactModalOpen && <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} onSave={handleSaveContact} contact={editingContact} type={contactModalType} />}
            {isBudgetModalOpen && <BudgetModal isOpen={isBudgetModalOpen} onClose={() => setBudgetModalOpen(false)} onSave={handleSaveBudgets} currentBudgets={budgets} />}
            {isSavingsGoalModalOpen && <SavingsGoalModal isOpen={isSavingsGoalModalOpen} onClose={() => setSavingsGoalModalOpen(false)} onSave={handleSaveSavingsGoal} goal={editingSavingsGoal} />}
            {isAddFundsModalOpen && targetGoalForFunds && <AddFundsModal isOpen={isAddFundsModalOpen} onClose={() => setAddFundsModalOpen(false)} onConfirm={closeAddFundsModalAndOpenTx} goal={targetGoalForFunds} />}
            <ConfirmationModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })} onConfirm={confirmModal.onConfirm} title={confirmModal.title}><p className="font-bangla text-base-content">{confirmModal.message}</p></ConfirmationModal>
            {isSignatureModalOpen && <SignatureModal isOpen={isSignatureModalOpen} onClose={() => setSignatureModalOpen(false)} onSave={handleSaveSignature} currentSignature={signature} />}
            {isEmailModalOpen && <EmailSummaryModal isOpen={isEmailModalOpen} onClose={() => setEmailModalOpen(false)} showToast={showToast} transactions={transactions} contacts={contacts} />}
            {isGeneratingPdf && <PDFPreview transactions={transactions} contacts={contacts} userRole={currentUserRole} signature={signature} />}
        </div>
    );
};

export default App;