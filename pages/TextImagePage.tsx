import React from 'react';
import { TextImageGenerator } from '../components/TextImageGenerator';

export const TextImagePage: React.FC = () => {
    return (
        <section>
            <h1 className="text-3xl font-extrabold mb-6 text-[#ededed]">Text Behind Images</h1>
            <div className="relative rounded-3xl border border-[#a1a1a1] bg-[#0a0a0a] p-6 sm:p-8">
                <TextImageGenerator />
            </div>
        </section>
    );
};


