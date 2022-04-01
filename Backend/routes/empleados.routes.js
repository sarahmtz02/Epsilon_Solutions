const express = require('express');
const router = express.Router();

const empleadosController = require('../controllers/empleados_controller');

router.get('/nuevoEmpleado', empleadosController.get_nuevo_empleado);
router.post('/nuevoEmpleado', empleadosController.post_nuevo_empleado);

router.get('/login', empleadosController.get_login);
router.post('/login', empleadosController.login);
router.get('/logout', empleadosController.logout);
router.get('/dashboard', empleadosController.dashboard);
router.get('/', empleadosController.root);


router.use('/lista', empleadosController.listado);

module.exports = router;