// Common types used across all API services

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: string;
  lastLogin?: string;
  createdAt?: string;
}

// API Response interface
export interface ApiResponseData<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Auth related types
export interface AuthCheckResponse {
  authenticated: boolean;
  user?: User;
}

export interface ProfileResponse {
  user: User;
}

export interface ProfileUpdateRequest {
  name?: string;
  avatar?: string;
}

// Chat related types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  tool?: string;
  imageUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatSessionRequest {
  title?: string;
  initialMessage?: string;
}

export interface SendMessageRequest {
  content: string;
  tool?: string;
  imageFile?: File;
}

export interface GeneratedImageResponse {
  imageDataUrl: string;
  imageUrl?: string;
  metadata?: {
    tool: string;
    prompt?: string;
    timestamp: string;
  };
}

// Subscription related types
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    imagesPerMonth: number;
    maxImageSize: number;
    prioritySupport: boolean;
  };
  isPopular?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  plan: SubscriptionPlan;
}

export interface UsageStats {
  imagesGenerated: number;
  imagesRemaining: number;
  resetDate: string;
  plan: SubscriptionPlan;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

// Image generation types
export interface ImageGenerationResponse {
  imageDataUrl: string;
  imageUrl?: string;
  metadata?: {
    tool: string;
    prompt?: string;
    timestamp: string;
    processingTime?: number;
  };
}

export interface TextImageParams {
  text: string;
  fontStyle: string;
  placement: string;
  colorScheme: string;
}

export interface DiagramParams {
  topic: string;
  style?: string;
  complexity?: 'simple' | 'medium' | 'complex';
}

export interface IsometryParams {
  prompt: string;
  style?: string;
  angle?: string;
}

export interface OutfitReplaceParams {
  prompt: string;
  style?: string;
}

export interface MockupParams {
  backgroundPrompt?: string;
  style?: string;
}

export interface BrandAssetParams {
  description?: string;
  assetType: string;
  style?: string;
}
