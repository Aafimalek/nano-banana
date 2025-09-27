import React from 'react';
import { GeneratedMockup } from '../types';
import { FaDownload } from "react-icons/fa";

interface ResultDisplayProps {
  result: GeneratedMockup;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="relative w-full h-auto aspect-square max-w-md rounded-2xl overflow-hidden border border-gray-700 bg-black/50 backdrop-blur-xl shadow-xl shadow-black/20">
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-600"></div>
        <img
          src={result.imageDataUrl}
          alt="Generated Mockup"
          className="w-full h-full object-contain"
        />
      </div>
      <a
        href={result.imageDataUrl}
        download="ai-generated-image.png"
        className="group relative inline-flex items-center px-6 py-2 rounded-full text-white font-semibold transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 opacity-90 group-hover:opacity-100 transition-opacity"></span>
        <span className="absolute -inset-1 rounded-full blur-md bg-gradient-to-r from-gray-600 to-gray-700 opacity-60 group-hover:opacity-80 transition-opacity"></span>
        <span className="relative inline-flex items-center">
          <FaDownload className="w-5 h-5 mr-2" />
          Download Image
        </span>
      </a>
    </div>
  );
};