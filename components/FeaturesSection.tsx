import React from 'react';
import { Link } from 'react-router-dom';
import { FaTextWidth, FaCube, FaProjectDiagram, FaTshirt } from 'react-icons/fa';

const features = [
    {
        title: "Text Behind Images",
        description: "Create stunning visuals with text integrated seamlessly behind your images",
        icon: FaTextWidth,
        link: "/tools/text-image",
        gradient: "from-purple-500 via-pink-500 to-red-500"
    },
    {
        title: "Isometric Illustrations",
        description: "Generate beautiful 3D-style isometric graphics for presentations and marketing",
        icon: FaCube,
        link: "/tools/isometry",
        gradient: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
        title: "Smart Diagrams",
        description: "Create professional diagrams and flowcharts with AI-powered intelligence",
        icon: FaProjectDiagram,
        link: "/tools/diagram",
        gradient: "from-green-500 via-emerald-500 to-lime-500"
    },
    {
        title: "Outfit Replacement",
        description: "Transform fashion photos with AI-powered outfit replacement technology",
        icon: FaTshirt,
        link: "/tools/outfit-replace",
        gradient: "from-orange-500 via-yellow-500 to-amber-500"
    }
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#ededed] mb-6">
                        Powerful AI Tools
                    </h2>
                    <p className="text-xl text-[#a1a1a1] max-w-3xl mx-auto">
                        Discover our suite of cutting-edge AI tools designed to revolutionize your creative workflow
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <Link
                                key={index}
                                to={feature.link}
                                className="group block"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl h-[420px]"
                                    style={{
                                        background: `linear-gradient(135deg, 
                                             #3758c9 0%, 
                                             #43b6f0 25%, 
                                             #7130d1 50%, 
                                             #3758c9 75%, 
                                             #43b6f0 100%)`
                                    }}>
                                    <div className="absolute inset-0 bg-[#0a0a0a]/20 group-hover:bg-[#0a0a0a]/10 transition-colors"></div>
                                    <div className="relative z-10">
                                        <div className="w-full h-48 bg-[#ededed]/20 rounded-xl mb-6 flex items-center justify-center">
                                            <IconComponent size={64} color="#ededed" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#ededed] mb-3 group-hover:text-[#ededed]/90 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[#a1a1a1] text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
