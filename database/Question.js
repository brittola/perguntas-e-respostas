const Sequelize = require('sequelize');
const connection = require('./database');

// STRING: Textos curtos
// TEXT: Textos longos
// alowNull: não permite que o campo fique vazio
const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Se no banco de dados não tiver a tabela "Questions", ele cria a tabela
// Caso já exista, ele não força a criação de uma nova, por conta do {force: false}
Question.sync({ force: false }).then(() => {});

module.exports = Question;