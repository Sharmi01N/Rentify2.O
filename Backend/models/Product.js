const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // months
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 