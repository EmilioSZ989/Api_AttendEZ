// models/Grupo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Grupo = sequelize.define('Grupo', {
    idGrupo: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombreGrupo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idDocente: {
        type: DataTypes.STRING,
        references: {
            model: 'Docente', // Asegúrate de que esta tabla exista
            key: 'idDocente',
        }
    }
}, {
    tableName: 'Grupo',
    timestamps: false,
});

module.exports = Grupo;
