const express = require('express');
const router = express.Router();
const { register, login, seedAdmin, updateProfile, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/register', register);
router.post('/login', login);
router.post('/seed-admin', seedAdmin);
router.patch('/profile', auth, upload.single('profilePic'), updateProfile);
router.get('/profile', auth, getProfile);

module.exports = router; 