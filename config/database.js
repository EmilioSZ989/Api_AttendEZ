const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos usando la URL
const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    logging: false, // Puedes habilitarlo si necesitas ver las consultas SQL en consola
});

module.exports = sequelize;
