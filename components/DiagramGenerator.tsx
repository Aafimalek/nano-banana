import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultDisplay } from './ResultDisplay';
import { useDiagramGenerator } from '../hooks/useDiagramGenerator';
import { DiagramIcon, SparklesIcon, WriteIcon } from './icons';

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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <DiagramIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 1: Describe Topic
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Enter any educational topic, and the AI will generate a clean, labeled diagram for it.</p>
                </div>

                <div className="relative">
                    <WriteIcon className="w-6 h-6 absolute top-3.5 left-4 text-zinc-400" />
                    <textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The human circulatory system, The life cycle of a butterfly, How a car engine works..."
                        className="w-full p-4 pl-12 text-base border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-none h-48 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400"
                    />
                </div>
                
                <button
                    onClick={generateDiagram}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center bg-teal-500 text-white font-bold py-4 px-4 text-lg rounded-lg hover:bg-teal-600 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30 disabled:shadow-none disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner className="w-6 h-6 mr-3" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-6 h-6 mr-3" />
                            Generate Diagram
                        </>
                    )}
                </button>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center min-h-[500px] lg:min-h-full">
                {isLoading ? (
                    <div className="text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-teal-500 mx-auto" />
                        <p className="font-semibold text-xl text-zinc-900 dark:text-white">AI is illustrating your diagram...</p>
                        <p className="text-base text-zinc-500 dark:text-zinc-400">This can take a moment. Please wait.</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : result ? (
                    <ResultDisplay result={{ imageDataUrl: result.imageDataUrl, description: "Educational Diagram" }} />
                ) : (
                    <div className="text-center text-zinc-500 dark:text-zinc-400 p-4 max-w-sm mx-auto">
                         <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DiagramIcon className="w-16 h-16 text-zinc-400 dark:text-zinc-500"/>
                        </div>
                        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white">Your diagram will appear here</h3>
                        <p className="text-base mt-2">Enter a topic and let the AI illustrator do the work!</p>
                    </div>
                )}
            </div>
        </div>
    );
};