import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const ChatFooter: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1a1a] border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    {/* Copyright on the left */}
                    <div className="text-gray-400 text-sm">
                        © {year} Made by Morphic. All rights reserved.
                    </div>

                    {/* Social media icons on the right */}
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            aria-label="Twitter/X"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

