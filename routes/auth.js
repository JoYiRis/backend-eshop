const express = require('express');
const sqlHelper = require('../utils/sqlHelper');
const router = express.Router();

router.post('/auth/login', function login(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const sql = `select id from user where name='${username}' && password='${password}'`;

	const user = sqlHelper.query(sql);
	sqlHelper.query(sql).then(function resolve(result) {
		res.send({
			status: true,
			data: {
				content: result
			},
			message: 'success'
		});
	}, function reject() {
		res.send({
			status: false,
			data: {
				content: ''
			},
			message: 'no matched user'
		});
	});
});

router.post('/auth/register', function register(req, res) {

});

module.exports = router;

