import React from 'react';
import { ImageUploader } from './ImageUploader';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultDisplay } from './ResultDisplay';
import { useTextImageGenerator } from '../hooks/useTextImageGenerator';
import { SparklesIcon, TextImageIcon, WriteIcon } from './icons';

const FONT_STYLES = [
    "Bold Sans-Serif", 
    "Elegant Serif", 
    "Modern Graffiti", 
    "Handwritten Script", 
    "Outline",
    "Vintage Typewriter",
    "Elegant Calligraphy",
    "Sci-Fi Digital",
    "Horror Drip"
];

const PLACEMENTS = [
    "Centered", 
    "Diagonal Top-Left", 
    "Vertical Left", 
    "Wrapped Around Subject",
    "Bottom Centered"
];

const COLOR_SCHEMES = [
    "High-Contrast White", 
    "Monochrome Black", 
    "Vibrant Gradient", 
    "Subtle Shadow",
    "Gold Foil",
    "Neon Glow (Pink)",
    "Pastel Dream",
    "Rainbow Gradient"
];

const CustomSelect: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[]}> = ({ label, value, onChange, options}) => (
    <div>
        <label className="block text-base font-medium text-zinc-500 dark:text-zinc-400 mb-2">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full p-4 text-base border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white dark:bg-zinc-800"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);


export const TextImageGenerator: React.FC = () => {
    const {
        image, setImage,
        text, setText,
        fontStyle, setFontStyle,
        placement, setPlacement,
        colorScheme, setColorScheme,
        isLoading, result, error, generate
    } = useTextImageGenerator();

    const isGenerateDisabled = isLoading || !image || !text;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <TextImageIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 1: Upload Image
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Choose an image with a clear foreground subject.</p>
                </div>
                <ImageUploader onImageUpload={setImage} image={image} label="Subject Image" />

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <WriteIcon className="w-7 h-7 mr-3 text-teal-500" />
                        Step 2: Add & Style Text
                    </h2>
                    <p className="text-base text-zinc-500 dark:text-zinc-400">Enter your text and choose how you want it to look.</p>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="e.g., DREAM BIG, CREATIVE"
                        className="w-full p-4 text-base border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 bg-white dark:bg-zinc-800"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <CustomSelect label="Font Style" value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} options={FONT_STYLES} />
                    <CustomSelect label="Placement" value={placement} onChange={(e) => setPlacement(e.target.value)} options={PLACEMENTS} />
                    <CustomSelect label="Color Scheme" value={colorScheme} onChange={(e) => setColorScheme(e.target.value)} options={COLOR_SCHEMES} />
                </div>
                
                <button
                    onClick={generate}
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
                            Generate Image
                        </>
                    )}
                </button>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center min-h-[500px] lg:min-h-full">
                {isLoading ? (
                    <div className="text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-teal-500 mx-auto" />
                        <p className="font-semibold text-xl text-zinc-900 dark:text-white">AI is creating your graphic...</p>
                        <p className="text-base text-zinc-500 dark:text-zinc-400">This can take a moment. Please wait.</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : result ? (
                    <ResultDisplay result={{ imageDataUrl: result.imageDataUrl, description: "Text behind image graphic" }} />
                ) : (
                    <div className="text-center text-zinc-500 dark:text-zinc-400 p-4 max-w-sm mx-auto">
                         <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <TextImageIcon className="w-16 h-16 text-zinc-400 dark:text-zinc-500"/>
                        </div>
                        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white">Your image will appear here</h3>
                        <p className="text-base mt-2">Upload an image and add text to create your masterpiece!</p>
                    </div>
                )}
            </div>
        </div>
    );
};