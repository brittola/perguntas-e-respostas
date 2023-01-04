// Importando sequelize
const Sequelize = require('sequelize');

// Conectando: nome do banco, usuário, senha e um JSON com host e banco
const connection = new Sequelize('ask', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// Exportando a conexão
module.exports = connection;