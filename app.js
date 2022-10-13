const databaseInit = require('./src/utils/database/databaseInit');
const autoImportEnvVariables = require('./src/utils/utils');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
autoImportEnvVariables();

const app = express();

databaseInit();

const cors = require('cors');
app.use(cors());

//parse body to json
app.use(express.json());

const contactRoutes = require('./src/api/routes/contact-routes.js');

app.use('/api/contacts', contactRoutes);

//handle unsupported routes
app.use(() => {
	const error = new Error('Could not find this route');
	error.code = 404;
	throw error;
});

// error handling middleware
app.use((error, req, res, next) => {
	if (res?.headersSent) {
		return next(error);
	}
	res?.status(error?.code || 500);
	res?.json({
		message: error?.message || 'An unknown error occured!'
	});
});

module.exports = app;
