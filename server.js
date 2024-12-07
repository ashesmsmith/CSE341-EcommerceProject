require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongodbURI = process.env.MONGODB_URI;
const port = process.env.PORT;
const connectDB = require('./db');
const router = require('./routes');
const errorHandling = require('./utils/errorHandling');
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

if (!port) {
  throw new Error('Port is not defined in the env file');
}

// Connect to MongoDB
if (!mongodbURI) {
  throw new Error('MongoDB URI is not defined in the env file');
}
connectDB(mongodbURI);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

// Error handling
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
app.use(errorHandling);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
