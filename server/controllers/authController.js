const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

// Google OAuth success callback
const googleCallback = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: 'Google authentication failed',
            });
        }

        const token = generateToken(req.user._id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Update last login
        await User.findByIdAndUpdate(req.user._id, { lastLogin: new Date() });

        // Redirect to frontend with success
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (error) {
        console.error('Google callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
};

// Get current user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-__v');

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    provider: user.provider,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt,
                },
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user profile',
        });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, avatar } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (avatar) updateData.avatar = avatar;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-__v');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    provider: user.provider,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt,
                },
            },
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
        });
    }
};

// Logout user
const logout = async (req, res) => {
    try {
        res.clearCookie('token');

        res.json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to logout',
        });
    }
};

// Check authentication status
const checkAuth = async (req, res) => {
    try {
        res.json({
            success: true,
            authenticated: !!req.user,
            user: req.user ? {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                avatar: req.user.avatar,
                provider: req.user.provider,
            } : null,
        });
    } catch (error) {
        console.error('Check auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check authentication status',
        });
    }
};

module.exports = {
    googleCallback,
    getProfile,
    updateProfile,
    logout,
    checkAuth,
};
