const LimitService = require('../services/limitService');

// Middleware to check daily chat limits
const checkChatLimit = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Check if user can make chat request
        const limitCheck = await LimitService.canMakeChatRequest(userId);

        if (!limitCheck.canMakeRequest) {
            return res.status(429).json({
                success: false,
                message: limitCheck.reason,
                error: 'DAILY_LIMIT_EXCEEDED',
                data: {
                    currentUsage: limitCheck.currentUsage,
                    limit: limitCheck.limit,
                    planName: limitCheck.planName,
                    remaining: limitCheck.remaining || 0
                }
            });
        }

        // Add usage info to request for potential use in controllers
        req.limitInfo = {
            currentUsage: limitCheck.currentUsage,
            limit: limitCheck.limit,
            remaining: limitCheck.remaining,
            planName: limitCheck.planName
        };

        next();
    } catch (error) {
        console.error('Error checking chat limit:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking usage limits',
            error: 'INTERNAL_ERROR'
        });
    }
};

// Middleware to get user's subscription info without blocking
const getUserSubscriptionInfo = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Get user's subscription details
        const subscriptionDetails = await LimitService.getUserSubscriptionDetails(userId);

        // Add subscription info to request
        req.subscriptionInfo = subscriptionDetails;

        next();
    } catch (error) {
        console.error('Error getting user subscription info:', error);
        // Don't fail the request if getting subscription info fails
        req.subscriptionInfo = {
            hasSubscription: false,
            planName: 'Unknown',
            limit: 0,
            currentUsage: 0,
            remaining: 0
        };
        next();
    }
};

module.exports = {
    checkChatLimit,
    getUserSubscriptionInfo
};
