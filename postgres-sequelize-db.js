const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB_DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true
        },
        connectTimeout: 6000 
    }
});

module.exports = sequelize;
