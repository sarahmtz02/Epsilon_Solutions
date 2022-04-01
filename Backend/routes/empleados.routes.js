const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const empleadosController = require('../controllers/empleados_controller');

router.get('/nuevoEmpleado', isAuth, empleadosController.get_nuevo_empleado);
router.post('/nuevoEmpleado', empleadosController.post_nuevo_empleado);

router.get('/login', empleadosController.get_login);
router.post('/login', empleadosController.login);
router.get('/logout', empleadosController.logout);
router.get('/dashboard', isAuth, empleadosController.dashboard);
router.get('/', isAuth, empleadosController.root);


router.use('/lista', isAuth, empleadosController.listado);

module.exports = router;