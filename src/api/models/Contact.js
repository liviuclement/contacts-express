const {DataTypes} = require('sequelize');
const sequelize = require('../../utils/database/sequelize.js');

const Contact = sequelize.define('contact', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false
	},
	country:{
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	timestamps: false,
})

module.exports = Contact;
