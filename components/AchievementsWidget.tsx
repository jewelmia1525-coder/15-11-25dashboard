import React from 'react';
import { Achievement } from '../types';

interface AchievementsWidgetProps {
    achievements: Achievement[];
}

const AchievementBadge: React.FC<{ ach: Achievement }> = ({ ach }) => (
    <div
        className={`flex flex-col items-center justify-center text-center p-3 rounded-lg transition-all duration-300 ${
            ach.achieved
                ? 'bg-primary/10 border border-primary/20'
                : 'bg-base-300/40 opacity-50'
        }`}
        title={`${ach.name}: ${ach.description}${ach.achieved ? ' (Unlocked!)' : ' (Locked)'}`}
    >
        <div className={`text-4xl transition-transform duration-300 ${ach.achieved ? 'transform scale-110' : ''}`}>
            {ach.icon}
        </div>
        <p className="text-xs font-semibold mt-2">{ach.name}</p>
    </div>
);

const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ achievements }) => {
    const unlockedCount = achievements.filter(a => a.achieved).length;

    return (
        <section aria-labelledby="achievements-title" className="bg-base-200 border border-primary/20 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 id="achievements-title" className="font-bangla text-lg font-bold text-base-content">Achievements</h2>
                <span className="text-sm font-bold text-primary">{unlockedCount} / {achievements.length}</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {achievements.map(ach => (
                    <AchievementBadge key={ach.id} ach={ach} />
                ))}
            </div>
        </section>
    );
};

export default AchievementsWidget;
