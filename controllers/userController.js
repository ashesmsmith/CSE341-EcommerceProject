const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/userModel');

// Display All Users
const getUsers = async (req, res, next) => {
  // #swagger.description = 'Display All Users'
  // #swagger.tags = ['users']

  try {
    const result = await User.find();

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        data: result
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'No users found.'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Display Single User By Id
const getUserById = async (req, res, next) => {
  // #swagger.description = 'Display Single User By Id'
  // #swagger.tags = ['users']

  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UserId.'
      });
    } else {
      const result = await User.findById(userId);

      if (!result) {
        return res.status(400).json({
          success: false,
          message: 'User not found.'
        });
      } else {
        return res.status(200).json({
          success: true,
          data: result
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// Create New User
const createUser = async (req, res, next) => {
  // #swagger.description = 'Create a new user'
  // #swagger.tags = ['users']

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      accountType
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !accountType
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      accountType
    });

    const result = await newUser.save();
    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// Update User
const updateUser = async (req, res, next) => {
  // #swagger.description = 'Update User'
  // #swagger.tags = ['users']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UserId.'
      });
    }
    const userId = req.params.id;

    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      accountType
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !accountType
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    const updatedUser = new User({
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      accountType
    });

    const result = await User.findById(userId, updatedUser, { new: true });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `User ${userId} not found`
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
      message: `User ${userId} successfully updated`
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
const deleteUser = async (req, res, next) => {
  // #swagger.description = 'Delete User'
  // #swagger.tags = ['users']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UserId'
      });
    }

    const userId = new ObjectId(req.params.id);
    const result = await User.findOneAndDelete({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: `User ${userId} deleted successfully`,
      result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
