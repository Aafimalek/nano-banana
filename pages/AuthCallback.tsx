import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AuthApi } from '../api';

export const AuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const token = searchParams.get('token');
            const error = searchParams.get('error');

            if (error) {
                console.error('Auth error:', error);
                navigate('/auth/error');
                return;
            }

            if (token) {
                try {
                    // Verify token with server and get user data
                    const user = await AuthApi.handleGoogleCallback(token);
                    login(user);
                    navigate('/chat');
                } catch (error) {
                    console.error('Auth verification error:', error);
                    navigate('/auth/error');
                }
            } else {
                navigate('/auth/error');
            }
        };

        handleAuthCallback();
    }, [searchParams, navigate, login]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-center">
                <LoadingSpinner />
                <p className="mt-4 text-white text-lg">Completing authentication...</p>
                <p className="mt-2 text-gray-400 text-sm">Please wait while we set up your account.</p>
            </div>
        </div>
    );
};
