const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginLog = require('../models/LoginLog');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, location, mobile } = req.body;
        if (!name || !email || !password || !role || !location || !mobile) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (!['user', 'seller', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role.' });
        }
        if (role === 'admin') {
            const adminExists = await User.findOne({ role: 'admin' });
            if (adminExists) return res.status(403).json({ message: 'Admin already exists' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role, location, mobile });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

// Seed default admin if none exists
exports.seedAdmin = async (req, res) => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({ name: 'Admin', email: 'admin@rentify.com', password: hashedPassword, role: 'admin' });
        await admin.save();
        res.status(201).json({ message: 'Default admin created', admin: { email: admin.email } });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            await LoginLog.create({ email, status: 'fail', reason: 'User not found' });
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            await LoginLog.create({ email, status: 'fail', reason: 'Wrong password' });
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await LoginLog.create({ email, user: user._id, status: 'success' });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic,
                contact: user.contact,
                address: user.address,
                location: user.location,
                mobile: user.mobile
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

// GET /profile - get current user's profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
};

// Update user profile (name, contact, address, profilePic, location, mobile)
exports.updateProfile = async (req, res) => {
    try {
        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.contact) updates.contact = req.body.contact;
        if (req.body.address) updates.address = req.body.address;
        if (req.body.location) updates.location = req.body.location;
        if (req.body.mobile) updates.mobile = req.body.mobile;
        if (req.file) updates.profilePic = req.file.filename;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.json({ message: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Server error' });
    }
}; 