var express = require('express');
var User = require('./User');

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
				status: 'failed',
				message: 'Admin create failed'
			});
		}

		res.json({
			status: 'success',
			message: 'Admin create success'
		});
	});
});

module.exports = router;