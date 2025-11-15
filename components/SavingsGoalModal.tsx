import React, { useState, useEffect } from 'react';
import { SavingsGoal } from '../types';
import Modal from './Modal';

interface SavingsGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (goal: Omit<SavingsGoal, 'id' | 'savedAmount' | 'createdAt'> & { id?: number }) => void;
    goal: SavingsGoal | null;
}

const SavingsGoalModal: React.FC<SavingsGoalModalProps> = ({ isOpen, onClose, onSave, goal }) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (goal) {
                setName(goal.name);
                setTargetAmount(String(goal.targetAmount));
            } else {
                setName('');
                setTargetAmount('');
            }
        }
    }, [isOpen, goal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !targetAmount) return;
        onSave({
            id: goal?.id,
            name,
            targetAmount: parseFloat(targetAmount),
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={goal ? 'Edit Savings Goal' : 'Create New Savings Goal'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="goal-name">Goal Name</label>
                    <input
                        id="goal-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g., New Phone, Vacation"
                        className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-muted-content mb-1" htmlFor="goal-target">Target Amount</label>
                    <input
                        id="goal-target"
                        type="number"
                        value={targetAmount}
                        onChange={e => setTargetAmount(e.target.value)}
                        placeholder="e.g., 50000"
                        className="w-full px-3 py-2 bg-base-300/50 border border-primary/20 rounded-lg"
                        required
                        min="1"
                    />
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all">
                        {goal ? 'Update Goal' : 'Create Goal'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SavingsGoalModal;
