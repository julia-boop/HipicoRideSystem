const express = require('express');
const router = express.Router();
const hipicoController = require('../controllers/hipicoController');

router.get('/login', hipicoController.login);
router.post('/login', hipicoController.enter);

router.get('/:idHipico/account', hipicoController.account);
router.put('/:idHipico/account', hipicoController.update);

router.get('/logout', hipicoController.logout);


module.exports = router