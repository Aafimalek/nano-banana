import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthApi } from '../api';
import { FaCube, FaWindows } from 'react-icons/fa';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoogleAuth = () => {
    AuthApi.initiateGoogleAuth();
  };

  const handleLogout = async () => {
    await logout();
  };


  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#a1a1a1]/20 px-8 py-1">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3" aria-label="Morphic Home">
              {/* <FaCube size={24} color="#ededed" /> */}
              <img src="/logo.png" alt="Morphic" className="w-8 h-8" />
              <span className="text-xl font-bold text-[#ededed] tracking-wide">
                Morphic
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className="text-sm font-medium text-[#ededed] hover:text-[#a1a1a1] transition-colors hover:underline hover:scale-[1.1]">
                Home
              </NavLink>
              <NavLink to="/tools" className="text-sm font-medium text-[#ededed] hover:text-[#a1a1a1] transition-colors hover:underline hover:scale-[1.1]">
                Tools
              </NavLink>
              <NavLink to="/pricing" className="text-sm font-medium text-[#ededed] hover:text-[#a1a1a1] transition-colors hover:underline hover:scale-[1.1]">
                Pricing
              </NavLink>
              <NavLink to="/about" className="text-sm font-medium text-[#ededed] hover:text-[#a1a1a1] transition-colors hover:underline hover:scale-[1.1]">
                About
              </NavLink>
              <NavLink to="/contact" className="text-sm font-medium text-[#ededed] hover:text-[#a1a1a1] transition-colors hover:underline hover:scale-[1.1]">
                Contact
              </NavLink>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/chat"
                    className="px-4 py-2 text-sm font-medium text-[#ededed] border border-[#0090ff] rounded-md hover:bg-[#0090ff]/10 transition-colors"
                  >
                    Go to Chat
                  </Link>
                  <div className="flex items-center space-x-2">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border-2 border-[#a1a1a1]"
                    />
                    <button
                      onClick={handleLogout}
                      className="text-[#ededed] hover:text-[#a1a1a1] text-sm font-medium transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleGoogleAuth}
                    className="px-4 py-2 text-sm font-medium text-[#ededed] border border-[#0090ff] rounded-md hover:bg-[#0090ff]/10 transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};