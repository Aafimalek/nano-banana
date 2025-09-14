const UserSubscription = require('../models/UserSubscription');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

class LimitService {
    // Get user's active subscription
    static async getUserActiveSubscription(userId) {
        try {
            const userSubscription = await UserSubscription.findOne({
                userId,
                isActive: true
            }).populate('planId');

            return userSubscription;
        } catch (error) {
            console.error('Error getting user active subscription:', error);
            throw error;
        }
    }

    // Check if user can make chat request based on daily limit
    static async canMakeChatRequest(userId) {
        try {
            const userSubscription = await this.getUserActiveSubscription(userId);

            if (!userSubscription) {
                return {
                    canMakeRequest: false,
                    reason: 'No active subscription found',
                    currentUsage: 0,
                    limit: 0,
                    planName: 'None'
                };
            }

            // Get today's usage count
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            // Count today's chat requests (assuming we track this in a separate collection or add to existing)
            const todayUsage = await this.getTodayUsage(userId, today, tomorrow);

            if (todayUsage >= userSubscription.limit) {
                return {
                    canMakeRequest: false,
                    reason: 'Daily limit reached',
                    currentUsage: todayUsage,
                    limit: userSubscription.limit,
                    planName: userSubscription.planName
                };
            }

            return {
                canMakeRequest: true,
                currentUsage: todayUsage,
                limit: userSubscription.limit,
                remaining: userSubscription.limit - todayUsage,
                planName: userSubscription.planName
            };
        } catch (error) {
            console.error('Error checking chat request limit:', error);
            return {
                canMakeRequest: false,
                reason: 'Error checking limits',
                currentUsage: 0,
                limit: 0,
                planName: 'Unknown'
            };
        }
    }

    // Get today's usage count
    static async getTodayUsage(userId, startDate, endDate) {
        try {
            // For now, we'll count chat entries created today
            // You might want to create a separate usage tracking collection
            const Chat = require('../models/Chat');
            const todayUsage = await Chat.countDocuments({
                userId,
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            });

            return todayUsage;
        } catch (error) {
            console.error('Error getting today usage:', error);
            return 0;
        }
    }

    // Create user subscription
    static async createUserSubscription(userId, planName, paymentId) {
        try {
            // Get subscription plan details
            const subscription = await Subscription.findOne({
                planName,
                isActive: true
            });

            if (!subscription) {
                throw new Error('Subscription plan not found');
            }

            // Deactivate any existing subscription
            await UserSubscription.updateMany(
                { userId, isActive: true },
                { isActive: false }
            );

            // Create new subscription
            const userSubscription = await UserSubscription.create({
                userId,
                planName,
                paymentId,
                planId: subscription._id,
                limit: subscription.dailyLimit
            });

            return userSubscription;
        } catch (error) {
            console.error('Error creating user subscription:', error);
            throw error;
        }
    }

    // Get user's subscription details
    static async getUserSubscriptionDetails(userId) {
        try {
            const userSubscription = await this.getUserActiveSubscription(userId);

            if (!userSubscription) {
                return {
                    hasSubscription: false,
                    planName: 'None',
                    limit: 0,
                    currentUsage: 0,
                    remaining: 0
                };
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const currentUsage = await this.getTodayUsage(userId, today, tomorrow);

            return {
                hasSubscription: true,
                planName: userSubscription.planName,
                limit: userSubscription.limit,
                currentUsage,
                remaining: userSubscription.limit - currentUsage,
                subscription: userSubscription
            };
        } catch (error) {
            console.error('Error getting user subscription details:', error);
            throw error;
        }
    }

    // Initialize default subscription plans
    static async initializeDefaultPlans() {
        try {
            const plans = [
                {
                    planName: 'Basic',
                    price: 0,
                    currency: 'USD',
                    dailyLimit: 5,
                    features: [
                        '5 chat requests per day',
                        'Basic AI models',
                        'Community support'
                    ]
                },
                {
                    planName: 'Balanced',
                    price: 11.99,
                    currency: 'USD',
                    dailyLimit: 50,
                    features: [
                        '50 chat requests per day',
                        'Advanced AI models',
                        'Priority support',
                        'High-resolution images'
                    ]
                },
                {
                    planName: 'Advanced',
                    price: 24.99,
                    currency: 'USD',
                    dailyLimit: 100,
                    features: [
                        '100 chat requests per day',
                        'Premium AI models',
                        '24/7 priority support',
                        'Ultra-high resolution images'
                    ]
                }
            ];

            for (const planData of plans) {
                await Subscription.findOneAndUpdate(
                    { planName: planData.planName },
                    planData,
                    { upsert: true, new: true }
                );
            }

            console.log('Default subscription plans initialized');
            return true;
        } catch (error) {
            console.error('Error initializing default plans:', error);
            throw error;
        }
    }
}

module.exports = LimitService;
