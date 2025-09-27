import { ApiHelper } from './apiHelper';
import type { 
  ApiResponseData,
  ChatMessage,
  ChatSession,
  CreateChatSessionRequest,
  SendMessageRequest,
  GeneratedImageResponse
} from './types';

// Chat API class
export class ChatApi {
  // Get all chat sessions
  static async getChatSessions(): Promise<ChatSession[]> {
    try {
      const response = await ApiHelper.get<{ sessions: ChatSession[] }>('/chat/sessions');
      return response.data?.sessions || [];
    } catch (error) {
      console.error('Get chat sessions failed:', error);
      return [];
    }
  }

  // Get specific chat session
  static async getChatSession(sessionId: string): Promise<ChatSession> {
    try {
      const response = await ApiHelper.get<{ session: ChatSession }>(`/chat/sessions/${sessionId}`);
      if (!response.success || !response.data?.session) {
        throw new Error('Failed to get chat session');
      }
      return response.data.session;
    } catch (error) {
      console.error('Get chat session failed:', error);
      throw error;
    }
  }

  // Create new chat session
  static async createChatSession(request: CreateChatSessionRequest = {}): Promise<ChatSession> {
    try {
      const response = await ApiHelper.post<{ session: ChatSession }>('/chat/sessions', request);
      if (!response.success || !response.data?.session) {
        throw new Error('Failed to create chat session');
      }
      return response.data.session;
    } catch (error) {
      console.error('Create chat session failed:', error);
      throw error;
    }
  }

  // Send message to chat session
  static async sendMessage(sessionId: string, request: SendMessageRequest): Promise<ChatMessage> {
    try {
      let response: ApiResponseData<{ message: ChatMessage }>;
      
      if (request.imageFile) {
        // Send with file upload
        const formData = new FormData();
        formData.append('content', request.content);
        if (request.tool) formData.append('tool', request.tool);
        formData.append('image', request.imageFile);
        
        response = await ApiHelper.postFormData<{ message: ChatMessage }>(
          `/chat/sessions/${sessionId}/messages`,
          formData
        );
      } else {
        // Send without file
        response = await ApiHelper.post<{ message: ChatMessage }>(
          `/chat/sessions/${sessionId}/messages`,
          request
        );
      }
      
      if (!response.success || !response.data?.message) {
        throw new Error('Failed to send message');
      }
      return response.data.message;
    } catch (error) {
      console.error('Send message failed:', error);
      throw error;
    }
  }

  // Delete chat session
  static async deleteChatSession(sessionId: string): Promise<void> {
    try {
      await ApiHelper.delete(`/chat/sessions/${sessionId}`);
    } catch (error) {
      console.error('Delete chat session failed:', error);
      throw error;
    }
  }

  // Get user's generated images
  static async getUserImages(limit: number = 20, offset: number = 0): Promise<GeneratedImageResponse[]> {
    try {
      const response = await ApiHelper.get<{ images: GeneratedImageResponse[] }>(
        `/chat/images?limit=${limit}&offset=${offset}`
      );
      return response.data?.images || [];
    } catch (error) {
      console.error('Get user images failed:', error);
      return [];
    }
  }

  // Delete generated image
  static async deleteImage(imageId: string): Promise<void> {
    try {
      await ApiHelper.delete(`/chat/images/${imageId}`);
    } catch (error) {
      console.error('Delete image failed:', error);
      throw error;
    }
  }
}
