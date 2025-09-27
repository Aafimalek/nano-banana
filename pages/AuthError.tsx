import React from 'react';
import { Link } from 'react-router-dom';

export const AuthError: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-white mb-4">
                    Authentication Failed
                </h1>

                <p className="text-gray-400 mb-8">
                    We encountered an error while trying to sign you in. This could be due to:
                </p>

                <ul className="text-left text-gray-400 space-y-2 mb-8">
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>You cancelled the authentication process</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Network connectivity issues</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Server temporarily unavailable</span>
                    </li>
                </ul>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>

                    <p className="text-gray-500 text-sm">
                        Need help? <a href="/contact" className="text-blue-400 hover:text-blue-300">Contact support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
