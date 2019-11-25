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
		this.dict = {
			"{日期时间}": "datetime",
			"{日期}": "date",
			"{时间}": "time",
			"{年月日}": "year_month_day",
			"{时分秒}": "hour_minute_second",
			"{周期}": "cycle",
			"{时态}": "tense",
			"{地点}": "address",
			"{省份}": "province",
			"{城市}": "city",
			"{地区}": "area",
			"{邮箱}": "email",
			"{手机号码}": "phone",
			"{账号}": "account",
			"{密码}": "password",
			"{数字}": "digits",
			"{数值}": "number"
		};
	}
}

// 			case "number":
// 				bl = /^$/.test(value)
// 				break;
// 			case "en":
// 				bl = /^[a-zA-Z]+$/.test(value)
// 				break;
// 			case "num":
// 			case "digits":
// 				bl = /^[0-9]+$/.test(value)
// 				break;
// 			case "ch":
// 			case "chs":
// 			case "chinese":
// 				bl = /^[\u4e00-\u9fa5]+$/.test(value)
// 				break;
// 			default:
// 				console.log('输入的类型错误')
// 				break;

/**
 * 匹配{时态}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.tense = function(str, format) {
	var t = str;
	var f = format;
	var arr = ["前天", "昨天", "今天", "明天", "后天", "前年", "去年", "今年", "明年", "来年", "后年"];

	for (var i = 0; i < arr.length; i++) {
		var k = arr[i];
		if (t.indexOf(k) !== -1) {
			t = t.replace(k, '');
			f = f.replace('{时态}', k);
		}
	}
	return f;
};

/**
 * 改变格式
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @param {Regex} rx 正则表达式
 * @param {String} key 替换名
 * @return {String} 返回新的格式
 */
function change(str, format, rx, key) {
	var t = str;
	var f = format;
	var mh = str.match(rx);
	if (mh) {
		for (var i = 0; i < mh.length; i++) {
			var k = mh[i];
			if (t.indexOf(k) !== -1) {
				t = t.replace(k, '');
				f = f.replace(key, k);
			}
		}
	}
	return f;
};

/**
 * 匹配{日期}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.date = function(str, format) {
	var rx =
		/(\d{4}(\-|\/|\.)(0[1-9]|1[012]|[1-9])(\-|\/|\.)([12][0-9]|0[1-9]|3[01]|[1-9]))|(([一二三四五六七八九]+年)?[一二三四五六七八九十]+月([一二三四五六七八九十]+(日|号))?)|((\d{4}年)?(0[1-9]|1[012]|[1-9])月([12][0-9]|0[1-9]|3[01]|[1-9])(日|号))/;
	return change(str, format, rx, '{日期}');
};

/**
 * 匹配{年月日}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.year_month_day = function(str, format) {
	var rx =
		/(\d{4}(\-|\/|\.)(0[1-9]|1[012]|[1-9])(\-|\/|\.)([12][0-9]|0[1-9]|3[01]|[1-9]))|([一二三四五六七八九]+年[一二三四五六七八九十]+月[一二三四五六七八九十]+(日|号))|(\d{4}年(0[1-9]|1[012]|[1-9])月([12][0-9]|0[1-9]|3[01]|[1-9])(日|号))/;
	return change(str, format, rx, '{年月日}');
};

/**
 * 匹配{时间}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.time = function(str, format) {
	var rx =
		/(([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9])(:([0-4][0-9]|5[0-9]))?)|(([01][0-9]|2[0-3])点([0-4][0-9]|5[0-9])分(([0-4][0-9]|5[0-9])秒)?)|([一二三四五六七八九十]+点[一二三四五六七八九十]+分([一二三四五六七八九十]+秒)?)/;
	return change(str, format, rx, '{日期}');
};

/**
 * 匹配{时分秒}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.hour_minute_second = function(str, format) {
	var rx =
		/(([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9]):([0-4][0-9]|5[0-9]))|(([01][0-9]|2[0-3])点([0-4][0-9]|5[0-9])分([0-4][0-9]|5[0-9])秒)|([一二三四五六七八九十]+点[一二三四五六七八九十]+分[一二三四五六七八九十]+秒)/;
	return change(str, format, rx, '{时分秒}');
};

/**
 * 匹配{账号}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.account = function(str, format) {
	var rx = /[a-z0-9A-Z_]+/;
	return change(str, format, rx, '{账号}');
};

/**
 * 匹配{密码}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.password = function(str, format) {
	var rx = /[a-z0-9A-Z]+/;
	return change(str, format, rx, '{密码}');
};


/**
 * 匹配{邮箱}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.email = function(str, format) {
	var rx = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
	return change(str, format, rx, '{邮箱}');
};


/**
 * 匹配{邮箱}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.email = function(str, format) {
	var rx = /((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
	return change(str, format, rx, '{网址}');
};


/**
 * 匹配{手机号码}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.phone = function(str, format) {
	var rx = /0?(13|14|15|16|17|18|19)[0-9]{9}/;
	return change(str, format, rx, '{手机号码}');
};

/**
 * 匹配{数字}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.digits = function(str, format) {
	var rx = /[0-9]+/;
	return change(str, format, rx, '{数字}');
};

/**
 * 匹配{数值}
 * @param {String} str 匹配的字符串
 * @param {String} format 匹配格式
 * @return {String} 返回新的格式
 */
Matchs.prototype.number = function(str, format) {
	var rx = /[1-9]+[0-9]*(\.[0-9]+|[0-9]*)|0\.[0-9]+|0/;
	return change(str, format, rx, '{数值}');
};

/**
 * 获取匹配的内容
 * @param {String} str 要匹配的字符串
 * @param {String} format 用作匹配的字符串格式
 * @param {Array} arr 匹配的字符串格式片段(可以为空)
 * @return {String} 返回匹配的结果
 */
Matchs.prototype.get = function(str, format) {
	var arr = [];
	var ft = format.replace(/\{/g, '`{').replace(/\}/g, '}`');
	var ar = ft.split('`').map(function(o) {
		if (o.indexOf('{') !== -1) {
			arr.push(o);
		}
	});

	var f = format;
	for (var i = 0; i < arr.length; i++) {
		var key = arr[i];
		var func_name = this.dict[key];

		if (func_name) {
			var func = this[func_name];
			if (func) {
				f = func(str, f);
			}
		}
	}
	return f;
};

/**
 * 匹配字符串
 * @param {String} format 用作匹配的字符串格式
 * @return {String} 匹配成功返回匹配的字符串，否则返回空
 */
String.prototype.matchs = function(format) {
	var rx;
	var ret = "";
	if (format.startWith('/')) {
		try {
			rx = eval(format);
		} catch (e) {
			// TODO handle the exception
		}
	} else {
		var f = format;
		if (format.indexOf('{') !== -1) {
			var matchs = new Matchs();
			f = matchs.get(this, format);
		}

		f = '/' + f.replace(/\*/g, '.*') + '/g';
		try {
			rx = eval(f);
		} catch (e) {
			//TODO handle the exception
		}
	}

	if (rx) {
		var str = this + "";
		var mh = str.match(rx);
		var te = "";
		if (mh) {
			ret = mh[0];
		}
	}
	return ret;
};

module.exports = Matchs;
