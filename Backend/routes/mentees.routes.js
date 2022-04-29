const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const menteesController = require('../controllers/mentees_controller');

router.get('/panelMentees', isAuth, menteesController.fetchMentees);
router.post('/panelMentees', isAuth, menteesController.insertMentee);
router.post('/nuevaObservacion', isAuth, menteesController.nuevaObservacion);

router.get('/misMentorados', isAuth, menteesController.getMentorados);
router.get('/id-mentorado=:idMentorado', isAuth, menteesController.getEvalMentorado);
router.get('/evalMentee=:idCuestionario', isAuth, menteesController.getResCuest);
router.get('/observaciones-id-mentorado=:idMentorado', isAuth, menteesController.misObservaciones);

router.get('/editObservacion=:idObservacion', isAuth, menteesController.getOneObservacion);
router.post('/editObservacion=:idObservacion', isAuth, menteesController.updateObservacion);
router.post('/deleteObservacion=:idObservacion', isAuth, menteesController.deleteObservacion);

router.get('/deleteAsig=:idMentees', isAuth, menteesController.deleteAsig);

module.exports = router;