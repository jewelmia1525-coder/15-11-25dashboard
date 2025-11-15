// This file is generated and contains the content of all other project files.
// It is used by the DownloadProjectTool component to create a ZIP archive of the entire application.

export const filesToZip = [
  {
    path: 'index.tsx',
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },
  {
    path: 'metadata.json',
    content: `{
  "name": "Copy of Copy of Copy of Copy of Copy of Copy of Copy of Copy of React Finance Dashboard",
  "description": "A comprehensive personal finance dashboard to track income, expenses, receivables, and payables. It features role-based access, data visualization, and various utility widgets.",
  "requestFramePermissions": [
    "geolocation",
    "camera",
    "microphone"
  ]
}`
  },
  {
    path: 'index.html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Finance Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Poppins:wght@400;600;700&family=Cedarville+Cursive&display=swap" rel="stylesheet">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Poppins', 'sans-serif'],
              bangla: ['Hind Siliguri', 'sans-serif'],
              cursive: ['Cedarville Cursive', 'cursive'],
            },
            colors: {
              'primary': 'hsl(var(--color-primary))',
              'primary-focus': 'hsl(var(--color-primary-focus))',
              'primary-content': 'hsl(var(--color-primary-content))',
              'base-100': 'hsl(var(--color-base-100))',
              'base-200': 'hsl(var(--color-base-200))',
              'base-300': 'hsl(var(--color-base-300))',
              'base-content': 'hsl(var(--color-base-content))',
              'muted-content': 'hsl(var(--color-muted-content))',
              'success': '#4ade80',
              'danger': '#f87171',
            }
          }
        }
      }
    </script>
    <style>
      :root {
        --color-primary-content: 220 33% 5%; /* #081226 */
        --color-base-100: 220 73% 9%; /* #081226 */
        --color-base-200: 220 53% 13%; /* #0f1a30 */
        --color-base-300: 220 30% 20%;
        --color-base-content: 215 30% 90%; /* #e6eef8 */
        --color-muted-content: 215 14% 65%; /* #9ca3af */
      }
      .light-theme {
        --color-primary-content: 0 0% 100%;
        --color-base-100: 210 16% 98%; /* #f8f9fa */
        --color-base-200: 0 0% 100%;
        --color-base-300: 210 16% 93%; /* #e9ecef */
        --color-base-content: 210 17% 15%; /* #212529 */
        --color-muted-content: 210 8% 45%; /* #6c757d */
      }
       /* Color Themes */
      .theme-gold { /* Default */
        --color-primary: 51 100% 50%;
        --color-primary-focus: 51 100% 45%;
      }
      .light-theme.theme-gold {
        --color-primary: 43 74% 49%;
        --color-primary-focus: 43 74% 44%;
      }

      .theme-blue {
        --color-primary: 217 91% 60%; /* #3b82f6 */
        --color-primary-focus: 217 91% 55%;
      }
      .light-theme.theme-blue {
        --color-primary: 211 100% 50%; /* #007bff */
        --color-primary-focus: 211 100% 45%;
      }

      .theme-green {
        --color-primary: 145 63% 49%; /* #22c55e */
        --color-primary-focus: 145 63% 44%;
      }
      .light-theme.theme-green {
        --color-primary: 134 61% 41%; /* #28a745 */
        --color-primary-focus: 134 61% 36%;
      }

      .theme-purple {
        --color-primary: 262 88% 66%; /* #a855f7 */
        --color-primary-focus: 262 88% 61%;
      }
      .light-theme.theme-purple {
        --color-primary: 258 52% 51%; /* #6f42c1 */
        --color-primary-focus: 258 52% 46%;
      }

      .theme-red {
        --color-primary: 0 84% 60%; /* #ef4444 */
        --color-primary-focus: 0 84% 55%;
      }
      .light-theme.theme-red {
        --color-primary: 354 70% 54%; /* #dc3545 */
        --color-primary-focus: 354 70% 49%;
      }

      .theme-orange {
        --color-primary: 26 95% 53%; /* #f97316 */
        --color-primary-focus: 26 95% 48%;
      }
      .light-theme.theme-orange {
        --color-primary: 33 94% 52%; /* #f59e0b */
        --color-primary-focus: 33 94% 47%;
      }
      .theme-teal {
        --color-primary: 173 81% 40%; /* #14b8a6 */
        --color-primary-focus: 173 81% 35%;
      }
      .light-theme.theme-teal {
        --color-primary: 174 72% 45%; /* #20c997 */
        --color-primary-focus: 174 72% 40%;
      }
      .theme-pink {
        --color-primary: 326 83% 60%; /* #ec4899 */
        --color-primary-focus: 326 83% 55%;
      }
      .light-theme.theme-pink {
        --color-primary: 332 79% 58%; /* #e83e8c */
        --color-primary-focus: 332 79% 53%;
      }

      /* Responsive base font size */
      html {
        font-size: 14px;
        -webkit-tap-highlight-color: transparent; /* Cleaner taps on mobile */
      }
      @media (min-width: 640px) {
        html {
          font-size: 16px;
        }
      }

      /* Custom Cursor - Only for devices that support hover (e.g., desktops) */
      @media (hover: hover) and (pointer: fine) {
        .cursor-dot,
        .cursor-outline {
          pointer-events: none;
          position: fixed;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out;
          z-index: 10001;
        }
        .cursor-dot {
          width: 8px;
          height: 8px;
          background-color: hsl(var(--color-primary));
          transition-property: transform;
          transition-duration: 0.1s;
        }
        .cursor-outline {
          width: 40px;
          height: 40px;
          border: 2px solid hsl(var(--color-primary) / 0.5);
          transition-duration: 0.2s;
        }
        body:hover .cursor-dot, body:hover .cursor-outline {
          opacity: 1;
        }
        .cursor-dot.pointer, .cursor-outline.pointer {
          transform: translate(-50%, -50%) scale(1.5);
        }
        .cursor-outline.pointer {
          width: 50px;
          height: 50px;
          background-color: hsl(var(--color-primary) / 0.2);
        }
      }
      
      /* Task Completion Animation */
      @keyframes sparkle-effect {
          0% {
              transform: scale(0) rotate(0deg);
              opacity: 1;
          }
          100% {
              transform: scale(1.5) rotate(360deg);
              opacity: 0;
          }
      }
      .sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle-effect 0.8s ease-out forwards;
          z-index: 1;
      }
      @keyframes fade-out-and-scale {
          from {
              opacity: 1;
              transform: scale(1);
          }
          to {
              opacity: 0;
              transform: scale(0.95);
          }
      }
      .task-completing {
          animation: fade-out-and-scale 0.5s ease-out forwards;
      }

      /* Mobile Service Loader */
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      .loader {
        border: 4px solid hsl(var(--color-base-300));
        border-top-color: hsl(var(--color-primary));
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
      }
    </style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
<script async defer src="https://apis.google.com/js/api.js"></script>
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script type="importmap">
{
  "imports": {
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react-chartjs-2": "https://aistudiocdn.com/react-chartjs-2@^5.3.1",
    "chart.js": "https://aistudiocdn.com/chart.js@^4.5.1",
    "@google/genai": "https://aistudiocdn.com/@google/genai@^1.29.0"
  }
}
</script>
</head>
<body class="bg-base-100 text-base-content font-sans">
    <div id="root"></div>
