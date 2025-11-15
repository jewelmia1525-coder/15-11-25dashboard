import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Group, AdminUser, Role, GroupMessage, GameSession, GroupMember, LudoGameState, LudoPieceState, TicTacToeGameState, ConnectFourGameState, GameType } from '../types';

interface GroupCollaborationPageProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type?: 'success' | 'error') => void;
    group: Group;
    onSave: (group: Group) => void;
    currentUser: AdminUser; // Logged-in admin user
    allUsers: AdminUser[];
    currentUserRole: Role | null;
}

// Ludo Game Constants (placeholders for now)
// ... Ludo constants would go here ...

const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const GroupCollaborationPage: React.FC<GroupCollaborationPageProps> = (props) => {
    const { isOpen, onClose, showToast, group, onSave, currentUser, allUsers, currentUserRole } = props;
    const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'games'>('chat');
    const [gameToApprove, setGameToApprove] = useState<GameSession | null>(null);
    const [activeGameId, setActiveGameId] = useState<string | null>(null);
    
    const userMap = useMemo(() => {
        const map = new Map<number, AdminUser>();
        allUsers.forEach(u => map.set(u.id, u));
        // Super-admin has virtual ID 0
        map.set(0, { id: 0, username: 'super-admin', email: '', mobile: '', password: '', photo: 'https://i.postimg.cc/brTGQ2wL/rsz-1unnamed.jpg', groupDisplayName: 'Super Admin' });
        return map;
    }, [allUsers]);

    const currentUserId = currentUserRole === 'super-admin' ? 0 : currentUser.id;

    // Effect to mark messages as read
    useEffect(() => {
        if (isOpen && activeTab === 'chat') {
            const unreadMessages = group.messages.filter(msg => 
                msg.senderId !== currentUserId && 
                (!msg.readBy || !msg.readBy.includes(currentUserId))
            );

            if (unreadMessages.length > 0) {
                const updatedMessages = group.messages.map(msg => {
                    const shouldMarkAsRead = unreadMessages.some(unread => unread.id === msg.id);
                    if (shouldMarkAsRead) {
                        const readBy = msg.readBy ? [...msg.readBy, currentUserId] : [currentUserId];
                        return { ...msg, readBy: [...new Set(readBy)] };
                    }
                    return msg;
                });
                // This updates the state without showing a toast or causing visual disruption
                onSave({ ...group, messages: updatedMessages });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, activeTab, group.messages, currentUserId]);


    const createGame = (type: GameType) => {
        if (type !== 'ludo' && type !== 'tic-tac-toe' && type !== 'connect-four') {
            showToast(`${type} is not yet implemented.`, 'error');
            return;
        }

        const newGame: GameSession = {
            id: `${type}-${Date.now()}`,
            type,
            createdBy: currentUserId,
            players: [currentUserId],
            status: 'pending',
            joinRequests: [],
        };
        const updatedGroup = { ...group, games: [...group.games, newGame] };
        onSave(updatedGroup);

        const sender = userMap.get(currentUserId);
        const gameName = type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const inviteMessage: GroupMessage = {
            id: Date.now(),
            senderId: currentUserId,
            content: `${sender?.groupDisplayName || sender?.username} created a ${gameName} game! Join here: game://${type}/${newGame.id}`,
            timestamp: new Date().toISOString(),
        };
        onSave({ ...updatedGroup, messages: [...group.messages, inviteMessage] });
        showToast(`${gameName} game created!`, 'success');
    };

    
    const handleApproveJoin = (gameId: string, userId: number) => {
        const game = group.games.find(g => g.id === gameId);
        if(!game) return;
        
        const maxPlayers = game.type === 'ludo' ? 4 : 2;
        if (game.players.length >= maxPlayers) {
            showToast("Cannot approve, the game is full.", 'error');
            // Remove the request as it can't be fulfilled
            const updatedGames = group.games.map(g => g.id === gameId ? {...g, joinRequests: g.joinRequests.filter(id => id !== userId)} : g);
            onSave({ ...group, games: updatedGames });
            setGameToApprove(null);
            return;
        }

        const updatedGames = group.games.map(g => {
            if (g.id === gameId) {
                return {
                    ...g,
                    players: [...new Set([...g.players, userId])],
                    joinRequests: g.joinRequests.filter(id => id !== userId),
                    status: 'pending' as 'pending' | 'active' | 'finished',
                };
            }
            return g;
        });
        onSave({ ...group, games: updatedGames });
        setGameToApprove(null);
    };

    const handleGameAction = (gameId: string, action: any) => {
        const game = group.games.find(g => g.id === gameId);
        if (!game) return;

        let updatedGame = { ...game };

        // Game logic here
        // ... (Game logic for START_GAME, Ludo, TicTacToe, ConnectFour) ...

        const updatedGames = group.games.map(g => g.id === gameId ? updatedGame : g);
        onSave({ ...group, games: updatedGames });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-base-100 z-[10000] flex flex-col p-4 sm:p-6 md:p-8 animate-fade-in">
            <header className="flex-shrink-0 flex items-center justify-between gap-4 mb-4">
                 <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-base-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
                    <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-primary">{group.name}</h1>
                </div>
            </header>
            <main className="flex-grow bg-base-200 border border-primary/20 rounded-2xl flex flex-row overflow-hidden">
                {/* Member List */}
                <div className="w-24 bg-base-300/30 p-2 flex flex-col items-center gap-2 overflow-y-auto">
                    {group.members.map(member => {
                        const user = userMap.get(member.userId);
                        if (!user) return null;
                        return (
                            <img 
                                key={user.id} 
                                src={user.photo || `https://placehold.co/48x48/0f1a30/ffd700?text=${(user.groupDisplayName || user.username).charAt(0)}`} 
                                alt={user.groupDisplayName || user.username}
                                title={user.groupDisplayName || user.username}
                                className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                            />
                        );
                    })}
                </div>
                {/* Content */}
                <div className="flex-grow flex flex-col">
                    <div className="p-2 border-b border-primary/20 flex-shrink-0 flex items-center justify-center gap-2">
                         <TabButton label="Chat" icon="💬" isActive={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
                         <TabButton label="Video Call" icon="📹" isActive={activeTab === 'call'} onClick={() => setActiveTab('call')} />
                         <TabButton label="Games" icon="🎲" isActive={activeTab === 'games'} onClick={() => setActiveTab('games')} />
                    </div>
                    {/* Active Tab Content */}
                    <div className="flex-grow overflow-hidden relative">
                       {activeTab === 'chat' && <ChatView group={group} onSave={onSave} userMap={userMap} currentUserId={currentUserId} showToast={showToast} setActiveTab={setActiveTab} setActiveGameId={setActiveGameId} />}
                       {activeTab === 'call' && <VideoCallView group={group} userMap={userMap} />}
                       {activeTab === 'games' && <GamesView group={group} userMap={userMap} currentUserId={currentUserId} createGame={createGame} setGameToApprove={setGameToApprove} activeGameId={activeGameId} setActiveGameId={setActiveGameId} onGameAction={handleGameAction} showToast={showToast} />}
                    </div>
                </div>
                 {gameToApprove && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                        <div className="bg-base-200 p-6 rounded-lg max-w-sm w-full">
                            <h3 className="font-bold text-lg">Approve Join Requests</h3>
                            <ul className="my-4 space-y-2">
                                {gameToApprove.joinRequests.map(userId => {
                                    const user = userMap.get(userId);
                                    return (
                                        <li key={userId} className="flex justify-between items-center bg-base-300/50 p-2 rounded">
                                            <span>{user?.groupDisplayName || user?.username}</span>
                                            <button onClick={() => handleApproveJoin(gameToApprove.id, userId)} className="px-3 py-1 bg-success text-white text-sm rounded">Approve</button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button onClick={() => setGameToApprove(null)} className="w-full mt-2 py-2 bg-base-300 rounded-lg">Close</button>
                        </div>
                    </div>
                 )}
            </main>
        </div>
    );
};

// Sub-components
const TabButton: React.FC<{label: string, icon: string, isActive: boolean, onClick: () => void}> = ({label, icon, isActive, onClick}) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center gap-2 transition-colors ${isActive ? 'bg-primary/20 text-primary' : 'text-muted-content hover:bg-primary/10'}`}>
        {icon} <span>{label}</span>
    </button>
);

const VideoCallView: React.FC<any> = ({ group, userMap }) => (
    <div className="flex flex-col h-full p-4">
        <div className="p-4 bg-yellow-500/10 text-yellow-700 text-sm rounded-lg text-center mb-4">
            <strong>Note:</strong> This is a UI preview. A fully functional group video call requires a backend server and is not implemented in this demo.
        </div>
        <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4">
            {group.members.map((member: GroupMember) => {
                const user = userMap.get(member.userId);
                if (!user) return null;
                return (
                    <div key={user.id} className="bg-base-300/50 rounded-lg flex flex-col items-center justify-center p-4 aspect-square">
                        <img src={user.photo || `https://placehold.co/64x64/0f1a30/ffd700?text=${(user.groupDisplayName || user.username).charAt(0)}`} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                        <p className="mt-2 font-semibold">{user.groupDisplayName || user.username}</p>
                    </div>
                );
            })}
        </div>
        <div className="flex-shrink-0 flex items-center justify-center gap-4 p-4 mt-4 bg-base-300/50 rounded-lg">
             <button className="p-3 bg-base-100 rounded-full">🎤</button>
             <button className="p-3 bg-base-100 rounded-full">📷</button>
             <button className="p-3 bg-base-100 rounded-full">🖥️</button>
             <button className="p-3 bg-danger text-white rounded-full">📞</button>
        </div>
    </div>
);

// GamesView component to act as a lobby and game host
const GamesView: React.FC<any> = ({ group, userMap, currentUserId, createGame, setGameToApprove, activeGameId, setActiveGameId, onGameAction, showToast }) => {
    const activeGame = group.games.find((g: GameSession) => g.id === activeGameId);
    
    const availableGames = [
        { type: 'ludo', name: 'Ludo', icon: '🎲', disabled: false },
        { type: 'tic-tac-toe', name: 'Tic-Tac-Toe', icon: '⭕️', disabled: false },
        { type: 'connect-four', name: 'Connect Four', icon: '🔵', disabled: false },
        { type: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: '🪨', disabled: true },
        { type: 'guess-the-word', name: 'Guess the Word', icon: '📝', disabled: true },
        { type: 'dots-and-boxes', name: 'Dots and Boxes', icon: '✒️', disabled: true },
    ];

    if (activeGame) {
        if (activeGame.type === 'tic-tac-toe') return <TicTacToeGameComponent game={activeGame} userMap={userMap} currentUserId={currentUserId} onGameAction={onGameAction} onExit={() => setActiveGameId(null)} showToast={showToast} />;
        if (activeGame.type === 'connect-four') return <ConnectFourGameComponent game={activeGame} userMap={userMap} currentUserId={currentUserId} onGameAction={onGameAction} onExit={() => setActiveGameId(null)} showToast={showToast} />;
        if (activeGame.type === 'ludo') return <LudoGameComponent game={activeGame} userMap={userMap} currentUserId={currentUserId} onGameAction={onGameAction} onExit={() => setActiveGameId(null)} showToast={showToast} />;
    }

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <div>
                <h3 className="font-bold text-xl text-base-content mb-2">Create a Game</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableGames.map(game => (
                        <button key={game.type} onClick={() => createGame(game.type)} disabled={game.disabled} className="p-4 bg-base-100 rounded-lg text-center hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <span className="text-3xl">{game.icon}</span>
                            <p className="font-semibold text-primary mt-1">{game.name}</p>
                            {game.disabled && <p className="text-xs text-muted-content">(Soon)</p>}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-grow flex flex-col bg-base-300/30 rounded-lg min-h-0">
                <h3 className="font-bold text-xl text-base-content p-4 flex-shrink-0">Ongoing Games</h3>
                <div className="overflow-y-auto space-y-3 px-4 pb-4">
                    {group.games.length === 0 && <p className="text-center text-sm text-muted-content pt-8">No active games. Create one to start!</p>}
                    {group.games.map((game: GameSession) => {
                        const createdBy = userMap.get(game.createdBy);
                        const canApprove = game.players.includes(currentUserId) && game.joinRequests.length > 0;
                        const canStart = game.createdBy === currentUserId && game.status === 'pending' && (game.type === 'ludo' ? game.players.length >= 2 : game.players.length === 2);
                        return (
                            <div key={game.id} className="bg-base-100 p-3 rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{game.type.replace('-', ' ')} by {createdBy?.groupDisplayName || createdBy?.username}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {game.players.map(pid => <img key={pid} src={userMap.get(pid)?.photo || ''} className="w-6 h-6 rounded-full" title={userMap.get(pid)?.groupDisplayName || userMap.get(pid)?.username}/>)}
                                        <span className="text-xs text-muted-content capitalize">{game.status}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {canStart && <button onClick={() => onGameAction(game.id, { type: 'START_GAME' })} className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg">Start</button>}
                                    {canApprove && <button onClick={() => setGameToApprove(game)} className="px-3 py-1 bg-primary/80 text-primary-content text-sm rounded-lg relative">Approve <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-danger text-white rounded-full">{game.joinRequests.length}</span></button>}
                                    {game.status !== 'pending' && <button onClick={() => setActiveGameId(game.id)} className="px-3 py-1 bg-base-300 text-sm rounded-lg">View</button>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// --- Game Components ---
const LudoGameComponent: React.FC<any> = ({ onExit }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-4">Ludo - Coming Soon!</h2>
        <p>This game is currently under development.</p>
        <button onClick={onExit} className="mt-8 px-4 py-2 bg-primary text-primary-content rounded-lg">Back to Lobby</button>
    </div>
);
const TicTacToeGameComponent: React.FC<any> = ({ game, userMap, currentUserId, onGameAction, onExit, showToast }) => { return <div>TicTacToe Coming Soon!</div> };
const ConnectFourGameComponent: React.FC<any> = ({ game, userMap, currentUserId, onGameAction, onExit, showToast }) => { return <div>ConnectFour Coming Soon!</div> };


// --- NEW CHAT VIEW & COMPONENTS ---
const ChatView: React.FC<{
    group: Group;
    onSave: (g: Group) => void;
    userMap: Map<number, AdminUser>;
    currentUserId: number;
    showToast: (message: string, type?: 'success' | 'error') => void;
    setActiveTab: (tab: 'chat' | 'call' | 'games') => void;
    setActiveGameId: (id: string | null) => void;
}> = ({ group, onSave, userMap, currentUserId, showToast, setActiveTab, setActiveGameId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [mentionQuery, setMentionQuery] = useState<string | null>(null);
    const [mentionBoxPosition, setMentionBoxPosition] = useState({ top: 0, left: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [group.messages]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size / 1024 / 1024 > group.settings.maxFileSizeMB) {
            showToast(`File size exceeds the ${group.settings.maxFileSizeMB}MB limit.`, 'error');
            return;
        }
        try {
            const content = await fileToDataURL(file);
            handleSendMessage({ type: 'image', content, fileName: file.name, size: file.size });
        } catch (error) { showToast('Failed to upload file.', 'error'); }
    };

    const handleSendMessage = (attachment?: GroupMessage['attachment']) => {
        if (!newMessage.trim() && !attachment) return;
        const message: GroupMessage = {
            id: Date.now(),
            senderId: currentUserId,
            content: newMessage,
            attachment,
            timestamp: new Date().toISOString(),
            readBy: [currentUserId], // Sender has implicitly read it
        };
        onSave({ ...group, messages: [...group.messages, message] });
        setNewMessage('');
    };

    const handleToggleReaction = (messageId: number, emoji: string) => {
        const updatedMessages = group.messages.map(msg => {
            if (msg.id === messageId) {
                const reactions = { ...(msg.reactions || {}) };
                const reactors = reactions[emoji] || [];
                if (reactors.includes(currentUserId)) {
                    reactions[emoji] = reactors.filter(id => id !== currentUserId);
                } else {
                    reactions[emoji] = [...reactors, currentUserId];
                }
                if (reactions[emoji].length === 0) delete reactions[emoji];
                return { ...msg, reactions };
            }
            return msg;
        });
        onSave({ ...group, messages: updatedMessages });
    };

    const handleTogglePin = (messageId: number) => {
        const updatedMessages = group.messages.map(msg =>
            msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
        );
        onSave({ ...group, messages: updatedMessages });
    };

    const handleGameInteraction = (gameId: string) => {
        const game = group.games.find(g => g.id === gameId);
        if (!game) {
            showToast("This game no longer exists.", "error");
            return;
        }
        
        // Case 1: User is already a player
        if (game.players.includes(currentUserId)) {
            if (game.status === 'pending') {
                showToast("You are in the game. Waiting for the creator to start.", 'success');
                setActiveTab('games');
            } else if (game.status === 'finished') {
                showToast("This game has already finished.", "error");
            } else { // active
                setActiveTab('games');
                setActiveGameId(game.id);
            }
            return;
        }
    
        // Case 2: User is not a player, wants to join
        if (game.status !== 'pending') {
            showToast("This game is already in progress or has finished.", "error");
            return;
        }
        
        if (game.joinRequests.includes(currentUserId)) {
            showToast("You have already sent a join request.", "success");
            return;
        }
    
        const maxPlayers = game.type === 'ludo' ? 4 : 2;
        if (game.players.length >= maxPlayers) {
            showToast("Sorry, this game is already full.", "error");
            return;
        }
    
        // Add to join requests
        const updatedGames = group.games.map(g => {
            if (g.id === gameId) {
                return {
                    ...g,
                    joinRequests: [...g.joinRequests, currentUserId]
                };
            }
            return g;
        });
    
        onSave({ ...group, games: updatedGames });
        showToast("Join request sent! The game creator must approve it from the Games tab.", 'success');
    };

    const handleMentionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewMessage(value);
        const lastWord = value.substring(e.target.selectionStart || 0).split(' ')[0];
        const mentionMatch = value.match(/@(\w*)$/);

        if (mentionMatch) {
            setMentionQuery(mentionMatch[1].toLowerCase());
            const inputRect = e.target.getBoundingClientRect();
            setMentionBoxPosition({ top: inputRect.top - 10, left: inputRect.left });
        } else {
            setMentionQuery(null);
        }
    };

    const handleSelectMention = (username: string) => {
        const currentMessage = newMessage;
        const lastAtsignIndex = currentMessage.lastIndexOf('@');
        const newMessageText = currentMessage.substring(0, lastAtsignIndex) + `@${username} `;
        setNewMessage(newMessageText);
        setMentionQuery(null);
        inputRef.current?.focus();
    };

    const filteredMessages = useMemo(() => {
        if (!searchQuery) return group.messages;
        return group.messages.filter(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [group.messages, searchQuery]);

    const pinnedMessages = useMemo(() => group.messages.filter(msg => msg.isPinned), [group.messages]);
    const mentionableUsers = useMemo(() => group.members.map(m => userMap.get(m.userId)).filter(Boolean) as AdminUser[], [group.members, userMap]);

    return (
        <div className="flex flex-col h-full">
            <div className="p-2 border-b border-primary/20 flex-shrink-0">
                <input
                    type="search"
                    placeholder="🔍 Search conversation..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 bg-base-100 border border-primary/20 rounded-lg text-sm"
                />
            </div>

            {pinnedMessages.length > 0 && (
                <div className="p-2 border-b border-primary/20 flex-shrink-0">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        <span className="text-2xl flex-shrink-0">📌</span>
                        {pinnedMessages.map(msg => (
                            <div key={msg.id} className="text-xs p-2 bg-base-300/60 rounded-lg flex-shrink-0 max-w-xs">
                                <p className="font-bold text-primary">{userMap.get(msg.senderId)?.username}</p>
                                <p className="truncate text-muted-content">{msg.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                <p className="text-xs text-center text-muted-content p-2 bg-base-300/30 rounded-lg whitespace-pre-wrap">{group.settings.rules}</p>
                {filteredMessages.map((msg: GroupMessage) => (
                    <MessageItem
                        key={msg.id}
                        msg={msg}
                        userMap={userMap}
                        currentUserId={currentUserId}
                        group={group}
                        groupMembers={group.members}
                        onTogglePin={handleTogglePin}
                        onToggleReaction={handleToggleReaction}
                        onGameLinkClick={handleGameInteraction}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-primary/20 flex-shrink-0 relative">
                 {mentionQuery !== null && (
                    <div className="absolute bottom-full left-4 mb-1 w-64 max-h-40 overflow-y-auto bg-base-300 border border-primary/20 rounded-lg shadow-lg z-10">
                        {mentionableUsers
                            .filter(u => u.username.toLowerCase().includes(mentionQuery))
                            .map(user => (
                                <button key={user.id} onClick={() => handleSelectMention(user.username)} className="w-full text-left px-3 py-2 hover:bg-primary/20 flex items-center gap-2">
                                    <img src={user.photo} alt={user.username} className="w-6 h-6 rounded-full"/>
                                    <span className="font-semibold">{user.username}</span>
                                </button>
                            ))
                        }
                    </div>
                 )}
                <div className="flex items-center gap-2">
                    <input ref={inputRef} type="text" value={newMessage} onChange={handleMentionInputChange} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type a message... use @ for mentions" className="w-full p-2 bg-base-100 border border-primary/20 rounded-lg"/>
                    <label className="p-2 cursor-pointer text-muted-content hover:text-primary">📎<input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} /></label>
                    <button onClick={() => handleSendMessage()} className="px-4 py-2 bg-primary text-primary-content font-bold rounded-lg">Send</button>
                </div>
            </div>
        </div>
    );
};

const ReadReceiptIndicator: React.FC<{ msg: GroupMessage, groupMembers: GroupMember[], currentUserId: number, userMap: Map<number, AdminUser> }> = ({ msg, groupMembers, currentUserId, userMap }) => {
    const otherMembers = useMemo(() => groupMembers.filter(m => m.userId !== currentUserId), [groupMembers, currentUserId]);
    const readByOtherUsers = useMemo(() => (msg.readBy || []).filter(id => id !== currentUserId), [msg.readBy, currentUserId]);
    
    if (otherMembers.length === 0) return null; // No one else to read it

    const allRead = readByOtherUsers.length >= otherMembers.length;

    const readByNames = readByOtherUsers
        .map(id => userMap.get(id)?.groupDisplayName || userMap.get(id)?.username)
        .filter(Boolean)
        .join(', ');

    const title = readByNames ? `Read by: ${readByNames}` : 'Sent';
    const icon = allRead ? '✔✔' : '✔';
    const colorClass = allRead ? 'text-primary' : 'text-muted-content';

    return <span className={`ml-2 font-bold ${colorClass}`} title={title}>{icon}</span>;
};


const MessageItem: React.FC<any> = ({ msg, userMap, currentUserId, group, groupMembers, onTogglePin, onToggleReaction, onGameLinkClick }) => {
    const sender = userMap.get(msg.senderId);
    const isCurrentUser = msg.senderId === currentUserId;
    const isMentioned = msg.content.includes(`@${userMap.get(currentUserId)?.username}`);
    const [menuOpen, setMenuOpen] = useState(false);
    const availableReactions = ['👍', '❤️', '😂', '🎉', '🤔'];

    const renderMessageContent = (content: string) => {
        const gameLinkRegex = /game:\/\/([\w-]+)\/([\w-]+)/;
        const match = content.match(gameLinkRegex);
        if (match) {
            const parts = content.split(match[0]);
            const gameId = match[2];
            const game = group.games.find((g: GameSession) => g.id === gameId);

            let buttonText = "Join Game";
            let isDisabled = false;

            if (game) {
                const isPlayer = game.players.includes(currentUserId);
                const maxPlayers = game.type === 'ludo' ? 4 : 2;

                if (isPlayer) {
                    buttonText = "View Game";
                } else if (game.status === 'finished') {
                    buttonText = "Game Over";
                    isDisabled = true;
                } else if (game.status === 'active') {
                    buttonText = "In Progress";
                    isDisabled = true;
                } else if (game.joinRequests.includes(currentUserId)) {
                    buttonText = "Request Sent";
                    isDisabled = true;
                } else if (game.players.length >= maxPlayers) {
                    buttonText = "Game Full";
                    isDisabled = true;
                }
            } else {
                buttonText = "Game Ended";
                isDisabled = true;
            }

            return (
                <span>
                    {parts[0]}
                    <button 
                        onClick={() => onGameLinkClick(gameId)} 
                        disabled={isDisabled}
                        className="font-bold text-primary underline disabled:text-muted-content disabled:no-underline"
                    >
                        {buttonText}
                    </button>
                    {parts[1]}
                </span>
            );
        }
        return content.split(/(@\w+)/).map((part, i) =>
            part.startsWith('@') ? <strong key={i} className="text-primary bg-primary/20 px-1 rounded">{part}</strong> : part
        );
    };

    return (
        <div className={`flex gap-3 group ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
            <img src={sender?.photo || `https://placehold.co/40x40/0f1a30/ffd700?text=${(sender?.groupDisplayName || sender?.username || '?').charAt(0)}`} alt="avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
            <div className="relative">
                 <div className={`max-w-md p-3 rounded-lg relative ${isCurrentUser ? 'bg-primary text-primary-content rounded-br-none' : 'bg-base-300/60 rounded-bl-none'} ${isMentioned ? 'ring-2 ring-primary' : ''}`}>
                    <div className="absolute top-0 right-0 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center bg-base-100 border border-primary/20 rounded-full shadow-sm">
                            {availableReactions.map(emoji => (
                                <button key={emoji} onClick={() => onToggleReaction(msg.id, emoji)} className="px-1.5 py-0.5 text-sm hover:scale-125 transition-transform">{emoji}</button>
                            ))}
                            <button onClick={() => setMenuOpen(o => !o)} className="px-1.5 py-0.5 text-sm hover:bg-base-300 rounded-r-full">•••</button>
                        </div>
                    </div>
                    
                    {!isCurrentUser && <p className="font-bold text-primary text-sm mb-1">{sender?.groupDisplayName || sender?.username}</p>}
                    <div className="font-bangla break-words">{renderMessageContent(msg.content)}</div>
                    {msg.attachment && msg.attachment.type === 'image' && <img src={msg.attachment.content} alt={msg.attachment.fileName} className="max-w-xs rounded-md mt-2" />}
                    
                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                        <div className="flex gap-1.5 mt-2">
                            {Object.entries(msg.reactions).map(([emoji, userIds]) => {
                                const reactors = userIds as number[];
                                return reactors.length > 0 && (
                                <button key={emoji} onClick={() => onToggleReaction(msg.id, emoji)} className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${reactors.includes(currentUserId) ? 'bg-primary/30' : 'bg-base-100/50'}`}>
                                    <span>{emoji}</span><span>{reactors.length}</span>
                                </button>
                            )})}
                        </div>
                    )}
                </div>
                 <div className={`text-xs mt-1 flex items-center ${isCurrentUser ? 'flex-row-reverse text-right text-muted-content' : 'text-left text-muted-content'}`}>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isCurrentUser && <ReadReceiptIndicator msg={msg} groupMembers={groupMembers} currentUserId={currentUserId} userMap={userMap} />}
                </div>
            </div>
            {menuOpen && (
                <div className="absolute z-10 bg-base-100 rounded-md shadow-lg border border-primary/20 text-sm" style={{ top: '20px', right: isCurrentUser ? '50px' : undefined, left: !isCurrentUser ? '50px' : undefined }}>
                    <button onClick={() => { onTogglePin(msg.id); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-base-300">
                        {msg.isPinned ? 'Unpin Message' : 'Pin Message'}
                    </button>
                </div>
            )}
        </div>
    );
};


export default GroupCollaborationPage;