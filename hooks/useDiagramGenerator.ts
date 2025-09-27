import { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { DiagramResult } from '../types';

export const useDiagramGenerator = () => {
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DiagramResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateDiagram = useCallback(async () => {
    if (!topic) {
      setError("Please enter a topic for the diagram.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await apiService.generateDiagram({ topic });
      setResult({ imageDataUrl: response.imageDataUrl });
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return {
    topic,
    setTopic,
    isLoading,
    result,
    error,
    generateDiagram,
  };
};
