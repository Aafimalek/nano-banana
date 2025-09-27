import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthGuard } from './components/AuthGuard';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Pricing } from './pages/Pricing';
import { Chat } from './pages/Chat';
import { ImagesHistory } from './pages/ImagesHistory';
import { AuthCallback } from './pages/AuthCallback';
import { AuthError } from './pages/AuthError';
// import { MockupPage } from './pages/MockupPage';
// import { AssetPage } from './pages/AssetPage';
// import { RecipePage } from './pages/RecipePage';
import { TextImagePage } from './pages/TextImagePage';
import { DiagramPage } from './pages/DiagramPage';
import { IsometryPage } from './pages/IsometryPage';
// import { StorybookPage } from './pages/StorybookPage';
import './index.css';

const App: React.FC = () => {
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     const savedTheme = localStorage.getItem('theme');
  //     return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode
  //   }
  //   return true;
  // });

  // useEffect(() => {
  //   const root = window.document.documentElement;
  //   if (isDarkMode) {
  //     root.classList.add('dark');
  //     localStorage.setItem('theme', 'dark');
  //   } else {
  //     root.classList.remove('dark');
  //     localStorage.setItem('theme', 'light');
  //   }
  // }, [isDarkMode]);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/chat/history" element={
              <ProtectedRoute>
                <ImagesHistory />
              </ProtectedRoute>
            } />
            <Route path="/*" element={
              <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-[#ededed]">
                <Navbar />
                <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/auth/success" element={<AuthCallback />} />
                    <Route path="/auth/error" element={<AuthError />} />
                    {/* <Route path="/tools/mockup" element={<MockupPage />} /> */}
                    {/* <Route path="/tools/asset" element={<AssetPage />} /> */}
                    {/* <Route path="/tools/recipe" element={<RecipePage />} /> */}
                    {/* <Route path="/tools/text-image" element={<TextImagePage />} />
                    <Route path="/tools/diagram" element={<DiagramPage />} />
                    <Route path="/tools/isometry" element={<IsometryPage />} /> */}
                    {/* <Route path="/tools/storybook" element={<StorybookPage />} /> */}
                  </Routes>
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
