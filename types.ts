
export interface GeneratedMockup {
  imageDataUrl: string;
  description?: string;
}

export interface ImageFile {
  file: File;
  previewUrl: string;
}

export interface RecipeInstruction {
  step: number;
  text: string;
  imageUrl?: string;
}

export interface Recipe {
  title: string;
  estimatedTime: string;
  ingredients: string[];
  instructions: RecipeInstruction[];
  finalImageUrl?: string;
}

export interface TextImageResult {
  imageDataUrl: string;
}

export interface DiagramResult {
  imageDataUrl: string;
}

export interface StoryPage {
  id: string;
  text: string;
  imageUrl?: string;
  isLoading: boolean;
}