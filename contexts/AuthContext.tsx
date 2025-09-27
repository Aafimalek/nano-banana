import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthApi, User } from '../api';

// User interface is now imported from API

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await AuthApi.logout();
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const data = await AuthApi.checkAuth();
            console.log('Auth check data:', data);

            if (data.authenticated && data.user) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Check if user data exists in localStorage first
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
            } catch (error) {
                localStorage.removeItem('user');
            }
        }

        // Then verify with server
        checkAuth();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
