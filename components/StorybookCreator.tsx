import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { useStorybookCreator } from '../hooks/useStorybookCreator';
import { StorybookIcon, SparklesIcon, WriteIcon, CloseIcon } from './icons';

export const StorybookCreator: React.FC = () => {
    const {
        characterDescription,
        setCharacterDescription,
        pages,
        error,
        isGeneratingAll,
        generationProgress,
        addPage,
        deletePage,
        updatePageText,
        generateAllIllustrations,
    } = useStorybookCreator();
    
    const pagesWithText = pages.some(p => p.text);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="space-y-8 lg:h-[80vh] flex flex-col">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <WriteIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 1: Describe Character
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Be specific! The AI will use this description for every illustration to keep them consistent.</p>
                    <textarea
                        value={characterDescription}
                        onChange={(e) => setCharacterDescription(e.target.value)}
                        placeholder="e.g., a young wizard with a red cape, round glasses, and a mischievous smile"
                        className="w-full p-4 text-base border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-none h-32 bg-white dark:bg-zinc-800"
                    />
                </div>

                <div className="space-y-3">
                     <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <StorybookIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 2: Write Your Story
                    </h2>
                     <p className="text-base text-zinc-500 dark:text-zinc-400">Add pages and write your story. Then, click the main generate button.</p>
                </div>
                
                 <button
                    onClick={generateAllIllustrations}
                    disabled={isGeneratingAll || !characterDescription || !pagesWithText}
                    className="w-full flex items-center justify-center bg-teal-500 text-white font-bold py-4 px-4 text-lg rounded-lg hover:bg-teal-600 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30 disabled:shadow-none disabled:transform-none"
                    >
                    {isGeneratingAll ? (
                        <>
                        <LoadingSpinner className="w-6 h-6 mr-3" />
                         {`Generating... (${generationProgress.current}/${generationProgress.total})`}
                        </>
                    ) : (
                        <>
                        <SparklesIcon className="w-6 h-6 mr-3" />
                        Generate Storybook Illustrations
                        </>
                    )}
                </button>

                 {error && (
                    <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg text-base animate-fade-in">
                        <p>{error}</p>
                    </div>
                )}
                
                <div className="space-y-6 flex-grow overflow-y-auto pr-4 -mr-4">
                    {pages.map((page, index) => (
                        <div key={page.id} className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg space-y-3 bg-white dark:bg-zinc-800/50 animate-fade-in shadow-sm">
                           <div className="flex justify-between items-center">
                             <label className="font-bold text-lg text-zinc-900 dark:text-white">Page {index + 1}</label>
                              {pages.length > 1 && (
                                <button onClick={() => deletePage(page.id)} className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                    <CloseIcon className="w-5 h-5" />
                                </button>
                               )}
                           </div>
                            <textarea
                                value={page.text}
                                onChange={(e) => updatePageText(page.id, e.target.value)}
                                placeholder="Once upon a time, our hero went on an adventure..."
                                className="w-full p-3 text-base border border-zinc-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-none h-28 bg-zinc-50 dark:bg-zinc-900"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={addPage}
                    className="w-full mt-auto border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 font-semibold py-4 text-base rounded-lg hover:border-teal-500 hover:text-teal-500 dark:hover:border-teal-500/70 dark:hover:text-teal-500/70 transition-colors"
                >
                    + Add New Page
                </button>
            </div>

            {/* Preview Panel */}
            <div className="bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 min-h-[500px] lg:h-[80vh] lg:overflow-y-auto">
                {pages.length === 0 || (pages.length === 1 && !pages[0].text && !pages[0].imageUrl) ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <StorybookIcon className="w-16 h-16 text-zinc-400 dark:text-zinc-500"/>
                        </div>
                        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white">Your storybook will appear here</h3>
                        <p className="text-base mt-2">Describe your character and write your story on the left to begin your adventure!</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {pages.map((page, index) => (
                             <div key={page.id} className="space-y-4 animate-fade-in">
                                <div className="w-full aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                                    {page.isLoading ? (
                                        <LoadingSpinner className="w-12 h-12 text-teal-500" />
                                    ) : page.imageUrl ? (
                                        <img src={page.imageUrl} alt={`Illustration for page ${index + 1}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center text-zinc-400 dark:text-zinc-500 p-4">
                                            <SparklesIcon className="w-12 h-12 mx-auto mb-2" />
                                            <p className="text-base font-medium">Illustration will appear here</p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-base text-zinc-600 dark:text-zinc-300 text-center px-4 italic"> {page.text || "Page text will appear here."} </p>
                             </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};