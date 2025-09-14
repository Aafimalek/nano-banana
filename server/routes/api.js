const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const chatRoutes = require('./chat');
const subscriptionRoutes = require('./subscription');
const imageGenerationRoutes = require('./imageGeneration');
const { authenticate, optionalAuth } = require('../middleware/auth');

// // Health check endpoint
// router.get('/health', (req, res) => {
//     res.json({
//         success: true,
//         message: 'API is running',
//         timestamp: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development',
//     });
// });

// // Public routes
// router.get('/public', (req, res) => {
//     res.json({
//         success: true,
//         message: 'This is a public endpoint',
//         data: {
//             message: 'Anyone can access this endpoint',
//             timestamp: new Date().toISOString(),
//         },
//     });
// });

// // Protected route example
// router.get('/protected', authenticate, (req, res) => {
//     res.json({
//         success: true,
//         message: 'This is a protected endpoint',
//         data: {
//             message: 'Only authenticated users can access this endpoint',
//             user: {
//                 id: req.user._id,
//                 name: req.user.name,
//                 email: req.user.email,
//             },
//             timestamp: new Date().toISOString(),
//         },
//     });
// });

// // Optional auth route example
// router.get('/optional', optionalAuth, (req, res) => {
//     res.json({
//         success: true,
//         message: 'This endpoint works with or without authentication',
//         data: {
//             authenticated: !!req.user,
//             user: req.user ? {
//                 id: req.user._id,
//                 name: req.user.name,
//                 email: req.user.email,
//             } : null,
//             timestamp: new Date().toISOString(),
//         },
//     });
// });

// Mount auth routes
router.use('/auth', authRoutes);

// Mount chat routes
router.use('/chat', chatRoutes);

// Mount subscription routes
router.use('/subscription', subscriptionRoutes);

// Mount image generation routes
router.use('/image', imageGenerationRoutes);

// Catch-all for undefined API routes
router.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        path: req.originalUrl,
    });
});

module.exports = router;
