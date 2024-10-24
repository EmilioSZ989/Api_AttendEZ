const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

// Obtener todos los docentes
router.get('/', docenteController.getAllDocentes);

// Obtener un docente por su ID
router.get('/:idDocente', docenteController.getDocenteById);

// Buscar docentes por nombre
router.get('/buscar/nombre/:nombre', docenteController.buscarDocentesPorNombre);

// Buscar docentes por correo
router.get('/buscar/correo/:correo', docenteController.buscarDocentesPorCorreo);

// Verificar si un docente existe (por correo)
router.get('/existe/correo/:correo', docenteController.verificarDocentePorCorreo);

// Agregar un nuevo docente
router.post('/', docenteController.agregarDocente);

// Actualizar un docente por su ID
router.put('/:idDocente', docenteController.actualizarDocente);

// Eliminar un docente por su ID
router.delete('/:idDocente', docenteController.eliminarDocente);

module.exports = router;
