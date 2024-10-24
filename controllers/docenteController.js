const Docente = require('../models/Docente');

// Obtener todos los docentes
exports.getAllDocentes = async (req, res) => {
    try {
        const docentes = await Docente.findAll();
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un docente por su ID
exports.getDocenteById = async (req, res) => {
    try {
        const docente = await Docente.findByPk(req.params.idDocente);
        if (!docente) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }
        res.json(docente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar docentes por nombre
exports.buscarDocentesPorNombre = async (req, res) => {
    try {
        const docentes = await Docente.findAll({
            where: { nombre: req.params.nombre }
        });
        res.json(docentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar docentes por correo
exports.buscarDocentesPorCorreo = async (req, res) => {
    try {
        const docente = await Docente.findOne({ where: { correo: req.params.correo } });
        if (!docente) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }
        res.json(docente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verificar si un docente existe por correo
exports.verificarDocentePorCorreo = async (req, res) => {
    try {
        const docente = await Docente.findOne({ where: { correo: req.params.correo } });
        if (docente) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un nuevo docente
exports.agregarDocente = async (req, res) => {
    try {
        const { idDocente, nombre, correo } = req.body;
        const nuevoDocente = await Docente.create({ idDocente, nombre, correo });
        res.status(201).json(nuevoDocente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un docente por su ID
exports.actualizarDocente = async (req, res) => {
    try {
        const { nombre, correo } = req.body;
        await Docente.update({ nombre, correo }, { where: { idDocente: req.params.idDocente } });
        res.status(200).json({ message: 'Docente actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un docente por su ID
exports.eliminarDocente = async (req, res) => {
    try {
        await Docente.destroy({ where: { idDocente: req.params.idDocente } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
