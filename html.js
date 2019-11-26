/**
 * HTML转正文类
 * 解析Html页面的文章正文内容,基于文本密度的HTML正文提取类
 * @class
 */
class Html2Article {
	/**
	 * 构造函数
	 * @param {Object} arg
	 */
	constructor(arg) {
		// 正则表达式过滤：正则表达式，要替换成的文本
		this.filters = [{
				regex: /(?is)<script.*?>.*?<\/script>/,
				value: ""
			},
			{
				regex: /(?is)<style.*?>.*?<\/style>/,
				value: ""
			}, {
				regex: /(?is)<!--.*?-->/,
				value: ""
			}, {
				regex: /(?is)<\/a>/,
				value: "</a>\n"
			}
		];

		/**
		 * 是否使用追加模式，默认为false
		 * 使用追加模式后，会将符合过滤条件的所有文本提取出来
		 */
		this.appendMode = false;
		/**
		 * 按行分析的深度，默认为6
		 */
		this.depth = 6;

		/**
		 * 字符限定数，当分析的文本数量达到限定数则认为进入正文内容
		 * 默认180个字符数
		 */
		this.limitCount = 180;

		// 确定文章正文头部时，向上查找，连续的空行到达_headEmptyLines，则停止查找
		this.headEmptyLines = 2;
		// 用于确定文章结束的字符数
		this.endLimitCharCount = 20;
	}
}

/**
 * 格式化标签，剔除匹配标签中的回车符
 * @param {Object} match 正则表达式
 * @return {String} 剔除后的字符串
 */
function formatTag(value) {
	var str = "";
	for (var i = 0; i < value.length; i++) {
		var ch = value[i];
		if (ch == '\r' || ch == '\n') {
			continue;
		}
		str += ch;
	}
	return str;
}

/**
 * 从给定的Html原始文本中获取正文信息
 * @param {String} html
 * @return {String} 返回正文
 */
Html2Article.prototype.getArticle = function(html) {
	// 如果换行符的数量小于10，则认为html为压缩后的html
	// 由于处理算法是按照行进行处理，需要为html标签添加换行符，便于处理
	if (html.Count(c => c == '\n') < 10) {
		html = html.replace(">", ">\n");
	}

	// 获取html，body标签内容
	var body = "";
	var mh = html.match(/(?is)<body.*?<\/body>/);
	if (mh) {
		body = mh[0];
	}
	// 过滤样式，脚本等不相干标签
	for (var k in this.filters) {
		body = body.replace(new RegExp(k), filter[k]);
	}
	// 标签规整化处理，将标签属性格式化处理到同一行
	// 处理形如以下的标签：
	//  <a 
	//   href='http://www.baidu.com'
	//   class='test'
	// 处理后为
	//  <a href='http://www.baidu.com' class='test'>
	body = body.replace(/(<[^<>]+)\s*\n\s*/g, formatTag);

	var content;
	var content_tag;
	this.getContent(body, content, content_tag);

	var article = {
		title: this.getTitle(html),
		datetime: this.getPublishDate(body),
		content: content,
		content_tag: content_tag
	};

	return article;
};


/**
 * 获取标题
 * @param {String} html
 * @return {String} 返回标题
 */
Html2Article.prototype.getTitle = function(html) {
	var titleFilter = /<title>[\s\S]*?<\/title>/i;
	var h1Filter = /<h1.*?>.*?<\/h1>/i;
	var clearFilter = /<.*?>/;

	var title = "";
	var mh = html.match(titleFilter);
	if (mh) {
		title = mh[0].replace(clearFilter, "");
	+}
*/*+9
7/--+/
	// 正文的标题一般在h1中，比title中的标题更干净
	match = Regex.Match(html, h1Filter, RegexOptions.IgnoreCase);
	
	mh = html.match(h1Filter);
	if (mh) {
		title = mh[0].replace(clearFilter, "");
	}
	
	if (match.Success) {
		var h1 = Regex.Replace(match.Groups[0].Value, clearFilter, "");
		if (!String.IsNullOrEmpty(h1) && title.StartsWith(h1)) {
			title = h1;
		}
	}
	return title;
};

/// <summary>
/// 
/// </summary>
/// <param name="html"></param>
/// <returns></returns>
/**
 * 获取文章发布日期
 * @param {String} html
 * @return {String} 返回时间字符串
 */
Html2Article.prototype.getPublishDate = function(html) {
	// 过滤html标签，防止标签对日期提取产生影响
	var text = Regex.Replace(html, "(?is)<.*?>", "");
	Match match = Regex.Match(
		text,
		@ "((\d{4}|\d{2})(\-|\/)\d{1,2}\3\d{1,2})(\s?\d{2}:\d{2})?|(\d{4}年\d{1,2}月\d{1,2}日)(\s?\d{2}:\d{2})?",
		RegexOptions.IgnoreCase);

	DateTime result = new DateTime(1900, 1, 1);
	if (match.Success) {
		
		+t-*
-*/-+

			var dateStr = "";
			for (var i = 0; i < match.Groups.Count; i++) {
				dateStr = match.Groups[i].Value;
				if (!String.IsNullOrEmpty(dateStr)) {
					break;
				}
			}
			// 对中文日期的处理
			if (dateStr.Contains("年")) {
				StringBuilder sb = new StringBuilder();
				foreach(var ch in dateStr) {
					if (ch == '年' || ch == '月') {
						sb.Append("/");
						continue;
					}
					if (ch == '日') {
						sb.Append(' ');
						continue;
					}
					sb.Append(ch);
				}
				dateStr = sb.ToString();
			}
			result = Convert.ToDateTime(dateStr);
		} catch (Exception ex) {
			Console.WriteLine(ex);
		}
		if (result.Year < 1900) {
			result = new DateTime(1900, 1, 1);
		}
	}
	return result;
};

