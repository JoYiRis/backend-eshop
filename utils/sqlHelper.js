"use strict";

const mysql = require('mysql');
const config = require('../config/db_config');

function query(sql) {
	let queryDo;
	const pool = mysql.createPool({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.database
	});

	switch (sql.trim().toLocaleLowerCase().split(' ')[0]) {
		case 'insert':
		case 'update':
			queryDo = callbackOkPacket;
			break;
		case 'create':
			queryDo = callbackCreate;
			break;
		case 'delete':
			queryDo = callbackDelete;
			break;
		case 'select':
			queryDo = callbackSelect;
			break;
	}


	return new Promise((resolve, reject) => {
		pool.getConnection(function execute(err, conn) {
			conn.query(sql, function callback(err, results, fields) {
				console.log(results);
				queryDo(results, resolve, reject);
			});
		});
	})
}

function callbackOkPacket(results, resolve, reject) {
	if (results && (results.affectedRows > 0 || results.changedRows > 0)) {
		resolve(results);
	} else {
		reject(results);
	}
}

function callbackCreate(results, resolve, reject) {

}

function callbackDelete(results, resolve, reject) {

}

function callbackSelect(results, resolve, reject) {
	if (results && results.length > 0) {
		resolve(results)
	} else {
		reject(results)
	}
}

const DBHelper = {
	query: query
};

module.exports = DBHelper;