const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const menteesController = require('../controllers/mentees_controller');

// - Controlados por empleadosController:

// Para visualización y modificación de empleados --> Sólo tendrá acceso el Chapter Lead!

//router.use('/mentee',isAuth,menteesController)
router.get('/nuevoMentee', menteesController.get_nuevo_mentee);
router.post('/nuevoMentee', menteesController.post_nuevo_mentee);

module.exports = router;