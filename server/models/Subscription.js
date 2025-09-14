const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
        unique: true,
        enum: ['Basic', 'Balanced', 'Advanced'],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        default: 'USD',
    },
    features: [{
        type: String,
    }],
    dailyLimit: {
        type: Number,
        required: true,
        min: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt field before saving
subscriptionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Index for better query performance
subscriptionSchema.index({ planName: 1 });
subscriptionSchema.index({ isActive: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);
