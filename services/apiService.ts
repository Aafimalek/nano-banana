// Client-side API service for communicating with the server
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api' 
  : 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface ImageGenerationResponse {
  imageDataUrl: string;
}

interface TextImageParams {
  text: string;
  fontStyle: string;
  placement: string;
  colorScheme: string;
}

interface DiagramParams {
  topic: string;
}

interface IsometryParams {
  prompt: string;
}

interface OutfitReplaceParams {
  prompt: string;
}

interface MockupParams {
  backgroundPrompt?: string;
}

interface BrandAssetParams {
  description?: string;
  assetType: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: string;
  lastLogin?: string;
  createdAt?: string;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'GET', 
    body?: FormData | any,
    isFormData: boolean = false
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const options: RequestInit = {
      method,
      credentials: 'include', // Include cookies for authentication
    };

    if (body) {
      if (isFormData) {
        options.body = body;
      } else {
        options.headers = {
          'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, options);
      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      return data.data as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Text Behind Image generation
  async generateTextImage(
    imageFile: File, 
    params: TextImageParams
  ): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('text', params.text);
    formData.append('fontStyle', params.fontStyle);
    formData.append('placement', params.placement);
    formData.append('colorScheme', params.colorScheme);

    return this.makeRequest<ImageGenerationResponse>(
      '/image/text-image',
      'POST',
      formData,
      true
    );
  }

  // Diagram generation
  async generateDiagram(params: DiagramParams): Promise<ImageGenerationResponse> {
    return this.makeRequest<ImageGenerationResponse>(
      '/image/diagram',
      'POST',
      params
    );
  }

  // Isometry generation
  async generateIsometry(
    imageFile: File, 
    params: IsometryParams
  ): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', params.prompt);

    return this.makeRequest<ImageGenerationResponse>(
      '/image/isometry',
      'POST',
      formData,
      true
    );
  }

  // Replace Outfit generation
  async replaceOutfit(
    promptImageFile: File,
    outfitImageFile: File,
    params: OutfitReplaceParams
  ): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    formData.append('promptImage', promptImageFile);
    formData.append('outfitImage', outfitImageFile);
    formData.append('prompt', params.prompt);

    return this.makeRequest<ImageGenerationResponse>(
      '/image/outfit-replace',
      'POST',
      formData,
      true
    );
  }

  // Mockup generation (for backward compatibility)
  async generateMockup(
    productImageFile: File,
    backgroundImageFile?: File,
    params?: MockupParams
  ): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    formData.append('productImage', productImageFile);
    
    if (backgroundImageFile) {
      formData.append('backgroundImage', backgroundImageFile);
    }
    
    if (params?.backgroundPrompt) {
      formData.append('backgroundPrompt', params.backgroundPrompt);
    }

    return this.makeRequest<ImageGenerationResponse>(
      '/image/mockup',
      'POST',
      formData,
      true
    );
  }

  // Brand asset generation (for backward compatibility)
  async generateBrandAsset(
    imageFile?: File,
    params: BrandAssetParams
  ): Promise<ImageGenerationResponse> {
    const formData = new FormData();
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    if (params.description) {
      formData.append('description', params.description);
    }
    
    formData.append('assetType', params.assetType);

    return this.makeRequest<ImageGenerationResponse>(
      '/image/brand-asset',
      'POST',
      formData,
      true
    );
  }

  // Story illustration generation
  async generateStoryIllustration(
    characterDescription: string,
    pageText: string
  ): Promise<ImageGenerationResponse> {
    return this.makeRequest<ImageGenerationResponse>(
      '/image/story-illustration',
      'POST',
      { characterDescription, pageText }
    );
  }

  // Authentication methods
  async checkAuth(): Promise<{ authenticated: boolean; user?: User }> {
    return this.makeRequest<{ authenticated: boolean; user?: User }>('/auth/check');
  }

  async getProfile(): Promise<{ user: User }> {
    return this.makeRequest<{ user: User }>('/auth/profile');
  }

  async updateProfile(updates: { name?: string; avatar?: string }): Promise<{ user: User }> {
    return this.makeRequest<{ user: User }>('/auth/profile', 'PUT', updates);
  }

  async logout(): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/auth/logout', 'POST');
  }
}

export const apiService = new ApiService();
