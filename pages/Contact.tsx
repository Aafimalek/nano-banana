import React from 'react';

export const Contact: React.FC = () => {
    return (
        <section className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Contact</h1>
            <p className="mt-4 text-lg text-gray-400">Have questions or feedback? Reach out to us at <a className="text-white hover:text-gray-300" href="mailto:hello@example.com">hello@example.com</a>.</p>
        </section>
    );
};


