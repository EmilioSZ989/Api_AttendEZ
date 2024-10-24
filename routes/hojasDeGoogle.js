const express = require('express');
const router = express.Router();
const hojaDeGoogleController = require('../controllers/hojaDeGoogleController');

// Obtener todas las hojas de Google
router.get('/', hojaDeGoogleController.getAllHojasDeGoogle);

// Obtener una hoja de Google por ID
router.get('/:idHoja', hojaDeGoogleController.getHojaDeGoogleById);

// Obtener todas las hojas de Google por grupo
router.get('/grupo/:idGrupo', hojaDeGoogleController.getHojasDeGooglePorGrupo);

// Obtener todas las hojas de Google por docente
router.get('/docente/:idDocente', hojaDeGoogleController.getHojasDeGooglePorDocente);

// Verificar si una hoja ya existe para un grupo
router.get('/existeHoja', hojaDeGoogleController.existeHojaParaGrupo);

// Buscar hojas de Google por URL
router.get('/buscarPorUrl', hojaDeGoogleController.buscarHojasPorUrl);

// Agregar una nueva hoja de Google
router.post('/', hojaDeGoogleController.agregarHojaDeGoogle);

// Actualizar una hoja de Google
router.put('/:idHoja', hojaDeGoogleController.actualizarHojaDeGoogle);

// Eliminar una hoja de Google
router.delete('/:idHoja', hojaDeGoogleController.eliminarHojaDeGoogle);

module.exports = router;
