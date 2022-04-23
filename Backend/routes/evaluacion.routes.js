const express = require('express');
const router = express.Router();
const verifyRolJer = require('../util/auth-rol.js')
const isAuth = require('../util/is-auth.js');

const cuestionarioController = require('../controllers/cuestionario_controller');

// - Controlados por cuestionarioController:
router.get('/dashboard', isAuth, cuestionarioController.main);
router.get('/evaluaciones', isAuth, cuestionarioController.fetchCuestionarios); 
router.post('/evaluaciones', isAuth, cuestionarioController.nuevoCuestionario);

router.get('/feedback=:idCuestionario', isAuth, cuestionarioController.getCuestionario);
router.post('/feedback=:idCuestionario', isAuth, cuestionarioController.writeFeedback);

module.exports = router;