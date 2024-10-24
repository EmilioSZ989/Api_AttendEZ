const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

router.get('/:idGrupo', asistenciaController.getAsistenciasPorGrupo);
router.post('/', asistenciaController.agregarAsistencia);
router.put('/:idAsistencia', asistenciaController.actualizarAsistencia);
router.delete('/:idAsistencia', asistenciaController.eliminarAsistencia);

module.exports = router;
