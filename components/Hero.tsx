import React from 'react';
import { SparklesIcon } from './icons';

interface HeroProps {
  onGetStartedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="relative py-20 sm:py-32 text-center overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[150%] h-[150%] rounded-full bg-gradient-to-tr from-indigo-500/20 via-transparent to-teal-500/20 animate-background-pan opacity-50 dark:opacity-100" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-teal-400 bg-[length:200%_auto] animate-text-gradient-anim">
            Unleash Your Creativity with AI
          </h1>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-zinc-600 dark:text-zinc-300">
            Your all-in-one suite for stunning, AI-powered brand visuals, content, and creative assets. From mockups to storybooks, bring your ideas to life in seconds.
          </p>
        </div>
        <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onGetStartedClick}
            className="inline-flex items-center justify-center bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-teal-500/40"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  );
};