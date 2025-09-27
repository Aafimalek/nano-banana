import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponseData } from './types';

// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api' 
  : 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  withCredentials: true, // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Response interface is now imported from types.ts

// HTTP Methods
export class ApiHelper {
  // GET request
  static async get<T = any>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponseData<T>> {
    try {
      const response:any = await apiClient.get<ApiResponseData<T>>(url, config);
      return response;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // POST request
  static async post<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponseData<T>> {
    try {
      const response = await apiClient.post<ApiResponseData<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // PUT request
  static async put<T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponseData<T>> {
    try {
      const response = await apiClient.put<ApiResponseData<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  static async delete<T = any>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponseData<T>> {
    try {
      const response = await apiClient.delete<ApiResponseData<T>>(url, config);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // POST request with FormData (for file uploads)
  static async postFormData<T = any>(
    url: string, 
    formData: FormData, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponseData<T>> {
    try {
      const response = await apiClient.post<ApiResponseData<T>>(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private static handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data?.error || 'Server error';
      return new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network error - please check your connection');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default apiClient;