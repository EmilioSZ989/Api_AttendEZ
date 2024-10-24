// models/Estudiante.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
    idEstudiante: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idGrupo: {
        type: DataTypes.STRING,
        references: {
            model: 'Grupo', // Asegúrate de que esta tabla exista
            key: 'idGrupo',
        }
    }
}, {
    tableName: 'Estudiante',
    timestamps: false,
});

module.exports = Estudiante;
