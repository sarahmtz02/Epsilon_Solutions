const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const empleadosController = require('../controllers/empleados_controller');

router.get('/nuevoEmpleado', isAuth, empleadosController.get_nuevo_empleado);
router.post('/nuevoEmpleado', empleadosController.post_nuevo_empleado);



//router.get('/edit', isAuth, empleadosController.get_edit_empleado);
//router.post('/edit', empleadosController.post_edit_empleado);

router.get('/nuevoPeriodo', isAuth, empleadosController.get_nuevo_periodo);
router.post('/nuevoPeriodo', empleadosController.post_nuevo_periodo);

router.get('/nuevoMentee', isAuth, empleadosController.get_nuevo_mentee);
router.post('/nuevoMentee', empleadosController.post_nuevo_mentee);

router.get('/login', empleadosController.get_login);
router.post('/login', empleadosController.login);
router.get('/logout', empleadosController.logout);
router.get('/dashboard', isAuth, empleadosController.dashboard);
router.get('/', isAuth, empleadosController.root);

router.use('/lista', isAuth, empleadosController.listado);
router.use('/templates', isAuth, empleadosController.templates);
router.use('/periodos', isAuth, empleadosController.periodos);

router.get('/nuevaTemplate', isAuth, empleadosController.get_nueva_template);
router.post('/nuevaTemplate', empleadosController.post_nueva_template);

router.get('/:idEmpleado', isAuth, empleadosController.getEmpleado);

module.exports = router;