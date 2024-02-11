const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ExpAmt: Sequelize.INTEGER,
  Desc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Catg: Sequelize.STRING
});

module.exports = Expense;
