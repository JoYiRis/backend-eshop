"use strict";

const express = require('express');
const sqlHelper = require('../utils/sqlHelper');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

router.post('/auth/login', function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const sql = `select id from user where name='${username}' && password='${password}'`;

	sqlHelper.query(sql).then(function resolve(result) {
		// jwt start
		jwtMiddleware.start(username);

		res.send({
			status: 'success',
			data: {
				content: result
			},
		});
	}, function reject() {
		res.send({
			status: 'fail',
			data: {
				content: ''
			},
			message: 'no matched user'
		});
	});
});

router.post('/auth/register', function register(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const sex = req.body.sex;
	const age = req.body.age;
	const sql = `insert into user (name, password, sex, age) value ('${username}', '${password}', '${sex}', '${age}')`;

	sqlHelper.query(sql).then(function resolve(results) {
		res.send({
			status: 'success',
			data: {
				content: {
					userId: results.insertId
				}
			},
		});
	}, function reject() {
		res.send({
			status: 'fail',
			message: 'Create user failed'
		});
	});
});

router.get('/auth/logout', function logout(req, res) {
	jwtMiddleware.end();
	res.redirect('/home');
});

module.exports = router;

