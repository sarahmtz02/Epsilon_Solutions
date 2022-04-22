const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const templatesController = require('../controllers/templates_controller');

// Para Template

router.use('/listaTemplates', isAuth, templatesController.listado);

router.get('/template=:idTemplate', templatesController.getTemplate);
router.post('/template=:idTemplate', templatesController.writePreguntas)

module.exports = router;