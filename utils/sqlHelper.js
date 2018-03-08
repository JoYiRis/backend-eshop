const mysql = require('mysql');
const config = require('../config/db_config');

function query(sql) {
	const pool = mysql.createPool({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database
	});

	return new Promise((resolve, reject) => {
		pool.getConnection(function execute(err, conn) {
			conn.query(sql, function callback(err, results, fields) {
				if (results.length > 1) {
					resolve(results);
				} else {
					reject(err);
				}
			});
		});
	})
}

const DBHelper = {
	query: query
};

module.exports = DBHelper;