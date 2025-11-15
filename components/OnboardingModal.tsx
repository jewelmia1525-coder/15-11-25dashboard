import React from 'react';
import Modal from './Modal';

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Welcome! আপনাকে স্বাগতম!">
            <div className="text-center space-y-4">
                <img 
                    src="https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg" 
                    alt="Welcome" 
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary shadow-lg shadow-primary/30" 
                />
                
                <p className="text-base-content">
                    We've added some exciting new features to help you manage your finances better!
                </p>
                <p className="font-bangla text-base-content">
                    আপনার আর্থিক ব্যবস্থাপনাকে আরও সহজ করতে আমরা কিছু নতুন এবং আকর্ষণীয় ফিচার যুক্ত করেছি!
                </p>

                <ul className="text-left text-sm text-muted-content list-disc list-inside space-y-2 bg-base-300/30 p-4 rounded-lg font-bangla">
                    <li>
                        <strong>নতুন সাইডবার (New Sidebar):</strong> আপনার সব প্রধান পেজ (ড্যাশবোর্ড, ব্যক্তি, টুলস) এখন বাম দিকের নতুন সাইডবারে পাবেন।
                    </li>
                    <li>
                        <strong>সঞ্চয় লক্ষ্য (Savings Goals):</strong> ড্যাশবোর্ড থেকেই আপনার আর্থিক লক্ষ্য নির্ধারণ ও ট্র্যাক করুন।
                    </li>
                    <li>
                        <strong>অ্যাচিভমেন্টস (Achievements):</strong> নিয়মিত আর্থিক ট্র্যাকিং করে আকর্ষণীয় ব্যাজ আনলক করুন!
                    </li>
                </ul>
                
                <p className="text-xs text-muted-content font-bangla">
                    আপনি সাইডবারের <strong>সেটিংস</strong> লিঙ্ক থেকে আপনার ড্যাশবোর্ডে কোন উইজেটগুলো দেখবেন তা কাস্টমাইজ করতে পারেন।
                </p>
                
                <button onClick={onClose} className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus transition-all font-bangla">
                    শুরু করুন (Get Started)
                </button>
            </div>
        </Modal>
    );
};

export default OnboardingModal;
