// models/Docente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Docente = sequelize.define('Docente', {
    idDocente: {
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
    }
}, {
    tableName: 'Docente',
    timestamps: false,
});

module.exports = Docente;
