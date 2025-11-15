import { useState, useEffect, useCallback, useMemo } from 'react';

// IMPORTANT: These are placeholders. You must get your own credentials from Google Cloud Console
// and enable the Google Drive API.
const API_KEY = 'YOUR_GOOGLE_API_KEY'; 
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

declare global {
    interface Window {
        gapi: any;
        google: any;
        tokenClient: any;
    }
}

export const useGoogleDrive = (showToast: (message: string, type?: 'success' | 'error') => void, username: string | null) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isDriveReady, setIsDriveReady] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);
    const [backupFileId, setBackupFileId] = useState<string | null>(null);

    const BACKUP_FILE_NAME = useMemo(() => {
        if (username) {
            return `finance_dashboard_backup_${username}.json`;
        }
        return 'finance_dashboard_backup.json'; // Fallback
    }, [username]);
    
    const findBackupFile = useCallback(async () => {
        if (!window.gapi.client) return null;
        try {
            const response = await window.gapi.client.drive.files.list({
                q: `name='${BACKUP_FILE_NAME}' and trashed=false`,
                fields: 'files(id, name, modifiedTime)',
                spaces: 'drive',
            });
            if (response.result.files && response.result.files.length > 0) {
                const file = response.result.files[0];
                setBackupFileId(file.id);
                setLastBackupDate(new Date(file.modifiedTime).toLocaleString());
                return file.id;
            }
            setBackupFileId(null);
            setLastBackupDate(null);
            return null;
        } catch (err) {
            console.error('Error finding backup file:', err);
            return null;
        }
    }, [BACKUP_FILE_NAME]);

    const tokenClientCallback = useCallback(async (resp: any) => {
        if (resp.error !== undefined) {
            showToast('Google Sign-In failed.', 'error');
            throw (resp);
        }
        setIsSignedIn(true);
        try {
            const profileRes = await window.gapi.client.request({
                path: 'https://www.googleapis.com/oauth2/v2/userinfo',
            });
            setUserProfile(profileRes.result);
            await findBackupFile();
        } catch (err) {
            console.error("Failed to fetch profile or find backup:", err);
        }
    }, [showToast, findBackupFile]);

    const initializeGapiClient = useCallback(async () => {
        await window.gapi.client.init({ apiKey: API_KEY, discoveryDocs: [DISCOVERY_DOC] });
        setIsDriveReady(true);
    }, []);

    const gapiLoaded = useCallback(() => {
        window.gapi.load('client', initializeGapiClient);
    }, [initializeGapiClient]);
    
    useEffect(() => {
        const gapiScript = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
        if (window.gapi && window.gapi.client) {
            gapiLoaded();
        } else if (gapiScript) {
            gapiScript.addEventListener('load', gapiLoaded);
            return () => gapiScript.removeEventListener('load', gapiLoaded);
        }
    }, [gapiLoaded]);

    useEffect(() => {
        if (!isDriveReady) return;

        const gsiScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        
        const initTokenClient = () => {
             if (window.google && window.google.accounts) {
                window.tokenClient = window.google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPES,
                    callback: tokenClientCallback,
                });
             }
        };

        if (window.google && window.google.accounts) {
            initTokenClient();
        } else if (gsiScript) {
            gsiScript.addEventListener('load', initTokenClient);
            return () => gsiScript.removeEventListener('load', initTokenClient);
        }
    }, [isDriveReady, tokenClientCallback]);


    const signIn = () => {
        if (!window.tokenClient) {
            showToast('Google services are not ready. Please wait.', 'error');
            return;
        }
        window.tokenClient.requestAccessToken({ prompt: '' });
    };

    const signOut = () => {
        const token = window.gapi.client.getToken();
        if (token !== null) {
            window.google.accounts.oauth2.revoke(token.access_token, () => {});
            window.gapi.client.setToken(null);
            setIsSignedIn(false);
            setUserProfile(null);
            setLastBackupDate(null);
            setBackupFileId(null);
            showToast('Signed out from Google Drive.');
        }
    };

    const backupData = async (data: any) => {
        if (!isSignedIn) { showToast('Please sign in first.', 'error'); return; }

        const boundary = '-------314159265358979323846';
        const delimiter = "\\r\\n--" + boundary + "\\r\\n";
        const close_delim = "\\r\\n--" + boundary + "--";

        const fileMetadata = { name: BACKUP_FILE_NAME, mimeType: 'application/json' };
        const multipartRequestBody =
            delimiter + 'Content-Type: application/json; charset=UTF-8\\r\\n\\r\\n' +
            JSON.stringify(fileMetadata) +
            delimiter + 'Content-Type: application/json\\r\\n\\r\\n' +
            JSON.stringify(data, null, 2) +
            close_delim;
        
        try {
            const fileId = backupFileId || await findBackupFile();
            const path = fileId ? `/upload/drive/v3/files/${fileId}` : '/upload/drive/v3/files';
            const method = fileId ? 'PATCH' : 'POST';

            const request = window.gapi.client.request({
                path: path,
                method: method,
                params: { uploadType: 'multipart' },
                headers: { 'Content-Type': 'multipart/related; boundary="' + boundary + '"' },
                body: multipartRequestBody,
            });
            await request;
            showToast('Backup successful!', 'success');
            await findBackupFile();
        } catch (err: any) {
            console.error("Backup error:", err);
            showToast(`Backup failed: ${err.result?.error?.message || 'Unknown error'}`, 'error');
        }
    };

    const restoreData = async (): Promise<any | null> => {
        if (!isSignedIn) { showToast('Please sign in first.', 'error'); return null; }
        
        const fileId = backupFileId || await findBackupFile();
        if (!fileId) { showToast('No backup file found to restore.', 'error'); return null; }

        try {
            const response = await window.gapi.client.drive.files.get({ fileId: fileId, alt: 'media' });
            return response.result;
        } catch (err: any) {
            console.error("Restore error:", err);
            showToast(`Restore failed: ${err.result?.error?.message || 'Unknown error'}`, 'error');
            return null;
        }
    };

    return { isSignedIn, isDriveReady, userProfile, lastBackupDate, signIn, signOut, backupData, restoreData };
};
