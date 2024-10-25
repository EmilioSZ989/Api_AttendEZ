const Estudiante = require('../models/Estudiante');

// Obtener todos los estudiantes
exports.getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un estudiante por su ID
exports.getEstudianteById = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.idEstudiante);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar estudiantes por nombre
exports.buscarEstudiantesPorNombre = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({
            where: { nombre: req.params.nombre }
        });
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar estudiantes por correo
exports.buscarEstudiantesPorCorreo = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ where: { correo: req.params.correo } });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verificar si un estudiante existe por correo
exports.verificarEstudiantePorCorreo = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({ where: { correo: req.params.correo } });
        if (estudiante) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener estudiantes por grupo
exports.getEstudiantesPorGrupo = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({
            where: { idGrupo: req.params.idGrupo }
        });
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un nuevo estudiante
exports.agregarEstudiante = async (req, res) => {
    try {
        const { idEstudiante, nombre, correo, idGrupo } = req.body;
        const nuevoEstudiante = await Estudiante.create({ idEstudiante, nombre, correo, idGrupo });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Actualizar un estudiante por su ID
exports.actualizarEstudiante = async (req, res) => {
    try {
        const { nombre, correo, idGrupo } = req.body;
        await Estudiante.update({ nombre, correo, idGrupo }, { where: { idEstudiante: req.params.idEstudiante } });
        res.status(200).json({ message: 'Estudiante actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un estudiante por su ID
exports.eliminarEstudiante = async (req, res) => {
    try {
        await Estudiante.destroy({ where: { idEstudiante: req.params.idEstudiante } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
