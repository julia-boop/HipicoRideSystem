const express = require('express');
const router = express.Router();
const concursoController = require('../controllers/concursoController');
const isEnabled = require('../middlewares/isEnabled');


router.get('/', concursoController.read);

router.get('/crear', isEnabled, concursoController.cForm);
router.post('/crear', isEnabled,concursoController.cCreate);

router.get('/:idConcurso/detail', concursoController.cDetail);
router.get('/:idConcurso/:idPrueba/detail', concursoController.pDetail);
router.get('/:idConcurso/:idPrueba/inscripcion', concursoController.iForm);

// les falta agregar el middleware pero cuando esten andando lo agrego
router.get('/:idConcurso/:idPrueba/edit', concursoController.pEdit);
router.get('/:idConcurso/edit', concursoController.cEdit);



module.exports = router;