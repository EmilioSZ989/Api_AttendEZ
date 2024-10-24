const Docente = require('../models/Docente');

exports.getAllDocentes = async (req, res) => {
    try {
        const docentes = await Docente.findAll();
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarDocente = async (req, res) => {
    try {
        const { idDocente, nombre, correo } = req.body;
        const nuevoDocente = await Docente.create({ idDocente, nombre, correo });
        res.status(201).json(nuevoDocente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarDocente = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        await Docente.update({ nombre, correo }, { where: { idDocente: req.params.idDocente } });
        res.status(200).json({ message: 'Docente actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarDocente = async (req, res) => {
    try {
        await Docente.destroy({ where: { idDocente: req.params.idDocente } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
