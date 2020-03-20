const express = require('express');

const UserController = require('../controllers/user-controller')
const userController = new UserController();

const router = new express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

module.exports = router;