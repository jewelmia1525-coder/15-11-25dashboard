
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
                    <button type="button" onClick={() => setType('income')} className={`py-2 rounded-lg font-semibold border-2 transition-colors ${type === 'income' ? 'bg-success text-white border-success' : 'bg-base-300/50 border-transparent text-muted-content'}`}>আয় (Income)</button>
                    <button type="button" onClick={() => setType('cost')} className={`py-2 rounded-lg font-semibold border-2 transition-colors ${type === 'cost' ? 'bg-danger text-white border-danger' : 'bg-base-300/50 border-transparent text-muted-content'}`}>খরচ (Cost)</button>
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

export default TransactionModal;