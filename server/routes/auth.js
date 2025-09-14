const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    authController.googleCallback
);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/logout', authenticate, authController.logout);
router.get('/check', authController.checkAuth);

// Error route
router.get('/error', (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
});

module.exports = router;
