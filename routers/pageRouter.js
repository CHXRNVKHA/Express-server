const express = require('express');
const PageController = require('../controllers/page-controller');

const router = new express.Router();
const pageController = new PageController();

router.get('/', pageController.showPage);

module.exports = router;