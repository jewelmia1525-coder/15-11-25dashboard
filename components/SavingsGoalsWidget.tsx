import React from 'react';
import { SavingsGoal } from '../types';

interface SavingsGoalsWidgetProps {
    goals: SavingsGoal[];
    onAddGoal: () => void;
    onEditGoal: (goal: SavingsGoal) => void;
    onDeleteGoal: (id: number) => void;
    onAddFunds: (goal: SavingsGoal) => void;
}

const SavingsGoalItem: React.FC<{
    goal: SavingsGoal;
    onAddFunds: () => void;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ goal, onAddFunds, onEdit, onDelete }) => {
    const progress = goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;
    const isCompleted = progress >= 100;
    const formatCurrency = (num: number) => `৳${num.toLocaleString('bn-BD')}`;

    return (
        <div className="bg-base-300/40 p-4 rounded-lg group relative">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-base-content">{goal.name} {isCompleted && '🎉'}</h4>
                    <p className="text-xs text-muted-content">
                        {formatCurrency(goal.savedAmount)} / {formatCurrency(goal.targetAmount)}
                    </p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={onEdit} className="text-xs p-1">✏️</button>
                    <button onClick={onDelete} className="text-xs p-1 text-danger">🗑️</button>
                </div>
            </div>
            <div className="w-full bg-base-100 rounded-full h-4 mt-2">
                <div
                    className="bg-primary h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                >
                    <span className="text-xs font-bold text-primary-content">{Math.round(progress)}%</span>
                </div>
            </div>
            {!isCompleted && (
                 <button 
                    onClick={onAddFunds} 
                    className="mt-3 w-full text-center text-sm py-1.5 bg-primary/20 text-primary font-semibold rounded-md hover:bg-primary/30 transition-colors"
                >
                    + Add Funds
                </button>
            )}
        </div>
    );
};

const SavingsGoalsWidget: React.FC<SavingsGoalsWidgetProps> = (props) => {
    return (
        <section aria-labelledby="savings-goals-title" className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 id="savings-goals-title" className="font-bangla text-lg font-bold text-base-content">Savings Goals</h2>
                <button 
                    onClick={props.onAddGoal}
                    className="px-4 py-1.5 text-sm bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/30 transition-colors"
                >
                    + New Goal
                </button>
            </div>
            {props.goals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-72 overflow-y-auto pr-2">
                    {props.goals.map(goal => (
                        <SavingsGoalItem 
                            key={goal.id} 
                            goal={goal} 
                            onAddFunds={() => props.onAddFunds(goal)}
                            onEdit={() => props.onEditGoal(goal)}
                            onDelete={() => props.onDeleteGoal(goal.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-content">
                     <p>🎯</p>
                    <p className="text-sm font-semibold mt-2">No savings goals yet.</p>
                    <p className="text-xs mt-1">Click 'New Goal' to start saving for something special!</p>
                </div>
            )}
        </section>
    );
};

export default SavingsGoalsWidget;
