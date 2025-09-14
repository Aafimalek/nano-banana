const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
        trim: true,
        maxlength: [2000, 'Prompt cannot exceed 2000 characters'],
    },
    promptImage: {
        type: String, // URL or file path to the prompt image
        default: null,
    },
    responseImage: {
        type: String, // URL or file path to the response image
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    outfitImage: {
        type: String, // URL or file path to the outfit image
        default: null,
    },
    // Additional metadata
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending',
    },
    processingTime: {
        type: Number, // Processing time in milliseconds
        default: null,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    isPublic: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

// Indexes for better query performance
chatSchema.index({ userId: 1, createdAt: -1 });
chatSchema.index({ status: 1 });
chatSchema.index({ isPublic: 1, createdAt: -1 });
chatSchema.index({ tags: 1 });

// Static method to get user's chat history
chatSchema.statics.getUserChats = function (userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email avatar');
};

// Static method to get public chats
chatSchema.statics.getPublicChats = function (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.find({ isPublic: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name email avatar');
};

// Instance method to check if user owns the chat
chatSchema.methods.isOwner = function (userId) {
    return this.userId.toString() === userId.toString();
};

module.exports = mongoose.model('Chat', chatSchema);
