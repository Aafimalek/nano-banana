import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { LoadingSpinner } from './LoadingSpinner';
import { useRecipeGenerator } from '../hooks/useRecipeGenerator';
import { RecipeIcon, SparklesIcon, WriteIcon, UploadIcon } from './icons';
import { Recipe } from '../types';

const RecipeDisplay: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    return (
        <div className="space-y-10 animate-fade-in">
            <div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{recipe.title}</h2>
                <p className="mt-3 text-lg text-gray-400">Estimated time: {recipe.estimatedTime}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-1 space-y-4">
                    <h3 className="text-2xl font-bold border-b-2 border-white pb-3 text-white">Ingredients</h3>
                    <ul className="space-y-2 list-disc list-inside text-base text-gray-300">
                        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <h3 className="text-2xl font-bold border-b-2 border-white pb-3 text-white">Instructions</h3>
                    {recipe.instructions.map(inst => (
                        <div key={inst.step} className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="flex-shrink-0 w-full sm:w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                                {inst.imageUrl ? (
                                    <img src={inst.imageUrl} alt={`Step ${inst.step}`} className="w-full h-full object-cover animate-fade-in" />
                                ) : (
                                    <LoadingSpinner className="w-10 h-10 text-white" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold text-lg text-white">Step {inst.step}</p>
                                <p className="text-base text-gray-300 mt-1">{inst.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-center mb-6 text-white">Final Dish</h3>
                <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                    {recipe.finalImageUrl ? (
                        <img src={recipe.finalImageUrl} alt={recipe.title} className="w-full h-full object-cover animate-fade-in" />
                    ) : (
                        <LoadingSpinner className="w-12 h-12 text-white" />
                    )}
                </div>
            </div>

        </div>
    );
}

const SegmentedControl: React.FC<{
    options: { value: 'text' | 'upload', label: string }[];
    value: 'text' | 'upload';
    onChange: (value: 'text' | 'upload') => void;
}> = ({ options, value, onChange }) => (
    <div className="flex bg-gray-800 rounded-lg p-1 space-x-1">
        {options.map(option => (
            <button key={option.value} onClick={() => onChange(option.value)} className={`w-full py-2.5 text-base font-medium rounded-md transition-colors ${value === option.value ? 'bg-gray-700 text-white shadow' : 'text-gray-300 hover:bg-gray-700/50'}`}>
                {option.label}
            </button>
        ))}
    </div>
);


export const RecipeGenerator: React.FC = () => {
    const {
        ingredientImage,
        setIngredientImage,
        dishName,
        setDishName,
        isLoading,
        recipe,
        error,
        generateRecipe,
        progress
    } = useRecipeGenerator();
    const [inputMode, setInputMode] = useState<'text' | 'upload'>('text');

    const handleGenerate = () => {
        if (inputMode === 'text') {
            generateRecipe({ dishName });
        } else {
            generateRecipe({ ingredientImage });
        }
    };

    const isGenerateDisabled = isLoading || (inputMode === 'text' && !dishName) || (inputMode === 'upload' && !ingredientImage);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <RecipeIcon className="w-7 h-7 mr-3 text-white" />
                        What to cook?
                    </h2>
                    <p className="text-base text-gray-400">Describe a dish or show us your ingredients.</p>
                </div>

                <SegmentedControl value={inputMode} onChange={setInputMode} options={[{ value: 'text', label: 'Describe Dish' }, { value: 'upload', label: 'Upload Ingredients' }]} />

                {inputMode === 'text' ? (
                    <div className="relative">
                        <WriteIcon className="w-6 h-6 absolute top-3.5 left-4 text-gray-400" />
                        <input type="text" value={dishName} onChange={(e) => setDishName(e.target.value)} placeholder="e.g., Vegetable Stir Fry" className="w-full p-4 pl-12 text-base border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-white transition duration-200 bg-gray-800 text-white" />
                    </div>
                ) : (
                    <ImageUploader onImageUpload={setIngredientImage} image={ingredientImage} label="Ingredients Image" />
                )}

                <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center bg-gray-600 text-white font-bold py-4 px-4 text-lg rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-500/30 disabled:shadow-none disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner className="w-6 h-6 mr-3" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-6 h-6 mr-3" />
                            Generate Recipe
                        </>
                    )}
                </button>
                {isLoading && (
                    <p className="text-sm text-center text-gray-400 animate-fade-in">{progress}</p>
                )}
            </div>

            {/* Output Section */}
            <div className="lg:col-span-3 bg-black p-4 sm:p-6 rounded-2xl shadow-inner border border-gray-800 flex flex-col justify-center min-h-[500px] lg:min-h-full">
                {isLoading && !recipe ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <LoadingSpinner className="w-16 h-16 text-white mx-auto" />
                        <p className="font-semibold text-xl text-white">Your personal AI chef is at work...</p>
                        <p className="text-base text-gray-400 max-w-xs">{progress || 'Please wait...'}</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-red-500 bg-red-900/20 p-6 rounded-lg">
                            <h3 className="font-bold text-lg">Generation Failed</h3>
                            <p className="text-base mt-2 max-w-md">{error}</p>
                        </div>
                    </div>
                ) : recipe ? (
                    <div className="w-full h-full lg:max-h-[80vh] overflow-y-auto pr-4 -mr-2">
                        <RecipeDisplay recipe={recipe} />
                    </div>
                ) : (
                    <div className="text-center text-gray-400 p-4 max-w-sm mx-auto">
                        <div className="border-2 border-dashed border-gray-700 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <RecipeIcon className="w-16 h-16 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Your recipe will appear here</h3>
                        <p className="text-base mt-2">An illustrated, step-by-step guide is just a click away!</p>
                    </div>
                )}
            </div>
        </div>
    );
};