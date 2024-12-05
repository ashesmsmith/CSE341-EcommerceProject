require('dotenv').config();
const User = require('../models/userModel');

const checkAuth = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: 'User is not authenticated.  Please log in.',
      URL: `${process.env.BASE_URL}/login`
    });
  }
  next();
};

const checkAdmin = async (req, res, next) => {
  try {
    const email = req.oidc.user.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is missing.'
      });
    }

    const result = await User.findOne({ email });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (result.accountType !== 'Admin') {
      return res.status(404).json({
        success: false,
        message: 'Access denied.  Admin privileges are required.'
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkAuth, checkAdmin };
