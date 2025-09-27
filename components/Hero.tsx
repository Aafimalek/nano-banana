import React from 'react';
import { FaMagic } from 'react-icons/fa';

interface HeroProps {
  onGetStartedClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="relative py-20 sm:py-32 text-center overflow-hidden bg-[#1a1a1a]">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[150%] h-[150%] rounded-full bg-gradient-to-tr from-[#3758c9]/15 via-transparent to-[#7130d1]/15 animate-[backgroundPan_10s_linear_infinite] opacity-40" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ededed] via-[#43b6f0] to-[#7130d1] bg-[length:400%_auto] animate-[textGradientAnim_5s_ease_infinite] animate-delay-100">
            Unleash Your Creativity with AI
          </h1>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-[#a1a1a1]">
            Your all-in-one suite for stunning, AI-powered brand visuals, content, and creative assets. From mockups to storybooks, bring your ideas to life in seconds.
          </p>
        </div>
        <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onGetStartedClick}
            className="group relative hover:scale-[1.1] inline-flex items-center justify-center px-8 py-3 rounded-full text-[#ededed] font-semibold transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0090ff] to-[#7130d1] opacity-90 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-[#0090ff] to-[#7130d1] opacity-60 group-hover:opacity-80 transition-opacity"></span>
            <span className="relative inline-flex items-center">
              <FaMagic size={20} color="#ededed" />
              <span className="ml-2">Get Started for Free</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};