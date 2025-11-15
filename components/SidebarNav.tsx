import React from 'react';
import { Page } from '../types';

interface SidebarNavProps {
    isCollapsed: boolean;
    activePage: Page;
    setActivePage: (page: Page) => void;
    onLogout: () => void;
    onOpenCustomizeModal: () => void;
    isMobile: boolean;
    isMobileNavOpen: boolean;
    onCloseMobileNav: () => void;
}

const NavItem: React.FC<{
    icon: string;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, isCollapsed, onClick }) => (
    <li>
        <button
            onClick={onClick}
            className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'text-muted-content hover:bg-base-300 hover:text-base-content'
            }`}
        >
            <span className="text-2xl">{icon}</span>
            <span
                className={`ml-4 font-semibold whitespace-nowrap transition-opacity duration-200 ${
                    isCollapsed ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {label}
            </span>
        </button>
    </li>
);

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed, activePage, setActivePage, onLogout, onOpenCustomizeModal, isMobile, isMobileNavOpen, onCloseMobileNav }) => {
    
    const handleItemClick = (action: Page | (() => void)) => {
        if (typeof action === 'string') {
            setActivePage(action);
        } else {
            action();
        }
        if (isMobile) {
            onCloseMobileNav();
        }
    };

    const sidebarClasses = isMobile
        ? `fixed top-0 left-0 h-full bg-base-200 border-r border-primary/10 flex flex-col z-50 transition-transform duration-300 w-64 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`
        : `fixed top-0 left-0 h-full bg-base-200 border-r border-primary/10 flex flex-col z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`;

    const isEffectivelyCollapsed = isMobile ? false : isCollapsed;

    return (
        <aside className={sidebarClasses}>
            <div className={`flex items-center justify-center h-20 border-b border-primary/10 ${isEffectivelyCollapsed ? '' : 'px-6'}`}>
                <span className={`text-3xl transition-transform duration-300 ${isEffectivelyCollapsed ? 'rotate-45' : ''}`}>💰</span>
                <h1
                    className={`ml-2 text-xl font-bold text-primary whitespace-nowrap transition-opacity duration-200 ${
                        isEffectivelyCollapsed ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    Finance
                </h1>
            </div>
            <nav className="flex-grow px-3 py-4">
                <ul>
                    <NavItem
                        icon="📊"
                        label="Dashboard"
                        isActive={activePage === 'dashboard'}
                        isCollapsed={isEffectivelyCollapsed}
                        onClick={() => handleItemClick('dashboard')}
                    />
                    <NavItem
                        icon="👥"
                        label="Persons"
                        isActive={activePage === 'persons'}
                        isCollapsed={isEffectivelyCollapsed}
                        onClick={() => handleItemClick('persons')}
                    />
                    <NavItem
                        icon="🛠️"
                        label="Tools"
                        isActive={activePage === 'tools'}
                        isCollapsed={isEffectivelyCollapsed}
                        onClick={() => handleItemClick('tools')}
                    />
                </ul>
            </nav>
            <div className="px-3 py-4 border-t border-primary/10">
                 <NavItem
                    icon="⚙️"
                    label="Settings"
                    isActive={false}
                    isCollapsed={isEffectivelyCollapsed}
                    onClick={() => handleItemClick(onOpenCustomizeModal)}
                />
                 <NavItem
                    icon="🚪"
                    label="Logout"
                    isActive={false}
                    isCollapsed={isEffectivelyCollapsed}
                    onClick={() => handleItemClick(onLogout)}
                />
            </div>
        </aside>
    );
};

export default SidebarNav;
