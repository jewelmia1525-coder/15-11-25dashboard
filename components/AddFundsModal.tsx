import React from 'react';
import { SavingsGoal } from '../types';
import Modal from './Modal';

interface AddFundsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (goal: SavingsGoal) => void;
    goal: SavingsGoal;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ isOpen, onClose, onConfirm, goal }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Add Funds to ${goal.name}`}>
            <div className="text-center space-y-4">
                <p className="text-base-content">
                    This will open the transaction form with the category pre-set to "Savings" and linked to this goal.
                </p>
                <p className="text-sm text-muted-content">
                    You can enter the amount you want to add there.
                </p>
                <div className="flex gap-4 pt-2">
                    <button onClick={onClose} className="w-full py-2 bg-base-300/50 rounded-lg font-semibold">
                        Cancel
                    </button>
                    <button onClick={() => onConfirm(goal)} className="w-full py-2 bg-primary text-primary-content rounded-lg font-bold">
                        Continue
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddFundsModal;
