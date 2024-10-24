const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

// Obtener todos los grupos
router.get('/', grupoController.getAllGrupos);

// Obtener un grupo por su ID
router.get('/:idGrupo', grupoController.getGrupoById);

// Verificar si un grupo existe para un docente
router.get('/existeGrupo', grupoController.existeGrupoConNombre);

// Obtener todos los grupos de un docente
router.get('/docente/:idDocente', grupoController.getGruposPorDocente);

// Obtener estudiantes por grupo
router.get('/:idGrupo/estudiantes', grupoController.getEstudiantesPorGrupo);

// Agregar un estudiante a un grupo
router.post('/:idGrupo/agregarEstudiante', grupoController.addEstudianteToGrupo);

// Agregar múltiples estudiantes a un grupo
router.post('/:idGrupo/agregarEstudiantes', grupoController.addMultipleEstudiantesToGrupo);

// Eliminar un estudiante de un grupo
router.delete('/:idGrupo/eliminarEstudiante/:idEstudiante', grupoController.eliminarEstudianteDelGrupo);

// Eliminar múltiples estudiantes de un grupo
router.delete('/:idGrupo/eliminarEstudiantes', grupoController.eliminarMultipleEstudiantesDelGrupo);

// Agregar un nuevo grupo
router.post('/', grupoController.agregarGrupo);

// Actualizar un grupo
router.put('/:idGrupo', grupoController.actualizarGrupo);

// Eliminar un grupo
router.delete('/:idGrupo', grupoController.eliminarGrupo);

module.exports = router;
