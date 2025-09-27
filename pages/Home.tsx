import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturesSection } from '../components/FeaturesSection';
import { TestimonialSection } from '../components/TestimonialSection';

export const Home: React.FC = () => {
    const scrollToTools = () => {
        const el = document.getElementById('tool-suite');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="space-y-0">
            <Hero onGetStartedClick={scrollToTools} />
            <FeaturesSection />
            <TestimonialSection />
        </div>
    );
};


