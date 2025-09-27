import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTshirt, FaProjectDiagram, FaExternalLinkAlt } from "react-icons/fa";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdOutlineTextFields } from "react-icons/md";
import { LuRotate3D } from "react-icons/lu"
import { ToolId } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AuthApi } from '../api';

interface Tool {
    id: ToolId;
    label: string;
    description: string;
    Icon: React.FC<any>;
}

const toolsData: Tool[] = [
    { id: 'textImage', label: 'Text Behind Image', Icon: MdOutlineTextFields, description: 'Design striking graphics by seamlessly placing stylish text behind the main subject of any photo, creating a high-end, layered effect.' },
    { id: 'diagram', label: 'Diagram', Icon: FaProjectDiagram, description: 'Instantly generate clean, clear, and labeled educational diagrams on any topic, from complex scientific concepts to simple process flows.' },
    { id: 'isometry', label: 'Isometry', Icon: LuRotate3D, description: 'Create stunning isometric illustrations and 3D-style graphics for presentations, websites, and marketing materials.' },
    { id: 'outfitReplace', label: 'Replace Outfit', Icon: FaTshirt, description: 'Transform any outfit in photos with AI-powered clothing replacement technology for fashion and lifestyle applications.' },
];

interface ToolSuiteProps {
    activeTool: ToolId;
    setActiveTool: (toolId: ToolId) => void;
}

export const ToolSuite: React.FC<ToolSuiteProps> = ({ activeTool, setActiveTool }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleLoginClick = () => {
        if (isAuthenticated) {
            navigate('/chat');
        } else {
            AuthApi.initiateGoogleAuth();
        }
    };

    return (
        <div className="w-full" id="tool-suite">
            <header className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white bg-[length:200%_auto] animate-text-gradient-anim">
                    The Creator's Toolkit
                </h2>
                <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
                    Discover our powerful AI tools.
                </p>
            </header>

            <div className="space-y-16">
                {toolsData.map((tool, index) => (
                    <div key={tool.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 animate-slide-up`}>
                        {/* Tool Info */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="relative">
                                    <span className="absolute -inset-2 rounded-xl blur-md opacity-60 bg-white/40"></span>
                                    <tool.Icon className="relative w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                </span>
                                <h3 className="text-3xl font-bold text-white">{tool.label}</h3>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {tool.description}
                            </p>
                            {/* <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span>Requires login to access</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span>AI-powered generation</span>
                                </div>
                            </div> */}
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                                onClick={handleLoginClick}
                            >
                                {isAuthenticated ? 'Go to Chat' : 'Try Now'} <FaExternalLinkAlt size={15} />
                            </button>
                        </div>

                        {/* Video Placeholder */}
                        <div className="flex-1 relative">
                            <div className="relative rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-700 backdrop-blur-xl">
                                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 5v10l8-5-8-5z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-sm">Usage Video</p>
                                        <p className="text-gray-500 text-xs">Login to view</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};