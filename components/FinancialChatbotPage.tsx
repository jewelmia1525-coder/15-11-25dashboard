import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Transaction, Contact, Budget } from '../types';

interface FinancialChatbotPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    transactions: Transaction[];
    contacts: Contact[];
    budgets: Budget[];
}

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const FinancialChatbotPage: React.FC<FinancialChatbotPageProps> = ({ isOpen, onClose, showToast, transactions, contacts, budgets }) => {
    const [conversation, setConversation] = useState<ChatMessage[]>([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const ai = useMemo(() => process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation, isLoading]);

    const generateDataSummary = () => {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalCost = transactions.filter(t => t.type === 'cost').reduce((sum, t) => sum + t.amount, 0);
        const totalReceivable = contacts.filter(c => c.type === 'receivable').reduce((sum, c) => sum + c.amount, 0);
        const totalPayable = contacts.filter(c => c.type === 'payable').reduce((sum, c) => sum + c.amount, 0);

        // Get last 30 days of transactions for context
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentTransactions = transactions.filter(t => new Date(t.date) > thirtyDaysAgo);

        return JSON.stringify({
            summary: {
                totalBalance: totalIncome - totalCost,
                totalIncome,
                totalCost,
                totalReceivable,
                totalPayable,
            },
            budgets,
            recentTransactions: recentTransactions.slice(-20), // Limit to last 20 for prompt size
        }, null, 2);
    };

    const handleSend = async (e: React.FormEvent, predefinedQuery?: string) => {
        e.preventDefault();
        const currentQuery = predefinedQuery || query;
        if (!currentQuery.trim() || !ai) {
            if (!ai) showToast('AI service is not configured.', 'error');
            return;
        }

        setIsLoading(true);
        setConversation(prev => [...prev, { role: 'user', content: currentQuery }]);
        setQuery('');

        try {
            const dataSummary = generateDataSummary();
            const prompt = `You are a friendly financial assistant named 'FinPal'. Your purpose is to help the user understand their financial data.
            Analyze the provided JSON data to answer the user's question. 
            Provide concise, clear, and helpful answers. All monetary values are in Bangladeshi Taka (৳).
            Always respond in a conversational and encouraging tone, using Bangla where appropriate. Do not just spit out data; interpret it for the user. For example, if asked about spending, don't just give a number, but compare it to their budget if possible.
            
            Here is the user's financial data summary:
            ${dataSummary}

            Now, please answer this question: "${currentQuery}"`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setConversation(prev => [...prev, { role: 'model', content: response.text }]);

        } catch (error) {
            console.error("Chatbot error:", error);
            showToast('Failed to get a response from AI.', 'error');
            setConversation(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;
    
    const suggestionPrompts = [
        "গত মাসে আমার যাতায়াত খাতে কত খরচ হয়েছে?", // "How much did I spend on transport last month?"
        "আমার সবচেয়ে বড় খরচের খাত কোনটি?", // "What is my biggest spending category?"
        "Show my total balance.",
        "How much do I have in payables?"
    ];

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center gap-2 sm:gap-4 mb-4">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-base-300 transition-colors" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">Financial AI Chatbot</h1>
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-col p-4 overflow-hidden">
                <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                    {conversation.length === 0 && !isLoading && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                            <div className="text-5xl mb-4">💬</div>
                            <h2 className="text-2xl font-bold text-base-content">Ask me anything about your finances!</h2>
                            <p className="text-muted-content mt-2 max-w-md">Try one of the suggestions below, or type your own question.</p>
                             <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {suggestionPrompts.map(p => (
                                    <button key={p} onClick={(e) => handleSend(e, p)} className="px-3 py-1.5 bg-base-300/50 text-primary text-sm font-semibold rounded-full hover:bg-primary/20 transition-colors font-bangla">
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {conversation.map((msg, index) => (
                        <div key={index} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-xl p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-content rounded-br-none' : 'bg-base-300/50 rounded-bl-none'}`}>
                                <p className="font-bangla">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3 p-4 self-start">
                            <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                 <div className="flex-shrink-0 pt-4 border-t border-primary/20">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input 
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type your financial question..."
                            className="w-full px-4 py-3 bg-base-300/50 border border-primary/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-bangla"
                            disabled={isLoading}
                        />
                        <button id="financial-chatbot-send-button" type="submit" className="px-6 py-3 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all disabled:opacity-50" disabled={isLoading || !query.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default FinancialChatbotPage;