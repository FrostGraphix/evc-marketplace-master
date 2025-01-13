// index.js (CommonJS)

// Remove any "import" statements, convert them to require
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes');


const propertyDocumentRoutes = require('./routes/propertyDocumentRoutes');

const bodyParser = require('body-parser');
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
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());


app.use(bodyParser.json());
app.use('/api', forgotPasswordRoute);
app.use('/api', resetPasswordRoute);

app.use('/api/documents', propertyDocumentRoutes);

// Main router
app.use('/api', router);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});