</body>
</html>`
  },
  {
    path: 'App.tsx',
    content: `import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
        throw new Error(\`Failed to fetch image: \${response.statusText}\`);
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
        primary: \`\${h} \${s}% \${l}%\`,
        focus: \`\${h} \${s}% \${Math.max(0, l - 5)}%\`,
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
        if (currentUserRole === 'admin' && loggedInAdminUser) return \`admin_\${loggedInAdminUser.username}\`;
        return null;
    }, [currentUserRole, loggedInAdminUser]);

    const { isSignedIn, isDriveReady, userProfile, lastBackupDate, signIn, signOut, backupData, restoreData } = useGoogleDrive(showToast, googleDriveUsername);
    
    const getUserScope = useCallback(() => {
        if (currentUserRole === 'super-admin') return 'super_admin';
        if (currentUserRole === 'admin' && loggedInAdminUser) return \`admin_\${loggedInAdminUser.username}\`;
        if (currentUserRole === 'viewer') return 'super_admin'; // Viewers see super-admin's data
        return null;
    }, [currentUserRole, loggedInAdminUser]);

    const getScopedKey = useCallback((key: string) => {
        const scope = getUserScope();
        return scope ? \`\${scope}_\${key}\` : null;
    }, [getUserScope]);

    const loadUserData = useCallback(() => {
        const scope = getUserScope();
        if (!scope) return;

        const loadItem = (key: string, setter: Function, defaultValue: any, processor?: (data: any) => any) => {
            try {
                const saved = localStorage.getItem(\`\${scope}_\${key}\`);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setter(processor ? processor(parsed) : parsed);
                } else {
                    setter(defaultValue);
                }
            } catch (e) {
                console.error(\`Failed to load \${key} from localStorage\`, e);
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
            setGroup({ id: 'main_group', name: 'Team Hub', members: memberIds.map(userId => ({ userId })), messages: [], games: [], settings: { rules: '1. Be respectful.\\\\n2. No inappropriate content.\\\\n3. Keep discussions professional.', maxFileSizeMB: 2 } });
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
                    const notificationKey = getScopedKey(\`bill_reminder_\${contact.id}\`);
                    if (!notificationKey) return;
                    const hasNotified = localStorage.getItem(notificationKey);

                    if (daysUntilDue > 0 && daysUntilDue <= reminderWindow && !hasNotified) {
                        showToast(\`Reminder: Bill for '\${contact.reason}' is due in \${daysUntilDue} day(s).\`, 'error');
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
                showToast(\`Achievement Unlocked: \${ach.name}!\`, 'success');
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
        showToast(\`\${newPasswords.length} new passwords imported!\`, 'success');
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
                const notificationKey = getScopedKey(\`budget_alert_\${now.getFullYear()}_\${now.getMonth()}_\${tx.category}\`);
                if (notificationKey) {
                    const hasNotified = localStorage.getItem(notificationKey);
                    if (spendingPercentage >= 90 && !hasNotified) { showToast(\`Budget Alert: You've spent \${Math.round(spendingPercentage)}% of your budget for \${tx.category}.\`, 'error'); localStorage.setItem(notificationKey, 'true'); } 
                    else if (spendingPercentage < 90 && hasNotified) { localStorage.removeItem(notificationKey); }
                }
            }
        }
        setTxModalOpen(false);
        setPrefillTx(null);
    };

    const handleDeleteTransaction = (id: number) => { if (!checkPermission()) return; setConfirmModal({ isOpen: true, title: 'Delete Transaction', message: 'Are you sure?', onConfirm: () => { saveTransactions(transactions.filter(t => t.id !== id)); showToast('Transaction deleted', 'error'); setConfirmModal(c => ({...c, isOpen: false})); } }); };
    const handleToggleTransactionCompleted = (id: number) => { if (!checkPermission()) return; saveTransactions(transactions.map(tx => tx.id === id ? { ...tx, completed: !tx.completed } : tx)); showToast(\`Transaction status updated\`, 'success'); };
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
        link.download = \`finance_dashboard_backup_\${getUserScope()}_\${new Date().toISOString().split('T')[0]}.json\`;
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
    const closeAddFundsModalAndOpenTx = (goal: SavingsGoal, amount?: number) => { setAddFundsModalOpen(false); setTargetGoalForFunds(null); handleOpenTxModal(null, { type: 'cost', category: 'Savings', savingsGoalId: goal.id, details: \`Contribution to \${goal.name}\`, amount: amount }); };
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
        <div className={\`role-\${currentUserRole} min-h-screen transition-all duration-300 \${isMobile ? '' : (isSidebarCollapsed ? 'pl-20' : 'pl-64')}\`}>
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
                <MessageCenterModal isOpen={isMessageCenterOpen} onClose={() => { setMessageCenterOpen(false); setInitialMessageRecipient(null); }} messages={messages} currentUserIdentifier={currentUserIdentifier!} onSendMessage={handleSendMessage} onMarkConversationAsRead={handleMarkConversationAsRead} role={currentUserRole!} showToast={showToast} initialSelectedUser={initialMessageRecipient} />
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

export default App;`
  },
  {
    path: 'types.ts',
    content: `export type Role = 'viewer' | 'admin' | 'super-admin';

export type Page = 'dashboard' | 'persons' | 'tools';

export type Widget = 'password' | 'calculator' | 'email' | 'theme' | 'about' | 'data' | 'adminManagement' | 'broadcast' | 'importPasswords' | 'profileSettings' | 'adminOverview' | 'dataSync' | 'taskManagement' | 'groupManagement' | 'fingerprintApproval';

export type DashboardModuleId = 'summary' | 'reports' | 'ai_insights' | 'budgets' | 'visualizations' | 'monthly_chart' | 'transactions' | 'upcoming_bills' | 'savings_goals' | 'achievements' | 'group_hub';

export interface DashboardModule {
    id: DashboardModuleId;
    name: string;
    isVisible: boolean;
}

export interface Transaction {
    id: number;
    type: 'income' | 'cost';
    amount: number;
    details: string;
    date: string;
    category: string;
    dueDate?: string;
    completed: boolean;
    savingsGoalId?: number;
}

export interface Contact {
    id: number;
    type: 'receivable' | 'payable';
    name: string;
    amount: number;
    reason: string;
    photo?: string; // Base64 string
    date: string;
    dueDate?: string; // For bill reminders
}

export interface Budget {
    category: string;
    amount: number;
}

export interface AdminUser {
    id: number;
    username: string;
    email: string;
    mobile: string;
    password: string;
    photo?: string; // Base64 string for profile picture
    signature?: string; // Base64 string for signature
    fingerprintId?: string;
    groupDisplayName?: string;
}

export interface Message {
    id: number;
    sender: string; // 'super-admin' or admin username
    recipient: string; // 'super-admin' or admin username
    text: string;
    attachment?: {
        type: 'image' | 'video' | 'link';
        content: string; // dataURL for image/video, URL for link
        fileName?: string;
    };
    timestamp: string;
    isRead: boolean;
}

export interface Task {
    id: number;
    text: string;
    assignee: string; // admin username
    creator: string; // 'super-admin'
    status: 'pending' | 'completed';
    createdAt: string;
    priority?: 'low' | 'medium' | 'high';
}

export interface SavingsGoal {
    id: number;
    name: string;
    targetAmount: number;
    savedAmount: number;
    createdAt: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    achieved: boolean;
}

export interface FingerprintResetRequest {
  userId: number;
  username: string;
  status: 'pending' | 'approved';
  requestedAt: string;
}


// --- AI Character Types ---
export type CartoonCharacter = 'blob' | 'bot' | 'pixie';
export type CartoonStyle = 'default' | 'hat' | 'bowtie';

// --- CV Maker Types ---
export type TemplateId = 'classic' | 'modern' | 'minimalist' | 'corporate' | 'creative';

export interface CvLink {
    label: string;
    url: string;
}

export interface CvLanguage {
    lang: string;
    proficiency: string;
}

export interface CvProject {
    name: string;
    description: string;
    link?: string;
}

export interface CvSkill {
    category: string;
    skills: string[];
}

export interface CvData {
    name: string;
    title: string;
    contact: {
        email: string;
        phone: string;
        address: string;
    };
    links: CvLink[];
    summary: string;
    experience: Array<{
        company: string;
        role: string;
        date: string;
        responsibilities: string[];
    }>;
    education: Array<{
        institution: string;
        degree: string;
        date: string;
    }>;
    skills: CvSkill[];
    projects: CvProject[];
    languages: CvLanguage[];
    references: string;
}

// --- Typing Master Types ---
export type TypingLevel = 'easy' | 'medium' | 'hard';
export type TypingLanguage = 'english' | 'bangla';

export interface TypingResult {
    wpm: number;
    accuracy: number;
    time: number;
    level: TypingLevel;
    language: TypingLanguage;
}

export interface CertificateData extends TypingResult {
    userName: string;
    userAddress: string;
    userPhoto: string | null;
    userSignature: string | null;
    date: string;
    candidateId: string;
    registrationNumber: string;
    email: string;
    phone?: string;
    institute?: string;
}

// --- Mobile Service Types ---
export type MobileServiceOperator = 'gp' | 'robi' | 'bl' | 'airtel' | 'teletalk';

export interface MobilePaymentMethod {
    id: number;
    provider: 'bkash' | 'nagad' | 'rocket';
    accountNumber: string;
}

export interface MobileOffer {
    id: string;
    title: string;
    description: string;
    price: number;
    validity?: string;
}

// --- Group Collaboration Types ---
export interface GroupMember {
    userId: number; // Corresponds to AdminUser id
}

export interface GroupMessage {
    id: number;
    senderId: number; // AdminUser id
    content: string;
    attachment?: {
        type: 'image';
        content: string; // dataURL
        fileName?: string;
        size: number; // in bytes
    };
    timestamp: string;
    reactions?: { [key: string]: number[] }; // emoji: array of user IDs
    isPinned?: boolean;
    readBy?: number[]; // Array of user IDs who have read the message
}

export interface GroupSettings {
    rules: string;
    maxFileSizeMB: number;
}

// --- Game Types ---
export type GameType = 'ludo' | 'tic-tac-toe' | 'connect-four' | 'rock-paper-scissors' | 'guess-the-word' | 'dots-and-boxes';

export interface LudoPieceState {
    [userId: string]: number[]; 
}

export interface LudoGameState {
    pieces: LudoPieceState;
    currentPlayerIndex: number;
    diceValue: number | null;
    lastRollTime?: number;
}

export interface TicTacToeGameState {
    board: (number | null)[]; // 9-element array, value is player index
    currentPlayerIndex: number;
}

export interface ConnectFourGameState {
    board: (number | null)[][]; // 6 rows, 7 columns, value is player index
    currentPlayerIndex: number;
}

export interface GameSession {
    id: string;
    type: GameType;
    createdBy: number; // AdminUser id
    players: number[]; // Array of AdminUser ids
    status: 'pending' | 'active' | 'finished';
    joinRequests: number[]; // Array of AdminUser ids requesting to join
    winnerId?: number | null; // Can also be -1 for a draw (tie)
    gameState?: LudoGameState | TicTacToeGameState | ConnectFourGameState;
}

export interface Group {
    id: 'main_group';
    name: string;
    members: GroupMember[];
    messages: GroupMessage[];
    games: GameSession[];
    settings: GroupSettings;
}`
  },
  {
    path: 'constants.ts',
    content: `export const TRANSACTION_CATEGORIES = [
  'Salary', 'Groceries', 'Utilities', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Food', 'Investment', 'Gift', 'Savings', 'Other'
] as const;

export const PASSWORDS = [
    "663720", "631322", "443223", "962138", "385621", "577896", "399970", "880872", "362286", "794791",
    "087474", "771461", "041309", "776144", "201383", "723914", "330632", "753777", "569873", "717667",
    "147273", "628628", "597188", "603163", "351221", "954222", "116822", "772196", "553671", "374119",
    "656073", "091015", "682452", "991548", "153224", "297512", "437822", "385798", "639525", "586408",
    "993072", "769127", "578407", "650588", "151859", "467689", "430984", "304269", "065943", "377624",
    "421259", "524598", "667850", "486216", "670327", "845105", "584592", "301138", "826553", "343603",
    "582234", "515919", "266850", "248641", "933682", "309315", "603248", "313364", "643198", "313217",
    "580791", "224674", "943236", "433991", "718850", "716443", "501377", "905717", "981600", "599522",
    "337628", "726883", "149638", "537837", "055113", "167332", "409243", "437845", "518579", "696088",
    "563854", "532014", "364491", "102717", "374828", "390435", "570755", "773912", "605151", "677322"
];

export const ROLE_DETAILS = {
    'super-admin': { 
      badge: 'SUPER ADMIN', 
      subtitle: 'Professional · Super Admin · Verified Premium', 
      photo: 'https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg', 
      name: 'Ornov Bin Tusher Jewel' 
    },
    'admin': { 
      badge: 'ADMIN', 
      subtitle: 'Professional · Admin · Verified', 
      photo: 'https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg', 
      name: 'Admin User' 
    },
    'viewer': { 
      badge: 'VIEWER ONLY', 
      subtitle: 'Professional · Viewer · Not Verified', 
      photo: 'https://placehold.co/150x150/081226/ffd700?text=V', 
      name: 'Viewer User' 
    }
};

export const FULL_CV_TEXT = \`
JEWEL MIA
ELECTRICAL & SMART SYSTEMS ENGINEER
+8801402284322 | Eng.jewelmia@gmil.com | Rampura, Ulon Rd, Dhaka

========================================
PERSONAL PROFILE & CAREER SUMMARY
========================================
Highly analytical Electrical Engineer specializing in Industrial Automation, Control Systems, and Data-Driven Problem Solving. Proficient in PLC programming (Siemens/Allen-Bradley), VFD control, and system troubleshooting. Recognized for using advanced AI/LLM tools (ChatGPT & Gemini) for rapid information synthesis and strategic problem solving in complex industrial environments, ensuring maximum operational efficiency and reliability. Extensive experience spans maintenance, commissioning, and system design with a strong foundation in licensing and safety standards.

========================================
KEY TECHNICAL PROFICIENCIES
========================================
Industrial Automation & Control
• PLC Ladder Logic (Siemens/Allen-Bradley)
• HMI Design & SCADA Systems, Project Design
• VFD Installation & Parameter Setup, Motor Interlocking

Electrical Systems & Maintenance
• 3-Phase Circuits, Power Distribution & Panel Wiring (MCB/DB)
• Star-Delta & DOL Starters, Fault Diagnosis
• Preventive Maintenance on Motors, Sensors, & Drives

Data & Critical Analysis
• AI/LLM Expertise (ChatGPT, Gemini, AI-DEEPSEEK)
• Strategic Problem Solving & Critical Decision Support
• Microcontroller Design, IEC 60634 Compliance

========================================
ADVANCED TRAINING: INDUSTRIAL AUTOMATION
================================
Professional Industrial Automation Design Training
Ulterior Engineering Ltd. | 3 Months | ISO 21001 & NSDA Accredited
• Mastered advanced automation systems for diverse sectors (Pharmaceuticals, Power, Manufacturing) with a focus on on-site testing and commissioning procedures.
• Competent in Industrial Electrical and Electronics, Devices Operation and Application, and Relay Logic Control (RLLC).
• Proficient in Advanced Motor Control (MCC, Induction/Servo/Stepper Motor), Variable Frequency Drive (VFD), and various PLC brands with troubleshooting.
• Trained in Advanced Human Machine Interface (HMI), Advanced Industrial Instrumentation, and Advanced Automation Design.

========================================
PROFESSIONAL EXPERIENCE (DETAILED)
========================================
Telecommunication Service Engineer
Banglalink | 2023-2024
• Executed routine and corrective BTS site maintenance and optimization.
• Managed critical site power systems, including generators, UPS, and battery banks, to ensure 24/7 network availability.
• Monitored and rapidly resolved network faults, transmission equipment issues, and alarms (DC voltage, phase failure).

Service Engineer, Telecommunication Service Division
HMT Engineering & Technology Ltd. | June 2022 - August 2023
• Provided dedicated technical expertise and maintenance support for telecommunication service infrastructure at Kishorejanj.
• Conducted routine maintenance and troubleshooting on active and passive equipment to maintain network quality.
• Ensured all service duties were completed with high diligence, commitment, and technical proficiency.

Service Engineer
Dreks Associates | 2020-2021
• Executed installation, commissioning, validation, and troubleshooting of pharmaceutical machinery on client sites.
• Installed and wired MCB, MDB, motor, and generator boards.

Jr. System Engineer, Electrical Department
Telex Engineering Ltd. | August 2017 - December 2019
• Employed under the Electrical Department for Engineering Items Supply, Installation & Maintenance Support.
• Supported on-site telecommunications system projects, including Robi and Banglalink BTS tower MDB Board and Antenna Installation.
• Contributed to project success through sincere, hardworking, and efficient execution of duties during the entire tenure.

========================================
ACADEMIC & PROFESSIONAL EDUCATION
========================================
• Bachelor of Science (BSc), Electrical & Electronic Engineering
  Uttara University | Running 2nd Year

• Diploma in Electrical Technology
  Rumdo Institute of Modern Technology (RIMT) | 2012-2017 | CGPA: 3.76/4.00

• Secondary School Certificate (SSC), Science
  Bashati Govt High School, Mymensingh | 2012 | GPA: 4.19/5.00

• Primary School Certificate (PSC)
  Bashati Govt Primary School, Mymensingh | RESULT-GPA: 5.00/5.00

========================================
LICENSES & SPECIALIZED CERTIFICATIONS
========================================
• Electrical Supervisor Certificate (BC)
  Authority: Office of the Chief Electric Inspector, Bangladesh.
  License No: S20250016000
  Scope (BC): Supervision of installations up to 440 Volts (Medium Pressure) and 220 Volts (Low Pressure).

• Electrician License (Category ABC)
  Authority: Office of the Chief Electric Inspector, Bangladesh.
  License No: E20220020875
  Scope (ABC): Authorized for High, Medium, and Low Pressure Electrical Installation Works.

• Advanced Automation Certification
  Ulterior Engineering Ltd. | 3 Months | ISO 21001 & NSDA Accredited
  Certified expertise in PLC, SCADA, HMI design, and Industrial Project Management.

========================================
FOUNDATIONAL TECHNICAL TRAINING
========================================
• Industrial Training
  Expert Technical Village | 2016
  Focused on foundational Microcontroller systems (PIC16F84, PIC16F844A) and PLC Programming fundamentals.

• National Skill Certificate 1 (2016)
  Electrical Installation and Maintenance (Civil Construction) from BTEB.

• Skills Competition Certificate (2016)
========================================
KEY ATTRIBUTES & BACKGROUND
========================================
Born: 25 December 1996
Status: Married
Nationality: Bangladeshi
Blood Group: A+
Language: Bangla, English (Fluent)
Professional Interests: Electrical Project Work, Gardening & Sustainability, Fitness & Discipline.
\`;`
  },
  {
    path: 'components/LoginComponent.tsx',
    content: `import React, { useState, useEffect, useRef } from 'react';
import ForgotPasswordModal from './ForgotPasswordModal';
import { AdminUser } from '../types';

interface LoginComponentProps {
    onLogin: (username: string, password?: string, isFingerprintLogin?: boolean) => boolean;
    adminUsers: AdminUser[];
    showToast: (message: string, type?: 'success' | 'error') => void;
}

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const EyeSlashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.575M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);


const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin, adminUsers, showToast }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotModalOpen, setForgotModalOpen] = useState(false);
    const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fingerprintTriggeredRef = useRef(false);

    useEffect(() => {
      if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(supported => {
            setIsFingerprintSupported(supported);
        });
      }
    }, []);

    const triggerFingerprintScan = async (user: AdminUser) => {
        if (!user.fingerprintId || fingerprintTriggeredRef.current) return;
        
        fingerprintTriggeredRef.current = true; // Prevent multiple triggers
        setIsLoading(true);
        showToast('Touch fingerprint sensor to log in...', 'success');

        try {
            const credentialId = Uint8Array.from(atob(user.fingerprintId.replace(/_/g, '/').replace(/-/g, '+')), c => c.charCodeAt(0));
            
            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: window.crypto.getRandomValues(new Uint8Array(32)),
                    allowCredentials: [{
                        type: 'public-key',
                        id: credentialId,
                        transports: ['internal'],
                    }],
                    timeout: 60000,
                }
            });

            if (credential) {
                onLogin(user.username, undefined, true);
            } else {
                 showToast('Fingerprint authentication failed.', 'error');
            }
        } catch (err) {
            console.error('Fingerprint error:', err);
            showToast('Fingerprint authentication cancelled or failed.', 'error');
        } finally {
            setIsLoading(false);
            fingerprintTriggeredRef.current = false;
        }
    };

     // Auto-trigger fingerprint on username match
    useEffect(() => {
        if (!isFingerprintSupported || !username) return;

        const handler = setTimeout(() => {
            const user = adminUsers.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
            if (user && user.fingerprintId) {
                triggerFingerprintScan(user);
            }
        }, 800); // Debounce to wait for user to finish typing

        return () => clearTimeout(handler);
    }, [username, adminUsers, isFingerprintSupported]);

     // Particle Animation Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray: any[];

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.directionX = Math.random() * 0.4 - 0.2;
                this.directionY = Math.random() * 0.4 - 0.2;
                this.size = Math.random() * 2 + 1;
                const primaryColor = getComputedStyle(document.body).getPropertyValue('--color-primary').trim();
                const parts = primaryColor.replace(/,/g, '').split(' ').filter(Boolean);
                const [h, s, l] = parts;
                this.color = \`hsla(\${h}, \${s}, \${l}, 0.5)\`;
            }

            draw() {
                if(!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            if (numberOfParticles > 100) numberOfParticles = 100;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        let animationFrameId: number;
        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            if(!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        const handleResize = () => {
            if(!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                    handleResize();
                }
            });
        });

        observer.observe(document.body, { attributes: true });
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            const success = onLogin(username, password);
            if (!success) {
                setError('ভুল ইউজারনেম বা পাসওয়ার্ড।');
            }
            setIsLoading(false);
        }, 500);
    };

    const handleFingerprintButtonClick = () => {
        const user = adminUsers.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
        if(user) {
            triggerFingerprintScan(user);
        } else {
            showToast('Please enter a valid username first.', 'error');
        }
    };

    return (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 opacity-40"></canvas>
            <div className="fixed inset-0 bg-base-100/70 backdrop-blur-sm flex items-center justify-center z-10 p-4">
                <div className="bg-base-200/80 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center animate-fade-in-up">
                    <img src="https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-primary mx-auto mb-4 shadow-lg shadow-primary/20" />
                    <h2 className="font-bangla text-2xl font-bold text-primary mb-6">ফ্যামিলি হিসাব/নিকাশে স্বাগতম</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-base-100 border border-primary/30 rounded-lg text-base-content focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                                placeholder="User Name"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-10 bg-base-100 border border-primary/30 rounded-lg text-base-content focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                                placeholder="Password"
                                disabled={isLoading}
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-content hover:text-primary transition-colors disabled:opacity-50"
                                disabled={isLoading}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {error && <p className="font-bangla text-danger text-sm mb-4">{error}</p>}
                        <div className="flex gap-2">
                             {isFingerprintSupported && (
                                <button type="button" onClick={handleFingerprintButtonClick} className="p-3 bg-base-100 border border-primary/30 rounded-lg text-primary hover:bg-primary/10 transition-colors" aria-label="Login with Fingerprint" disabled={isLoading || !username}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.052 0 .105 0 .158-.002 1.773 0 3.341.386 4.618 1.055M12 11c-.053 0-.106 0-.158-.002-1.773 0-3.341.386-4.618 1.055m0 0v2.016a5.25 5.25 0 004.618 4.933m-4.618-4.933a5.25 5.25 0 014.618-4.933m4.618 2.878V11m0 0a5.25 5.25 0 01-4.618 4.933m4.618-4.933a5.25 5.25 0 00-4.618-4.933" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5a3 3 0 116 0 3 3 0 01-6 0z" /></svg>
                                </button>
                            )}
                            <button 
                                type="submit" 
                                className="w-full py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transform hover:-translate-y-1 transition-all shadow-md hover:shadow-lg hover:shadow-primary/30 disabled:bg-primary/70 disabled:cursor-wait"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Logging in...</span>
                                    </div>
                                ) : (
                                    'LOGIN'
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="text-right mt-2 -mb-2">
                         <button
                            type="button"
                            onClick={() => setForgotModalOpen(true)}
                            className="text-xs font-semibold text-muted-content hover:text-primary transition-colors hover:underline"
                         >
                            Forgot Password?
                        </button>
                    </div>
                    <div className="font-bangla text-xs text-muted-content bg-base-300/40 p-2 rounded-md mt-5 text-center leading-relaxed">
                        <div>
                            <b>VIEWER LOGIN</b><br />
                            USERNAME: any name<br />
                            PASSWORD: <b>12345</b>
                        </div>
                    </div>
                     <div className="mt-5 pt-4 border-t border-primary/20 text-xs">
                       <a href="https://wa.me/8801402284322" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                         <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.52 3.48A11.87 11.87 0 0012 .6 11.4 11.4 0 00.6 12.08a11.27 11.27 0 001.58 5.83L.6 23.4l5.61-1.47a11.5 11.5 0 005.81 1.53A11.45 11.45 0 0023.4 12a11.87 11.87 0 00-2.88-8.52zM12 21.07a9.29 9.29 0 01-4.74-1.28l-.34-.2-3.33.87.9-3.25-.22-.33A9.22 9.22 0 012.72 12a9.28 9.28 0 1118.56 0A9.28 9.28 0 0112 21.07zm4.84-6.64c-.26-.13-1.54-.76-1.78-.85s-.42-.13-.6.13-.68.85-.83 1-.3.19-.56.06a7.65 7.65 0 01-2.25-1.39 8.43 8.43 0 01-1.56-1.94c-.16-.26 0-.4.12-.53.12-.12.26-.3.4-.45a1.79 1.79 0 00.27-.45.5.5 0 000-.47c-.07-.13-.6-1.44-.83-1.98s-.44-.46-.6-.47h-.51a1 1 0 00-.72.33A3 3 0 007 8.46a5.17 5.17 0 001.1 2.72A11.83 11.83 0 0012 14.68a5.44 5.44 0 001.38.18 3.28 3.28 0 002.13-1.36 2.69 2.69 0 00.33-1.39c0-.26-.02-.46-.06-.64a.47.47 0 00-.14-.22z"/></svg>
                        Full Access Contact
                       </a>
                    </div>
                </div>
            </div>
            <ForgotPasswordModal 
                isOpen={isForgotModalOpen} 
                onClose={() => setForgotModalOpen(false)} 
                adminUsers={adminUsers}
                showToast={showToast}
            />
             <style>{\`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
            \`}</style>
        </>
    );
};

export default LoginComponent;`
  },
  {
    path: 'components/SuccessPopup.tsx',
    content: `import React, { useMemo } from 'react';
import { Role, AdminUser } from '../types';
import ProfileCard from './ProfileCard';
import { ROLE_DETAILS } from '../constants';

interface SuccessPopupProps {
    role: Role;
    adminUser: AdminUser | null;
}

const Sparkle: React.FC = () => {
    const style: React.CSSProperties = {
        top: \`\${Math.random() * 100}%\`,
        left: \`\${Math.random() * 100}%\`,
        width: \`\${Math.random() * 3 + 1}px\`,
        height: \`\${Math.random() * 3 + 1}px\`,
        animationDelay: \`\${Math.random() * 1}s\`,
    };
    return (
        <div 
            className="absolute bg-white rounded-full opacity-0 animate-[sparkle-anim_1s_ease-out_forwards] shadow-[0_0_5px_white,0_0_10px_white,0_0_15px_hsl(var(--color-primary))]"
            style={style}
        ></div>
    );
};

const SuccessPopup: React.FC<SuccessPopupProps> = ({ role, adminUser }) => {
    const genericRoleDetails = ROLE_DETAILS[role];

    const profileDetails = useMemo(() => {
        if (role === 'admin' && adminUser) {
            return {
                name: adminUser.username,
                badge: 'ADMIN',
                subtitle: 'Professional · Admin · Verified',
                photo: adminUser.photo || genericRoleDetails.photo,
            };
        }
        return genericRoleDetails;
    }, [role, adminUser, genericRoleDetails]);


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10020] animate-[fade-in_0.3s_ease-out]">
            <div className="relative animate-[scale-in_0.3s_ease-out]">
                 {role === 'super-admin' && Array.from({ length: 40 }).map((_, i) => <Sparkle key={i} />)}
                <ProfileCard 
                    name={profileDetails.name}
                    badge={profileDetails.badge}
                    subtitle={profileDetails.subtitle}
                    photo={profileDetails.photo}
                />
            </div>
             <style>{\`
                @keyframes sparkle-anim {
                    0% { transform: scale(0); opacity: 0.5; }
                    50% { transform: scale(1.5); opacity: 1; }
                    100% { transform: scale(0); opacity: 0; }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                 @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            \`}</style>
        </div>
    );
};

export default SuccessPopup;`
  },
  {
    path: 'components/Header.tsx',
    content: `import React, { useMemo, useState, useEffect } from 'react';
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
    const displayBadge = role === 'admin' ? \`\${loggedInAdminUser?.username}'s Panel\` : roleDetails.badge;


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
            <style>{\`
                @keyframes bell-shake {
                    0%, 100% { transform: rotate(0); }
                    10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
                    20%, 40%, 60%, 80% { transform: rotate(10deg); }
                }
                .animate-bell-shake {
                    animation: bell-shake 0.8s ease-in-out;
                }
            \`}</style>
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
                        <div className={\`hidden sm:flex items-center gap-2 text-xs font-semibold \${isOnline ? 'text-success' : 'text-danger'}\`}>
                            <div className={\`w-2 h-2 rounded-full \${isOnline ? 'bg-success' : 'bg-danger'}\`}></div>
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
                                <button onClick={onOpenFingerprintWidget} className="relative p-2 text-muted-content hover:text-primary transition-colors animate-pulse" title={\`\${fingerprintRequestCount} Pending Fingerprint Resets\`}>
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
                                aria-label={\`Switch to \${theme === 'dark' ? 'light' : 'dark'} mode\`}
                            >
                                <div className={\`w-6 h-6 rounded-full bg-primary shadow-md transform transition-transform duration-300 \${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}\`}></div>
                                <span className={\`absolute left-1.5 text-sm transition-opacity duration-200 \${theme === 'light' ? 'opacity-100' : 'opacity-0'}\`}>☀️</span>
                                <span className={\`absolute right-1.5 text-sm transition-opacity duration-200 \${theme === 'dark' ? 'opacity-100' : 'opacity-0'}\`}>🌙</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;`
  },
  {
    path: 'components/ProfileCard.tsx',
    content: `

import React from 'react';

interface ProfileCardProps {
    name: string;
    badge: string;
    subtitle: string;
    photo: string;
}

const FeatureIcon: React.FC<{ icon: React.ReactElement; label: string }> = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="w-12 h-12 bg-base-100/50 rounded-full flex items-center justify-center border border-primary/20 text-primary">
            {icon}
        </div>
        <span className="text-xs font-semibold text-muted-content uppercase tracking-wider">{label}</span>
    </div>
);


const ProfileCard: React.FC<ProfileCardProps> = ({ name, badge, subtitle, photo }) => {
    const isSuperAdmin = badge.includes('SUPER');

    return (
        <div className="relative w-96 bg-base-200 border border-primary/20 rounded-2xl pt-20 pb-6 px-6 shadow-2xl shadow-primary/10 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 flex flex-col items-center text-center">
            
            {/* Overlapping Photo */}
            <div className="absolute top-0 -translate-y-1/2">
                <div className="relative">
                    <img src={photo} alt={name} className="w-28 h-28 rounded-full object-cover border-4 border-base-200 shadow-lg" />
                    <div className="absolute -inset-1 rounded-full animate-theme-glow"></div>
                </div>
            </div>
            
            {/* Text Content */}
            <div className="w-full">
                {isSuperAdmin ? (
                     <p className="text-sm font-bold uppercase text-yellow-900 bg-gradient-to-br from-yellow-400 to-amber-500 px-4 py-1.5 rounded-full shadow-md border border-yellow-600/50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] inline-block">
                        {badge}
                    </p>
                ) : (
                    <p className="text-sm font-bold uppercase text-primary/80 bg-base-300/50 inline-block px-4 py-1.5 rounded-full">{badge}</p>
                )}
                
                <h1 className="text-3xl font-bold text-primary drop-shadow-[0_1px_3px_hsl(var(--color-primary)/0.4)] mt-4">{name}</h1>
                <p className="text-sm text-muted-content mt-1">{subtitle}</p>
            </div>
            
            <div className="my-6 h-px w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"></div>

            {/* Premium Features for Super Admin */}
            {isSuperAdmin && (
                <div className="w-full bg-gradient-to-b from-base-100/50 to-base-100/30 border border-primary/10 rounded-lg p-4">
                    <h3 className="text-center text-sm font-semibold text-primary mb-3">Premium Features</h3>
                    <div className="flex justify-around items-center">
                        <FeatureIcon 
                            label="Full Access" 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>} 
                        />
                         <FeatureIcon 
                            label="Sys Control" 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>}
                        />
                         <FeatureIcon 
                            label="Analytics" 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>}
                        />
                    </div>
                </div>
            )}
            <style>{\`
                @keyframes theme-glow {
                    0%, 100% {
                        box-shadow: 0 0 15px -5px hsl(var(--color-primary) / 0.6);
                    }
                    50% {
                        box-shadow: 0 0 25px 0px hsl(var(--color-primary) / 0.8);
                    }
                }
                .animate-theme-glow {
                    animation: theme-glow 3s ease-in-out infinite;
                    pointer-events: none; /* Make sure it doesn't block interactions */
                }
            \`}</style>
        </div>
    );
};

export default ProfileCard;`
  },
  {
    path: 'components/Dashboard.tsx',
    content: `import React from 'react';
import { Transaction, Contact, Budget, DashboardModule, DashboardModuleId, Role, SavingsGoal, Achievement, Group, AdminUser } from '../types';
import SummaryCards from './SummaryCards';
import TransactionList from './TransactionList';
import Sidebar from './Sidebar';
import WeeklyChart from './WeeklyChart';
import ReportControls from './ReportControls';
import CategoryPieChart from './CategoryPieChart';
import MonthlyChart from './MonthlyChart';
import BudgetProgress from './BudgetProgress';
import AiInsights from './AiInsights';
import BroadcastBanner from './BroadcastBanner';
import UpcomingBillsWidget from './UpcomingBillsWidget';
import SavingsGoalsWidget from './SavingsGoalsWidget';
import AchievementsWidget from './AchievementsWidget';
import GroupWidget from './GroupWidget';

interface DashboardProps {
    transactions: Transaction[];
    contacts: Contact[];
    budgets: Budget[];
    savingsGoals: SavingsGoal[];
    achievements: Achievement[];
    group: Group | null;
    adminUsers: AdminUser[];
    onOpenGroupPage: () => void;
    onEditTransaction: (tx: Transaction) => void;
    onDeleteTransaction: (id: number) => void;
    onToggleCompleted: (id: number) => void;
    onAddTransaction: () => void;
    onEditContact: (type: 'receivable' | 'payable', contact: Contact) => void;
    onDeleteContact: (id: number) => void;
    onAddReceivable: () => void;
    onAddPayable: () => void;
    onGeneratePdf: () => void;
    onOpenEmailModal: () => void;
    onOpenSignatureModal: () => void;
    onOpenBudgetModal: () => void;
    onOpenSavingsGoalModal: (goal: SavingsGoal | null) => void;
    onOpenAddFundsModal: (goal: SavingsGoal) => void;
    onDeleteSavingsGoal: (id: number) => void;
    dashboardLayout: DashboardModule[];
    currentUserRole: Role | null;
    adminBroadcast: string;
    viewerBroadcast: string;
    isOnline: boolean;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
    const componentsMap: Record<DashboardModuleId, React.ReactNode> = {
        summary: (
            <SummaryCards 
                transactions={props.transactions} 
            />
        ),
        reports: (
             <ReportControls 
                onGeneratePdf={props.onGeneratePdf}
                onOpenEmailModal={props.onOpenEmailModal}
                onOpenSignatureModal={props.onOpenSignatureModal}
                onOpenBudgetModal={props.onOpenBudgetModal}
            />
        ),
        ai_insights: <AiInsights transactions={props.transactions} isOnline={props.isOnline} />,
        budgets: (
            <BudgetProgress 
                transactions={props.transactions} 
                budgets={props.budgets} 
                onOpenBudgetModal={props.onOpenBudgetModal} 
            />
        ),
        upcoming_bills: (
            <UpcomingBillsWidget contacts={props.contacts} />
        ),
        savings_goals: (
            <SavingsGoalsWidget 
                goals={props.savingsGoals}
                onAddGoal={() => props.onOpenSavingsGoalModal(null)}
                onAddFunds={props.onOpenAddFundsModal}
                onEditGoal={props.onOpenSavingsGoalModal}
                onDeleteGoal={props.onDeleteSavingsGoal}
            />
        ),
        achievements: (
            <AchievementsWidget achievements={props.achievements} />
        ),
        group_hub: (
            <GroupWidget 
                group={props.group} 
                allUsers={props.adminUsers} 
                onOpenGroupPage={props.onOpenGroupPage} 
            />
        ),
        visualizations: (
            <section aria-label="Data Visualizations" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-200 border border-primary/20 rounded-2xl p-4 shadow-lg min-h-[300px]">
                    <WeeklyChart transactions={props.transactions} />
                </div>
                <CategoryPieChart transactions={props.transactions} />
            </section>
        ),
        monthly_chart: (
            <section aria-label="Monthly Summary Chart" className="bg-base-200 border border-primary/20 rounded-2xl p-4 shadow-lg min-h-[300px]">
                <MonthlyChart transactions={props.transactions} />
            </section>
        ),
        transactions: (
            <TransactionList 
                transactions={props.transactions}
                onEdit={props.onEditTransaction}
                onDelete={props.onDeleteTransaction}
                onAddTransaction={props.onAddTransaction}
                onToggleCompleted={props.onToggleCompleted}
            />
        )
    };
    
    const broadcastText = props.currentUserRole === 'viewer' 
        ? props.viewerBroadcast 
        : (props.currentUserRole === 'admin' ? props.adminBroadcast : '');


    return (
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
            <div className="flex flex-col gap-6">
                {broadcastText && <BroadcastBanner text={broadcastText} />}
                {props.dashboardLayout
                    .filter(module => module.isVisible)
                    .map(module => <div key={module.id}>{componentsMap[module.id]}</div>)
                }
            </div>
            <aside className="hidden xl:flex flex-col gap-6">
                <Sidebar
                    contacts={props.contacts}
                    onEdit={props.onEditContact}
                    onDelete={props.onDeleteContact}
                    onAddReceivable={props.onAddReceivable}
                    onAddPayable={props.onAddPayable}
                />
            </aside>
        </div>
    );
};

export default Dashboard;`
  },
  {
    path: 'components/SummaryCards.tsx',
    content: `


import React, { useMemo } from 'react';
import { Transaction } from '../types';

interface SummaryCardsProps {
    transactions: Transaction[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
    const { totalBalance, monthlyIncome, monthlyCost } = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        let totalIncome = 0;
        let totalCost = 0;
        let monthlyIncome = 0;
        let monthlyCost = 0;

        transactions.forEach(tx => {
            const txDate = new Date(tx.date);
            if (tx.type === 'income') {
                totalIncome += tx.amount;
                if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
                    monthlyIncome += tx.amount;
                }
            } else {
                totalCost += tx.amount;
                if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
                    monthlyCost += tx.amount;
                }
            }
        });
        const totalBalance = totalIncome - totalCost;
        return { totalBalance, monthlyIncome, monthlyCost };
    }, [transactions]);
    
    const formatCurrency = (num: number) => \`৳\${num.toLocaleString('bn-BD')}\`;

    return (
        <>
            <div className="bg-base-200 border border-primary/20 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col justify-end text-center min-h-[150px]">
                <div className="pb-2">
                    <h2 className="font-bangla text-lg font-semibold text-muted-content">মোট ব্যালেন্স</h2>
                    <p className={\`font-bangla text-4xl sm:text-5xl font-bold my-2 drop-shadow-[0_2px_5px_hsl(var(--color-primary)/0.5)] transition-colors \${totalBalance < 0 ? 'text-danger' : 'text-primary'}\`}>
                        {formatCurrency(totalBalance)}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg border-l-4 border-l-success">
                    <h3 className="font-bangla text-lg text-muted-content">মাসিক আয়</h3>
                    <p className="font-bangla text-3xl font-bold text-success mt-1">{formatCurrency(monthlyIncome)}</p>
                </div>
                 <div className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg border-l-4 border-l-danger">
                    <h3 className="font-bangla text-lg text-muted-content">মাসিক খরচ</h3>
                    <p className="font-bangla text-3xl font-bold text-danger mt-1">{formatCurrency(monthlyCost)}</p>
                </div>
            </div>
        </>
    );
};

export default SummaryCards;`
  },
  {
    path: 'components/WeeklyChart.tsx',
    content: `

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Transaction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyChartProps {
    transactions: Transaction[];
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ transactions }) => {
    
    const chartData = React.useMemo(() => {
        const today = new Date();
        const labels: string[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            labels.push(d.toLocaleDateString('bn-BD', { weekday: 'short' }));
        }
        
        const incomeData = Array(7).fill(0);
        const costData = Array(7).fill(0);
        
        transactions.forEach(tx => {
            const txDate = new Date(tx.date);
            const diffTime = today.getTime() - txDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays >= 0 && diffDays < 7) {
                const index = 6 - diffDays;
                if (tx.type === 'income') {
                    incomeData[index] += tx.amount;
                } else {
                    costData[index] += tx.amount;
                }
            }
        });
        
        return {
            labels,
            datasets: [
                {
                    label: 'আয়',
                    data: incomeData,
                    backgroundColor: '#4ade80',
                    borderRadius: 4,
                },
                {
                    label: 'খরচ',
                    data: costData,
                    backgroundColor: '#f87171',
                    borderRadius: 4,
                },
            ],
        };
    }, [transactions]);
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: 'hsl(var(--color-base-content))', font: { family: "'Hind Siliguri', sans-serif" } },
            },
            title: {
                display: true,
                text: 'সাপ্তাহিক সারাংশ',
                color: 'hsl(var(--color-base-content))',
                font: { size: 18, family: "'Hind Siliguri', sans-serif" },
            },
        },
        scales: {
            y: {
                grid: { color: 'hsl(var(--color-primary)/0.1)' },
                ticks: { 
                    color: 'hsl(var(--color-muted-content))',
                    callback: (value: string | number) => \`৳\${Number(value).toLocaleString('bn-BD')}\`
                },
            },
            x: {
                grid: { display: false },
                ticks: { 
                    color: 'hsl(var(--color-muted-content))',
                    font: { family: "'Hind Siliguri', sans-serif" }
                },
            },
        },
    };

    return <Bar options={options} data={chartData} />;
};

export default WeeklyChart;`
  },
  {
    path: 'components/TransactionList.tsx',
    content: `

import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { TRANSACTION_CATEGORIES } from '../constants';
import Calendar from './Calendar';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (tx: Transaction) => void;
    onDelete: (id: number) => void;
    onAddTransaction: () => void;
    onToggleCompleted: (id: number) => void;
}

const TransactionItem: React.FC<{ tx: Transaction; onEdit: () => void; onDelete: () => void; onToggleCompleted: () => void; }> = ({ tx, onEdit, onDelete, onToggleCompleted }) => {
    const isIncome = tx.type === 'income';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isOverdue = tx.dueDate && tx.type === 'cost' && new Date(tx.dueDate) < today && !tx.completed;

    return (
        <li className={\`flex items-center gap-2 p-3 bg-base-300/40 rounded-lg hover:bg-base-300/70 transition-all duration-300 \${tx.completed ? 'opacity-50' : ''}\`}>
             <button 
                onClick={onToggleCompleted} 
                className={\`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 \${tx.completed ? 'bg-success border-success' : 'border-primary/30 hover:bg-primary/20'}\`}
                aria-label={tx.completed ? 'Mark as not completed' : 'Mark as completed'}
            >
                <svg className={\`w-5 h-5 text-white transition-transform duration-300 \${tx.completed ? 'scale-100' : 'scale-0'}\`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <div className={\`w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center \${isIncome ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}\`}>
                {isIncome ? '📈' : '📉'}
            </div>
            <div className="flex-grow">
                <p className={\`font-semibold font-bangla text-base-content truncate transition-all \${tx.completed ? 'line-through' : ''}\`}>{tx.details}</p>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                    <span className="text-xs text-muted-content">{new Date(tx.date).toLocaleDateString('bn-BD')}</span>
                    {tx.dueDate && (
                        <span className={\`text-xs font-medium px-2 py-0.5 rounded-full \${isOverdue ? 'bg-danger/20 text-danger' : 'bg-base-100 text-muted-content'}\`}>
                            {isOverdue ? 'Overdue' : 'Due'}: {new Date(tx.dueDate).toLocaleDateString('bn-BD')}
                        </span>
                    )}
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{tx.category || 'Other'}</span>
                </div>
            </div>
            <div className={\`font-bold font-bangla text-base \${isIncome ? 'text-success' : 'text-danger'}\`}>
                {isIncome ? '+' : '-'}৳{tx.amount.toLocaleString('bn-BD')}
            </div>
             <div className="flex gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <button onClick={onEdit} className="p-2 rounded-full hover:bg-primary/20 text-muted-content hover:text-primary transition-colors" title="Edit" aria-label="Edit transaction">✏️</button>
                <button onClick={onDelete} className="p-2 rounded-full hover:bg-danger/20 text-muted-content hover:text-danger transition-colors" title="Delete" aria-label="Delete transaction">🗑️</button>
            </div>
        </li>
    );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, onAddTransaction, onToggleCompleted }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'cost'>('all');
    const [sortBy, setSortBy] = useState<'date' | 'amount' | 'type' | 'dueDate'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filterCategory, setFilterCategory] = useState<'all' | string>('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateSelect = (dates: { start: string | null; end: string | null }) => {
        setStartDate(dates.start || '');
        setEndDate(dates.end || '');
    };

    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const dateRangeDisplay = useMemo(() => {
        if (!startDate) return 'Select date range...';
        const start = formatDateForDisplay(startDate);
        const end = endDate ? formatDateForDisplay(endDate) : start;
        if (start === end) return start;
        return \`\${start} - \${end}\`;
    }, [startDate, endDate]);


    const sortedAndFilteredTransactions = useMemo(() => {
        return transactions
            .filter(tx => {
                const typeMatch = filterType === 'all' || tx.type === filterType;
                const categoryMatch = filterCategory === 'all' || tx.category === filterCategory;
                const searchTermLower = searchTerm.toLowerCase();
                const searchMatch = tx.details.toLowerCase().includes(searchTermLower) || tx.category.toLowerCase().includes(searchTermLower);
                
                if (startDate) {
                    const txDate = new Date(tx.date).setHours(0,0,0,0);
                    const start = new Date(startDate).getTime();
                    const end = endDate ? new Date(endDate).getTime() : start;
                    if (txDate < start || txDate > end) return false;
                }

                return typeMatch && searchMatch && categoryMatch;
            })
            .sort((a, b) => {
                let comparison = 0;
                switch (sortBy) {
                    case 'date':
                        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                        break;
                    case 'amount':
                        comparison = a.amount - b.amount;
                        break;
                    case 'type':
                        comparison = a.type.localeCompare(b.type);
                        break;
                    case 'dueDate':
                        if (a.dueDate && b.dueDate) {
                            comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
                        } else if (a.dueDate) {
                            comparison = -1;
                        } else if (b.dueDate) {
                            comparison = 1;
                        }
                        break;
                }
                return sortOrder === 'asc' ? comparison : -comparison;
            });
    }, [transactions, searchTerm, filterType, sortBy, sortOrder, filterCategory, startDate, endDate]);


    return (
        <section aria-labelledby="transaction-list-title" className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg">
            <h2 id="transaction-list-title" className="font-bangla text-lg font-bold text-base-content mb-4">সকল লেনদেন</h2>
            
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search details or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:flex-grow px-3 py-1.5 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex-shrink-0 grid grid-cols-3 gap-1 p-1 bg-base-300/50 rounded-lg">
                        <button
                            onClick={() => setFilterType('all')}
                            className={\`px-3 py-1.5 text-sm rounded-md transition-colors \${filterType === 'all' ? 'bg-primary text-primary-content' : 'text-muted-content hover:bg-base-300'}\`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('income')}
                            className={\`px-3 py-1.5 text-sm rounded-md transition-colors \${filterType === 'income' ? 'bg-success text-white' : 'text-muted-content hover:bg-base-300'}\`}
                        >
                            Income
                        </button>
                        <button
                            onClick={() => setFilterType('cost')}
                            className={\`px-3 py-1.5 text-sm rounded-md transition-colors \${filterType === 'cost' ? 'bg-danger text-white' : 'text-muted-content hover:bg-base-300'}\`}
                        >
                            Cost
                        </button>
                    </div>
                </div>
                 <div className="flex flex-col sm:flex-row gap-4">
                     <div className="flex-grow flex items-center gap-2 bg-base-300/30 p-1.5 rounded-lg">
                        <label className="text-sm font-semibold text-muted-content flex-shrink-0 pl-2">Date Range:</label>
                        <button
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-full px-2 py-2 bg-base-300/50 border border-primary/20 rounded-md text-sm text-left text-base-content focus:outline-none focus:ring-1 focus:ring-primary flex items-center justify-between"
                        >
                            <span>
                                {dateRangeDisplay}
                            </span>
                            <span className="text-lg">🗓️</span>
                        </button>
                    </div>
                    {(startDate || endDate) && (
                        <button
                            onClick={() => { setStartDate(''); setEndDate(''); }}
                            className="px-4 py-2 bg-base-300/50 border border-primary/20 rounded-lg text-sm text-muted-content hover:bg-base-300 transition-colors flex-shrink-0"
                        >
                            Clear Dates
                        </button>
                    )}
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-base-300/30 p-1.5 rounded-lg">
                        <label htmlFor="category-filter" className="text-sm font-semibold text-muted-content flex-shrink-0 pl-2">Category:</label>
                        <select
                            id="category-filter"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full px-2 py-2 bg-base-300/50 border border-primary/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="all">All</option>
                            {TRANSACTION_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 bg-base-300/30 p-1.5 rounded-lg">
                        <label htmlFor="sort-by" className="text-sm font-semibold text-muted-content flex-shrink-0 pl-2">Sort by:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'type' | 'dueDate')}
                            className="w-full px-2 py-2 bg-base-300/50 border border-primary/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                            <option value="type">Type</option>
                            <option value="dueDate">Due Date</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                            className="px-3 py-1 bg-base-300/50 border border-primary/20 rounded-md text-lg font-bold hover:bg-primary/20 transition-colors"
                            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>

            <Calendar
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSelect={handleDateSelect}
                mode="range"
                initialStartDate={startDate}
                initialEndDate={endDate}
            />

            <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                {sortedAndFilteredTransactions.length > 0 ? (
                    <ul className="space-y-3">
                        {sortedAndFilteredTransactions.map(tx => (
                            <TransactionItem key={tx.id} tx={tx} onEdit={() => onEdit(tx)} onDelete={() => onDelete(tx.id)} onToggleCompleted={() => onToggleCompleted(tx.id)} />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12 text-muted-content">
                        <svg className="mx-auto h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-4 text-base font-semibold text-base-content font-bangla">কোনো ফলাফল পাওয়া যায়নি</h3>
                        <p className="mt-1 text-xs font-bangla">আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে দেখুন।</p>
                        {transactions.length === 0 && (
                             <button
                                onClick={onAddTransaction}
                                className="mt-6 px-5 py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all text-sm animate-pulse"
                            >
                                Add Your First Transaction
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TransactionList;`
  },
  {
    path: 'components/Sidebar.tsx',
    content: `


import React from 'react';
import { Contact } from '../types';

interface ContactListProps {
    title: string;
    contacts: Contact[];
    type: 'receivable' | 'payable';
    onEdit: (type: 'receivable' | 'payable', contact: Contact) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

const ContactListItem: React.FC<{ contact: Contact; onEdit: () => void; onDelete: () => void; }> = ({ contact, onEdit, onDelete }) => {
    const isReceivable = contact.type === 'receivable';
    const placeholder = \`https://placehold.co/60x60/0f1a30/ffd700?text=\${encodeURIComponent(contact.name.charAt(0))}\`;

    return (
        <li className="flex items-center gap-3">
            <img src={contact.photo || placeholder} alt={contact.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" />
            <div className="flex-grow">
                <p className="font-semibold font-bangla text-base-content leading-tight">{contact.name}</p>
                <span className="text-xs text-muted-content">{contact.reason}</span>
            </div>
             <div className={\`font-bold font-bangla text-lg \${isReceivable ? 'text-success' : 'text-danger'}\`}>
                ৳{contact.amount.toLocaleString('bn-BD')}
            </div>
            <div className="flex gap-1">
                <button onClick={onEdit} className="p-2 rounded-full hover:bg-primary/20 text-muted-content hover:text-primary transition-colors text-sm" title="Edit" aria-label="Edit contact">✏️</button>
                <button onClick={onDelete} className="p-2 rounded-full hover:bg-danger/20 text-muted-content hover:text-danger transition-colors text-sm" title="Delete" aria-label="Delete contact">🗑️</button>
            </div>
        </li>
    );
};

const ContactList: React.FC<ContactListProps> = ({ title, contacts, type, onEdit, onDelete, onAdd }) => {
    const filteredContacts = contacts.filter(c => c.type === type).sort((a,b) => b.id - a.id);
    const titleId = \`contact-list-\${type}\`;
    return (
        <section aria-labelledby={titleId} className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 id={titleId} className="font-bangla text-base font-bold text-base-content">{title}</h2>
                <button onClick={onAdd} className="w-8 h-8 rounded-full bg-primary text-primary-content text-xl font-semibold flex items-center justify-center hover:bg-primary-focus transition-transform hover:scale-110" title={\`Add \${type}\`}>+</button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
                {filteredContacts.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredContacts.map(contact => (
                            <ContactListItem key={contact.id} contact={contact} onEdit={() => onEdit(type, contact)} onDelete={() => onDelete(contact.id)} />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-muted-content">
                        <svg className="mx-auto h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <p className="mt-2 text-xs font-bangla text-base-content font-semibold">
                            {type === 'receivable'
                                ? 'কোন Receivable নেই'
                                : 'কোন Payable নেই'
                            }
                        </p>
                         <button 
                            onClick={onAdd}
                            className="mt-4 px-4 py-2 bg-primary/20 text-primary text-xs font-bold rounded-lg hover:bg-primary/30 transition-all"
                        >
                           {\`Add New \${type === 'receivable' ? 'Receivable' : 'Payable'}\`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

interface SidebarProps {
    contacts: Contact[];
    onEdit: (type: 'receivable' | 'payable', contact: Contact) => void;
    onDelete: (id: number) => void;
    onAddReceivable: () => void;
    onAddPayable: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    return (
        <>
            <ContactList 
                title="আমি পাবো (Receivable)"
                contacts={props.contacts}
                type="receivable"
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                onAdd={props.onAddReceivable}
            />
            <ContactList 
                title="আমার কাছে পাবে (Payable)"
                contacts={props.contacts}
                type="payable"
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                onAdd={props.onAddPayable}
            />
        </>
    );
};

export default Sidebar;`
  },
  {
    path: 'components/PersonsPage.tsx',
    content: `

import React from 'react';
import { Contact } from '../types';

interface PersonCardProps {
    contact: Contact;
    onEdit: (type: 'receivable' | 'payable', contact: Contact) => void;
    onDelete: (id: number) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ contact, onEdit, onDelete }) => {
    const isReceivable = contact.type === 'receivable';
    const placeholder = \`https://placehold.co/60x60/0f1a30/ffd700?text=\${encodeURIComponent(contact.name.charAt(0))}\`;

    return (
        <li className="bg-base-300/40 rounded-xl p-4 flex flex-col gap-3 relative group">
            <div className="flex items-center gap-3">
                <img src={contact.photo || placeholder} alt={contact.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                <div>
                    <p className="font-semibold font-bangla text-base-content">{contact.name}</p>
                    <span className={\`text-xs font-semibold \${isReceivable ? 'text-success' : 'text-danger'}\`}>
                        {isReceivable ? 'Receivable' : 'Payable'}
                    </span>
                </div>
            </div>
            <div className={\`font-bold font-bangla text-2xl text-center \${isReceivable ? 'text-success' : 'text-danger'}\`}>
                ৳{contact.amount.toLocaleString('bn-BD')}
            </div>
            <p className="text-xs text-muted-content text-center italic truncate" title={contact.reason}>{contact.reason || 'No reason specified'}</p>
            <span className="text-xs text-muted-content text-center">{new Date(contact.date).toLocaleDateString('bn-BD')}</span>

            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(contact.type, contact)} className="p-2 rounded-full bg-base-100 hover:bg-primary/20 text-muted-content hover:text-primary transition-colors text-sm" title="Edit" aria-label="Edit person">✏️</button>
                <button onClick={() => onDelete(contact.id)} className="p-2 rounded-full bg-base-100 hover:bg-danger/20 text-muted-content hover:text-danger transition-colors text-sm" title="Delete" aria-label="Delete person">🗑️</button>
            </div>
        </li>
    );
};

interface PersonsPageProps {
    contacts: Contact[];
    onEditContact: (type: 'receivable' | 'payable', contact: Contact) => void;
    onDeleteContact: (id: number) => void;
    onAddReceivable: () => void;
    onAddPayable: () => void;
}

const PersonsPage: React.FC<PersonsPageProps> = ({ contacts, onEditContact, onDeleteContact, onAddReceivable, onAddPayable }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <section aria-labelledby="persons-page-title" className="bg-base-200 border border-primary/20 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 id="persons-page-title" className="font-bangla text-xl font-bold text-base-content">All Persons</h2>
                    <div className="flex gap-2">
                        <button onClick={onAddReceivable} className="px-4 py-2 text-sm bg-success/20 text-success rounded-lg font-semibold hover:bg-success/30 transition-colors">+ Add Receivable</button>
                        <button onClick={onAddPayable} className="px-4 py-2 text-sm bg-danger/20 text-danger rounded-lg font-semibold hover:bg-danger/30 transition-colors">+ Add Payable</button>
                    </div>
                </div>

                {contacts.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {contacts.sort((a,b) => b.id - a.id).map(contact => (
                            <PersonCard key={contact.id} contact={contact} onEdit={onEditContact} onDelete={onDeleteContact} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-muted-content py-16">No persons added yet.</p>
                )}
            </section>
        </div>
    );
};

export default PersonsPage;`
  },
  {
    path: 'components/FAB.tsx',
    content: `

import React from 'react';

interface FABProps {
    onClick: () => void;
}

const FAB: React.FC<FABProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 w-14 h-14 bg-primary rounded-full text-primary-content text-3xl flex items-center justify-center shadow-lg shadow-primary/40 hover:bg-primary-focus transition-all transform hover:scale-110 z-40"
            title="Add Transaction"
            aria-label="Add new transaction"
        >
            +
        </button>
    );
};

export default FAB;`
  },
  {
    path: 'components/Modal.tsx',
    content: `

import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);
    const [titleId] = useState(() => \`modal-title-\${Math.random().toString(36).substr(2, 9)}\`);

    useEffect(() => {
        if (isOpen) {
            triggerElementRef.current = document.activeElement as HTMLElement;

            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements?.[0];
            const lastElement = focusableElements && focusableElements[focusableElements.length - 1];

            setTimeout(() => firstElement?.focus(), 100);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;
                if (!focusableElements || focusableElements.length === 0) return;

                if (e.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement?.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement?.focus();
                        e.preventDefault();
                    }
                }
            };
            
            const modalNode = modalRef.current;
            modalNode?.addEventListener('keydown', handleKeyDown);

            return () => {
                modalNode?.removeEventListener('keydown', handleKeyDown);
                triggerElementRef.current?.focus();
            };

        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                ref={modalRef}
                className="bg-base-200 border border-primary/30 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-[scale-in_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <h2 id={titleId} className="font-bangla text-xl font-bold text-primary text-center mb-6">{title}</h2>
                <button onClick={onClose} className="absolute top-4 right-4 text-muted-content hover:text-primary text-2xl transition-transform hover:rotate-90">×</button>
                {children}
            </div>
             <style>{\`
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            \`}</style>
        </div>
    );
};

export default Modal;`
  },
  {
    path: 'components/TransactionModal.tsx',
    content: `

import React, { useState, useEffect } from 'react';
import { Transaction, SavingsGoal } from '../types';
import { TRANSACTION_CATEGORIES } from '../constants';
import Modal from './Modal';
import Calendar from './Calendar';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Omit<Transaction, 'id' | 'date' | 'completed'> & { id?: number }) => void;
    transaction: Transaction | null;
    prefillData?: Partial<Transaction> | null;
    savingsGoals: SavingsGoal[];
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave, transaction, prefillData, savingsGoals }) => {
    const [type, setType] = useState<'income' | 'cost'>('cost');
    const [amount, setAmount] = useState<string>('');
    const [details, setDetails] = useState('');
    const [category, setCategory] = useState<string>('Other');
    const [dueDate, setDueDate] = useState('');
    const [savingsGoalId, setSavingsGoalId] = useState<string>('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        if (transaction) {
            setType(transaction.type);
            setAmount(String(transaction.amount));
            setDetails(transaction.details);
            setCategory(transaction.category || 'Other');
            setDueDate(transaction.dueDate || '');
            setSavingsGoalId(String(transaction.savingsGoalId || ''));
        } else if (prefillData) {
            setType(prefillData.type || 'cost');
            setAmount(String(prefillData.amount || ''));
            setDetails(prefillData.details || '');
            setCategory(prefillData.category || 'Other');
            setDueDate(prefillData.dueDate || '');
            setSavingsGoalId(String(prefillData.savingsGoalId || ''));
        } else {
            setType('cost');
            setAmount('');
            setDetails('');
            setCategory('Other');
            setDueDate('');
            setSavingsGoalId('');
        }
    }, [transaction, prefillData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !details) return;
        
        const goalId = savingsGoalId ? parseInt(savingsGoalId, 10) : undefined;
        
        onSave({
            id: transaction?.id,
            type,
            amount: parseFloat(amount),
            details,
            category,
            ...(type === 'cost' && dueDate && { dueDate }),
            ...(type === 'cost' && category === 'Savings' && { savingsGoalId: goalId }),
        });
    };

    const handleDateSelect = (dates: { start: string | null; end: string | null }) => {
        setDueDate(dates.start || '');
    };

    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        // Add time part to avoid timezone issues when creating date from YYYY-MM-DD
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={transaction ? 'Edit Transaction' : 'Add Transaction'}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <button type="button" onClick={() => setType('income')} className={\`py-2 rounded-lg font-semibold border-2 transition-colors \${type === 'income' ? 'bg-success text-white border-success' : 'bg-base-300/50 border-transparent text-muted-content'}\`}>আয় (Income)</button>
                    <button type="button" onClick={() => setType('cost')} className={\`py-2 rounded-lg font-semibold border-2 transition-colors \${type === 'cost' ? 'bg-danger text-white border-danger' : 'bg-base-300/50 border-transparent text-muted-content'}\`}>খরচ (Cost)</button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="tx-amount">Amount</label>
                    <input id="tx-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="tx-details">Details</label>
                    <input id="tx-details" type="text" value={details} onChange={e => setDetails(e.target.value)} className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="tx-category">Category</label>
                    <select
                        id="tx-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                    >
                        {TRANSACTION_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                {type === 'cost' && category === 'Savings' && savingsGoals.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="tx-goal">Link to Savings Goal (Optional)</label>
                        <select
                            id="tx-goal"
                            value={savingsGoalId}
                            onChange={(e) => setSavingsGoalId(e.target.value)}
                            className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="">None</option>
                            {savingsGoals.map(goal => (
                                <option key={goal.id} value={goal.id}>{goal.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                {type === 'cost' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="tx-due-date-btn">Due Date (Optional)</label>
                        <button
                            id="tx-due-date-btn"
                            type="button"
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-left flex justify-between items-center"
                        >
                            <span className={dueDate ? 'text-base-content' : 'text-muted-content'}>
                                {dueDate ? formatDateForDisplay(dueDate) : 'Select a date...'}
                            </span>
                            <span className="text-lg">🗓️</span>
                        </button>
                    </div>
                )}
                <div className="mt-6">
                  <button type="submit" className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all">{transaction ? 'Update' : 'Save'}</button>
                </div>
            </form>
             <Calendar
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSelect={handleDateSelect}
                mode="single"
                initialStartDate={dueDate}
            />
        </Modal>
    );
};

export default TransactionModal;`
  },
  {
    path: 'components/ContactModal.tsx',
    content: `import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Contact } from '../types';
import Modal from './Modal';
import { GoogleGenAI, Modality } from "@google/genai";
import Calendar from './Calendar';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (contact: Omit<Contact, 'date'>) => void;
    contact: Contact | null;
    type: 'receivable' | 'payable';
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSave, contact, type }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [dueDate, setDueDate] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // New states for image generation
    const [showGenerator, setShowGenerator] = useState(false);
    const [generatorPrompt, setGeneratorPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    const placeholder = \`https://placehold.co/60x60/0f1a30/ffd700?text=?\`;

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setAmount(String(contact.amount));
            setReason(contact.reason);
            setPhoto(contact.photo);
            setDueDate(contact.dueDate || '');
        } else {
            setName('');
            setAmount('');
            setReason('');
            setPhoto(undefined);
            setDueDate('');
        }
        setShowGenerator(false);
        setGeneratorPrompt('');
        setIsGenerating(false);
    }, [contact, isOpen]);

    useEffect(() => {
        if (showGenerator) {
            setGeneratorPrompt(\`A simple, professional cartoon avatar for \${name}, who is associated with: \${reason}. Minimalist, flat design, icon.\`);
        }
    }, [showGenerator, name, reason]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_DIM = 200;
                let { width, height } = img;

                if (width > height) {
                    if (width > MAX_DIM) {
                        height *= MAX_DIM / width;
                        width = MAX_DIM;
                    }
                } else {
                    if (height > MAX_DIM) {
                        width *= MAX_DIM / height;
                        height = MAX_DIM;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                setPhoto(dataUrl);
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleGeneratePhoto = async () => {
        if (!generatorPrompt || !ai) return;
        setIsGenerating(true);
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: generatorPrompt }],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });
    
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = \`data:image/png;base64,\${base64ImageBytes}\`;
                    setPhoto(imageUrl);
                    break;
                }
            }
            setShowGenerator(false);
        } catch (error) {
            console.error("Image generation failed:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentType = contact ? contact.type : type;
        onSave({
            id: contact?.id,
            type: currentType,
            name,
            amount: parseFloat(amount),
            reason,
            photo,
            dueDate: currentType === 'payable' ? dueDate : undefined,
        });
    };

    const handleDateSelect = (dates: { start: string | null; end: string | null }) => {
        setDueDate(dates.start || '');
    };

    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const title = contact 
        ? \`Edit \${contact.type}\` 
        : \`Add \${type.charAt(0).toUpperCase() + type.slice(1)}\`;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-4 mb-4">
                    <img src={photo || placeholder} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"/>
                    <div className="flex-grow space-y-2">
                        <div className="flex gap-2">
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full text-sm text-center py-2 bg-base-300/50 border border-dashed border-primary/30 rounded-lg hover:bg-primary/20 transition-colors">Upload</button>
                            <button type="button" onClick={() => setShowGenerator(s => !s)} className="w-full text-sm text-center py-2 bg-base-300/50 border border-dashed border-primary/30 rounded-lg hover:bg-primary/20 transition-colors">{showGenerator ? 'Cancel' : '✨ Generate'}</button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
                         {photo && <button type="button" onClick={() => setPhoto(undefined)} className="w-full text-xs text-center text-danger hover:underline">Remove Photo</button>}
                    </div>
                </div>

                {showGenerator && (
                    <div className="mb-4 space-y-2">
                        <label className="block text-sm font-medium text-muted-content" htmlFor="gen-prompt">Image Prompt</label>
                        <textarea 
                            id="gen-prompt"
                            value={generatorPrompt}
                            onChange={e => setGeneratorPrompt(e.target.value)}
                            placeholder="A simple, professional icon..."
                            className="w-full text-sm px-2 py-1.5 bg-base-300/50 border border-primary/20 rounded-lg"
                            rows={3}
                            disabled={isGenerating}
                        />
                        <button
                            type="button"
                            onClick={handleGeneratePhoto}
                            disabled={isGenerating || !generatorPrompt}
                            className="w-full text-sm text-center py-2 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors disabled:opacity-50"
                        >
                            {isGenerating ? 'Generating...' : 'Generate Image'}
                        </button>
                    </div>
                )}
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="contact-name">Name</label>
                    <input id="contact-name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="contact-amount">Amount</label>
                    <input id="contact-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" required />
                </div>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="contact-reason">Reason</label>
                    <input id="contact-reason" type="text" value={reason} onChange={e => setReason(e.target.value)} className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                {(contact?.type === 'payable' || type === 'payable') && (
                     <div className="mb-6">
                        <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="contact-due-date-btn">Due Date (for reminders)</label>
                        <button
                            id="contact-due-date-btn"
                            type="button"
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-left flex justify-between items-center"
                        >
                            <span className={dueDate ? 'text-base-content' : 'text-muted-content'}>
                                {dueDate ? formatDateForDisplay(dueDate) : 'Select a date...'}
                            </span>
                            <span className="text-lg">🗓️</span>
                        </button>
                    </div>
                )}
                <button type="submit" className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all">{contact ? 'Update' : 'Save'}</button>
            </form>
            <Calendar
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onSelect={handleDateSelect}
                mode="single"
                initialStartDate={dueDate}
            />
        </Modal>
    );
};

export default ContactModal;`
  },
  {
    path: 'components/PermissionModal.tsx',
    content: `import React, { useEffect, useRef, useState } from 'react';

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);
    const [titleId] = useState(() => \`perm-modal-title-\${Math.random().toString(36).substr(2, 9)}\`);
    
    useEffect(() => {
        if (isOpen) {
            triggerElementRef.current = document.activeElement as HTMLElement;

            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements?.[0];
            const lastElement = focusableElements && focusableElements[focusableElements.length - 1];

            setTimeout(() => firstElement?.focus(), 100);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key !== 'Tab' || !focusableElements || focusableElements.length === 0) return;

                if (e.shiftKey) { // Shift+Tab
                    if (document.activeElement === firstElement) {
                        lastElement?.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement?.focus();
                        e.preventDefault();
                    }
                }
            };
            
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                triggerElementRef.current?.focus();
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10010] p-4" onClick={onClose}>
            <div 
                ref={modalRef}
                className="bg-base-200 border border-danger rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-[scale-in_0.3s_ease-out]"
                onClick={e => e.stopPropagation()}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby="perm-modal-desc"
            >
                <h2 id={titleId} className="font-bangla text-2xl font-bold text-danger mb-3">LOGIN TO ADMIN</h2>
                <p id="perm-modal-desc" className="font-bangla text-base-content mb-5">সম্পূর্ণ অ্যাক্সেসের জন্য অ্যাডমিন হিসাবে লগইন করুন। অনুগ্রহ করে নিচের WhatsApp নম্বরে যোগাযোগ করুন।</p>
                <div className="my-5">
                    <a href="https://wa.me/8801402284322" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors bg-base-300/50 px-4 py-2 rounded-lg">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.52 3.48A11.87 11.87 0 0012 .6 11.4 11.4 0 00.6 12.08a11.27 11.27 0 001.58 5.83L.6 23.4l5.61-1.47a11.5 11.5 0 005.81 1.53A11.45 11.45 0 0023.4 12a11.87 11.87 0 00-2.88-8.52zM12 21.07a9.29 9.29 0 01-4.74-1.28l-.34-.2-3.33.87.9-3.25-.22-.33A9.22 9.22 0 012.72 12a9.28 9.28 0 1118.56 0A9.28 9.28 0 0112 21.07zm4.84-6.64c-.26-.13-1.54-.76-1.78-.85s-.42-.13-.6.13-.68.85-.83 1-.3.19-.56.06a7.65 7.65 0 01-2.25-1.39 8.43 8.43 0 01-1.56-1.94c-.16-.26 0-.4.12-.53.12-.12.26-.3.4-.45a1.79 1.79 0 00.27-.45.5.5 0 000-.47c-.07-.13-.6-1.44-.83-1.98s-.44-.46-.6-.47h-.51a1 1 0 00-.72.33A3 3 0 007 8.46a5.17 5.17 0 001.1 2.72A11.83 11.83 0 0012 14.68a5.44 5.44 0 001.38.18 3.28 3.28 0 002.13-1.36 2.69 2.69 0 00.33-1.39c0-.26-.02-.46-.06-.64a.47.47 0 00-.14-.22z"/></svg>
                        +8801402284322
                    </a>
                </div>
                <button onClick={onClose} className="font-bangla px-6 py-2 bg-base-300 hover:bg-base-300/70 border border-primary/20 rounded-lg font-semibold text-base-content transition-colors">বন্ধ করুন</button>
            </div>
             <style>{\`
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            \`}</style>
        </div>
    );
};

export default PermissionModal;`
  },
  {
    path: 'components/Toast.tsx',
    content: `

import React from 'react';

// Icons
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface ToastProps {
    message?: string;
    type?: 'success' | 'error';
    isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible }) => {
    if (!isVisible || !message) {
        return null;
    }

    const typeClasses = type === 'success' 
        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
        : 'bg-gradient-to-r from-red-500 to-rose-500';
        
    const Icon = type === 'success' ? <CheckCircleIcon /> : <XCircleIcon />;

    return (
        <>
            <div 
                className={\`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-semibold shadow-2xl z-[10030] flex items-center gap-3 animate-toast-in-out \${typeClasses}\`}
                role="alert"
                aria-live="assertive"
            >
                {Icon}
                <span>{message}</span>
            </div>
            <style>{\`
                @keyframes toast-in-out {
                    0% {
                        transform: translateY(-150%) translateX(-50%);
                        opacity: 0;
                    }
                    10%, 90% {
                        transform: translateY(0) translateX(-50%);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-150%) translateX(-50%);
                        opacity: 0;
                    }
                }
                .animate-toast-in-out {
                    animation: toast-in-out 3s ease-in-out forwards;
                }
            \`}</style>
        </>
    );
};

export default Toast;`
  },
  {
    path: 'components/WidgetMenu.tsx',
    content: `import React from 'react';
import { Widget, Role } from '../types';

interface WidgetMenuProps {
    onSelect: (widget: Widget) => void;
    role: Role | null;
}

const WIDGETS: { id: Widget; icon: string; name: string; roles: Role[] }[] = [
    { id: 'adminOverview', icon: '📊', name: 'Admin Overview', roles: ['super-admin'] },
    { id: 'dataSync', icon: '☁️', name: 'Google Drive Sync', roles: ['super-admin'] },
    { id: 'fingerprintApproval', icon: '👍', name: 'FP Requests', roles: ['super-admin'] },
    { id: 'password', icon: '🔧', name: 'Assign Password', roles: ['super-admin'] },
    { id: 'importPasswords', icon: '📥', name: 'Import Passwords', roles: ['super-admin'] },
    { id: 'data', icon: '💾', name: 'Data Management', roles: ['super-admin'] },
    { id: 'adminManagement', icon: '👥', name: 'Admin Management', roles: ['super-admin'] },
    { id: 'broadcast', icon: '📢', name: 'Broadcast', roles: ['super-admin']},
    { id: 'profileSettings', icon: '👤', name: 'Profile Settings', roles: ['admin'] },
    { id: 'calculator', icon: '🧮', name: 'Calculator', roles: ['super-admin', 'admin', 'viewer'] },
    { id: 'email', icon: '✉️', name: 'Email CV', roles: ['super-admin', 'admin', 'viewer'] },
    { id: 'theme', icon: '🎨', name: 'Theme Manager', roles: ['super-admin', 'admin', 'viewer'] },
    { id: 'about', icon: '👤', name: 'About Me', roles: ['super-admin', 'admin', 'viewer'] },
];

const WidgetMenu: React.FC<WidgetMenuProps> = ({ onSelect, role }) => {
    return (
        <div className="absolute top-12 right-0 w-48 bg-base-200 border border-primary/20 rounded-xl shadow-lg p-2 origin-top-right animate-[slide-down_0.2s_ease-out]">
            <ul className="space-y-1">
                {WIDGETS.map(widget => (
                    (role && widget.roles.includes(role)) && (
                        <li key={widget.id}>
                            <button
                                onClick={() => onSelect(widget.id)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-muted-content hover:bg-base-300 hover:text-base-content rounded-md transition-colors"
                            >
                                <span className="text-lg">{widget.icon}</span>
                                <span>{widget.name}</span>
                            </button>
                        </li>
                    )
                ))}
            </ul>
            <style>{\`
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            \`}</style>
        </div>
    );
};

export default WidgetMenu;`
  },
  {
    path: 'components/Widgets.tsx',
    content: `import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
        
        const credentialsText = \`Username: \${username}\\nPassword: \${passwordToAssign}\`;
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
                        <button key={btn} onClick={() => handleClick(btn)} className={\`py-3 rounded-md text-lg font-bold \${btn === '=' ? 'col-span-2 bg-primary text-primary-content' : 'bg-base-300'}\`}>
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
                        <button onClick={() => setTheme('light')} className={\`w-full py-2 rounded-md \${currentTheme === 'light' ? 'bg-primary text-primary-content' : 'bg-base-100'}\`}>Light</button>
                        <button onClick={() => setTheme('dark')} className={\`w-full py-2 rounded-md \${currentTheme === 'dark' ? 'bg-primary text-primary-content' : 'bg-base-100'}\`}>Dark</button>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-2">Color Palette</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {colors.map(color => (
                            <button key={color} onClick={() => setColorTheme(color)} className={\`h-10 rounded-md \${color} \${currentColorTheme === color ? 'ring-2 ring-offset-2 ring-offset-base-200 ring-primary' : ''}\`}></button>
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
        const startMarker = "PERSONAL PROFILE & CAREER SUMMARY\\\\n========================================\\\\n";
        const endMarker = "\\\\n========================================";
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
        const newPasswords = text.split(/[/s,]+/).filter(p => p.length > 0 && !existingPasswords.includes(p));
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
            const prompt = \`A professional, minimalist avatar icon for a person named \${username}. Flat design, simple, clean background.\`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { responseModalities: [Modality.IMAGE] },
            });
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = \`data:image/png;base64,\${base64ImageBytes}\`;
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
                <Input label="Display Name" type="text" value={username} onChange={e => setUsername(e.target.value)} />
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
        <span className={\`text-xs font-bold px-2 py-0.5 rounded-full \${colorClass}\`}>
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
                    className={\`bg-base-100 rounded-md flex flex-col transition-all duration-300 \${canDrag ? 'cursor-grab' : ''} \${draggedTask?.id === task.id ? 'opacity-30' : ''}\`}
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
                            <p className={\`\${task.status === 'completed' ? 'line-through text-muted-content' : 'text-base-content'}\`}>{task.text}</p>
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
             <style>{\`.animate-fade-in { animation: fade-in 0.3s ease-out; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .dragging-over { outline: 2px dashed hsl(var(--color-primary)); outline-offset: -2px; }\`}</style>
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
    const [rules, setRules] = useState(group.settings.rules.replace(/\\\\n/g, '\n')); // Un-escape newlines
    const [maxSize, setMaxSize] = useState(String(group.settings.maxFileSizeMB));

    const handleSave = () => {
        const updatedGroup: Group = {
            ...group,
            settings: {
                rules: rules.replace(/\n/g, '\\\\n'), // Re-escape newlines for storage
                maxFileSizeMB: parseInt(maxSize, 10),
            }
        };
        onSave(updatedGroup);
        showToast('Group settings updated!', 'success');
        onClose();
    };

    return (
        <WidgetContainer title="Group Settings" onClose={onClose}>
            <div className="space-y-3">
                <div>
                    <label className="text-sm font-medium text-muted-content">Group Rules</label>
                    <textarea value={rules} onChange={e => setRules(e.target.value)} rows={5} className="w-full p-2 bg-base-100 rounded-md mt-1" />
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-content">Max File Size (MB)</label>
                    <input type="number" value={maxSize} onChange={e => setMaxSize(e.target.value)} min="1" max="10" className="w-full p-2 bg-base-100 rounded-md mt-1" />
                </div>
                <button onClick={handleSave} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg">Save Settings</button>
            </div>
        </WidgetContainer>
    );
};

// --- 15. MobileServicePage ---
// Renamed to MobileServicePage to avoid conflict with a regular widget (not a modal)
interface MobileServicePageProps extends WidgetProps {
    mobilePaymentMethods: MobilePaymentMethod[];
    saveMobilePaymentMethods: (methods: MobilePaymentMethod[]) => void;
}

export const MobileServicePage: React.FC<{ isOpen: boolean; onClose: () => void; showToast: (message: string, type?: 'success' | 'error') => void; mobilePaymentMethods: MobilePaymentMethod[]; saveMobilePaymentMethods: (methods: MobilePaymentMethod[]) => void; }> = (props) => {
    if (!props.isOpen) return null;
    return (
        <div className="fixed inset-0 bg-base-100 z-40 p-4 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center pb-4 border-b border-primary/20 mb-6">
                    <h2 className="font-bangla text-2xl font-bold text-base-content">Mobile Service Page</h2>
                    <button onClick={props.onClose} className="text-2xl text-muted-content hover:text-primary transition-colors">×</button>
                </div>
                <p className="text-muted-content">Mobile service logic would go here. Data is available in state.</p>
            </div>
        </div>
    );
};

// --- 16. FingerprintApprovalWidget ---
interface FingerprintApprovalWidgetProps extends WidgetProps {
    requests: FingerprintResetRequest[];
    onApprove: (userId: number) => void;
    onDismiss: (userId: number) => void;
}
export const FingerprintApprovalWidget: React.FC<FingerprintApprovalWidgetProps> = ({ onClose, showToast, requests, onApprove, onDismiss }) => {
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const approvedRequests = requests.filter(req => req.status === 'approved');

    return (
        <WidgetContainer title="Fingerprint Reset Approvals" onClose={onClose}>
            <div className="space-y-4">
                <h4 className="font-semibold text-primary">Pending Requests ({pendingRequests.length})</h4>
                {pendingRequests.length === 0 ? (
                    <p className="text-muted-content text-sm">No pending reset requests.</p>
                ) : (
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {pendingRequests.map(req => (
                            <li key={req.userId} className="flex justify-between items-center bg-base-100 p-3 rounded-lg border border-primary/20">
                                <div>
                                    <p className="font-semibold">{req.username}</p>
                                    <p className="text-xs text-muted-content">Requested: {new Date(req.requestedAt).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => onApprove(req.userId)} className="px-3 py-1 bg-success text-white rounded-md text-sm font-semibold hover:bg-success/80 transition-colors">Approve</button>
                            </li>
                        ))}
                    </ul>
                )}
                
                <h4 className="font-semibold text-primary">Approved Requests ({approvedRequests.length})</h4>
                {approvedRequests.length === 0 ? (
                    <p className="text-muted-content text-sm">No approved requests ready for dismissal.</p>
                ) : (
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {approvedRequests.map(req => (
                            <li key={req.userId} className="flex justify-between items-center bg-base-100 p-3 rounded-lg border border-success/50">
                                <div>
                                    <p className="font-semibold text-success">{req.username} - Ready for Setup</p>
                                    <p className="text-xs text-muted-content">Approved: {new Date(req.requestedAt).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => onDismiss(req.userId)} className="px-3 py-1 bg-danger text-white rounded-md text-sm font-semibold hover:bg-danger/80 transition-colors">Dismiss</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </WidgetContainer>
    );
};
`
  }
]