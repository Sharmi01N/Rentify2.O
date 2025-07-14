const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
    email: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['success', 'fail'], required: true },
    reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('LoginLog', loginLogSchema); 