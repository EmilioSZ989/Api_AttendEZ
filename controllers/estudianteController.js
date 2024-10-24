const Estudiante = require('../models/Estudiante');

exports.getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarEstudiante = async (req, res) => {
    try {
        const { idEstudiante, nombre, correoElectronico, idGrupo } = req.body;
        const nuevoEstudiante = await Estudiante.create({ idEstudiante, nombre, correoElectronico, idGrupo });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarEstudiante = async (req, res) => {
    try {
        const { nombre, correoElectronico, idGrupo } = req.body;
        await Estudiante.update({ nombre, correoElectronico, idGrupo }, { where: { idEstudiante: req.params.idEstudiante } });
        res.status(200).json({ message: 'Estudiante actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarEstudiante = async (req, res) => {
    try {
        await Estudiante.destroy({ where: { idEstudiante: req.params.idEstudiante } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
