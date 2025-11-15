import React from 'react';
import { Contact } from '../types';

interface UpcomingBillsWidgetProps {
    contacts: Contact[];
}

const UpcomingBillsWidget: React.FC<UpcomingBillsWidgetProps> = ({ contacts }) => {
    const upcomingBills = contacts
        .filter(c => c.type === 'payable' && c.dueDate)
        .map(c => ({
            ...c,
            daysUntilDue: Math.ceil((new Date(c.dueDate!).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
        }))
        .filter(c => c.daysUntilDue <= 30) // Show bills due in the next 30 days
        .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

    const DueDateBadge: React.FC<{ days: number }> = ({ days }) => {
        if (days < 0) {
            return <span className="text-xs font-bold text-danger">Overdue by {-days}d</span>;
        }
        if (days === 0) {
            return <span className="text-xs font-bold text-yellow-500">Due Today</span>;
        }
        if (days <= 7) {
            return <span className="text-xs font-bold text-yellow-600">Due in {days}d</span>;
        }
        return <span className="text-xs text-muted-content">Due in {days}d</span>;
    };

    return (
        <section aria-labelledby="upcoming-bills-title" className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg">
            <h2 id="upcoming-bills-title" className="font-bangla text-lg font-bold text-base-content mb-4">Upcoming Bills</h2>
            {upcomingBills.length > 0 ? (
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {upcomingBills.map(bill => (
                        <li key={bill.id} className="flex items-center gap-3 p-2 bg-base-300/40 rounded-lg">
                            <div className="flex-grow">
                                <p className="font-semibold text-base-content">{bill.reason}</p>
                                <p className="text-xs text-muted-content">To: {bill.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold font-bangla text-danger">৳{bill.amount.toLocaleString('bn-BD')}</p>
                                <DueDateBadge days={bill.daysUntilDue} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8 text-muted-content">
                    <p>🎉</p>
                    <p className="text-sm font-semibold mt-2">No upcoming bills in the next 30 days.</p>
                </div>
            )}
        </section>
    );
};

export default UpcomingBillsWidget;
