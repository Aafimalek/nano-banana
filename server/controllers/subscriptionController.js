const Subscription = require('../models/Subscription');
const UserSubscription = require('../models/UserSubscription');
const LimitService = require('../services/limitService');

// Get all available subscription plans
const getSubscriptionPlans = async (req, res) => {
    try {
        const plans = await Subscription.find({ isActive: true })
            .select('-__v')
            .sort({ dailyLimit: 1 });

        res.json({
            success: true,
            data: { plans },
        });
    } catch (error) {
        console.error('Get subscription plans error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscription plans',
        });
    }
};

// Get a specific subscription plan
const getSubscriptionPlan = async (req, res) => {
    try {
        const { planName } = req.params;

        const plan = await Subscription.findOne({
            planName,
            isActive: true
        });

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: 'Subscription plan not found',
            });
        }

        res.json({
            success: true,
            data: { plan },
        });
    } catch (error) {
        console.error('Get subscription plan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscription plan',
        });
    }
};

// Create user subscription
const createUserSubscription = async (req, res) => {
    try {
        const { planName, paymentId } = req.body;
        const userId = req.user._id;

        if (!planName || !paymentId) {
            return res.status(400).json({
                success: false,
                message: 'Plan name and payment ID are required',
            });
        }

        const userSubscription = await LimitService.createUserSubscription(
            userId,
            planName,
            paymentId
        );

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: { subscription: userSubscription },
        });
    } catch (error) {
        console.error('Create user subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create subscription',
        });
    }
};

// Get user's current subscription
const getUserSubscription = async (req, res) => {
    try {
        const userId = req.user._id;
        const subscriptionDetails = await LimitService.getUserSubscriptionDetails(userId);

        res.json({
            success: true,
            data: { subscription: subscriptionDetails },
        });
    } catch (error) {
        console.error('Get user subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user subscription',
        });
    }
};

// Cancel user subscription
const cancelUserSubscription = async (req, res) => {
    try {
        const userId = req.user._id;

        const userSubscription = await UserSubscription.findOneAndUpdate(
            { userId, isActive: true },
            { isActive: false },
            { new: true }
        );

        if (!userSubscription) {
            return res.status(404).json({
                success: false,
                message: 'No active subscription found',
            });
        }

        res.json({
            success: true,
            message: 'Subscription cancelled successfully',
            data: { subscription: userSubscription },
        });
    } catch (error) {
        console.error('Cancel user subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel subscription',
        });
    }
};

// Initialize default subscription plans (admin only)
const initializePlans = async (req, res) => {
    try {
        await LimitService.initializeDefaultPlans();

        res.json({
            success: true,
            message: 'Default subscription plans initialized successfully',
        });
    } catch (error) {
        console.error('Initialize plans error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to initialize subscription plans',
        });
    }
};

module.exports = {
    getSubscriptionPlans,
    getSubscriptionPlan,
    createUserSubscription,
    getUserSubscription,
    cancelUserSubscription,
    initializePlans,
};
