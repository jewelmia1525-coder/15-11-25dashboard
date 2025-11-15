import React, { useMemo } from 'react';
import { Role, AdminUser } from '../types';
import ProfileCard from './ProfileCard';
import { ROLE_DETAILS } from '../constants';

interface SuccessPopupProps {
    role: Role;
    adminUser: AdminUser | null;
}

const Sparkle: React.FC = () => {
    const style: React.CSSProperties = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 1}s`,
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
             <style>{`
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
            `}</style>
        </div>
    );
};

export default SuccessPopup;
