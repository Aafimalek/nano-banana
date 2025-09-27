import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading, checkAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            // Check if we're on a protected route
            const protectedRoutes = ['/chat'];
            const isProtectedRoute = protectedRoutes.some(route =>
                location.pathname.startsWith(route)
            );

            if (isProtectedRoute) {
                // For protected routes, check authentication
                if (!isLoading) {
                    if (isAuthenticated) {
                        // User is authenticated, allow access
                        setIsChecking(false);
                    } else {
                        // User is not authenticated, redirect to home
                        navigate('/', { replace: true });
                    }
                }
            } else {
                // For public routes, check if user is authenticated
                if (!isLoading) {
                    if (isAuthenticated && location.pathname === '/') {
                        // User is authenticated and on home page, redirect to chat
                        navigate('/chat', { replace: true });
                    } else {
                        // User is not authenticated or on a different public route, allow access
                        setIsChecking(false);
                    }
                }
            }
        };

        checkAuthentication();
    }, [isAuthenticated, isLoading, location.pathname, navigate, checkAuth]);

    // Show loading spinner while checking authentication
    if (isLoading || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <LoadingSpinner />
            </div>
        );
    }

    return <>{children}</>;
};
