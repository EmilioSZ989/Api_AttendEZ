const HojaDeGoogle = require('../models/HojaDeGoogle');

exports.getAllHojasDeGoogle = async (req, res) => {
    try {
        const hojas = await HojaDeGoogle.findAll();
        res.json(hojas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarHojaDeGoogle = async (req, res) => {
    try {
        const { idHoja, idGrupo, url } = req.body;
        const nuevaHoja = await HojaDeGoogle.create({ idHoja, idGrupo, url });
        res.status(201).json(nuevaHoja);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarHojaDeGoogle = async (req, res) => {
    try {
        const { url } = req.body;
        await HojaDeGoogle.update({ url }, { where: { idHoja: req.params.idHoja } });
        res.status(200).json({ message: 'Hoja de Google actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarHojaDeGoogle = async (req, res) => {
    try {
        await HojaDeGoogle.destroy({ where: { idHoja: req.params.idHoja } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
