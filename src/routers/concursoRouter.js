const express = require('express');
const router = express.Router();
const concursoController = require('../controllers/concursoController');

router.get('/', concursoController.read);
router.get('/:idConcurso/detail', concursoController.cDetail);
router.get('/:idConcurso/:idPrueba/detail', concursoController.pDetail);
router.get('/:idConcurso/:idPrueba/inscripcion', concursoController.iForm);

module.exports = router;