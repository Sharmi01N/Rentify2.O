const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProduct, getUserProducts, deleteProduct, getAllProducts } = require('../controllers/productController');
const auth = require('../middleware/auth');
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

router.post('/', auth, upload.single('image'), createProduct);
router.get('/my', auth, getUserProducts);
router.delete('/:id', auth, deleteProduct);
router.get('/', getAllProducts);

module.exports = router; 