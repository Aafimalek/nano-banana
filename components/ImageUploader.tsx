import React, { useRef } from 'react';
import { ImageFile } from '../types';
import { CloseIcon, UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile | null) => void;
  image: ImageFile | null;
  label: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, image, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageUpload(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleContainerClick}
      className="relative w-full h-48 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg flex items-center justify-center text-center cursor-pointer hover:border-teal-500 dark:hover:border-teal-500/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300"
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {image ? (
        <>
          <img
            src={image.previewUrl}
            alt={label}
            className="w-full h-full object-contain rounded-lg p-2"
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 bg-zinc-900 bg-opacity-60 text-white rounded-full p-1.5 hover:bg-opacity-80 transition-colors"
            aria-label="Remove image"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </>
      ) : (
        <div className="text-zinc-500 dark:text-zinc-400 flex flex-col items-center">
          <UploadIcon className="w-8 h-8 mb-2" />
          <span className="font-semibold">Click to upload {label}</span>
          <span className="text-xs">PNG, JPG, WEBP</span>
        </div>
      )}
    </div>
  );
};