const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/auth');
const { uploadFields } = require('../middleware/upload');
const { checkChatLimit, getUserSubscriptionInfo } = require('../middleware/limitChecker');

// File upload configuration for chat images
const uploadChatImages = uploadFields([
    { name: 'promptImage', maxCount: 1 },
    { name: 'responseImage', maxCount: 1 },
    { name: 'outfitImage', maxCount: 1 },
]);

// All chat routes require authentication
router.use(authenticate);

// Get user's subscription information
router.get('/subscription', getUserSubscriptionInfo, chatController.getUserSubscriptionInfo);

// Create a new chat entry (with daily limit check)
router.post('/', uploadChatImages, checkChatLimit, chatController.createChat);

// Get user's chat history
router.get('/', chatController.getUserChats);

// Search user's chats
router.get('/search', chatController.searchChats);

// Get public chats (community)
router.get('/public', chatController.getPublicChats);

// Get a specific chat by ID
router.get('/:chatId', chatController.getChatById);

// Update a chat entry
router.put('/:chatId', uploadChatImages, chatController.updateChat);

// Delete a chat entry
router.delete('/:chatId', chatController.deleteChat);

module.exports = router;
