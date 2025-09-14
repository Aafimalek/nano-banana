const mongoose = require('mongoose');

const userSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    planName: {
        type: String,
        required: true,
        enum: ['Basic', 'Balanced', 'Advanced'],
    },
    paymentId: {
        type: String,
        required: true,
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
    },
    limit: {
        type: Number,
        required: true,
        min: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
});

// Compound index for efficient queries
userSubscriptionSchema.index({ userId: 1, isActive: 1 });
userSubscriptionSchema.index({ planName: 1 });
userSubscriptionSchema.index({ paymentId: 1 });

module.exports = mongoose.model('UserSubscription', userSubscriptionSchema);
