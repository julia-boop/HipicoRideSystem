const express = require('express');
const router = express.Router();
const hipicoController = require('../controllers/hipicoController');
const path = require('path');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../', 'public', 'images', 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, req.body.mail + '-' + Date.now()+path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

  module.exports = upload

router.get('/login', hipicoController.login);
router.post('/login', hipicoController.enter);

router.get('/register', hipicoController.register);
router.post('/register', upload.any(), hipicoController.save);

router.get('/:idHipico/account', hipicoController.account);
router.put('/:idHipico/account', upload.any(), hipicoController.update);

router.get('/logout', hipicoController.logout);

router.get('/:idHipico/account/pagar', hipicoController.testPay)


module.exports = router