const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const periodosController = require('../controllers/periodos_controller');

router.get('/nuevoPeriodo', periodosController.get_nuevo_periodo);
router.post('/nuevoPeriodo', periodosController.post_nuevo_periodo);

router.get('/', isAuth, periodosController.root);

module.exports = router;