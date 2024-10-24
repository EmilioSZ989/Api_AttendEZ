const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

// Obtener todas las asistencias de un grupo
router.get('/:idGrupo', asistenciaController.getAsistenciasPorGrupo);

// Obtener todas las asistencias de un estudiante en un grupo
router.get('/grupo/:idGrupo/estudiante/:idEstudiante', asistenciaController.getAsistenciasPorEstudiante);

// Obtener asistencias de un grupo en una fecha específica
router.get('/grupo/:idGrupo/fecha/:fecha', asistenciaController.getAsistenciasPorFecha);

// Obtener asistencias por estado (presentes, ausentes, etc.) en un grupo
router.get('/grupo/:idGrupo/estado/:estado', asistenciaController.getAsistenciasPorEstado);

// Agregar una nueva asistencia
router.post('/', asistenciaController.agregarAsistencia);

// Actualizar una asistencia por su ID
router.put('/:idAsistencia', asistenciaController.actualizarAsistencia);

// Eliminar una asistencia por su ID
router.delete('/:idAsistencia', asistenciaController.eliminarAsistencia);

module.exports = router;

