const express = require('express');

const UserController = require('../controllers/user-controller')
const userController = new UserController();

const router = new express.Router();

router.get('/', userController.getUsers);
//router.get('/users', userController.getUsers);
router.get('/:id', userController.getUserById);
//router.post('/users', userController.createUser);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
router.post('/save', userController.saveChanges);

module.exports = router;