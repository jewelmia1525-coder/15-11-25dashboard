import React, { useState, useEffect, useMemo } from 'react';

interface CalendarProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (dates: { start: string | null; end: string | null }) => void;
    mode: 'single' | 'range';
    initialStartDate?: string | null;
    initialEndDate?: string | null;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose, onSelect, mode, initialStartDate, initialEndDate }) => {
    const [viewDate, setViewDate] = useState(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    useEffect(() => {
        if (isOpen) {
            const start = initialStartDate ? new Date(initialStartDate + 'T00:00:00') : null;
            const end = initialEndDate ? new Date(initialEndDate + 'T00:00:00') : null;
            
            setStartDate(start);
            setEndDate(end);
            setViewDate(start || new Date());
        }
    }, [isOpen, initialStartDate, initialEndDate]);

    const changeMonth = (amount: number) => {
        setViewDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    const handleDateClick = (day: Date) => {
        if (mode === 'single') {
            setStartDate(day);
            setEndDate(null);
        } else { // range mode
            if (!startDate || (startDate && endDate)) {
                setStartDate(day);
                setEndDate(null);
            } else if (startDate && !endDate) {
                if (day < startDate) {
                    setEndDate(startDate);
                    setStartDate(day);
                } else {
                    setEndDate(day);
                }
            }
        }
    };

    const handleApply = () => {
        onSelect({
            start: startDate ? startDate.toISOString().split('T')[0] : null,
            end: mode === 'range' ? (endDate ? endDate.toISOString().split('T')[0] : (startDate ? startDate.toISOString().split('T')[0] : null)) : null
        });
        onClose();
    };

    const calendarGrid = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startDayOfWeek = firstDayOfMonth.getDay();

        const grid: (Date | null)[] = [];
        
        for (let i = 0; i < startDayOfWeek; i++) {
            grid.push(null);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push(new Date(year, month, i));
        }
        
        return grid;
    }, [viewDate]);
    
    if (!isOpen) return null;

    const today = new Date();
    today.setHours(0,0,0,0);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10005] p-4" onClick={onClose}>
            <div
                className="bg-base-200 border border-primary/30 rounded-2xl shadow-2xl w-full max-w-sm p-4 animate-[scale-in_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-base-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="font-bold text-lg text-base-content">
                        {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-base-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-content mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {calendarGrid.map((day, index) => {
                        if (!day) return <div key={`empty-${index}`}></div>;
                        
                        const isSelectedStart = startDate && day.getTime() === startDate.getTime();
                        const isSelectedEnd = endDate && day.getTime() === endDate.getTime();
                        const isHovering = hoverDate && startDate && !endDate;
                        const isInRange = startDate && endDate && day > startDate && day < endDate;
                        const isInHoverRange = isHovering && ((day > startDate && day < hoverDate) || (day < startDate && day > hoverDate));

                        let classes = 'w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ';

                        if (day.getTime() === today.getTime()) {
                            classes += 'border-2 border-primary ';
                        }

                        if (isInRange || isInHoverRange) {
                            classes += 'bg-primary/20 text-base-content rounded-none ';
                        }
                        
                        if (isSelectedStart || isSelectedEnd) {
                            classes += 'bg-primary text-primary-content font-bold ';
                             if(isSelectedStart && endDate) classes += 'rounded-r-none ';
                             if(isSelectedEnd && startDate) classes += 'rounded-l-none ';
                        } else if (startDate && !endDate && hoverDate && day.getTime() === hoverDate.getTime()) {
                            classes += 'bg-primary/50 ';
                        } else {
                            classes += 'hover:bg-base-300 ';
                        }

                        return (
                            <div
                                key={day.toISOString()}
                                className={classes}
                                onClick={() => handleDateClick(day)}
                                onMouseEnter={() => mode === 'range' && setHoverDate(day)}
                                onMouseLeave={() => mode === 'range' && setHoverDate(null)}
                            >
                                {day.getDate()}
                            </div>
                        );
                    })}
                </div>
                
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-primary/20">
                    <button onClick={onClose} className="px-4 py-2 bg-base-300 text-base-content font-semibold rounded-lg hover:bg-primary/10">Cancel</button>
                    <button onClick={handleApply} className="px-6 py-2 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus">Apply</button>
                </div>
            </div>
             <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Calendar;
