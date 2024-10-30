const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { Asistencia } = require('../models/Asistencia');
const { Estudiante } = require('../models/Estudiante'); // Asegúrate de importar el modelo Estudiante

exports.registrarAsistencia = async (req, res) => {
    try {
        const { grupo, docente, estado } = req.query; // Asegúrate de que 'estado' venga de la consulta

        if (!grupo || !docente || !estado) {
            return res.status(400).json({ message: 'Faltan parámetros en la URL.' });
        }

        // Verificar el token de ID de Google
        const ticket = await client.verifyIdToken({
            idToken: req.query.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const studentEmail = payload.email; // Obtener el email del payload

        // Aquí puedes buscar al estudiante en la base de datos por su correo
        const estudiante = await Estudiante.findOne({ where: { correo: studentEmail } });

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado.' });
        }

        const idEstudiante = estudiante.idEstudiante; // Obtener el ID del estudiante

        // Crear la asistencia
        const nuevaAsistencia = await Asistencia.create({
            idAsistencia: generateUniqueId(), // Asume que tienes una función para generar IDs únicos
            fecha: new Date(),
            estado: estado === 'true', // Convertir el estado a booleano
            idEstudiante: idEstudiante,
            idGrupo: grupo,
        });

        res.status(201).json({ message: 'Asistencia registrada exitosamente', data: nuevaAsistencia });
    } catch (error) {
        console.error('Error al registrar asistencia:', error);
        res.status(500).json({ error: error.message });
    }
};

// Función para generar un ID único (puedes usar un paquete como uuid)
function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 9); // Ejemplo simple para generar ID único
}
