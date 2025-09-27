import React from 'react';
import { DiagramGenerator } from '../components/DiagramGenerator';

export const DiagramPage: React.FC = () => {
    return (
        <section>
            <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Diagrams</h1>
            <div className="relative rounded-3xl border border-gray-700 bg-black/50 backdrop-blur-2xl p-6 sm:p-8">
                <DiagramGenerator />
            </div>
        </section>
    );
};


