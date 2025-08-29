import React from 'react';
import { LogoIcon, TwitterIcon, GithubIcon } from './icons';
import { ToolId } from '../types';

interface FooterProps {
    onToolClick: (toolId: ToolId) => void;
}

const toolData: { id: ToolId; label: string }[] = [
    { id: 'mockup', label: 'Mockup Images' },
    { id: 'asset', label: 'Brand Marketing Images' },
    { id: 'recipe', label: 'Recipe Images' },
    { id: 'textImage', label: 'Text Behind Images' },
    { id: 'diagram', label: 'Diagrams' },
    { id: 'storybook', label: 'Storybook Images' },
];

export const Footer: React.FC<FooterProps> = ({ onToolClick }) => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-zinc-100 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800/50">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center space-x-3">
                            <LogoIcon className="w-8 h-8 text-teal-500" />
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">AI Creative Suite</span>
                        </div>
                        <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xs">
                            Your all-in-one suite for stunning, AI-powered brand visuals, content, and creative assets.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white tracking-wider uppercase">Tools</h3>
                        <ul className="mt-4 space-y-3">
                            {toolData.map(tool => (
                                <li key={tool.id}>
                                    <button onClick={() => onToolClick(tool.id)} className="text-left text-base text-zinc-500 dark:text-zinc-400 hover:text-teal-500 transition-colors">
                                        {tool.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white tracking-wider uppercase">Connect</h3>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <a href="https://x.com/aafimalek2032" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-base text-zinc-500 dark:text-zinc-400 hover:text-teal-500 transition-colors">
                                    <TwitterIcon className="w-6 h-6"/> <span>Twitter</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Aafimalek/nano-banana" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-base text-zinc-500 dark:text-zinc-400 hover:text-teal-500 transition-colors">
                                    <GithubIcon className="w-6 h-6"/> <span>GitHub</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-base text-zinc-500 dark:text-zinc-400 space-y-2">
                    <p>&copy; {year} AI Creative Suite. All rights reserved.</p>
                    <p>Made with ❤️ by Aafi</p>
                </div>
            </div>
        </footer>
    );
};