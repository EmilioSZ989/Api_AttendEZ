// models/Asistencia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asistencia = sequelize.define('Asistencia', {
    idAsistencia: {
        type: DataTypes.STRING, // Cambiado a STRING para coincidir con el modelo E-R
        primaryKey: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN, // Cambiado a BOOLEAN para indicar presente/ausente
        allowNull: false,
    },
    idEstudiante: {
        type: DataTypes.STRING,
        references: {
            model: 'Estudiante', // Asegúrate de que esta tabla exista
            key: 'idEstudiante',
        }
    },
    idGrupo: {
        type: DataTypes.STRING,
        references: {
            model: 'Grupo', // Asegúrate de que esta tabla exista
            key: 'idGrupo',
        }
    }
}, {
    tableName: 'Asistencia',
    timestamps: false,
});

module.exports = Asistencia;
