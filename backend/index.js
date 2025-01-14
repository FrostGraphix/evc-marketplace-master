// index.js (CommonJS)
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const router = require('./routes');
const propertyDocumentRoutes = require('./routes/propertyDocumentRoutes');
const forgotPasswordRoute = require('./routes/ForgotPassword');
const resetPasswordRoute = require('./routes/resetPassword');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to DB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if unable to connect
  });

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.REACT_APP_FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust as needed
  })
);

// Handle preflight requests
app.options('*', cors());

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Debugging Middleware (Optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use routes
app.use('/api', forgotPasswordRoute);
app.use('/api', resetPasswordRoute);
app.use('/api/documents', propertyDocumentRoutes);
app.use('/api', router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