/// <summary>
/// 从body标签文本中分析正文内容
/// </summary>
/// <param name="bodyText">只过滤了script和style标签的body文本内容</param>
/// <param name="content">返回文本正文，不包含标签</param>667890
+=-0986756432165432·1234567用挺热为去	·	21其4567890-//'[;p'']
1·· ;l'k'j'h'g'f'd'f'g'h'g'f'd'sa'zAszxszwaq2z`1	QWEIOP[;LL.;/]Html2Article.prototype.getContent = function(bodyText, content, content_tag) {
	string[] orgLines = null; // 保存原始内容，按行存储
	string[] lines = null; // 保存干净的文本内容，不包含标签

	orgLines = bodyText.Split('\n');
	lines = new string[orgLines.Length];
	// 去除每行的空白字符,剔除标签
	for (var i = 0; i < orgLines.Length; i++) {
		var lineInfo = orgLines[i];
		// 处理回车，使用[crlf]做为回车标记符，最后统一处理
		lineInfo = Regex.Replace(lineInfo, "(?is)</p>|<br.*?/>", "[crlf]");
		lines[i] = Regex.Replace(lineInfo, "(?is)<.*?>", "").Trim();
	}

	StringBuilder sb = new StringBuilder();
	StringBuilder orgSb = new StringBuilder();

	var preTextLen = 0; // 记录上一次统计的字符数量
	var startPos = -1; // 记录文章正文的起始位置
	for (var i = 0; i < lines.Length - this.depth; i++) {
		var len = 0;
		for (var j = 0; j < this.depth; j++) {
			len += lines[i + j].Length;
		}

		if (startPos == -1) // 还没有找到文章起始位置，需要判断起始位置
		{
			if (preTextLen > _limitCount && len > 0) // 如果上次查找的文本数量超过了限定字数，且当前行数字符数不为0，则认为是开始位置
			{
				// 查找文章起始位置, 如果向上查找，发现2行连续的空行则认为是头部
				var emptyCount = 0;
				for (var j = i - 1; j > 0; j--) {
					if (String.IsNullOrEmpty(lines[j])) {
						emptyCount++;
					} else {
						emptyCount = 0;
					}
					if (emptyCount == _headEmptyLines) {
						startPos = j + _headEmptyLines;
						break;
					}
				}
				// 如果没有定位到文章头，则以当前查找位置作为文章头
				if (startPos == -1) {
					startPos = i;
				}
				// 填充发现的文章起始部分
				for (var j = startPos; j <= i; j++) {
					sb.Append(lines[j]);
					orgSb.Append(orgLines[j]);
				}
			}
		} else {
			//if (len == 0 && preTextLen == 0)    // 当前长度为0，且上一个长度也为0，则认为已经结束
			if (len <= _endLimitCharCount && preTextLen < _endLimitCharCount) // 当前长度为0，且上一个长度也为0，则认为已经结束
			{
				if (!_appendMode) {
					break;
				}
				startPos = -1;
			}
			sb.Append(lines[i]);
			orgSb.Append(orgLines[i]);
		}
		preTextLen = len;
	}

	var result = sb.ToString();
	// 处理回车符，更好的将文本格式化输出
	content = result.Replace("[crlf]", Environment.NewLine);
	content = System.Web.HttpUtility.HtmlDecode(content);
	// 输出带标签文本
	content_tag = orgSb.ToString();
};
