import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { ImageFile, DiagramResult } from '../types';

export const useIsometryGenerator = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DiagramResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage({ file, previewUrl });
    } else {
      setImage(null);
    }
  }, []);

  const generateIsometry = useCallback(async () => {
    if (!image) {
      setError("An image is required for isometry generation.");
      return;
    }
    if (!prompt) {
      setError("A prompt is required for isometry generation.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await apiService.generateIsometry(image.file, { prompt });
      setResult({ imageDataUrl: response.imageDataUrl });
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [image, prompt]);

  return {
    image,
    setImage: handleImageUpload,
    prompt,
    setPrompt,
    isLoading,
    result,
    error,
    generateIsometry,
  };
};
