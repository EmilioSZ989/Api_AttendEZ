const express = require('express');
const router = express.Router();
const hojaDeGoogleController = require('../controllers/hojaDeGoogleController');

router.get('/', hojaDeGoogleController.getAllHojasDeGoogle);
router.post('/', hojaDeGoogleController.agregarHojaDeGoogle);
router.put('/:idHoja', hojaDeGoogleController.actualizarHojaDeGoogle);
router.delete('/:idHoja', hojaDeGoogleController.eliminarHojaDeGoogle);

module.exports = router;
