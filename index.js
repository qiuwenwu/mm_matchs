/**
 * @fileOverview mm_matchs 字符串匹配原型函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');

/**
 * 用作拓展的函数
 * @class
 */
class Matchs {
	/**
	 * 匹配拓展
	 */
	constructor(config) {
		this.list = [{
				keyword: "{时间}",
				func: "time"
			},
			{
				keyword: "{地点}",
				func: "address"
			},
			{
				keyword: "{省份}",
				func: "province"
			},
			{
				keyword: "{城市}",
				func: "city"
			},
			{
				keyword: "{地区}",
				func: "area"
			},
			{
				keyword: "{邮箱}",
				func: "email"
			},
			{
				keyword: "{手机号码}",
				func: "phone"
			}
		];
	}
}

Matchs.prototype.time = function() {

};


/**
 * @param {String} str 要匹配的字符串
 */
Matchs.prototype.get = function(str) {

};


/**
 * 匹配字符串
 * @param {String} format 用作匹配的字符串格式
 * @return {String} 匹配成功返回匹配的字符串，否则返回空
 */
String.prototype.matchs = function(format) {
	var rx;
	var arr = [];
	if (format.startWith('/')) {
		try {
			rx = eval(format);
		} catch (e) {
			//TODO handle the exception
		}
	} else {
		if(format.indexOf('{')){
			var ft = format.replace(/\{/, '`{').replace(/\}/, '}`');
			var ar = ft.split('`').map(function(o){
				(o.indexOf('{') !== -1 || o.indexOf('|'))
			});
		}
		var f = '/' + format.replace(/\*/, '.*') + '/g';
	
		try {
			rx = eval(f);
		} catch (e) {
			//TODO handle the exception
		}
	}
	if (rx) {
	var match = new Matchs();
	var string = match.get();
	}

};
