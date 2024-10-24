const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Obtener todos los estudiantes
router.get('/', estudianteController.getAllEstudiantes);

// Obtener un estudiante por su ID
router.get('/:idEstudiante', estudianteController.getEstudianteById);

// Buscar estudiantes por nombre
router.get('/buscar/nombre/:nombre', estudianteController.buscarEstudiantesPorNombre);

// Buscar estudiantes por correo
router.get('/buscar/correo/:correoElectronico', estudianteController.buscarEstudiantesPorCorreo);

// Verificar si un estudiante existe por correo
router.get('/existe/correo/:correoElectronico', estudianteController.verificarEstudiantePorCorreo);

// Obtener estudiantes por grupo
router.get('/grupo/:idGrupo', estudianteController.getEstudiantesPorGrupo);

// Agregar un nuevo estudiante
router.post('/', estudianteController.agregarEstudiante);

// Actualizar un estudiante por su ID
router.put('/:idEstudiante', estudianteController.actualizarEstudiante);

// Eliminar un estudiante por su ID
router.delete('/:idEstudiante', estudianteController.eliminarEstudiante);

module.exports = router;
