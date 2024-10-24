const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Importa la conexión desde database.js

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicialización de la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const docentesRoutes = require('./routes/docentes');
const gruposRoutes = require('./routes/grupos');
const estudiantesRoutes = require('./routes/estudiantes');
const asistenciasRoutes = require('./routes/asistencias');
const hojasDeGoogleRoutes = require('./routes/hojasDeGoogle'); // Ruta para Hojas de Google
const qrRoutes = require('./routes/qr'); // Ruta para códigos QR

// Usar rutas
app.use('/api/docentes', docentesRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/asistencias', asistenciasRoutes);
app.use('/api/hojasDeGoogle', hojasDeGoogleRoutes); // Ruta para Hojas de Google
app.use('/api/qr', qrRoutes); // Ruta para QR

// Middleware para manejo de errores (Error handling middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor.' });
});

// Sincronizar modelos y manejar errores de conexión
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

// Manejar la terminación de procesos y liberar la base de datos
process.on('SIGINT', async () => {
    console.log('Cerrando el servidor y la conexión a la base de datos...');
    await sequelize.close();
    process.exit(0);
});
