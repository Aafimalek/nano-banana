import React from 'react';
import { GeneratedMockup } from '../types';
import { DownloadIcon } from './icons';

interface ResultDisplayProps {
  result: GeneratedMockup;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="w-full h-auto aspect-square max-w-md bg-white dark:bg-zinc-800/50 rounded-lg shadow-inner overflow-hidden border border-zinc-200 dark:border-zinc-700">
        <img
          src={result.imageDataUrl}
          alt="Generated Mockup"
          className="w-full h-full object-contain"
        />
      </div>
      <a
        href={result.imageDataUrl}
        download="ai-generated-image.png"
        className="inline-flex items-center bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-lg shadow-teal-500/30 transform hover:scale-105"
      >
        <DownloadIcon className="w-5 h-5 mr-2" />
        Download Image
      </a>
    </div>
  );
};