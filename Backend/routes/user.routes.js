const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/login', userController.get_login);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);
router.get('/', userController.root);
router.post('/evaluacion', userController.registrarMentees);
router.post('/asignar', userController.registrarAsignacion);
module.exports = router;