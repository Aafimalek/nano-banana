import { useState, useCallback } from 'react';
import { generateBrandAsset } from '../services/geminiService';
import { GeneratedMockup, ImageFile } from '../types';

export const useAssetGenerator = () => {
  const [mascotImage, setMascotImage] = useState<ImageFile | null>(null);
  const [mascotDescription, setMascotDescription] = useState<string>('');
  const [assetTypes, setAssetTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<GeneratedMockup[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, currentAsset: '' });

  const generateAssets = useCallback(async (assetInput: { image?: ImageFile | null, description?: string }) => {
    if (assetTypes.length === 0) {
      setError("Please select at least one asset type.");
      return;
    }

    if (!assetInput.image && !assetInput.description) {
      setError("Please provide a mascot description or a product image.");
      return;
    }

    setIsLoading(true);
    setResults([]);
    setError(null);
    setProgress({ current: 0, total: assetTypes.length, currentAsset: '' });

    const generated: GeneratedMockup[] = [];

    try {
      for (let i = 0; i < assetTypes.length; i++) {
        const assetType = assetTypes[i];
        setProgress({ current: i + 1, total: assetTypes.length, currentAsset: assetType });
        
        const imageDataUrl = await generateBrandAsset(
          { image: assetInput.image ?? undefined, description: assetInput.description },
          assetType
        );

        generated.push({ imageDataUrl, description: assetType });
        setResults([...generated]); // Update results in real-time
      }
    } catch (err: any) {
      setError(err.toString());
      // Keep successfully generated images in the results
    } finally {
      setIsLoading(false);
    }
  }, [assetTypes]);

  return {
    mascotImage,
    setMascotImage,
    mascotDescription,
    setMascotDescription,
    assetTypes,
    setAssetTypes,
    isLoading,
    results,
    error,
    generateAssets,
    progress,
  };
};