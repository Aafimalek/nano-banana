import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, LogoIcon } from './icons';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center space-x-3 group" aria-label="AI Creative Suite Home">
            <LogoIcon className="w-8 h-8 text-teal-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              AI Creative Suite
            </span>
          </a>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};