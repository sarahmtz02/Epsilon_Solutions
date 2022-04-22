const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const empleadosController = require('../controllers/empleados_controller');

// - Controlados por empleadosController:

// Para visualización y modificación de empleados --> Sólo tendrá acceso el Chapter Lead!
router.use('/lista', isAuth, empleadosController.listado);
router.get('/nuevoEmpleado', isAuth, empleadosController.get_nuevo_empleado);
router.post('/nuevoEmpleado', empleadosController.post_nuevo_empleado);

// Para visualización y modificación de plantillas --> Sólo tendrá acceso el Chapter Lead!

router.get('/id-empleado=:idEmpleado', isAuth, empleadosController.getEmpleado);
router.post('/id-empleado=:idEmpleado', empleadosController.updateEmpleado);

module.exports = router;