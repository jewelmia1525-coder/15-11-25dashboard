import React, { useState, useMemo } from 'react';
import { AdminUser, FingerprintResetRequest } from '../types';
import Modal from './Modal';

// Helper function to encode ArrayBuffer to Base64URL string
const bufferToBase64Url = (buffer: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

interface FingerprintSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    currentUser: AdminUser;
    onUpdateUser: (user: AdminUser) => void;
    resetRequests: FingerprintResetRequest[];
    onRequestReset: () => void;
    onCompleteReset: (userId: number) => void;
}

const FingerprintSetupModal: React.FC<FingerprintSetupModalProps> = ({ isOpen, onClose, showToast, currentUser, onUpdateUser, resetRequests, onRequestReset, onCompleteReset }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const userRequest = useMemo(() => 
        resetRequests.find(req => req.userId === currentUser.id),
    [resetRequests, currentUser.id]);

    const handleSetupBiometrics = async () => {
        if (!navigator.credentials || !navigator.credentials.create) {
            showToast('Biometric authentication is not supported on this device.', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const publicKeyCredentialCreationOptions: CredentialCreationOptions = {
                publicKey: {
                    challenge: window.crypto.getRandomValues(new Uint8Array(32)),
                    rp: { name: "Finance Dashboard" },
                    user: {
                        id: window.crypto.getRandomValues(new Uint8Array(16)),
                        name: currentUser.username,
                        displayName: currentUser.username,
                    },
                    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
                    authenticatorSelection: {
                        authenticatorAttachment: 'platform',
                        userVerification: 'required',
                    },
                    timeout: 60000,
                    attestation: 'none'
                }
            };
            
            const credential = await navigator.credentials.create(publicKeyCredentialCreationOptions);
            
            if (credential) {
                const credentialId = bufferToBase64Url((credential as any).rawId);
                onUpdateUser({ ...currentUser, fingerprintId: credentialId });
                showToast('Fingerprint configured successfully!', 'success');
                if (userRequest) {
                    onCompleteReset(currentUser.id);
                }
                onClose();
            }
        } catch (err) {
            console.error('WebAuthn Error:', err);
            showToast('Failed to add fingerprint. You may have cancelled the request.', 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleVerifyAndInitialSetup = async () => {
        setError('');
        if (phone !== currentUser.mobile || password !== currentUser.password) {
            setError('Phone number or password does not match.');
            return;
        }
        await handleSetupBiometrics();
    };

    const handleRequestResetClick = () => {
        onRequestReset();
    };

    const renderContent = () => {
        if (!currentUser.fingerprintId) {
            // Initial setup flow
            return (
                <div className="space-y-4">
                    <p className="text-sm text-center text-muted-content">For added security, please verify your identity to enable passwordless login.</p>
                    <div>
                        <label className="text-xs font-semibold text-muted-content" htmlFor="fp-phone">Phone Number</label>
                        <input id="fp-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full mt-1 px-3 py-2 bg-base-100 border border-primary/20 rounded-lg" required />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-content" htmlFor="fp-password">Password</label>
                        <input id="fp-password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 bg-base-100 border border-primary/20 rounded-lg" required />
                    </div>
                    {error && <p className="text-xs text-danger text-center">{error}</p>}
                    <div className="flex gap-2 !mt-6">
                        <button onClick={onClose} className="w-full py-2 bg-base-300/50 text-base-content font-bold rounded-lg hover:bg-base-300">Skip</button>
                        <button onClick={handleVerifyAndInitialSetup} disabled={isLoading || !phone || !password} className="w-full py-2 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus disabled:opacity-50">
                            {isLoading ? 'Processing...' : 'Verify & Add'}
                        </button>
                    </div>
                </div>
            );
        }

        if (userRequest) {
            if (userRequest.status === 'approved') {
                return (
                    <div className="text-center space-y-4">
                        <h3 className="font-semibold text-lg text-primary">Reset Approved!</h3>
                        <p className="text-sm text-muted-content">Your request has been approved by the super-admin. Click below to set up your new fingerprint login.</p>
                        <button onClick={handleSetupBiometrics} disabled={isLoading} className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus disabled:opacity-50">
                            {isLoading ? 'Processing...' : 'Setup New Fingerprint'}
                        </button>
                    </div>
                );
            }
            if (userRequest.status === 'pending') {
                return (
                    <div className="text-center space-y-4">
                        <h3 className="font-semibold text-lg text-yellow-500">Request Pending</h3>
                        <p className="text-sm text-muted-content">Your reset request is awaiting approval from the super-admin. You will receive a notification when it's approved.</p>
                        <button onClick={onClose} className="w-full py-2.5 bg-base-300/50 text-base-content font-bold rounded-lg hover:bg-base-300">OK</button>
                    </div>
                );
            }
        }
        
        return (
            <div className="text-center space-y-4">
                 <h3 className="font-semibold text-lg text-base-content">Fingerprint is Active</h3>
                 <p className="text-sm text-muted-content">You can use your fingerprint to log in. If you've changed devices or need to reset it, you must request approval from the super-admin.</p>
                 <button onClick={handleRequestResetClick} className="w-full py-2.5 bg-primary text-primary-content font-bold rounded-lg hover:bg-primary-focus">
                    Request Fingerprint Reset
                </button>
            </div>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Fingerprint Login">
            {renderContent()}
        </Modal>
    );
};

export default FingerprintSetupModal;