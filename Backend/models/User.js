const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'seller', 'admin'], required: true },
    profilePic: { type: String },
    contact: { type: String },
    address: { type: String },
    location: { type: String },
    mobile: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 