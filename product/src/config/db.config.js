const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/crackers",
  {
    dialect: 'postgres',
    logging: false
  });

module.exports = { sequelize }