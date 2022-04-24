const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const menteesController = require('../controllers/mentees_controller');

router.get('/panelMentees', isAuth, menteesController.fetchMentees);
router.post('/panelMentees', isAuth, menteesController.insertMentee);

router.get('/misMentorados', isAuth, menteesController.getMentorados);
router.get('/id-mentorado=:idMentorado', isAuth, menteesController.getEvalMentorado);
router.get('/evalMentee=:idCuestionario', isAuth, menteesController.getResCuest);

module.exports = router;