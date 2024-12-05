const router = require('express').Router();
const userController = require('../controllers/userController');

// Display All or Single User
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

// Create New User
router.post('/', userController.createUser);

// Update User
router.put('/:id', userController.updateUser);

// Delete User
router.delete('/:id', userController.deleteUser);

module.exports = router;
