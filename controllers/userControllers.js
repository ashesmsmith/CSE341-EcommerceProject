const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Display All Users
const getUsers = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();

    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// Display Single User
const getUserById = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });

    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

// Create New User
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address
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
        address: req.body.address
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