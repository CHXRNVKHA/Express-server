const express = require('express');

const UserController = require('../controllers/user-controller')
const user_controller = new UserController();

const router = new express.Router();

router.get('/:id', user_controller.getUserById);

module.exports = router;