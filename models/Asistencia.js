const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Importa la biblioteca UUID

const Asistencia = sequelize.define('Asistencia', {
    idAsistencia: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4() // Genera un nuevo UUID para cada registro
    },
    fecha: {
        type: DataTypes.DATEONLY, // Se utiliza DATEONLY para evitar duplicados por hora
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    idEstudiante: {
        type: DataTypes.STRING,
        references: {
            model: 'Estudiante',
            key: 'idEstudiante',
        }
    },
    idGrupo: {
        type: DataTypes.STRING,
        references: {
            model: 'Grupo',
            key: 'idGrupo',
        }
    }
}, {
    tableName: 'Asistencia',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['idEstudiante', 'fecha'] // Índice único para evitar registros duplicados
        }
    ]
});

module.exports = Asistencia;
