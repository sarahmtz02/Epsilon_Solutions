const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const cuestionarioController = require('../controllers/cuestionario_controller');

router.get('/evaluaciones', isAuth, cuestionarioController.fetchCuestionarios); 
router.post('/evaluaciones', isAuth, cuestionarioController.nuevoCuestionario);

router.get('/feedback=:idCuestionario', isAuth, cuestionarioController.getCuestionario);
router.post('/feedback=:idCuestionario', isAuth, cuestionarioController.writeFeedback);

module.exports = router;
