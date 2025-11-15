export type Role = 'viewer' | 'admin' | 'super-admin';

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
}