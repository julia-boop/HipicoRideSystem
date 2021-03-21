const express = require('express');
const router = express.Router();
const hipicoController = require('../controllers/hipicoController');

router.get('/login', hipicoController.login);
router.post('/login', hipicoController.enter);


module.exports = router