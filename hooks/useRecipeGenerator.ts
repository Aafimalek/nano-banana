import { useState, useCallback } from 'react';
import { generateFullRecipe } from '../services/geminiService';
import { ImageFile, Recipe } from '../types';

export const useRecipeGenerator = () => {
  const [ingredientImage, setIngredientImage] = useState<ImageFile | null>(null);
  const [dishName, setDishName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const generateRecipe = useCallback(async (input: { dishName?: string, ingredientImage?: ImageFile | null }) => {
    if (!input.dishName && !input.ingredientImage) {
      setError("Please provide a dish name or an image of ingredients.");
      return;
    }

    setIsLoading(true);
    setRecipe(null);
    setError(null);
    setProgress('Initializing AI Chef...');

    try {
      const onImageGenerated = (step: number | 'final' | 'initial', data: string | Recipe) => {
        if (step === 'initial') {
            // This is the initial text-only recipe
            setRecipe(data as Recipe);
            return;
        }

        setRecipe(currentRecipe => {
          if (!currentRecipe) return null;
          
          const newRecipe = { ...currentRecipe };
          if (step === 'final') {
            newRecipe.finalImageUrl = data as string;
          } else {
            newRecipe.instructions = currentRecipe.instructions.map(inst =>
              inst.step === step ? { ...inst, imageUrl: data as string } : inst
            );
          }
          return newRecipe;
        });
      };

      await generateFullRecipe(
        { dishName: input.dishName, ingredientImage: input.ingredientImage ?? undefined },
        onImageGenerated,
        setProgress // Pass the progress setter as a callback
      );

    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
      setProgress('');
    }
  }, []);

  return {
    ingredientImage,
    setIngredientImage,
    dishName,
    setDishName,
    isLoading,
    recipe,
    error,
    generateRecipe,
    progress,
  };
};