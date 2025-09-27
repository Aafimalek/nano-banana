import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatApi, GeneratedImageResponse } from '../api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FaHistory } from "react-icons/fa";

export const ImagesHistory: React.FC = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<GeneratedImageResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GeneratedImageResponse | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const userImages = await ChatApi.getUserImages(50, 0);
                setImages(userImages);
            } catch (error) {
                console.error('Error fetching images:', error);
                // Fallback to mock data if API fails
                const mockImages: GeneratedImageResponse[] = [
                    {
                        imageDataUrl: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Text+Behind+Image+1',
                        metadata: {
                            tool: 'Text Behind Image',
                            timestamp: '2024-01-15T10:30:00Z'
                        }
                    },
                    {
                        imageDataUrl: 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Diagram+1',
                        metadata: {
                            tool: 'Diagram',
                            timestamp: '2024-01-14T15:45:00Z'
                        }
                    },
                    {
                        imageDataUrl: 'https://via.placeholder.com/400x300/059669/FFFFFF?text=Isometry+1',
                        metadata: {
                            tool: 'Isometry',
                            timestamp: '2024-01-13T09:20:00Z'
                        }
                    },
                    {
                        imageDataUrl: 'https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Outfit+Replace+1',
                        metadata: {
                            tool: 'Replace Outfit',
                            timestamp: '2024-01-12T14:10:00Z'
                        }
                    },
                    {
                        imageDataUrl: 'https://via.placeholder.com/400x300/EA580C/FFFFFF?text=Text+Behind+Image+2',
                        metadata: {
                            tool: 'Text Behind Image',
                            timestamp: '2024-01-11T16:30:00Z'
                        }
                    },
                    {
                        imageDataUrl: 'https://via.placeholder.com/400x300/0891B2/FFFFFF?text=Diagram+2',
                        metadata: {
                            tool: 'Diagram',
                            timestamp: '2024-01-10T11:15:00Z'
                        }
                    },
                ];
                setImages(mockImages);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleBackToChat = () => {
        navigate('/chat');
    };

    const handleImageClick = (image: GeneratedImageResponse) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleDownloadImage = (image: GeneratedImageResponse) => {
        const link = document.createElement('a');
        link.href = image.imageDataUrl;
        link.download = `ai-generated-${image.metadata?.tool?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a]">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#1a1a1a]/80 border-b border-[#a1a1a1]/20 shadow-xl shadow-black/20">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Back Button */}
                        <button
                            onClick={handleBackToChat}
                            className="flex items-center space-x-2 text-[#a1a1a1] hover:text-[#ededed] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-sm font-medium">Back to Chat</span>
                        </button>

                        {/* Title */}
                        {/* <div className="flex items-center space-x-3">
                            <FaHistory className="w-6 h-6 text-[#ededed]" />
                            <h1 className="text-xl font-bold text-[#ededed]">AI Generated Images</h1>
                        </div> */}

                        {/* Stats */}
                        <div className="text-sm text-[#a1a1a1]">
                            {images.length} images
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full h-[calc(100vh-4rem)] overflow-auto">
                <div className="max-w-7xl mx-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <LoadingSpinner />
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-[#0a0a0a] rounded-full flex items-center justify-center">
                                <FaHistory className="w-12 h-12 text-[#a1a1a1]" />
                            </div>
                            <h3 className="text-2xl font-semibold text-[#ededed] mb-4">No Images Yet</h3>
                            <p className="text-[#a1a1a1] mb-8 max-w-md mx-auto">
                                Start creating amazing AI-generated images with our tools to see them appear here.
                            </p>
                            <button
                                onClick={handleBackToChat}
                                className="px-6 py-3 bg-gradient-to-r from-[#0090ff] to-[#7130d1] text-[#ededed] font-semibold rounded-lg hover:from-[#0090ff]/80 hover:to-[#7130d1]/80 transition-all duration-300 transform hover:scale-105"
                            >
                                Start Creating
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-[#0a0a0a] rounded-lg overflow-hidden hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                >
                                    <img
                                        src={image.imageDataUrl}
                                        alt={`Generated ${image.metadata?.tool || 'Image'}`}
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownloadImage(image);
                                                }}
                                                className="p-2 bg-[#0090ff] hover:bg-[#0090ff]/80 text-[#ededed] rounded-full transition-colors"
                                                title="Download"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleImageClick(image);
                                                }}
                                                className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                                                title="View"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-[#43b6f0] bg-[#43b6f0]/10 px-2 py-1 rounded">
                                                {image.metadata?.tool || 'Generated Image'}
                                            </span>
                                            <span className="text-xs text-[#a1a1a1]">
                                                {image.metadata?.timestamp ? formatDate(image.metadata.timestamp) : 'Unknown date'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="relative max-w-4xl max-h-[90vh] mx-4">
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-12 right-0 text-[#ededed] hover:text-[#a1a1a1] transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="bg-[#0a0a0a] rounded-lg overflow-hidden">
                            <img
                                src={selectedImage.imageDataUrl}
                                alt={`Generated ${selectedImage.metadata?.tool || 'Image'}`}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />

                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-[#ededed]">
                                        {selectedImage.metadata?.tool || 'Generated Image'}
                                    </h3>
                                    <button
                                        onClick={() => handleDownloadImage(selectedImage)}
                                        className="px-4 py-2 bg-[#0090ff] hover:bg-[#0090ff]/80 text-[#ededed] text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Download
                                    </button>
                                </div>

                                {selectedImage.metadata?.timestamp && (
                                    <p className="text-sm text-[#a1a1a1]">
                                        Generated on {formatDate(selectedImage.metadata.timestamp)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

