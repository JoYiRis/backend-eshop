"use strict";

const express = require('express');
const sqlHelper = require('../utils/sqlHelper');
const router = express.Router();

router.post('/auth/password', function changePassword(req, res) {
	const userId = req.body.userId;
	const old_password = req.body.oldPassword;
	const new_password = req.body.newPassword;
	const sql = `update user set password = '${new_password}' where id = '${userId}' and password = '${old_password}'`;

	sqlHelper.query(sql).then(function resolve() {
		res.send({
			status: 'success',
			message: 'change password success'
		});
	}, function reject() {
		res.send({
			status: 'fail',
			message: 'old password not correct'
		});
	});
});

module.exports = router;