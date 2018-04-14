var fs = require('fs'); //放入fs模块

exports.get_chapter_data = function() {  //暴露出读取数据的方法，并返回读取到的数据
	var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
	return content;
}

exports.get_test_data = function() {  //暴露出读取数据的方法，并返回读取到的数据
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content;
}

//每章内容
exports.get_chapter_content_data = function(id) { 
	if (!id) {
		id = "1";
	}
	var content = fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
	return content;
}

//首页的数据接口
exports.get_index_data = function() {
	var content = fs.readFileSync('./mock/home.json', 'utf-8');
	return content;
}

//书籍的接口，参数id
exports.get_book_data = function(id) {
	if (!id) {
		id = "18218";
	}
	if(fs.existsSync('./mock/book/' + id + '.json')){
	 	return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
	}else{
		return fs.readFileSync('./mock/book/18218.json', 'utf-8');
	}
}

//排序接口
exports.get_rank_data = function(channelId) {
	var content = fs.readFileSync('./mock/rank.json', 'utf-8');
	return content;
}

//目录
exports.get_category_data = function(channelId) {
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content;
}

//男频
exports.get_male_data = function(channelId) {
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
}

//女频
exports.get_female_data = function(channelId) {
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
}


//指定http接口，搜索接口
exports.get_search_data = function(start, end, keyword) {  //三个参数传入
	return function(cb) {
		var http = require('http');
		var qs = require('querystring');  //引入require类
		//参数组装
		var data = {
			s: keyword,
			start: start,
			end: end
		}
		var content = qs.stringify(data);  //把数据转换成http参数格式
		//接口查询路径
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?' + content,
			method: 'GET'
		};

		//发送请求
		req_obj = http.request(http_request, function(_res) {
			var callback_content = '';
			var _this = this;
			var content='';
			_res.setEncoding('utf8');

			_res.on('data', function(chunk) {  //出发data方法，返回一部分数据
				content += chunk;
			});

			_res.on('end', function(e) {  //出发end方法，返回所有的数据，返回给前端
				cb(null,content);
			});

		});

		req_obj.on('error', function(e) { //监听响应出错的情况

		});

		req_obj.end();  //响应结束返回执行回调函数。
	}
}