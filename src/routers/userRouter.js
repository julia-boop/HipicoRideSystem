const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.login);
router.post('/login', userController.enter);

router.get('/register', userController.register);
router.post('/register', userController.saveUser);

router.get('/:idUser/account', userController.account);

router.get('/:idUser/edit', userController.accountEdit);
router.put('/:idUser/edit', userController.update);

router.get('/:idUser/inscripciones', userController.inscripciones)

router.get('/logout', userController.logout);
module.exports = router 