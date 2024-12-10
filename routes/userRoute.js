const router = require('express').Router();
const userController = require('../controllers/userController');
const { checkAuth, checkAdmin } = require('../utils/Oauth');
const { userRules, validateUser } = require('../utils/userValidation');

// Display All Users (Admin Only)
router.get('/', 
  checkAuth, 
  checkAdmin, 
  userController.getUsers);

// Display User by Id (Admin or User Only)
router.get('/:id', 
  checkAuth, 
  userController.getUserById);

// Create New User (All Access)
router.post('/', 
  userRules, 
  validateUser, 
  userController.createUser);

// Update User (Admin or User Only)
router.put(
  '/:id',
  checkAuth,
  userRules,
  validateUser,
  userController.updateUser
);

// Delete User (Admin or User Only)
router.delete('/:id', 
  checkAuth, 
  userController.deleteUser);

module.exports = router;
