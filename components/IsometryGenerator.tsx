import React from 'react';
import { DragDropImageUploader } from './DragDropImageUploader';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultDisplay } from './ResultDisplay';
import { useIsometryGenerator } from '../hooks/useIsometryGenerator';
import { FaImage, FaPen, FaProjectDiagram } from "react-icons/fa";

const ANGLES = [
    "45° Standard",
    "30° Gentle",
    "60° Dramatic",
    "Custom Angle"
];

const CustomSelect: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[] }> = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-base font-medium text-white mb-2">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full p-4 text-base border border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition duration-200 bg-[#1a1a1a] text-white"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export const IsometryGenerator: React.FC = () => {
    const {
        image, setImage,
        prompt, setPrompt,
        isLoading, result, error, generateIsometry
    } = useIsometryGenerator();

    const [angle, setAngle] = React.useState<string>(ANGLES[0]);

    const isGenerateDisabled = isLoading || !image || !prompt;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-full">
            {/* Left: Image Upload */}
            <div className="lg:col-span-4 space-y-4">
                <DragDropImageUploader
                    onImageUpload={setImage}
                    image={image}
                    label="Reference Image"
                    maxHeight="h-56"
                />
            </div>

            {/* Middle: Controls */}
            <div className="lg:col-span-4 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-white flex items-center">
                        <FaPen className="w-5 h-5 mr-2 text-white" />
                        Custom Prompt
                    </h2>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what you want to create in isometric style..."
                        rows={4}
                        className="w-full p-3 text-base border border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white bg-[#1a1a1a] text-white resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <CustomSelect label="Angles" value={angle} onChange={(e) => setAngle(e.target.value)} options={ANGLES} />
                </div>

                <button
                    onClick={generateIsometry}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center bg-white text-black font-bold py-3 px-4 text-base rounded-lg hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner className="w-5 h-5 mr-3" />
                            Generating...
                        </>
                    ) : (
                        <>
                            Generate
                        </>
                    )}
                </button>
            </div>

            {/* Right: Result */}
            <div className="lg:col-span-4 bg-[#1a1a1a] p-4 sm:p-6 rounded-2xl shadow-inner border border-white flex flex-col items-center justify-center min-h-[500px]">
                {isLoading ? (
                    <div className="text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-white mx-auto" />
                        <p className="font-semibold text-xl text-white">AI is creating your isometry...</p>
                        <p className="text-base text-white">This can take a moment. Please wait.</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-white bg-black border border-white p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : result ? (
                    <ResultDisplay result={{ imageDataUrl: result.imageDataUrl, description: "Isometric illustration" }} />
                ) : (
                    <div className="text-center text-white p-4 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-white w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaImage className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Result will appear here</h3>
                        <p className="text-base mt-2">Upload an image and enter a prompt to generate isometric illustration.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
