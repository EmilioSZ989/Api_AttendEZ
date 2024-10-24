const Asistencia = require('../models/Asistencia');

exports.getAsistenciasPorGrupo = async (req, res) => {
    try {
        const asistencias = await Asistencia.findAll({ where: { idGrupo: req.params.idGrupo } });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarAsistencia = async (req, res) => {
    try {
        const { fecha, estado, idEstudiante, idGrupo } = req.body;
        const nuevaAsistencia = await Asistencia.create({ fecha, estado, idEstudiante, idGrupo });
        res.status(201).json(nuevaAsistencia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarAsistencia = async (req, res) => {
    try {
        const { fecha, estado, idEstudiante, idGrupo } = req.body;
        await Asistencia.update({ fecha, estado, idEstudiante, idGrupo }, { where: { idAsistencia: req.params.idAsistencia } });
        res.status(200).json({ message: 'Asistencia actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarAsistencia = async (req, res) => {
    try {
        await Asistencia.destroy({ where: { idAsistencia: req.params.idAsistencia } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
