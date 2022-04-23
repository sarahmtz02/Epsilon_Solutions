const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const menteesController = require('../controllers/mentees_controller');

router.get('/panelMentees', isAuth, menteesController.fetchMentees);
router.post('/panelMentees', isAuth, menteesController.insertMentee);

module.exports = router;