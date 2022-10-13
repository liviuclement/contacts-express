const { QueryTypes } = require('sequelize');
const sequelize = require('../../utils/database/sequelize.js');

const getContacts = async(req, res) => {
	const { country, query, page, onlyEven, } = req.query;
	const parsedPage = parseInt(page);
	const parsedIsEven = !!parseInt(onlyEven);

	let countSqlQuery = `SELECT COUNT(*) AS count FROM contacts WHERE (first_name LIKE '%${query}%' OR last_name LIKE '%${query}%' OR phone LIKE '%${query}%')`;
	let contactsSqlQuery = `SELECT * FROM contacts WHERE (first_name LIKE '%${query}%' OR last_name LIKE '%${query}%' OR phone LIKE '%${query}%') `;

	if (!!country) {
		contactsSqlQuery += `AND country = "US" `;
		countSqlQuery += `AND country = "US" `;
	}

	if (parsedIsEven) {
		contactsSqlQuery += `AND mod(id, 2) = 0 `;
		countSqlQuery += `AND mod(id, 2) = 0 `;
	}

	contactsSqlQuery += `LIMIT ${ 10 * ( parsedPage - 1 ) + 1 }, ${ parsedPage * 10 }`;

	try {
		const contacts = await sequelize.query(contactsSqlQuery, { type: QueryTypes.SELECT });
		const count = await sequelize.query(countSqlQuery, { type: QueryTypes.SELECT });

		res.status(200).json({
			contacts,
			count: count[0]?.count,
			page: parsedPage,
		});
	} catch(err) {
		res.status(500).json({
			message: err.message,
			err,
		})
	}

	// Contact.findAndCountAll({
	// 	where: {
	// 		id: {
	// 			// [Op.]
	// 		},
	// 		country: {
	// 			[country.toLowerCase() === 'us' ? Op.eq : Op.not]: 'US',
	// 		},
	// 		[Op.or]: [
	// 			{
	// 				first_name: {
	// 					[Op.like]: `%${ query }%`
	// 				},
	// 			},
	// 			{
	// 				last_name: {
	// 					[Op.like]: `%${ query }%`
	// 				},
	// 			},
	// 			{
	// 				phone: {
	// 					[Op.like]: `%${ query }%`
	// 				},
	// 			},
	// 		]
	// 	},
	// 	limit: parsedPage * 10,
	// 	offset: 10 * ( parsedPage - 1 ) + 1,
	// })
	// 	.then(({ count, rows }) => {
	// 		// console.log({ contacts });
	// 		res.status(200).json({
	// 			contacts: rows,
	// 			total: count,
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log({ err });
	// 	});

};

module.exports = {
	getContacts
};
