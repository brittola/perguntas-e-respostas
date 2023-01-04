const Sequelize = require('sequelize');
const connection = require('./database');

const Reply = connection.define('replies', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    repliedTo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Reply.sync({ force: false }).then(() => {});

module.exports = Reply;