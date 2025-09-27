import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultDisplay } from './ResultDisplay';
import { useDiagramGenerator } from '../hooks/useDiagramGenerator';
import { FaProjectDiagram, FaPen } from "react-icons/fa";
import { BsDiagram3 } from "react-icons/bs";

export const DiagramGenerator: React.FC = () => {
    const {
        topic,
        setTopic,
        isLoading,
        result,
        error,
        generateDiagram
    } = useDiagramGenerator();

    const isGenerateDisabled = isLoading || !topic;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-full">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <FaProjectDiagram className="w-7 h-7 mr-3 text-white" />
                        Step 1: Describe Topic
                    </h2>
                    <p className="text-base text-gray-400">Enter any educational topic, and the AI will generate a clean, labeled diagram for it.</p>
                </div>

                <div className="relative">
                    <FaPen className="w-6 h-6 absolute top-3.5 left-4 text-gray-400" />
                    <textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The human circulatory system, The life cycle of a butterfly, How a car engine works..."
                        className="w-full p-4 pl-12 text-base border rounded-lg focus:ring-2 focus:ring-white focus:border-white transition duration-200 resize-none h-48 bg-[#1a1a1a] text-white placeholder-gray-400"
                    />
                </div>

                <button
                    onClick={generateDiagram}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center bg-white text-black font-bold py-4 px-4 text-lg rounded-lg hover:bg-gray-800 disabled:bg-gray-800 disabled:border disabled:text-white disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-black/30 disabled:shadow-none disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner className="w-6 h-6 mr-3" />
                            Generating...
                        </>
                    ) : (
                        <>
                            {/* <FaProjectDiagram className="w-6 h-6 mr-3" /> */}
                            Generate
                        </>
                    )}
                </button>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-[#1a1a1a] p-4 sm:p-6 rounded-2xl shadow-inner border flex flex-col items-center justify-center min-h-[500px] lg:min-h-full">
                {isLoading ? (
                    <div className="text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-white mx-auto" />
                        <p className="font-semibold text-xl text-white">AI is illustrating your diagram...</p>
                        <p className="text-base text-gray-400">This can take a moment. Please wait.</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-900/20 p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : result ? (
                    <ResultDisplay result={{ imageDataUrl: result.imageDataUrl, description: "Educational Diagram" }} />
                ) : (
                    <div className="text-center text-gray-400 p-4 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-gray-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BsDiagram3 className="w-16 h-16 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Your diagram will appear here</h3>
                        <p className="text-base mt-2">Enter a topic and let the AI illustrator do the work!</p>
                    </div>
                )}
            </div>
        </div>
    );
};