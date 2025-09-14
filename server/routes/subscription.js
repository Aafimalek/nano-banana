const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/auth');

// All subscription routes require authentication
router.use(authenticate);

// Get all available subscription plans
router.get('/plans', subscriptionController.getSubscriptionPlans);

// Get a specific subscription plan
router.get('/plans/:planName', subscriptionController.getSubscriptionPlan);

// Get user's current subscription
router.get('/user', subscriptionController.getUserSubscription);

// Create user subscription
router.post('/user', subscriptionController.createUserSubscription);

// Cancel user subscription
router.delete('/user', subscriptionController.cancelUserSubscription);

// Initialize default subscription plans (admin only)
router.post('/initialize', subscriptionController.initializePlans);

module.exports = router;
