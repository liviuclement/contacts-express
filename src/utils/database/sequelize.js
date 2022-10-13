const { Sequelize } = require('sequelize');
const DATA_SOURCES = require('./config.js');

const dataSource = DATA_SOURCES.mySqlDataSource;
const { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } = dataSource;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
	dialectOptions: {
		multipleStatements: true
	}
});

module.exports = sequelize;
