
import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { GeneratedMockup, ImageFile } from '../types';

export const useMockupGenerator = () => {
  const [productImage, setProductImage] = useState<ImageFile | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<ImageFile | null>(null);
  const [backgroundPrompt, setBackgroundPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedMockup | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMockup = useCallback(async (prompt: string | null) => {
    if (!productImage) {
      setError("Product image is required.");
      return;
    }

    if (!backgroundImage && !prompt) {
      setError("Either a background image or a text description is required.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // Determine which background to use based on the prompt argument
      const activeBackgroundImage = prompt ? null : backgroundImage;
      const activeBackgroundPrompt = prompt ? prompt : null;
      
      const response = await apiService.generateMockup(
        productImage.file,
        activeBackgroundImage?.file,
        { backgroundPrompt: activeBackgroundPrompt }
      );
      
      setResult({ imageDataUrl: response.imageDataUrl });
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [productImage, backgroundImage]);

  return {
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
  };
};
