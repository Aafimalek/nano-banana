import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    provider: string;
    lastLogin?: string;
    createdAt?: string;
}

interface ProfileDropdownProps {
    user: User;
    onClose: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onClose }) => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    return (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-600"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{user.name}</p>
                        <p className="text-gray-400 text-sm truncate">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};