import { useState, useCallback } from 'react';
import { generateTextImage } from '../services/geminiService';
import { ImageFile, TextImageResult } from '../types';

export const useTextImageGenerator = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [text, setText] = useState<string>('');
  const [fontStyle, setFontStyle] = useState<string>('Bold Sans-Serif');
  const [placement, setPlacement] = useState<string>('Centered');
  const [colorScheme, setColorScheme] = useState<string>('High-Contrast White');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TextImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const imageDataUrl = await generateTextImage(
        image,
        text,
        fontStyle,
        placement,
        colorScheme
      );
      setResult({ imageDataUrl });
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [image, text, fontStyle, placement, colorScheme]);

  return {
    image,
    setImage,
    text,
    setText,
    fontStyle,
    setFontStyle,
    placement,
    setPlacement,
    colorScheme,
    setColorScheme,
    isLoading,
    result,
    error,
    generate,
  };
};
