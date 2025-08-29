import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { ResultDisplay } from './ResultDisplay';
import { LoadingSpinner } from './LoadingSpinner';
import { useMockupGenerator } from '../hooks/useMockupGenerator';
import { BackgroundIcon, ProductIcon, SparklesIcon, WriteIcon } from './icons';

type BackgroundMode = 'upload' | 'text';

const SegmentedControl: React.FC<{
    options: { value: BackgroundMode, label: string }[];
    value: BackgroundMode;
    onChange: (value: BackgroundMode) => void;
}> = ({ options, value, onChange }) => (
    <div className="flex bg-zinc-200 dark:bg-zinc-800 rounded-lg p-1 space-x-1">
        {options.map(option => (
            <button key={option.value} onClick={() => onChange(option.value)} className={`w-full py-2.5 text-base font-medium rounded-md transition-colors ${value === option.value ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-teal-400 shadow' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50'}`}>
                {option.label}
            </button>
        ))}
    </div>
);

export const MockupGenerator: React.FC = () => {
    const {
        productImage,
        setProductImage,
        backgroundImage,
        setBackgroundImage,
        backgroundPrompt,
        setBackgroundPrompt,
        isLoading,
        result,
        error,
        generateMockup,
    } = useMockupGenerator();

    const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('text');

    const handleGenerate = () => {
        if (backgroundMode === 'upload') {
            generateMockup(null);
        } else {
            generateMockup(backgroundPrompt);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <ProductIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 1: Upload Product
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Provide a clear image of your product with a transparent or simple background.</p>
                </div>
                <ImageUploader
                    onImageUpload={setProductImage}
                    image={productImage}
                    label="Product Image"
                />

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <BackgroundIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 2: Define Background
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Upload a background image or describe the scene you want.</p>
                </div>

                <SegmentedControl value={backgroundMode} onChange={setBackgroundMode} options={[{value: 'text', label: 'Describe Scene'}, {value: 'upload', label: 'Upload Image'}]} />

                {backgroundMode === 'text' ? (
                    <div className="relative">
                        <WriteIcon className="w-6 h-6 absolute top-3.5 left-4 text-zinc-400" />
                        <textarea
                            value={backgroundPrompt}
                            onChange={(e) => setBackgroundPrompt(e.target.value)}
                            placeholder="e.g., a modern coffee shop interior, on a sunlit wooden table"
                            className="w-full p-4 pl-12 text-base border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-none h-32 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400"
                        />
                    </div>
                ) : (
                    <ImageUploader
                        onImageUpload={setBackgroundImage}
                        image={backgroundImage}
                        label="Background Image"
                    />
                )}

                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !productImage || (backgroundMode === 'upload' && !backgroundImage) || (backgroundMode === 'text' && !backgroundPrompt)}
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
                            Generate Mockup
                        </>
                    )}
                </button>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center min-h-[500px] lg:min-h-full">
                {isLoading ? (
                    <div className="text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-teal-500 mx-auto" />
                        <p className="font-semibold text-xl text-zinc-900 dark:text-white">AI is crafting your masterpiece...</p>
                        <p className="text-base text-zinc-500 dark:text-zinc-400">This can take a moment. Please wait.</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : result ? (
                    <ResultDisplay result={result} />
                ) : (
                    <div className="text-center text-zinc-500 dark:text-zinc-400 p-4 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <SparklesIcon className="w-16 h-16 text-zinc-400 dark:text-zinc-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white">Your mockup will appear here</h3>
                        <p className="text-base mt-2">Fill in the details on the left and click generate!</p>
                    </div>
                )}
            </div>
        </div>
    );
};