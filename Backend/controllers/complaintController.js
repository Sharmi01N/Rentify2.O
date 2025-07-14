const Complaint = require('../models/Complaint');

// User submits a complaint
exports.submitComplaint = async (req, res) => {
    try {
        const { product, message } = req.body;
        const complaint = new Complaint({
            user: req.user.id,
            product: product || undefined,
            message
        });
        await complaint.save();
        res.status(201).json({ message: 'Complaint submitted', complaint });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('user', 'name email').populate('product', 'title');
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: update complaint status
exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        res.json({ message: 'Complaint status updated', complaint });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User: get own complaints
exports.getUserComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id }).populate('product', 'title');
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}; 