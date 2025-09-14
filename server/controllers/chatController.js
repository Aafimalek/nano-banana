const Chat = require('../models/Chat');
const { deleteFile, getFileUrl, generateURL, generateURLs } = require('../middleware/upload');
const LimitService = require('../services/limitService');

// Create a new chat entry
const createChat = async (req, res) => {
    try {
        const { prompt, tags, isPublic } = req.body;
        const userId = req.user._id;

        // Handle file uploads - store full paths
        const promptImage = req.uploadedFiles?.promptImage || null;
        const responseImage = req.uploadedFiles?.responseImage || null;
        const outfitImage = req.uploadedFiles?.outfitImage || null;

        const chatData = {
            prompt,
            userId,
            promptImage,
            responseImage,
            outfitImage,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isPublic: isPublic === 'true' || isPublic === true,
        };

        const chat = await Chat.create(chatData);

        // Generate URLs for response using the new function
        const responseData = generateURL(req, chat.toObject());

        res.status(201).json({
            success: true,
            message: 'Chat created successfully',
            data: { chat: responseData },
        });
    } catch (error) {
        console.error('Create chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create chat',
        });
    }
};

// Get user's chat history
const getUserChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;

        let query = { userId };
        if (status) {
            query.status = status;
        }

        const chats = await Chat.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('userId', 'name email avatar');

        const total = await Chat.countDocuments(query);

        // Generate URLs for all chats using the new function
        const chatsWithUrls = generateURLs(req, chats.map(chat => chat.toObject()));

        res.json({
            success: true,
            data: {
                chats: chatsWithUrls,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: limit,
                },
            },
        });
    } catch (error) {
        console.error('Get user chats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch chat history',
        });
    }
};

// Get a specific chat by ID
const getChatById = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const chat = await Chat.findOne({ _id: chatId, userId })
            .populate('userId', 'name email avatar');

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        // Generate URLs for response using the new function
        const responseData = generateURL(req, chat.toObject());

        res.json({
            success: true,
            data: { chat: responseData },
        });
    } catch (error) {
        console.error('Get chat by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch chat',
        });
    }
};

// Update a chat entry
const updateChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;
        const { prompt, tags, isPublic, status } = req.body;

        const chat = await Chat.findOne({ _id: chatId, userId });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        // Handle file uploads
        const updateData = {};
        if (prompt) updateData.prompt = prompt;
        if (tags) updateData.tags = tags.split(',').map(tag => tag.trim());
        if (isPublic !== undefined) updateData.isPublic = isPublic === 'true' || isPublic === true;
        if (status) updateData.status = status;

        // Handle new file uploads - store full paths
        if (req.uploadedFiles?.promptImage) {
            // Delete old file if exists
            if (chat.promptImage) {
                deleteFile(chat.promptImage);
            }
            updateData.promptImage = req.uploadedFiles.promptImage;
        }

        if (req.uploadedFiles?.responseImage) {
            if (chat.responseImage) {
                deleteFile(chat.responseImage);
            }
            updateData.responseImage = req.uploadedFiles.responseImage;
        }

        if (req.uploadedFiles?.outfitImage) {
            if (chat.outfitImage) {
                deleteFile(chat.outfitImage);
            }
            updateData.outfitImage = req.uploadedFiles.outfitImage;
        }

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            updateData,
            { new: true, runValidators: true }
        ).populate('userId', 'name email avatar');

        const responseData = {
            ...updatedChat.toObject(),
            promptImageUrl: updatedChat.promptImage ? getFileUrl(req, `promptImage/${updatedChat.promptImage}`) : null,
            responseImageUrl: updatedChat.responseImage ? getFileUrl(req, `responseImage/${updatedChat.responseImage}`) : null,
            outfitImageUrl: updatedChat.outfitImage ? getFileUrl(req, `outfitImage/${updatedChat.outfitImage}`) : null,
        };

        res.json({
            success: true,
            message: 'Chat updated successfully',
            data: { chat: responseData },
        });
    } catch (error) {
        console.error('Update chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update chat',
        });
    }
};

// Delete a chat entry
const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        const chat = await Chat.findOne({ _id: chatId, userId });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: 'Chat not found',
            });
        }

        // Delete associated files (now using full paths)
        if (chat.promptImage) {
            deleteFile(chat.promptImage);
        }
        if (chat.responseImage) {
            deleteFile(chat.responseImage);
        }
        if (chat.outfitImage) {
            deleteFile(chat.outfitImage);
        }

        await Chat.findByIdAndDelete(chatId);

        res.json({
            success: true,
            message: 'Chat deleted successfully',
        });
    } catch (error) {
        console.error('Delete chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete chat',
        });
    }
};

// Get public chats (for community features)
const getPublicChats = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const tags = req.query.tags;

        let query = { isPublic: true };
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagArray };
        }

        const chats = await Chat.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('userId', 'name email avatar');

        const total = await Chat.countDocuments(query);

        // Generate URLs for all chats using the new function
        const chatsWithUrls = generateURLs(req, chats.map(chat => chat.toObject()));

        res.json({
            success: true,
            data: {
                chats: chatsWithUrls,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: limit,
                },
            },
        });
    } catch (error) {
        console.error('Get public chats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch public chats',
        });
    }
};

// Search chats
const searchChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const { q, page = 1, limit = 10 } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required',
            });
        }

        const searchQuery = {
            userId,
            $or: [
                { prompt: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } },
            ],
        };

        const chats = await Chat.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('userId', 'name email avatar');

        const total = await Chat.countDocuments(searchQuery);

        // Generate URLs for all chats using the new function
        const chatsWithUrls = generateURLs(req, chats.map(chat => chat.toObject()));

        res.json({
            success: true,
            data: {
                chats: chatsWithUrls,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: parseInt(limit),
                },
                searchQuery: q,
            },
        });
    } catch (error) {
        console.error('Search chats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search chats',
        });
    }
};

// Get user's subscription information
const getUserSubscriptionInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const subscriptionDetails = await LimitService.getUserSubscriptionDetails(userId);

        res.json({
            success: true,
            data: {
                subscription: subscriptionDetails,
                limitInfo: req.limitInfo || null
            },
        });
    } catch (error) {
        console.error('Get user subscription info error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscription information',
        });
    }
};

module.exports = {
    createChat,
    getUserChats,
    getChatById,
    updateChat,
    deleteChat,
    getPublicChats,
    searchChats,
    getUserSubscriptionInfo,
};
