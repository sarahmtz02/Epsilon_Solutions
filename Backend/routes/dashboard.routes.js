const express = require('express');
const router = express.Router();

const userController = require('../controllers/dashboard_controller');


router.get('/dashboard', userController.dashboard);

module.exports = router;