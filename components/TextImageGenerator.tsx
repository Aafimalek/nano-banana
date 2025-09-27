import React from 'react';
import { ImageUploader } from './ImageUploader';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultDisplay } from './ResultDisplay';
import { DragDropImageUploader } from './DragDropImageUploader';
import { ColorPicker } from './ColorPicker';
import { useTextImageGenerator } from '../hooks/useTextImageGenerator';
import { FaTextWidth, FaPen, FaProjectDiagram } from 'react-icons/fa';

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

const POSITIONS = [
    "Centered",
    "Top Left",
    "Top Right",
    "Bottom Left",
    "Bottom Right"
];

const CustomSelect: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[] }> = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-base font-medium text-[#ededed] mb-2">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full p-4 text-base border border-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#3758c9] focus:border-[#3758c9] transition duration-200 bg-[#1a1a1a] text-[#ededed]"
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
        textPosition, setTextPosition,
        colorR, setColorR,
        colorG, setColorG,
        colorB, setColorB,
        isLoading, result, error, generate
    } = useTextImageGenerator();

    const isGenerateDisabled = isLoading || !image || !text;

    const handleColorChange = (color: { r: number, g: number, b: number }) => {
        setColorR(color.r);
        setColorG(color.g);
        setColorB(color.b);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-full">
            {/* Left: Original Image Uploader */}
            <div className="lg:col-span-4 space-y-4">
                <DragDropImageUploader
                    onImageUpload={setImage}
                    image={image}
                    label="Original Image"
                />
            </div>

            {/* Middle: Controls */}
            <div className="lg:col-span-4 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-[#ededed] flex items-center">
                        <FaPen size={20} color="#ededed" />
                        <span className="ml-2">Text & Style</span>
                    </h2>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                        className="w-full p-3 text-base border border-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#3758c9] focus:border-[#3758c9] bg-[#1a1a1a] text-[#ededed]"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <CustomSelect label="Font Style" value={fontStyle} onChange={(e) => setFontStyle(e.target.value)} options={FONT_STYLES} />
                    <CustomSelect label="Text Position" value={textPosition} onChange={(e) => setTextPosition(e.target.value)} options={POSITIONS} />
                </div>

                <div className="relative">
                    <ColorPicker
                        color={{ r: colorR, g: colorG, b: colorB }}
                        onChange={handleColorChange}
                        label="Text Color"
                    />
                </div>

                <button
                    onClick={generate}
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
                            <FaProjectDiagram size={20} color="white" />
                            <span className="ml-3">Generate</span>
                        </>
                    )}
                </button>
            </div>

            {/* Right: Result */}
            <div className="lg:col-span-4 bg-[#1a1a1a] p-4 sm:p-6 rounded-2xl shadow-inner border border-white flex flex-col items-center justify-center min-h-[500px]">
                {isLoading ? (
                    <div className="text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-white mx-auto" />
                        <p className="font-semibold text-xl text-white">AI is creating your graphic...</p>
                        <p className="text-base text-white">This can take a moment. Please wait.</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-white bg-black border border-white p-6 rounded-lg">
                        <h3 className="font-bold text-lg">Generation Failed</h3>
                        <p className="text-base mt-2">{error}</p>
                    </div>
                ) : result ? (
                    <ResultDisplay result={{ imageDataUrl: result.imageDataUrl, description: "Text behind image graphic" }} />
                ) : (
                    <div className="text-center text-white p-4 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-white w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaTextWidth size={64} color="white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Result will appear here</h3>
                        <p className="text-base mt-2">Upload an image and set text, position and color.</p>
                    </div>
                )}
            </div>
        </div>
    );
};