import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToolSuite } from './components/ToolSuite';
import { ToolId } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [activeTool, setActiveTool] = useState<ToolId>('mockup');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleToolClick = (toolId: ToolId) => {
    setActiveTool(toolId);
    const toolSuiteElement = document.getElementById('tool-suite');
    if (toolSuiteElement) {
      // Use scrollIntoView with a small delay if needed, but direct is often fine with modern browsers
      toolSuiteElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ToolSuite activeTool={activeTool} setActiveTool={setActiveTool} />
      </main>
      <Footer onToolClick={handleToolClick} />
    </div>
  );
};

export default App;
