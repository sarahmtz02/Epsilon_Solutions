const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

// -  Controladores:
const empleadosController = require('../controllers/empleados_controller');
const loginController = require('../controllers/login_controller');
const menteesController = require('../controllers/mentees_controller');
const periodosController = require('../controllers/periodos_controller');
const templatesController = require('../controllers/templates_controller');

// - Controlados por empleadosController:
router.use('/lista', isAuth, empleadosController.listado);
router.get('/nuevoEmpleado', isAuth, empleadosController.get_nuevo_empleado);
router.post('/nuevoEmpleado', empleadosController.post_nuevo_empleado);

// - Controlados por periodosController:
router.use('/periodos', isAuth, periodosController.periodos);
router.get('/nuevoPeriodo', isAuth, periodosController.get_nuevo_periodo);
router.post('/nuevoPeriodo', periodosController.post_nuevo_periodo);

// - Controlados por menteesController:
router.get('/nuevoMentee', isAuth, menteesController.get_nuevo_mentee);
router.post('/nuevoMentee', menteesController.post_nuevo_mentee);

// - Controlados por loginController:
router.get('/login', loginController.get_login);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);
router.get('/dashboard', isAuth, loginController.dashboard);
router.get('/', isAuth, loginController.root);

// - Controlados por templatesController:
router.use('/templates', isAuth, templatesController.templates);
router.get('/nuevaTemplate', isAuth, templatesController.get_nueva_template);
router.post('/nuevaTemplate', templatesController.post_nueva_template);

// - Colocado aquí para evitar redirrecionamiento indebido:
router.get('/:idEmpleado', isAuth, empleadosController.getEmpleado);
router.post('/:idEmpleado', empleadosController.updateEmpleado);

module.exports = router;