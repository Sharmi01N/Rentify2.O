const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        console.log('Creating product with data:', req.body);
        console.log('File:', req.file);
        
        const { title, description, location, contact, price, duration } = req.body;
        const image = req.file ? req.file.filename : '';
        const owner = req.user.id;
        
        console.log('Processed data:', { title, description, location, contact, price, duration, image, owner });
        
        const product = new Product({ title, description, image, location, contact, price, duration, owner });
        console.log('Product object created:', product);
        
        const savedProduct = await product.save();
        console.log('Product saved successfully:', savedProduct);
        
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ owner: req.user.id });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = { $or: [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ] };
        }
        const products = await Product.find(query).populate('owner', 'name email role');
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}; 