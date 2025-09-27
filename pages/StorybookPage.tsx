import React from 'react';
import { StorybookCreator } from '../components/StorybookCreator';

export const StorybookPage: React.FC = () => {
    return (
        <section>
            <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ededed] via-[#43b6f0] to-[#7130d1]">Storybook Images</h1>
            <div className="relative rounded-3xl border border-[#a1a1a1] bg-[#0a0a0a]/50 backdrop-blur-2xl p-6 sm:p-8">
                <StorybookCreator />
            </div>
        </section>
    );
};


