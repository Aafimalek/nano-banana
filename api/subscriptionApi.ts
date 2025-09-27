import { ApiHelper } from './apiHelper';
import type { 
  ApiResponseData,
  SubscriptionPlan,
  UserSubscription,
  UsageStats,
  PaymentMethod
} from './types';

// Subscription API class
export class SubscriptionApi {
  // Get all available plans
  static async getPlans(): Promise<SubscriptionPlan[]> {
    try {
      const response = await ApiHelper.get<{ plans: SubscriptionPlan[] }>('/subscription/plans');
      return response.data?.plans || [];
    } catch (error) {
      console.error('Get plans failed:', error);
      return [];
    }
  }

  // Get current user subscription
  static async getCurrentSubscription(): Promise<UserSubscription | null> {
    try {
      const response = await ApiHelper.get<{ subscription: UserSubscription }>('/subscription/current');
      return response.data?.subscription || null;
    } catch (error) {
      console.error('Get current subscription failed:', error);
      return null;
    }
  }

  // Get usage statistics
  static async getUsageStats(): Promise<UsageStats> {
    try {
      const response = await ApiHelper.get<{ usage: UsageStats }>('/subscription/usage');
      if (!response.success || !response.data?.usage) {
        throw new Error('Failed to get usage statistics');
      }
      return response.data.usage;
    } catch (error) {
      console.error('Get usage stats failed:', error);
      throw error;
    }
  }

  // Subscribe to a plan
  static async subscribe(planId: string, paymentMethodId?: string): Promise<UserSubscription> {
    try {
      const response = await ApiHelper.post<{ subscription: UserSubscription }>('/subscription/subscribe', {
        planId,
        paymentMethodId,
      });
      if (!response.success || !response.data?.subscription) {
        throw new Error('Failed to subscribe to plan');
      }
      return response.data.subscription;
    } catch (error) {
      console.error('Subscribe failed:', error);
      throw error;
    }
  }

  // Cancel subscription
  static async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await ApiHelper.post(`/subscription/${subscriptionId}/cancel`);
    } catch (error) {
      console.error('Cancel subscription failed:', error);
      throw error;
    }
  }

  // Update subscription
  static async updateSubscription(subscriptionId: string, updates: {
    autoRenew?: boolean;
    planId?: string;
  }): Promise<UserSubscription> {
    try {
      const response = await ApiHelper.put<{ subscription: UserSubscription }>(
        `/subscription/${subscriptionId}`,
        updates
      );
      if (!response.success || !response.data?.subscription) {
        throw new Error('Failed to update subscription');
      }
      return response.data.subscription;
    } catch (error) {
      console.error('Update subscription failed:', error);
      throw error;
    }
  }

  // Get payment methods
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await ApiHelper.get<{ paymentMethods: PaymentMethod[] }>('/subscription/payment-methods');
      return response.data?.paymentMethods || [];
    } catch (error) {
      console.error('Get payment methods failed:', error);
      return [];
    }
  }

  // Add payment method
  static async addPaymentMethod(paymentMethodData: {
    type: 'card' | 'paypal' | 'google_pay';
    token: string;
    isDefault?: boolean;
  }): Promise<PaymentMethod> {
    try {
      const response = await ApiHelper.post<{ paymentMethod: PaymentMethod }>('/subscription/payment-methods', paymentMethodData);
      if (!response.success || !response.data?.paymentMethod) {
        throw new Error('Failed to add payment method');
      }
      return response.data.paymentMethod;
    } catch (error) {
      console.error('Add payment method failed:', error);
      throw error;
    }
  }

  // Delete payment method
  static async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      await ApiHelper.delete(`/subscription/payment-methods/${paymentMethodId}`);
    } catch (error) {
      console.error('Delete payment method failed:', error);
      throw error;
    }
  }

  // Get subscription history
  static async getSubscriptionHistory(): Promise<UserSubscription[]> {
    try {
      const response = await ApiHelper.get<{ subscriptions: UserSubscription[] }>('/subscription/history');
      return response.data?.subscriptions || [];
    } catch (error) {
      console.error('Get subscription history failed:', error);
      return [];
    }
  }
}
