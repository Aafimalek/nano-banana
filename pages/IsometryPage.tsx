import React from 'react';
import { IsometryGenerator } from '../components/IsometryGenerator';

export const IsometryPage: React.FC = () => {
    return (
        <section>
            <h1 className="text-3xl font-extrabold mb-6 text-white">Isometric Illustrations</h1>
            <div className="relative rounded-3xl border border-white bg-black p-6 sm:p-8">
                <IsometryGenerator />
            </div>
        </section>
    );
};
