const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const periodosController = require('../controllers/periodos_controller');

router.get('/nuevoPeriodo', periodosController.get_nuevo_periodo);
router.post('/nuevoPeriodo', periodosController.post_nuevo_periodo);

router.get('/', isAuth, periodosController.root);


router.get('/editPeriodo=:idPeriodo', isAuth, periodosController.getEditPeriodo);
router.post('/editPeriodo=:idPeriodo', isAuth, periodosController.updatePeriodo)

module.exports = router;