const HojaDeGoogle = require('../models/HojaDeGoogle');
const Grupo = require('../models/Grupo'); // Asegúrate de tener el modelo Grupo

// Obtener todas las hojas de Google
exports.getAllHojasDeGoogle = async (req, res) => {
    try {
        const hojas = await HojaDeGoogle.findAll();
        res.json(hojas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una hoja de Google por ID
exports.getHojaDeGoogleById = async (req, res) => {
    try {
        const hoja = await HojaDeGoogle.findByPk(req.params.idHoja);
        if (!hoja) {
            return res.status(404).json({ message: 'Hoja de Google no encontrada' });
        }
        res.json(hoja);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las hojas de Google por grupo
exports.getHojasDeGooglePorGrupo = async (req, res) => {
    try {
        const hojas = await HojaDeGoogle.findAll({ where: { idGrupo: req.params.idGrupo } });
        res.json(hojas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las hojas de Google por docente (basado en los grupos del docente)
exports.getHojasDeGooglePorDocente = async (req, res) => {
    try {
        const grupos = await Grupo.findAll({ where: { idDocente: req.params.idDocente } });
        const idGrupos = grupos.map(grupo => grupo.idGrupo);
        const hojas = await HojaDeGoogle.findAll({ where: { idGrupo: idGrupos } });
        res.json(hojas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verificar si ya existe una hoja de Google para un grupo
exports.existeHojaParaGrupo = async (req, res) => {
    const { idGrupo } = req.query;
    try {
        const hoja = await HojaDeGoogle.findOne({ where: { idGrupo } });
        if (hoja) {
            return res.status(200).json({ existe: true });
        }
        return res.status(200).json({ existe: false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar hojas de Google por URL
exports.buscarHojasPorUrl = async (req, res) => {
    const { url } = req.query;
    try {
        const hojas = await HojaDeGoogle.findAll({ where: { url } });
        res.json(hojas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar una nueva hoja de Google
exports.agregarHojaDeGoogle = async (req, res) => {
    try {
        const { idHoja, idGrupo, url } = req.body;
        const nuevaHoja = await HojaDeGoogle.create({ idHoja, idGrupo, url });
        res.status(201).json(nuevaHoja);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una hoja de Google
exports.actualizarHojaDeGoogle = async (req, res) => {
    try {
        const { url } = req.body;
        await HojaDeGoogle.update({ url }, { where: { idHoja: req.params.idHoja } });
        res.status(200).json({ message: 'Hoja de Google actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una hoja de Google
exports.eliminarHojaDeGoogle = async (req, res) => {
    try {
        await HojaDeGoogle.destroy({ where: { idHoja: req.params.idHoja } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
