var Matchs = require('./index.js');

// 测试
async function test() {
	var ms = new Matchs();
}

test();
var str = "";
// 正则加g表示匹配多个, 否则只匹配一个
// console.log("今年28岁了".matchs('/[0-9]+/'));
// console.log("手机号码是15817188815,哦5646546".matchs('/[0-9]+/g'));

// str = "我叫文武, 手机号码是1581718881";
// console.log(str.matchs('手机号码*'));
// console.log(str.matchs('*武'));

// str = "因为如果它是一只鸟,那么它就会飞";
// console.log(str.matchs('它*'));
// console.log(str.matchs('如果*鸟'));
// console.log(str.matchs('如果*就*'));
// console.log(str.matchs('*如果*就*'));


str = "今天不是我的生日, 我是1991-04-01日生的,生日是4月1日";

str = "今天不是我的生日, 我是一九九一年四月一日生的,生日是4月1日";

// console.log(str.matchs('{时态}'));
// console.log(str.matchs('{日期}'));

str = "1991年4月1日,小宝宝诞生了";
console.log(str.matchs('{年月日}'));


// console.log(str.matchs('{月日}'));
// console.log(str.matchs('{星期}'));
// console.log(str.matchs('{时分秒}'));

// srt = "今天天起怎么样?";


// str = "我叫文武, 手机号码是15817188815";
// console.log(str.matchs('{手机号码}'));
// console.log(str.matchs('{手机号码}'));
// console.log(str.matchs('{数字}'));

// str = "现在的时间是十九点三十五分五十九秒";
// str = "现在的时间是19点35分59秒";
// str = "现在的时间是19:35:59";
// console.log(str.matchs('{时间}'));



