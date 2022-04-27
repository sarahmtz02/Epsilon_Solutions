const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const userController = require('../controllers/user_controller');

router.get('/login', userController.get_login);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/dashboard', isAuth, userController.main);

router.get('/panelFeedback', isAuth, userController.panelFeedback);
router.get('/evalCompaneros', isAuth, userController.listaFeedback);
router.get('/obsMentores', isAuth, userController.misObservaciones);

router.get('/evalCompanero=:idCuestionario', isAuth, userController.evalCompa);
router.get('/', isAuth, userController.root);

module.exports = router;