const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.get('/registrar_asistencia', qrController.registrarAsistencia);

module.exports = router;
