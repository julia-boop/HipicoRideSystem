const express = require('express');
const router = express.Router();
const concursoController = require('../controllers/concursoController');
const isEnabled = require('../middlewares/isEnabled');


router.get('/', concursoController.read);

router.get('/crear', isEnabled, concursoController.cForm);
router.post('/crear', isEnabled, concursoController.cCreate);

router.get('/:idConcurso/detail', concursoController.cDetail);
router.get('/:idConcurso/:idPrueba/detail', concursoController.pDetail);
router.get('/:idConcurso/:idPrueba/inscripcion', concursoController.iForm);

router.get('/:idConcurso/pPrueba', concursoController.pForm);
router.post('/:idConcurso/pPrueba', concursoController.pCreate);

// les falta agregar el middleware pero cuando esten andando lo agrego
router.get('/:idConcurso/:idPrueba/edit', concursoController.pEdit);
router.put('/:idConcurso/:idPrueba/edit', concursoController.pUpdate);


router.get('/:idConcurso/edit', isEnabled, concursoController.cEdit);
router.put('/:idConcurso/edit', isEnabled, concursoController.cUpdate);

router.get('/:idConcurso/finalizar', isEnabled, concursoController.fin);


module.exports = router;