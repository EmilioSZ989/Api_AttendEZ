const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.get('/', estudianteController.getAllEstudiantes);
router.post('/', estudianteController.agregarEstudiante);
router.put('/:idEstudiante', estudianteController.actualizarEstudiante);
router.delete('/:idEstudiante', estudianteController.eliminarEstudiante);

module.exports = router;
