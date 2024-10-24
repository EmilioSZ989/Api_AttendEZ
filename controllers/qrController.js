const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { Asistencia } = require('../models/Asistencia');


exports.registrarAsistencia = async (req, res) => {
    try {
        const { grupo, docente } = req.query;

        if (!grupo || !docente) {
            return res.status(400).json({ message: 'Faltan parámetros en la URL.' });
        }

        const ticket = await client.verifyIdToken({
            idToken: req.query.idToken, 
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const studentEmail = payload.email;

        await Asistencia.create({
            estudianteEmail: studentEmail,
            grupoId: grupo,
            docenteId: docente,
            fecha: new Date(),
        });

        res.status(200).json({ message: 'Asistencia registrada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
