// routes/grupos.js

const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.get('/', grupoController.getAllGrupos);
router.post('/', grupoController.agregarGrupo);
router.put('/:idGrupo', grupoController.actualizarGrupo);
router.delete('/:idGrupo', grupoController.eliminarGrupo);
router.get('/existeGrupo', grupoController.existeGrupoConNombre); // Nueva ruta para verificar existencia
router.get('/:idGrupo/estudiantes', grupoController.getEstudiantesPorGrupo); // Nueva ruta para obtener estudiantes por grupo
router.post('/:idGrupo/agregarEstudiante', grupoController.addEstudianteToGrupo); // Nueva ruta para agregar estudiante a un grupo

module.exports = router;
