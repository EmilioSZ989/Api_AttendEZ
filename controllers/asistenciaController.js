const Asistencia = require('../models/Asistencia');

// Obtener todas las asistencias de un grupo
exports.getAsistenciasPorGrupo = async (req, res) => {
    try {
        const asistencias = await Asistencia.findAll({ where: { idGrupo: req.params.idGrupo } });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las asistencias de un estudiante en un grupo
exports.getAsistenciasPorEstudiante = async (req, res) => {
    try {
        const asistencias = await Asistencia.findAll({ 
            where: { 
                idGrupo: req.params.idGrupo, 
                idEstudiante: req.params.idEstudiante 
            }
        });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener las asistencias de un grupo en una fecha específica
exports.getAsistenciasPorFecha = async (req, res) => {
    try {
        const asistencias = await Asistencia.findAll({
            where: { 
                idGrupo: req.params.idGrupo,
                fecha: req.params.fecha
            }
        });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener asistencias por estado en un grupo
exports.getAsistenciasPorEstado = async (req, res) => {
    try {
        const asistencias = await Asistencia.findAll({
            where: { 
                idGrupo: req.params.idGrupo,
                estado: req.params.estado
            }
        });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar una nueva asistencia
exports.agregarAsistencia = async (req, res) => {
    try {
        const { fecha, estado, idEstudiante, idGrupo } = req.body;
        const nuevaAsistencia = await Asistencia.create({ fecha, estado, idEstudiante, idGrupo });
        res.status(201).json(nuevaAsistencia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una asistencia por su ID
exports.actualizarAsistencia = async (req, res) => {
    try {
        const { fecha, estado, idEstudiante, idGrupo } = req.body;
        await Asistencia.update({ fecha, estado, idEstudiante, idGrupo }, { where: { idAsistencia: req.params.idAsistencia } });
        res.status(200).json({ message: 'Asistencia actualizada' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una asistencia por su ID
exports.eliminarAsistencia = async (req, res) => {
    try {
        await Asistencia.destroy({ where: { idAsistencia: req.params.idAsistencia } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
