const express = require('express');
const router = express.Router();
const hipicoController = require('../controllers/hipicoController');

router.get('/login', hipicoController.login);
router.post('/login', hipicoController.enter);

router.get('/:idHipico/account', hipicoController.account);
router.put('/:idHipico/account', hipicoController.update);



module.exports = router