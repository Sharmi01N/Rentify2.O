const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes (to be added)
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const complaintRoutes = require('./routes/complaint');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/complaints', complaintRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Rentify Backend API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 