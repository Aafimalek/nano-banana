import { ApiHelper } from './apiHelper';
import type { 
  ApiResponseData,
  ImageGenerationResponse,
  TextImageParams,
  DiagramParams,
  IsometryParams,
  OutfitReplaceParams,
  MockupParams,
  BrandAssetParams
} from './types';

// Image API class
export class ImageApi {
  // Generate text behind image
  static async generateTextImage(
    imageFile: File,
    params: TextImageParams
  ): Promise<ImageGenerationResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('text', params.text);
      formData.append('fontStyle', params.fontStyle);
      formData.append('placement', params.placement);
      formData.append('colorScheme', params.colorScheme);

      const response = await ApiHelper.postFormData<{ result: ImageGenerationResponse }>(
        '/image/text-image',
        formData
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to generate text image');
      }
      return response.data.result;
    } catch (error) {
      console.error('Generate text image failed:', error);
      throw error;
    }
  }

  // Generate diagram
  static async generateDiagram(params: DiagramParams): Promise<ImageGenerationResponse> {
    try {
      const response = await ApiHelper.post<{ result: ImageGenerationResponse }>(
        '/image/diagram',
        params
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to generate diagram');
      }
      return response.data.result;
    } catch (error) {
      console.error('Generate diagram failed:', error);
      throw error;
    }
  }

  // Generate isometry
  static async generateIsometry(
    imageFile: File,
    params: IsometryParams
  ): Promise<ImageGenerationResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('prompt', params.prompt);
      if (params.style) formData.append('style', params.style);
      if (params.angle) formData.append('angle', params.angle);

      const response = await ApiHelper.postFormData<{ result: ImageGenerationResponse }>(
        '/image/isometry',
        formData
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to generate isometry');
      }
      return response.data.result;
    } catch (error) {
      console.error('Generate isometry failed:', error);
      throw error;
    }
  }

  // Replace outfit
  static async replaceOutfit(
    promptImageFile: File,
    outfitImageFile: File,
    params: OutfitReplaceParams
  ): Promise<ImageGenerationResponse> {
    try {
      const formData = new FormData();
      formData.append('promptImage', promptImageFile);
      formData.append('outfitImage', outfitImageFile);
      formData.append('prompt', params.prompt);
      if (params.style) formData.append('style', params.style);

      const response = await ApiHelper.postFormData<{ result: ImageGenerationResponse }>(
        '/image/outfit-replace',
        formData
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to replace outfit');
      }
      return response.data.result;
    } catch (error) {
      console.error('Replace outfit failed:', error);
      throw error;
    }
  }

  // Generate mockup
  static async generateMockup(
    productImageFile: File,
    backgroundImageFile?: File,
    params?: MockupParams
  ): Promise<ImageGenerationResponse> {
    try {
      const formData = new FormData();
      formData.append('productImage', productImageFile);
      
      if (backgroundImageFile) {
        formData.append('backgroundImage', backgroundImageFile);
      }
      
      if (params?.backgroundPrompt) {
        formData.append('backgroundPrompt', params.backgroundPrompt);
      }
      
      if (params?.style) {
        formData.append('style', params.style);
      }

      const response = await ApiHelper.postFormData<{ result: ImageGenerationResponse }>(
        '/image/mockup',
        formData
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to generate mockup');
      }
      return response.data.result;
    } catch (error) {
      console.error('Generate mockup failed:', error);
      throw error;
    }
  }

  // Generate brand asset
  static async generateBrandAsset(
    params: BrandAssetParams,
    imageFile?: File
  ): Promise<ImageGenerationResponse> {
    try {
      const formData = new FormData();
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      formData.append('assetType', params.assetType);
      
      if (params.description) {
        formData.append('description', params.description);
      }
      
      if (params.style) {
        formData.append('style', params.style);
      }

      const response = await ApiHelper.postFormData<{ result: ImageGenerationResponse }>(
        '/image/brand-asset',
        formData
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to generate brand asset');
      }
      return response.data.result;
    } catch (error) {
      console.error('Generate brand asset failed:', error);
      throw error;
    }
  }

  // Generate story illustration
  static async generateStoryIllustration(
    characterDescription: string,
    pageText: string
  ): Promise<ImageGenerationResponse> {
    try {
      const response = await ApiHelper.post<{ result: ImageGenerationResponse }>(
        '/image/story-illustration',
        { characterDescription, pageText }
      );

      if (!response.success || !response.data?.result) {
        throw new Error('Failed to generate story illustration');
      }
      return response.data.result;
    } catch (error) {
      console.error('Generate story illustration failed:', error);
      throw error;
    }
  }
}
