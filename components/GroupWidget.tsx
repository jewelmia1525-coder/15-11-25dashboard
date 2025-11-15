import React from 'react';
import { Group, AdminUser } from '../types';

interface GroupWidgetProps {
    group: Group | null;
    allUsers: AdminUser[];
    onOpenGroupPage: () => void;
}

const GroupWidget: React.FC<GroupWidgetProps> = ({ group, allUsers, onOpenGroupPage }) => {
    if (!group) {
        return (
            <section className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg text-center">
                <p className="text-muted-content">Group Hub is loading...</p>
            </section>
        );
    }
    
    // Create a map for quick user lookup
    const userMap = new Map<number, AdminUser>();
    allUsers.forEach(u => userMap.set(u.id, u));
    // Add super-admin virtual user
    userMap.set(0, { id: 0, username: 'super-admin', email: '', mobile: '', password: '', photo: 'https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg' });

    return (
        <section aria-labelledby="group-hub-title" className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg">
            <h2 id="group-hub-title" className="font-bangla text-lg font-bold text-base-content mb-4">{group.name}</h2>
            
            <div className="flex items-center mb-4">
                <div className="flex -space-x-3">
                    {group.members.slice(0, 7).map(member => {
                        const user = userMap.get(member.userId);
                        if (!user) return null;
                        return (
                            <img 
                                key={user.id}
                                src={user.photo || `https://placehold.co/40x40/0f1a30/ffd700?text=${(user.groupDisplayName || user.username).charAt(0)}`}
                                alt={user.groupDisplayName || user.username}
                                title={user.groupDisplayName || user.username}
                                className="w-10 h-10 rounded-full border-2 border-base-200 object-cover"
                            />
                        );
                    })}
                </div>
                {group.members.length > 7 && <span className="ml-4 text-sm font-semibold text-muted-content">+{group.members.length - 7} more</span>}
            </div>

            <p className="text-sm text-muted-content mb-4">
                Connect with your team, share ideas, and stay in sync.
            </p>

            <button
                onClick={onOpenGroupPage}
                className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all"
            >
                Join Conversation
            </button>
        </section>
    );
};

export default GroupWidget;