import React from 'react';
import { MockupIcon, MascotIcon, RecipeIcon, TextImageIcon, DiagramIcon, StorybookIcon } from './icons';
import { MockupGenerator } from './MockupGenerator';
import { AssetGenerator } from './AssetGenerator';
import { RecipeGenerator } from './RecipeGenerator';
import { TextImageGenerator } from './TextImageGenerator';
import { DiagramGenerator } from './DiagramGenerator';
import { StorybookCreator } from './StorybookCreator';
import { ToolId } from '../types';

interface Tool {
    id: ToolId;
    label: string;
    description: string;
    Icon: React.FC<any>;
}

const toolsData: Tool[] = [
    { id: 'mockup', label: 'Mockup Images', Icon: MockupIcon, description: 'Generate professional, photorealistic mockup images for your products in any scene you can imagine. Perfect for e-commerce and advertising.' },
    { id: 'asset', label: 'Brand Marketing Images', Icon: MascotIcon, description: 'Create a suite of consistent, on-brand marketing images featuring your product or mascot for social media, ads, and websites.' },
    { id: 'recipe', label: 'Recipe Images', Icon: RecipeIcon, description: 'Turn any dish name or list of ingredients into a complete, beautifully illustrated step-by-step recipe with images for each stage.' },
    { id: 'textImage', label: 'Text Behind Images', Icon: TextImageIcon, description: 'Design striking graphics by seamlessly placing stylish text behind the main subject of any photo, creating a high-end, layered effect.' },
    { id: 'diagram', label: 'Diagrams', Icon: DiagramIcon, description: 'Instantly generate clean, clear, and labeled educational diagrams on any topic, from complex scientific concepts to simple process flows.' },
    { id: 'storybook', label: 'Storybook Images', Icon: StorybookIcon, description: 'Bring your stories to life by creating a series of charming, consistent illustrations for your children\'s book based on a character description.' },
];

interface ToolSuiteProps {
    activeTool: ToolId;
    setActiveTool: (toolId: ToolId) => void;
}

export const ToolSuite: React.FC<ToolSuiteProps> = ({ activeTool, setActiveTool }) => {
    
    const renderActiveTool = () => {
        switch (activeTool) {
            case 'mockup': return <MockupGenerator />;
            case 'asset': return <AssetGenerator />;
            case 'recipe': return <RecipeGenerator />;
            case 'textImage': return <TextImageGenerator />;
            case 'diagram': return <DiagramGenerator />;
            case 'storybook': return <StorybookCreator />;
            default: return null;
        }
    }

    return (
        <div className="w-full" id="tool-suite">
            <header className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    The Creator's Toolkit
                </h2>
                <p className="mt-4 text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto">
                    Select a tool from the sidebar to begin your creative journey.
                </p>
            </header>
    
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 animate-slide-up">
                {/* Sidebar Navigation */}
                <aside className="hidden lg:block">
                    <nav className="space-y-3">
                        {toolsData.map(tool => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`w-full flex items-start text-left p-4 rounded-xl transition-colors duration-200 ${
                                    activeTool === tool.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                                }`}
                            >
                                <tool.Icon className={`w-7 h-7 mr-4 mt-1 flex-shrink-0 ${activeTool === tool.id ? 'text-white' : 'text-teal-500'}`} />
                                <div>
                                    <h3 className="font-bold text-base">{tool.label}</h3>
                                    <p className={`text-sm mt-1 ${activeTool === tool.id ? 'text-indigo-200' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                        {tool.description}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </nav>
                </aside>
                
                {/* Main Content Area */}
                <div className="bg-white dark:bg-zinc-900/70 rounded-2xl shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-200 dark:border-zinc-800">
                    {/* Mobile Dropdown */}
                    <div className="lg:hidden p-4 bg-zinc-100/50 dark:bg-zinc-950/50 rounded-t-2xl border-b border-zinc-200 dark:border-zinc-800">
                        <select
                            value={activeTool}
                            onChange={(e) => setActiveTool(e.target.value as ToolId)}
                            className="w-full p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white dark:bg-zinc-800 font-bold text-base"
                        >
                            {toolsData.map(tool => <option key={tool.id} value={tool.id}>{tool.label}</option>)}
                        </select>
                    </div>

                    <div className="p-6 sm:p-8">
                        {renderActiveTool()}
                    </div>
                </div>
            </div>
        </div>
    );
};