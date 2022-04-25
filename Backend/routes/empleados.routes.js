const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

<<<<<<< HEAD
// -  Controladores:
const empleadosController = require('../controllers/empleados_controller');
const loginController = require('../controllers/login_controller');
const menteesController = require('../controllers/mentees_controller');
const periodosController = require('../controllers/periodos_controller');
const templatesController = require('../controllers/templates_controller');
const preguntasController = require('../controllers/preguntas_controller');
<<<<<<< HEAD
>>>>>>> 56c6eaf44418b4869c79318eab930f0dccf9c9bc
=======
const empleadosController = require('../controllers/user_controller');
>>>>>>> ce3586c295d94382e621ce97a88f2bdf1e445def
=======
>>>>>>> 67c41bd1c6ba85fdff5c89d588bbe31056b2f970

router.get('/login', empleadosController.get_login);
router.post('/login', empleadosController.login);
router.get('/logout', empleadosController.logout);
router.get('/dashboard', isAuth, empleadosController.main);

router.get('/', isAuth, empleadosController.root);

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
router.use('/listaTemplates', isAuth, templatesController.listado);
router.get('/nuevaTemplate', isAuth, templatesController.get_nueva_template);
router.post('/nuevaTemplate', templatesController.post_nueva_template);
router.post('/postPreguntas', templatesController.post_preguntas);

// - Colocado aquí para evitar redirrecionamiento indebido:
router.get('/id-empleado=:idEmpleado', isAuth, empleadosController.getEmpleado);
router.post('/id-empleado=:idEmpleado', empleadosController.updateEmpleado);
router.get('/listaPreguntas=:idTemplate', preguntasController.listadoPreguntas);
router.get('/id-template=:idTemplate', isAuth, templatesController.getTemplate);
//router.post('/id-template=:idTemplate', templatesController.updateEmpleado);

module.exports = router;