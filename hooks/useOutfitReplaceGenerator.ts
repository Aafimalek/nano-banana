import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { ImageFile, DiagramResult } from '../types';

export const useOutfitReplaceGenerator = () => {
  const [promptImage, setPromptImage] = useState<ImageFile | null>(null);
  const [outfitImage, setOutfitImage] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DiagramResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const replaceOutfit = useCallback(async () => {
    if (!promptImage) {
      setError("A prompt image is required for outfit replacement.");
      return;
    }
    if (!outfitImage) {
      setError("An outfit image is required for outfit replacement.");
      return;
    }
    if (!prompt) {
      setError("A prompt is required for outfit replacement.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await apiService.replaceOutfit(
        promptImage.file,
        outfitImage.file,
        { prompt }
      );
      setResult({ imageDataUrl: response.imageDataUrl });
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [promptImage, outfitImage, prompt]);

  return {
    promptImage,
    setPromptImage,
    outfitImage,
    setOutfitImage,
    prompt,
    setPrompt,
    isLoading,
    result,
    error,
    replaceOutfit,
  };
};
