// const nJwt = require('njwt');
var Http = require('./index.js');


// 测试
async function test() {
	var hp = new Http();
	// var res = await hp.get("http://www.baidu.com");
	// console.log('百度:' + $.toJson(res));
	res = await hp.post("http://api.bitcentre.com.cn/login", {
		'phone': "15817188815",
		'password': "asd123"
	}, null, 'form');
	console.log('登录:' + $.toJson(res));
	console.log('cookie:', hp.cookie);
	var token = hp.cookie.get('x-auth-token').value;
	console.log('访问牌:' + token);
	res = await hp.get("http://api.bitcentre.com.cn/paper/id?id=1", {
		"x-auth-token": token
	});
	console.log('结果:' + $.toJson(res));
}

test();