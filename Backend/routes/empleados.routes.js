const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const empleadosController = require('../controllers/user_controller');

router.get('/login', empleadosController.get_login);
router.post('/login', empleadosController.login);
router.get('/logout', empleadosController.logout);
router.get('/dashboard', isAuth, empleadosController.main);
//router.get('/mis-observaciones', isAuth, empleadosController.getObservacionesEmpleados);

router.get('/', isAuth, empleadosController.root);

module.exports = router;