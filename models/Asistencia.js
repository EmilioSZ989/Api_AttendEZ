// models/Asistencia.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asistencia = sequelize.define('Asistencia', {
    idAsistencia: {
        type: DataTypes.STRING, // Asegúrate de que este tipo coincida con tu DB
        primaryKey: true,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN, // Indica si está presente (true) o ausente (false)
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
    timestamps: false, // No se usan los timestamps por defecto
});

module.exports = Asistencia;
