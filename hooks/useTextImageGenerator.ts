import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { ImageFile, TextImageResult } from '../types';

export const useTextImageGenerator = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [text, setText] = useState<string>('');
  const [fontStyle, setFontStyle] = useState<string>('Bold Sans-Serif');
  const [textPosition, setTextPosition] = useState<string>('Centered');
  const [colorR, setColorR] = useState<number>(255);
  const [colorG, setColorG] = useState<number>(255);
  const [colorB, setColorB] = useState<number>(255);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TextImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage({ file, previewUrl });
    } else {
      setImage(null);
    }
  }, []);

  const generate = useCallback(async () => {
    if (!image) {
      setError("An image is required.");
      return;
    }
    if (!text) {
      setError("Custom text is required.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await apiService.generateTextImage(image.file, {
        text,
        fontStyle,
        placement: textPosition,
        colorScheme: `rgb(${colorR},${colorG},${colorB})`
      });
      setResult({ imageDataUrl: response.imageDataUrl });
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [image, text, fontStyle, textPosition, colorR, colorG, colorB]);

  return {
    image,
    setImage: handleImageUpload,
    text,
    setText,
    fontStyle,
    setFontStyle,
    textPosition,
    setTextPosition,
    colorR,
    setColorR,
    colorG,
    setColorG,
    colorB,
    setColorB,
    isLoading,
    result,
    error,
    generate,
  };
};
