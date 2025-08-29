import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { LoadingSpinner } from './LoadingSpinner';
import { useAssetGenerator } from '../hooks/useAssetGenerator';
import { MascotIcon, SparklesIcon, WriteIcon, CheckSquareIcon, SquareIcon, DownloadIcon } from './icons';
import { GeneratedMockup } from '../types';

const ASSET_TYPES = [
    "Social Media Post (1:1 Aspect Ratio)",
    "Billboard Ad (Landscape)",
    "Magazine Layout (Portrait)",
    "Website Hero Image",
    "Flyer / Poster"
];

const AssetGallery: React.FC<{ results: GeneratedMockup[] }> = ({ results }) => (
    <div className="w-full space-y-6 animate-fade-in">
        <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">Generated Assets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {results.map((result, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={result.imageDataUrl}
                        alt={result.description || `Asset ${index + 1}`}
                        className="w-full h-full object-cover aspect-square"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                            href={result.imageDataUrl}
                            download={`${(result.description || `asset-${index}`).replace(/\s/g, '-')}.png`}
                            className="inline-flex items-center text-white font-bold py-2 px-4 rounded-lg bg-teal-500 hover:bg-teal-600 transition-colors"
                        >
                            <DownloadIcon className="w-5 h-5 mr-2" />
                            Download
                        </a>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-base font-semibold truncate">{result.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SegmentedControl: React.FC<{
    options: { value: 'text' | 'upload', label: string }[];
    value: 'text' | 'upload';
    onChange: (value: 'text' | 'upload') => void;
}> = ({ options, value, onChange }) => (
    <div className="flex bg-zinc-200 dark:bg-zinc-800 rounded-lg p-1 space-x-1">
        {options.map(option => (
            <button key={option.value} onClick={() => onChange(option.value)} className={`w-full py-2.5 text-base font-medium rounded-md transition-colors ${value === option.value ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-teal-400 shadow' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50'}`}>
                {option.label}
            </button>
        ))}
    </div>
);

export const AssetGenerator: React.FC = () => {
    const {
        mascotImage,
        setMascotImage,
        mascotDescription,
        setMascotDescription,
        assetTypes,
        setAssetTypes,
        isLoading,
        results,
        error,
        generateAssets,
        progress,
    } = useAssetGenerator();

    const [inputMode, setInputMode] = useState<'text' | 'upload'>('text');

    const handleToggleAssetType = (type: string) => {
        setAssetTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleGenerate = () => {
        if (inputMode === 'text') {
            generateAssets({ description: mascotDescription });
        } else {
            generateAssets({ image: mascotImage });
        }
    };
    
    const isGenerateDisabled = isLoading || assetTypes.length === 0 || (inputMode === 'text' && !mascotDescription) || (inputMode === 'upload' && !mascotImage);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <MascotIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 1: Define Subject
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Describe your mascot or upload a product image to get started.</p>
                </div>

                <SegmentedControl value={inputMode} onChange={setInputMode} options={[{value: 'text', label: 'Describe Mascot'}, {value: 'upload', label: 'Upload Product'}]} />
                
                {inputMode === 'text' ? (
                     <div className="relative">
                        <WriteIcon className="w-6 h-6 absolute top-3.5 left-4 text-zinc-400" />
                        <textarea value={mascotDescription} onChange={(e) => setMascotDescription(e.target.value)} placeholder="e.g., a friendly blue robot with a smile, holding a sign" className="w-full p-4 pl-12 text-base border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-none h-32 bg-white dark:bg-zinc-800" />
                    </div>
                ) : (
                    <ImageUploader onImageUpload={setMascotImage} image={mascotImage} label="Product/Mascot Image" />
                )}

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <SparklesIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 2: Choose Assets
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Select which marketing assets you want to generate.</p>
                </div>
                <div className="space-y-3">
                    {ASSET_TYPES.map(type => (
                        <div key={type} onClick={() => handleToggleAssetType(type)} className="flex items-center p-4 rounded-lg cursor-pointer transition-colors bg-white dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700">
                           {assetTypes.includes(type) ? <CheckSquareIcon className="w-6 h-6 mr-4 text-teal-500"/> : <SquareIcon className="w-6 h-6 mr-4 text-zinc-400 dark:text-zinc-500" />}
                           <span className="font-medium text-base text-zinc-800 dark:text-zinc-200">{type}</span>
                        </div>
                    ))}
                </div>

                 <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center bg-teal-500 text-white font-bold py-4 px-4 text-lg rounded-lg hover:bg-teal-600 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/30 disabled:shadow-none disabled:transform-none"
                    >
                    {isLoading ? (
                        <>
                        <LoadingSpinner className="w-6 h-6 mr-3" />
                         {`Generating... (${progress.current}/${progress.total})`}
                        </>
                    ) : (
                        <>
                        <SparklesIcon className="w-6 h-6 mr-3" />
                        Generate Assets
                        </>
                    )}
                </button>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center min-h-[500px] lg:min-h-full">
                {isLoading ? (
                    <div className="text-center space-y-4 max-w-sm">
                        <LoadingSpinner className="w-16 h-16 text-teal-500 mx-auto" />
                        <p className="font-semibold text-xl text-zinc-900 dark:text-white">AI is building your brand assets...</p>
                        <p className="text-base text-zinc-500 dark:text-zinc-400">{`Generating asset ${progress.current} of ${progress.total}: "${progress.currentAsset}"`}</p>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
                            <div className="bg-teal-500 h-3 rounded-full transition-all duration-300" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : results.length > 0 ? (
                    <AssetGallery results={results} />
                ) : (
                     <div className="text-center text-zinc-500 dark:text-zinc-400 p-4 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MascotIcon className="w-16 h-16 text-zinc-400 dark:text-zinc-500"/>
                        </div>
                        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white">Your assets will appear here</h3>
                        <p className="text-base mt-2">Define your brand and choose your assets to begin!</p>
                    </div>
                )}
            </div>
        </div>
    );
};