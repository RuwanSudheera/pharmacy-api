const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');

// Routes for the User model
router.post('/', userController.createUser);
router.get('/:id', verifyToken, userController.getUser);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);


router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
