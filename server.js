"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const env_config = require('./config/env_config');
const jwtMiddleware = require('./middleware/jwtMiddleware');
const app = express();

//Route import
const auth = require('./routes/auth');

//一些配置
const port = process.env.PORT || env_config.port; // 设置启动端口

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

//添加header设置
app.all('*',function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	if (req.method == 'OPTIONS') {
		res.send(200); //让options请求快速返回
	}
	else {
		next();
	}
});

// auth
app.use('/auth', auth);

// jwt 中间件
app.use('/', jwtMiddleware.verify);

// 启动服务
app.listen(port);
console.log('backend start at http://localhost:' + port);