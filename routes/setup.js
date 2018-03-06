var express = require('express');
var User = require('../models/User');

var router = express.Router();

router.get('/', function adminInit(req, res) {
	//  创建一个管理员
	var admin = new User({
		name: 'Iris',
		password: '0531',
		admin: 'true'
	});

	// 添加入数据库
	admin.save(function createAdmin(err) {
		if (err) {
			res.json({
				success: false,
				message: 'Admin create failed'
			});
		}

		res.json({
			success: true,
			message: 'Admin create success'
		});
	});
});

module.exports = router;