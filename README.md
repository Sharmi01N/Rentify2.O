# Rentify - Rental Management System

A modern rental management platform built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Backend Setup

```bash
# Navigate to backend directory
cd project2_1/backend

# Install dependencies
npm install

# Create .env file
echo "MONGO_URI=mongodb://localhost:27017/rentify
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development" > .env

# Start the server
npm start
```

### 2. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd project2_1/frontend

# Serve the frontend (using any static server)
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js serve
npx serve -s . -l 8000

# Option 3: Using Live Server (VS Code extension)
# Right-click on index.html and select "Open with Live Server"
```

### 3. Access the Application

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
project2_1/
├── backend/
│   ├── app.js              # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── middleware/       # Custom middleware
│   └── uploads/          # File uploads
├── frontend/
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   └── images/          # Static images
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/rentify
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `rentify`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Replace `MONGO_URI` in `.env` file

## 🚀 Deployment

### 1. Git Setup

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create .gitignore
echo "node_modules/
.env
.DS_Store
*.log" > .gitignore

# Initial commit
git commit -m "Initial commit: Rentify rental management system"

# Add remote repository
git remote add origin https://github.com/yourusername/rentify.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy Backend

#### Option A: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-rentify-app

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret_key_here

# Deploy
git push heroku main
```

#### Option B: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Deploy
railway up
```

#### Option C: Render
1. Connect your GitHub repository
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

### 3. Deploy Frontend

#### Option A: Netlify
1. Connect your GitHub repository
2. Set build command: (leave empty for static site)
3. Set publish directory: `frontend`
4. Deploy

#### Option B: Vercel
1. Connect your GitHub repository
2. Set root directory: `frontend`
3. Deploy

#### Option C: GitHub Pages
```bash
# Create gh-pages branch
git checkout -b gh-pages

# Move frontend files to root
mv frontend/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Enable GitHub Pages in repository settings
```

## 🔗 Live Demo Links

After deployment, your application will be available at:

- **Frontend**: https://your-app-name.netlify.app
- **Backend API**: https://your-app-name.herokuapp.com

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

## 🛠️ Development

### Running in Development Mode
```bash
# Backend with nodemon (auto-restart)
npm install -g nodemon
nodemon app.js

# Frontend with live reload
npx live-server frontend
```

### Testing
```bash
# Test backend API
curl http://localhost:5000

# Test frontend
open http://localhost:8000
```

## 📱 Features

- ✅ User Authentication (Login/Register)
- ✅ Product Management
- ✅ File Upload System
- ✅ Complaint Management
- ✅ Responsive Design
- ✅ Modern UI/UX
- ✅ Real-time Updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- RUET ECE Student
- Built for academic excellence

## 🆘 Support

For support, email: rentify@gmail.com 