import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTimes } from 'react-icons/fa';

interface ImageFile {
    previewUrl: string;
    file: File;
}

interface DragDropImageUploaderProps {
    onImageUpload: (file: File | null) => void;
    image: ImageFile | null;
    label?: string;
    className?: string;
    maxHeight?: string;
    acceptedFileTypes?: string[];
}

export const DragDropImageUploader: React.FC<DragDropImageUploaderProps> = ({
    onImageUpload,
    image,
    label = "Upload Image",
    className = "",
    maxHeight = "h-48",
    acceptedFileTypes = ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': acceptedFileTypes
        },
        multiple: false
    } as any);

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onImageUpload(null);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {label && (
                <h3 className="text-lg font-bold text-white">{label}</h3>
            )}
            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragActive
                    ? 'border-blue-400 bg-blue-900/20'
                    : 'border-gray-400 hover:border-gray-300'
                    }`}
            >
                <input {...getInputProps()} />

                {image ? (
                    <div className="space-y-4">
                        <img
                            src={image.previewUrl}
                            alt="Uploaded"
                            className={`w-full ${maxHeight} object-contain mx-auto rounded-lg`}
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                        >
                            <FaTimes size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 h-full flex flex-col items-center justify-center">
                        <FaUpload size={48} color="#9CA3AF" />
                        <div>
                            <p className="text-lg font-medium text-white mb-2">
                                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                            </p>
                            <p className="text-gray-400">
                                or click to browse files
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
