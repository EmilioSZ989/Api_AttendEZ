// models/HojaDeGoogle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HojaDeGoogle = sequelize.define('HojaDeGoogle', {
    idHoja: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    enlace: {
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
    tableName: 'HojaDeGoogle',
    timestamps: false,
});

module.exports = HojaDeGoogle;
