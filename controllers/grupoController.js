const Grupo = require('../models/Grupo');
const Estudiante = require('../models/Estudiante');

// Obtener todos los grupos
exports.getAllGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.findAll();
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un grupo por su ID
exports.getGrupoById = async (req, res) => {
    try {
        const grupo = await Grupo.findByPk(req.params.idGrupo);
        if (!grupo) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }
        res.json(grupo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verificar si ya existe un grupo con el mismo nombre para un docente
exports.existeGrupoConNombre = async (req, res) => {
    const { nombreGrupo, idDocente } = req.query; // Usamos query params
    try {
        const grupo = await Grupo.findOne({ where: { nombreGrupo, idDocente } });
        if (grupo) {
            return res.status(200).json({ existe: true });
        }
        return res.status(200).json({ existe: false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los grupos de un docente
exports.getGruposPorDocente = async (req, res) => {
    try {
        const grupos = await Grupo.findAll({ where: { idDocente: req.params.idDocente } });
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener estudiantes por ID de grupo
exports.getEstudiantesPorGrupo = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({ where: { idGrupo: req.params.idGrupo } });
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un estudiante a un grupo
exports.addEstudianteToGrupo = async (req, res) => {
    const idGrupo = req.params.idGrupo;
    const { idEstudiante } = req.body;
    try {
        await Estudiante.update({ idGrupo }, { where: { idEstudiante } });
        res.status(200).json({ message: 'Estudiante agregado al grupo' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar múltiples estudiantes a un grupo
exports.addMultipleEstudiantesToGrupo = async (req, res) => {
    const idGrupo = req.params.idGrupo;
    const { estudiantes } = req.body; // Recibimos un array de IDs de estudiantes
    try {
        await Estudiante.update({ idGrupo }, { where: { idEstudiante: estudiantes } });
        res.status(200).json({ message: 'Estudiantes agregados al grupo' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un estudiante de un grupo
exports.eliminarEstudianteDelGrupo = async (req, res) => {
    const { idGrupo, idEstudiante } = req.params;
    try {
        await Estudiante.update({ idGrupo: null }, { where: { idEstudiante, idGrupo } });
        res.status(200).json({ message: 'Estudiante eliminado del grupo' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar múltiples estudiantes de un grupo
exports.eliminarMultipleEstudiantesDelGrupo = async (req, res) => {
    const { idGrupo } = req.params;
    const { estudiantes } = req.body; // Recibimos un array de IDs de estudiantes
    try {
        await Estudiante.update({ idGrupo: null }, { where: { idEstudiante: estudiantes, idGrupo } });
        res.status(200).json({ message: 'Estudiantes eliminados del grupo' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un nuevo grupo
exports.agregarGrupo = async (req, res) => {
    try {
        const { idGrupo, nombreGrupo, idDocente } = req.body;
        const nuevoGrupo = await Grupo.create({ idGrupo, nombreGrupo, idDocente });
        res.status(201).json(nuevoGrupo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un grupo
exports.actualizarGrupo = async (req, res) => {
    try {
        const { nombreGrupo, idDocente } = req.body;
        await Grupo.update({ nombreGrupo, idDocente }, { where: { idGrupo: req.params.idGrupo } });
        res.status(200).json({ message: 'Grupo actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un grupo
exports.eliminarGrupo = async (req, res) => {
    try {
        await Grupo.destroy({ where: { idGrupo: req.params.idGrupo } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
