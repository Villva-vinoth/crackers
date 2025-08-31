const { sequelize } = require('../config/db.config');
const initializeDb = async () => {
    try {
        await sequelize.sync({alter:true});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { initializeDb };