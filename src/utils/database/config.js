require('dotenv').config();

const DATA_SOURCES = {
	mySqlDataSource: {
		DB_HOST: process.env.MYSQL_HOST,
		DB_USER: process.env.MYSQL_USER,
		DB_PASSWORD: process.env.MYSQL_PASSWORD,
		DB_DATABASE: process.env.MYSQL_DATABASE
	}
}

module.exports = DATA_SOURCES;
