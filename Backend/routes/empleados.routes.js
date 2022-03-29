const express = require('express');
const router = express.Router();

const empleadosController = require('../controllers/empleados_controller');

router.get('/nuevoEmpleado', empleadosController.get_nuevo_empleado);
//router.post('/nuevoEmpleado', empleadosController.post_nuevo_empleado);

router.use('/', empleadosController.principal);

module.exports = router;