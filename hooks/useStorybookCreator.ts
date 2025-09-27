import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { StoryPage } from '../types';

export const useStorybookCreator = () => {
  const [characterDescription, setCharacterDescription] = useState<string>('');
  const [pages, setPages] = useState<StoryPage[]>([
    { id: crypto.randomUUID(), text: '', isLoading: false }
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });

  const addPage = () => {
    setPages(prevPages => [...prevPages, { id: crypto.randomUUID(), text: '', isLoading: false }]);
  };

  const deletePage = (id: string) => {
    setPages(prevPages => prevPages.filter(page => page.id !== id));
  };

  const updatePageText = (id: string, text: string) => {
    setPages(prevPages => prevPages.map(page => page.id === id ? { ...page, text } : page));
  };

  const generateAllIllustrations = useCallback(async () => {
    if (!characterDescription) {
        setError("Please describe your main character first!");
        return;
    }

    const pagesToGenerate = pages.filter(p => p.text);
    if (pagesToGenerate.length === 0) {
      setError("Please write some story text before generating illustrations.");
      return;
    }

    setError(null);
    setIsGeneratingAll(true);
    setGenerationProgress({ current: 0, total: pagesToGenerate.length });

    // Create a temporary array to hold new pages to avoid race conditions with state updates
    let updatedPages = [...pages];

    for (let i = 0; i < pagesToGenerate.length; i++) {
        const page = pagesToGenerate[i];
        setGenerationProgress({ current: i + 1, total: pagesToGenerate.length });
        
        // Set loading state for the specific page
        updatedPages = updatedPages.map(p => p.id === page.id ? { ...p, isLoading: true } : p);
        setPages(updatedPages);

        try {
            const response = await apiService.generateStoryIllustration(
                characterDescription,
                page.text
            );
            updatedPages = updatedPages.map(p => p.id === page.id ? { ...p, imageUrl: response.imageDataUrl, isLoading: false } : p);
            setPages(updatedPages);
        } catch (err: any) {
            setError(`Failed on page ${i + 1}: ${err.toString()}`);
            updatedPages = updatedPages.map(p => p.id === page.id ? { ...p, isLoading: false } : p);
            setPages(updatedPages);
            setIsGeneratingAll(false);
            return; // Stop generation on error
        }
    }

    setIsGeneratingAll(false);
  }, [characterDescription, pages]);


  return {
    characterDescription,
    setCharacterDescription,
    pages,
    error,
    isGeneratingAll,
    generationProgress,
    addPage,
    deletePage,
    updatePageText,
    generateAllIllustrations,
  };
};