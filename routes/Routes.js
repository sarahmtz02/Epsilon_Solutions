const express = require('express');
const router = express.Router();
const path = require('path');
const routesController = require('../controllers/UserController');

router.get('/login', routesController.get_login);

router.post('/login', routesController.login);

router.get('/logout', routesController.logout);


module.exports = router;
