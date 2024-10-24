// controllers/grupoController.js

const Grupo = require('../models/Grupo');
const Estudiante = require('../models/Estudiante'); // Asegúrate de tener el modelo Estudiante

exports.getAllGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.findAll();
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarGrupo = async (req, res) => {
    try {
        const { idGrupo, nombreGrupo, idDocente } = req.body;
        const nuevoGrupo = await Grupo.create({ idGrupo, nombreGrupo, idDocente });
        res.status(201).json(nuevoGrupo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarGrupo = async (req, res) => {
    try {
        const { nombreGrupo, idDocente } = req.body;
        await Grupo.update({ nombreGrupo, idDocente }, { where: { idGrupo: req.params.idGrupo } });
        res.status(200).json({ message: 'Grupo actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarGrupo = async (req, res) => {
    try {
        await Grupo.destroy({ where: { idGrupo: req.params.idGrupo } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Nueva función para verificar si ya existe un grupo con el mismo nombre para un docente
exports.existeGrupoConNombre = async (req, res) => {
    const { nombreGrupo, idDocente } = req.query; // Usamos query params para recibir los datos
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

// Nueva función para obtener estudiantes por ID de grupo
exports.getEstudiantesPorGrupo = async (req, res) => {
    const idGrupo = req.params.idGrupo;
    try {
        const estudiantes = await Estudiante.findAll({ where: { idGrupo } }); // Asegúrate de que el modelo Estudiante tenga idGrupo
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Nueva función para agregar un estudiante a un grupo
exports.addEstudianteToGrupo = async (req, res) => {
    const idGrupo = req.params.idGrupo;
    const { idEstudiante } = req.body; // Recibimos el ID del estudiante en el body
    try {
        // Aquí debes implementar la lógica para asociar el estudiante con el grupo.
        // Esto puede variar según tu estructura de base de datos.
        await Estudiante.update({ idGrupo }, { where: { idEstudiante } });
        res.status(200).json({ message: 'Estudiante agregado al grupo' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
