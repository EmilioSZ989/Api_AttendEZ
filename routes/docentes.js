const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');

router.get('/', docenteController.getAllDocentes);
router.post('/', docenteController.agregarDocente);
router.put('/:idDocente', docenteController.actualizarDocente);
router.delete('/:idDocente', docenteController.eliminarDocente);

module.exports = router;
