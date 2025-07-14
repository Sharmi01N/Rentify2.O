const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');

// User: submit a complaint
router.post('/', auth, complaintController.submitComplaint);
// User: get own complaints
router.get('/my', auth, complaintController.getUserComplaints);
// Admin: get all complaints
router.get('/', auth, (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
}, complaintController.getAllComplaints);
// Admin: update complaint status
router.patch('/:id', auth, (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
}, complaintController.updateComplaintStatus);

module.exports = router; 