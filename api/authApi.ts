import { ApiHelper } from './apiHelper';
import type { 
  ApiResponseData, 
  User, 
  AuthCheckResponse, 
  ProfileResponse, 
  ProfileUpdateRequest 
} from './types';

// Auth API class
export class AuthApi {
  // Check authentication status
  static async checkAuth(): Promise<AuthCheckResponse> {
    try {
      const response = await ApiHelper.get<AuthCheckResponse>('/auth/check');
      return response.data;
    } catch (error) {
      console.error('Auth check failed:', error);
      return { authenticated: false };
    }
  }

  // Get user profile
  static async getProfile(): Promise<User> {
    try {
      const response = await ApiHelper.get<ProfileResponse>('/auth/profile');
      if (!response.success || !response.data?.user) {
        throw new Error('Failed to get user profile');
      }
      return response.data.user;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(updates: ProfileUpdateRequest): Promise<User> {
    try {
      const response = await ApiHelper.put<ProfileResponse>('/auth/profile', updates);
      if (!response.success || !response.data?.user) {
        throw new Error('Failed to update profile');
      }
      return response.data.user;
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      await ApiHelper.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Initiate Google OAuth
  static initiateGoogleAuth(): void {
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com/api' 
      : 'http://localhost:5000/api';
    window.location.href = `${API_BASE_URL}/auth/google`;
  }

  // Handle Google OAuth callback
  static async handleGoogleCallback(token: string): Promise<User> {
    try {
      // The token is already set in cookies by the server
      // We just need to verify it and get user profile
      const user = await this.getProfile();
      return user;
    } catch (error) {
      console.error('Google callback failed:', error);
      throw error;
    }
  }
}
