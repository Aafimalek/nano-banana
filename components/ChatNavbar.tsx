import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ToolId } from '../types';
import { ProfileDropdown } from './ProfileDropdown';
import { FaImage, FaProjectDiagram, FaHistory } from "react-icons/fa";

interface ChatNavbarProps {
    activeTool: ToolId;
    setActiveTool: (toolId: ToolId) => void;
}

const tools = [
    { id: 'textImage' as ToolId, label: 'Text Behind Image', Icon: FaImage },
    { id: 'diagram' as ToolId, label: 'Diagram', Icon: FaProjectDiagram },
    { id: 'isometry' as ToolId, label: 'Isometry', Icon: FaImage },
    { id: 'outfitReplace' as ToolId, label: 'Replace Outfit', Icon: FaImage },
];

export const ChatNavbar: React.FC<ChatNavbarProps> = ({ activeTool, setActiveTool }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleHistoryClick = () => {
        navigate('/chat/history');
    };

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#0a0a0a]/20 border-b border-[#a1a1a1]/10 shadow-2xl shadow-secondary/30">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <img src="/logo.svg" alt="Morphic" className="w-8 h-8" />
                        <span className="text-xl font-extrabold tracking-tight text-[#ededed]">
                            Morphic
                        </span>
                    </div>

                    {/* Tool Navigation */}
                    <div className="flex-1 flex justify-center">
                        <nav className="flex items-center space-x-1 bg-[#1a1a1a]/50 rounded-full p-1 backdrop-blur-sm">
                            {tools.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveTool(tool.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTool === tool.id
                                        ? 'bg-[#3758c9] text-[#ededed] shadow-lg'
                                        : 'text-[#a1a1a1] hover:text-[#ededed] hover:bg-[#3758c9]/20'
                                        }`}
                                >
                                    <tool.Icon size={16} />
                                    <span className="hidden sm:inline">{tool.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center space-x-4">
                        {/* History Button */}
                        <button
                            onClick={handleHistoryClick}
                            className="flex items-center space-x-2 p-2 rounded-full hover:bg-[#3758c9]/20 transition-colors"
                            title="View AI Generated Images"
                        >
                            <FaHistory size={20} color="#a1a1a1" />
                            <span className="hidden sm:block text-[#a1a1a1] hover:text-[#ededed] text-sm font-medium">
                                History
                            </span>
                        </button>

                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-[#3758c9]/20 transition-colors"
                                >
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full border-2 border-[#a1a1a1]"
                                    />
                                    <span className="hidden sm:block text-[#ededed] text-sm font-medium">
                                        {user.name}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-[#a1a1a1] transition-transform ${isProfileOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <ProfileDropdown
                                        user={user}
                                        onClose={() => setIsProfileOpen(false)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
