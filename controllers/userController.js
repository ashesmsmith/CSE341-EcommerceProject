const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const User = require('../models/userModel');

// Display All Users
const getUsers = async (req, res, next) => {
    // #swagger.description = 'Display All Users'
    // #swagger.tags = ['users]
    try {
        const result = await User.find();

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No user found"
            })
        }
    } catch (error) {
        next(error)
    }
};

// Display Single User
const getUserById = async (req, res, next) => {

};

// Create New User
const createUser = async (req, res, next) => {

};

// Update User
const updateUser = async (req, res, next) => {

};

// Delete User
const deleteUser = async (req, res, next) => {

};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser }