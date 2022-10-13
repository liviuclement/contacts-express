const sequelize  = require('./sequelize');

const databaseInit = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync()

		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		throw new Error('Unable to connect to the database');
	}
};

module.exports = databaseInit;
