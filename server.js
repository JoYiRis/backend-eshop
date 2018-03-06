var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var app = express();

var SetupRoute = require('./routes/setup');

//一些配置
var port = process.env.PORT || 8083; // 设置启动端口
mongoose.connect(config.database); // 连接数据库
app.set('superSecret', config.secret); // 设置app 的超级密码--用来生成摘要的密码

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

//路由
//基础路由
app.get('/', function hi(req,res) {
	res.send("这里是nodejs+mongodb编写restfulAPI的笔记！");
});

//设置管理员
app.use('/setup', SetupRoute);

// 启动服务
app.listen(port);
console.log('Magic happens at http://localhost:' + port);