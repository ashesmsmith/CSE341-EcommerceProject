const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const User = require("../models/userModel")

// Display All Users
const getUsers = async (req, res) => {
    const result = await User.find()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
    
};

// Display Single User
const getUserById = async (req, res) => {
    const userId = req.params.id;
    if (ObjectId.isValid(userId)) {
        const result = await User.findById({_id: userId});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }     
};

// Create New User
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode},
        accountType: req.body.accountType
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);

    if (response.acknowledged) {
        res.status(204).json(response);
    } else {
        res.status(500).json(response.error) || 'An error occurred while adding the user.';
    }
};

// Update User
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode},
        accountType: req.body.accountType
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error) || 'An error occurred while updating the user.';
    }
};

// Delete User
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error) || 'An error occurred while deleting the user.';
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser }