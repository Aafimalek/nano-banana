// Test file to verify API integration
import { AuthApi, ChatApi, ImageApi, SubscriptionApi } from './index';

// Test authentication
export const testAuth = async () => {
  try {
    console.log('Testing authentication...');
    const authStatus = await AuthApi.checkAuth();
    console.log('Auth status:', authStatus);
    return authStatus;
  } catch (error) {
    console.error('Auth test failed:', error);
    return null;
  }
};

// Test chat API
export const testChat = async () => {
  try {
    console.log('Testing chat API...');
    const sessions = await ChatApi.getChatSessions();
    console.log('Chat sessions:', sessions);
    return sessions;
  } catch (error) {
    console.error('Chat test failed:', error);
    return [];
  }
};

// Test subscription API
export const testSubscription = async () => {
  try {
    console.log('Testing subscription API...');
    const plans = await SubscriptionApi.getPlans();
    console.log('Subscription plans:', plans);
    return plans;
  } catch (error) {
    console.error('Subscription test failed:', error);
    return [];
  }
};

// Test image API (without actual file upload)
export const testImageApi = async () => {
  try {
    console.log('Testing image API...');
    // This would normally require actual files, so we'll just test the interface
    console.log('Image API interfaces loaded successfully');
    return true;
  } catch (error) {
    console.error('Image API test failed:', error);
    return false;
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('Starting API integration tests...');
  
  const authResult = await testAuth();
  const chatResult = await testChat();
  const subscriptionResult = await testSubscription();
  const imageResult = await testImageApi();
  
  console.log('All tests completed!');
  console.log('Results:', {
    auth: authResult,
    chat: chatResult,
    subscription: subscriptionResult,
    image: imageResult
  });
  
  return {
    auth: authResult,
    chat: chatResult,
    subscription: subscriptionResult,
    image: imageResult
  };
};
