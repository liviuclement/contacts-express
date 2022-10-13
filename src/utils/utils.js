const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PORT, } = process.env;

const autoImportEnvVariables = () => {
	global.DB_HOST = MYSQL_HOST;
	global.DB_NAME = MYSQL_DATABASE;
	global.DB_PORT = MYSQL_PORT;
};

module.exports = autoImportEnvVariables;
