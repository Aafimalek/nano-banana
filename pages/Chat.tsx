
import React, { useState } from 'react';
import { ChatNavbar } from '../components/ChatNavbar';
import { TextImageGenerator } from '../components/TextImageGenerator';
import { DiagramGenerator } from '../components/DiagramGenerator';
import { MockupGenerator } from '../components/MockupGenerator';
import { IsometryGenerator } from '../components/IsometryGenerator';
import { ChatFooter } from '../components/ChatFooter';
import { ToolId } from '../types';

export const Chat: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ToolId>('textImage');

    const renderActiveTool = () => {
        switch (activeTool) {
            case 'textImage':
                return <TextImageGenerator />;
            case 'diagram':
                return <DiagramGenerator />;
            case 'isometry':
                return <IsometryGenerator />;
            case 'outfitReplace':
                return <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#3758c9] rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#ededed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#ededed] mb-2">Replace Outfit</h3>
                    <p className="text-[#a1a1a1] mb-6">Coming soon! This tool will allow you to replace outfits in photos with AI.</p>
                    <div className="inline-flex items-center px-4 py-2 bg-[#3758c9] text-[#ededed] rounded-lg text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Under Development
                    </div>
                </div>;
            default:
                return <TextImageGenerator />;
        }
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
            <ChatNavbar activeTool={activeTool} setActiveTool={setActiveTool} />

            <main className="flex-1 w-full">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto">
                        {renderActiveTool()}
                    </div>
                </div>
            </main>

            <ChatFooter />
        </div>
    );
};
