// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'anmol'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('Expense', 'root', 'anmol', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;